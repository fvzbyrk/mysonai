import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAgentById } from '@/lib/ai-agents';
import { 
  findSuitableTeam, 
  getTeamAgents, 
  getTeamById, 
  getCollaborationDescription,
  type CollaborationType 
} from '@/lib/agent-collaboration';
import { masterPromptValidator, promptMonitor } from '@/lib/master-prompt-system';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

// Çoklu ajan işbirliği için mesaj oluştur
function createCollaborativePrompt(
  teamAgents: any[], 
  userQuery: string, 
  collaborationType: CollaborationType,
  teamName: string
): string {
  const agentPrompts = teamAgents.map(agent => 
    `## ${agent.name} (${agent.role})
${agent.systemPrompt}

---`
  ).join('\n\n');

  const collaborationInstructions = getCollaborationInstructions(collaborationType, teamName);

  return `# ${teamName} - Çoklu Ajan İşbirliği

## 🎯 Görev
Kullanıcının sorusuna ${teamName} olarak birlikte cevap verin.

## 👥 Takım Üyeleri
${agentPrompts}

## 🤝 İşbirliği Kuralları
${collaborationInstructions}

## 📝 Kullanıcı Sorusu
"${userQuery}"

## 💬 Cevap Formatı
${getResponseFormat(collaborationType)}

## 🔒 Güvenlik
- Her ajan sadece kendi uzmanlık alanında katkı sağlamalı
- Diğer ajanların uzmanlık alanına müdahale etmemeli
- Birlikte kapsamlı ve tutarlı bir cevap oluşturmalı
- Her zaman Türkçe konuşmalı`;
}

// İşbirliği tipine göre talimatlar
function getCollaborationInstructions(type: CollaborationType, teamName: string): string {
  const instructions = {
    sequential: `
- Ajanlar sırayla çalışır
- Her ajan kendi uzmanlık alanında katkı sağlar
- Önceki ajanın katkısını dikkate alır
- Son ajan tüm katkıları birleştirir`,

    parallel: `
- Ajanlar aynı anda çalışır
- Her ajan farklı açıdan yaklaşır
- Farklı perspektifler sunar
- Sonunda tüm perspektifler birleştirilir`,

    consultative: `
- Ana ajan (ilk ajan) ana cevabı verir
- Diğer ajanlar danışman olarak katkı sağlar
- Ana ajan diğer ajanların önerilerini dikkate alır
- Kapsamlı ve dengeli bir cevap oluşturur`,

    integrated: `
- Ajanlar birlikte tek cevap oluşturur
- Her ajanın uzmanlığı entegre edilir
- Tutarlı ve kapsamlı bir yaklaşım
- Tek bir ses olarak konuşur`
  };

  return instructions[type];
}

// Cevap formatı
function getResponseFormat(type: CollaborationType): string {
  const formats = {
    sequential: `
**${type === 'sequential' ? 'Sıralı İşbirliği' : 'Takım Cevabı'}**

[Her ajanın katkısı sırayla sunulur]

**Sonuç:** [Tüm katkıların birleştirilmiş hali]`,

    parallel: `
**Paralel İşbirliği**

[Her ajanın farklı perspektifi]

**Sentez:** [Tüm perspektiflerin birleştirilmiş hali]`,

    consultative: `
**Ana Cevap:** [Ana ajanın cevabı]

**Uzman Önerileri:** [Diğer ajanların danışmanlık katkıları]

**Sonuç:** [Tüm önerilerin entegre edilmiş hali]`,

    integrated: `
**${type === 'integrated' ? 'Entegre Takım Cevabı' : 'Kapsamlı Çözüm'}**

[Her ajanın uzmanlığının entegre edildiği tek cevap]`
  };

  return formats[type];
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userQuery, teamId } = await request.json();
    
    // Takım bilgilerini al
    const team = getTeamById(teamId);
    if (!team) {
      return NextResponse.json(
        { error: 'Takım bulunamadı' },
        { status: 404 }
      );
    }

    // Takım ajanlarını al
    const teamAgents = getTeamAgents(teamId);
    if (teamAgents.length === 0) {
      return NextResponse.json(
        { error: 'Takım ajanları bulunamadı' },
        { status: 404 }
      );
    }

    // Master Prompt Validation
    const validationResult = masterPromptValidator.validatePrompt(
      teamId,
      teamAgents.map(agent => agent.systemPrompt).join('\n\n')
    );

    if (validationResult.riskLevel === 'high') {
      return NextResponse.json(
        { error: 'Güvenlik riski tespit edildi', violations: validationResult.violations },
        { status: 400 }
      );
    }

    // Prompt monitoring
    promptMonitor.logPromptUsage(teamId, userQuery, validationResult);

    // Demo mode kontrolü
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
      // Demo mode - mock response
      const mockResponse = `🎯 **${team.name}** olarak size yardımcı oluyoruz!

**Takım Üyeleri:**
${teamAgents.map(agent => `• ${agent.icon} ${agent.name} - ${agent.role}`).join('\n')}

**İşbirliği Tipi:** ${getCollaborationDescription(team.collaborationType)}

**Sizin Sorgunuz:** "${userQuery}"

**Takım Cevabı:** Bu konuda ${teamAgents.map(agent => agent.name).join(' ve ')} birlikte çalışarak size kapsamlı bir çözüm sunabiliriz. Her birimiz kendi uzmanlık alanımızdan katkı sağlayarak en iyi sonucu elde edeceğiz.

**Örnek Yaklaşım:** ${team.example}

*Not: Bu demo modudur. Gerçek API key ile daha detaylı ve kişiselleştirilmiş cevaplar alabilirsiniz.*`;

      return NextResponse.json({
        message: mockResponse,
        team: team,
        agents: teamAgents,
        collaborationType: team.collaborationType,
        isDemo: true
      });
    }

    // Gerçek OpenAI API kullanımı
    const collaborativePrompt = createCollaborativePrompt(
      teamAgents,
      userQuery,
      team.collaborationType,
      team.name
    );

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: masterPromptValidator.createSecurePrompt(collaborativePrompt)
        },
        {
          role: 'user',
          content: userQuery
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'Üzgünüm, bir cevap oluşturamadım.';

    return NextResponse.json({
      message: response,
      team: team,
      agents: teamAgents,
      collaborationType: team.collaborationType,
      isDemo: false
    });

  } catch (error) {
    console.error('Team collaboration error:', error);
    return NextResponse.json(
      { error: 'Takım işbirliği sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

// GET endpoint - mevcut takımları listele
export async function GET() {
  try {
    const { getAllTeams } = await import('@/lib/agent-collaboration');
    const teams = getAllTeams();
    
    return NextResponse.json({
      teams: teams,
      total: teams.length
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Takımlar alınırken hata oluştu' },
      { status: 500 }
    );
  }
}
