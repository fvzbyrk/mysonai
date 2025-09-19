import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import {
  createAdvancedGPTRequest,
  GPT_FUNCTIONS,
  type AdvancedGPTParams,
  type MultiAgentMode,
  MultiAgentCoordinator,
} from '@/lib/advanced-gpt-features';
import { getAgentById } from '@/lib/ai-agents';
import { masterPromptValidator, promptMonitor } from '@/lib/master-prompt-system';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

// Gelişmiş çoklu ajan koordinatörü
const coordinator = new MultiAgentCoordinator();

export async function POST(request: NextRequest) {
  try {
    const { messages, selectedAgents, multiAgentMode, gptParams, enableFeatures, userQuery } =
      await request.json();

    // Varsayılan GPT parametreleri
    const defaultParams: AdvancedGPTParams = {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      stream: false,
      ...gptParams,
    };

    // Aktif özellikler
    const activeFeatures = {
      functionCalling: enableFeatures?.functionCalling ?? true,
      vision: enableFeatures?.vision ?? false,
      codeInterpreter: enableFeatures?.codeInterpreter ?? false,
      webSearch: enableFeatures?.webSearch ?? false,
      fileAnalysis: enableFeatures?.fileAnalysis ?? false,
      memory: enableFeatures?.memory ?? false,
      streaming: enableFeatures?.streaming ?? false,
    };

    // Demo mode kontrolü
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
      return handleDemoMode(selectedAgents, multiAgentMode, userQuery, activeFeatures);
    }

    // Çoklu ajan modu
    if (selectedAgents && selectedAgents.length > 1) {
      return handleMultiAgentMode(selectedAgents, userQuery, multiAgentMode, defaultParams);
    }

    // Tek ajan modu
    return handleSingleAgentMode(messages, selectedAgents?.[0], defaultParams, activeFeatures);
  } catch (error) {
    console.error('Advanced chat error:', error);
    return NextResponse.json(
      { error: 'Gelişmiş sohbet sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Demo mode handler
async function handleDemoMode(
  selectedAgents: string[],
  multiAgentMode: MultiAgentMode,
  userQuery: string,
  activeFeatures: any
) {
  const agents = selectedAgents?.map(id => getAgentById(id)).filter(Boolean) || [];

  let response = '🚀 **Gelişmiş Çoklu Ajan Sistemi** (Demo Mode)\n\n';

  if (agents.length > 1) {
    response += '**Aktif Ajanlar:**\n';
    agents.forEach(agent => {
      response += `• ${agent.icon} ${agent.name} - ${agent.role}\n`;
    });

    response += `\n**İşbirliği Modu:** ${getModeDescription(multiAgentMode)}\n\n`;
  } else if (agents.length === 1) {
    response += `**Aktif Ajan:** ${agents[0].icon} ${agents[0].name}\n\n`;
  }

  response += '**Aktif Özellikler:**\n';
  Object.entries(activeFeatures).forEach(([feature, enabled]) => {
    if (enabled) {
      response += `✅ ${getFeatureDescription(feature)}\n`;
    }
  });

  response += `\n**Sorgunuz:** "${userQuery}"\n\n`;
  response += `**Yanıt:** Bu gelişmiş sistem ile ${agents.length > 1 ? 'çoklu ajan işbirliği' : 'tek ajan'} modunda kapsamlı bir çözüm sunabiliriz. `;
  response += 'Aktif özellikler sayesinde daha zengin ve etkileşimli deneyim yaşayabilirsiniz.\n\n';
  response += '*Not: Bu demo modudur. Gerçek API key ile tüm özellikler aktif olacaktır.*';

  return NextResponse.json({
    message: response,
    agents: agents,
    mode: multiAgentMode,
    features: activeFeatures,
    isDemo: true,
  });
}

// Çoklu ajan modu handler
async function handleMultiAgentMode(
  selectedAgents: string[],
  userQuery: string,
  mode: MultiAgentMode,
  params: AdvancedGPTParams
) {
  try {
    // Ajan yarışı başlat
    const race = await coordinator.startRace(selectedAgents, userQuery, mode);

    // Yarış sonucunu değerlendir
    const winner = race.responses.length > 0 ? race.responses[0].agentId : null;

    let response = `🏆 **${getModeDescription(mode)} Sonucu**\n\n`;

    if (race.responses.length > 0) {
      response += '**Katılan Ajanlar:**\n';
      race.responses.forEach(r => {
        const agent = getAgentById(r.agentId);
        response += `• ${agent?.icon} ${agent?.name}: ${r.time}ms, Kalite: ${r.quality}/10\n`;
      });

      if (winner) {
        const winnerAgent = getAgentById(winner);
        response += `\n🏆 **Kazanan:** ${winnerAgent?.icon} ${winnerAgent?.name}\n\n`;
        response += `**Kazanan Yanıt:**\n${race.responses.find(r => r.agentId === winner)?.response}`;
      }
    } else {
      response += 'Hiçbir ajan yanıt veremedi.';
    }

    return NextResponse.json({
      message: response,
      race: race,
      winner: winner,
      mode: mode,
      isDemo: false,
    });
  } catch (error) {
    console.error('Multi-agent mode error:', error);
    return NextResponse.json({ error: 'Çoklu ajan modu sırasında hata oluştu' }, { status: 500 });
  }
}

// Tek ajan modu handler
async function handleSingleAgentMode(
  messages: any[],
  selectedAgent: string,
  params: AdvancedGPTParams,
  activeFeatures: any
) {
  const agent = getAgentById(selectedAgent);
  if (!agent) {
    return NextResponse.json({ error: 'Ajan bulunamadı' }, { status: 404 });
  }

  // Master Prompt Validation
  const validationResult = masterPromptValidator.validatePrompt(selectedAgent, agent.systemPrompt);

  if (validationResult.riskLevel === 'high') {
    return NextResponse.json(
      { error: 'Güvenlik riski tespit edildi', violations: validationResult.violations },
      { status: 400 }
    );
  }

  // Prompt monitoring
  promptMonitor.logPromptUsage(
    selectedAgent,
    messages[messages.length - 1]?.content || '',
    validationResult
  );

  // Fonksiyonları hazırla
  const functions = [];
  if (activeFeatures.functionCalling) {
    if (activeFeatures.webSearch) {
      functions.push(GPT_FUNCTIONS.webSearch);
    }
    if (activeFeatures.fileAnalysis) {
      functions.push(GPT_FUNCTIONS.fileAnalysis);
    }
    if (activeFeatures.codeInterpreter) {
      functions.push(GPT_FUNCTIONS.codeInterpreter);
    }
    if (activeFeatures.vision) {
      functions.push(GPT_FUNCTIONS.visionAnalysis);
    }
    if (activeFeatures.memory) {
      functions.push(GPT_FUNCTIONS.memoryOperations);
    }
  }

  // Gelişmiş sistem promptu
  const systemPrompt = createAdvancedSystemPrompt(agent, activeFeatures);

  // GPT isteği oluştur
  const gptRequest = createAdvancedGPTRequest(
    [
      { role: 'system', content: masterPromptValidator.createSecurePrompt(systemPrompt) },
      ...messages,
    ],
    { ...params, functions }
  );

  // OpenAI API çağrısı
  const completion = await openai.chat.completions.create(gptRequest);

  const response = completion.choices[0]?.message?.content || 'Üzgünüm, bir cevap oluşturamadım.';

  return NextResponse.json({
    message: response,
    agent: agent,
    features: activeFeatures,
    isDemo: false,
  });
}

// Gelişmiş sistem promptu oluştur
function createAdvancedSystemPrompt(agent: any, features: any): string {
  let prompt = agent.systemPrompt;

  prompt += '\n\n## 🚀 Gelişmiş Özellikler\n';

  if (features.functionCalling) {
    prompt += '- Fonksiyon çağırma yeteneğin var\n';
  }
  if (features.webSearch) {
    prompt += '- Web arama yapabilirsin\n';
  }
  if (features.fileAnalysis) {
    prompt += '- Dosya analizi yapabilirsin\n';
  }
  if (features.codeInterpreter) {
    prompt += '- Kod yorumlama ve çalıştırma yeteneğin var\n';
  }
  if (features.vision) {
    prompt += '- Görü analizi yapabilirsin\n';
  }
  if (features.memory) {
    prompt += '- Uzun süreli hafıza kullanabilirsin\n';
  }

  return prompt;
}

// Mod açıklamaları
function getModeDescription(mode: MultiAgentMode): string {
  const descriptions = {
    race: 'Yarış Modu - En hızlı cevap kazanır',
    consensus: 'Fikir Birliği Modu - En kaliteli cevap kazanır',
    debate: 'Tartışma Modu - En detaylı cevap kazanır',
    collaborative: 'İşbirliği Modu - Ajanlar birlikte çalışır',
    sequential: 'Sıralı Mod - Ajanlar sırayla çalışır',
    parallel: 'Paralel Mod - Ajanlar aynı anda çalışır',
  };
  return descriptions[mode] || 'Bilinmeyen Mod';
}

// Özellik açıklamaları
function getFeatureDescription(feature: string): string {
  const descriptions = {
    functionCalling: 'Fonksiyon Çağırma',
    vision: 'Görü Analizi',
    codeInterpreter: 'Kod Yorumlama',
    webSearch: 'Web Arama',
    fileAnalysis: 'Dosya Analizi',
    memory: 'Uzun Süreli Hafıza',
    streaming: 'Gerçek Zamanlı Yanıt',
  };
  return descriptions[feature] || feature;
}
