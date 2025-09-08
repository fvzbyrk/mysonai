import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAgentById, generateProductResponse, ProductRequest } from '@/lib/ai-agents';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { PLANS } from '@/lib/stripe';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

// Usage checking function
async function checkUsageLimits(userId: string | null) {
  if (!userId) {
    return { canProceed: true }; // Allow demo mode without user
  }

  const supabase = createServerSupabaseClient();

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('plan, usage')
      .eq('id', userId)
      .single();

    if (error || !user) {
      // If Supabase is not configured, allow demo mode
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
        return { canProceed: true };
      }
      return { canProceed: false, reason: 'User not found' };
    }

    const plan = user.plan as keyof typeof PLANS;
    const usage = user.usage;
    const limits = PLANS[plan].limits;

    // Check message limit
    if (limits.messages !== -1 && usage.totalMessages >= limits.messages) {
      return {
        canProceed: false,
        reason: 'Message limit exceeded',
        limitType: 'messages',
        current: usage.totalMessages,
        limit: limits.messages,
      };
    }

    // Check token limit
    if (limits.tokens !== -1 && usage.totalTokens >= limits.tokens) {
      return {
        canProceed: false,
        reason: 'Token limit exceeded',
        limitType: 'tokens',
        current: usage.totalTokens,
        limit: limits.tokens,
      };
    }

    return { canProceed: true, plan, usage, limits };
  } catch (error) {
    console.error('Error checking usage limits:', error);
    return { canProceed: false, reason: 'Database error' };
  }
}

// Usage updating function
async function updateUsage(userId: string | null, tokensUsed: number, messageCount: number = 1) {
  if (!userId) return;

  const supabase = createServerSupabaseClient();

  try {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('usage')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      console.error('Error fetching user for usage update:', fetchError);
      return;
    }

    const currentUsage = user.usage;
    const updatedUsage = {
      ...currentUsage,
      totalMessages: currentUsage.totalMessages + messageCount,
      totalTokens: currentUsage.totalTokens + tokensUsed,
    };

    const { error: updateError } = await supabase
      .from('users')
      .update({ usage: updatedUsage })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating usage:', updateError);
    }
  } catch (error) {
    console.error('Error in updateUsage:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
      // Demo mode - return mock responses
      const { messages, selectedAgent } = await request.json();
      const lastMessage = messages[messages.length - 1];
      
      let mockResponse = '';
      if (selectedAgent) {
        const agent = getAgentById(selectedAgent);
        mockResponse = `Merhaba! Ben ${agent?.name || 'AI Asistan'}, ${agent?.role || 'Yardımcı'}. ${lastMessage?.content || 'Size nasıl yardımcı olabilirim?'} konusunda size yardımcı olabilirim. Bu demo modunda çalışıyoruz, gerçek AI yanıtları için OpenAI API key'i gerekli.`;
      } else {
        mockResponse = `Merhaba! MySonAI demo modunda çalışıyor. Size nasıl yardımcı olabilirim? Gerçek AI yanıtları için OpenAI API key'i gerekli.`;
      }
      
      return NextResponse.json({
        message: mockResponse,
        agent: selectedAgent || 'demo',
        tokensUsed: 0,
      });
    }

    const { messages, userId, selectedAgent, productRequest } = await request.json();

    // Skip usage check for demo (no userId provided)
    if (userId) {
      const usageCheck = await checkUsageLimits(userId);
      if (!usageCheck.canProceed) {
        return NextResponse.json(
          {
            error: usageCheck.reason,
            limitType: usageCheck.limitType,
            current: usageCheck.current,
            limit: usageCheck.limit,
            upgradeRequired: true,
          },
          { status: 429 }
        );
      }
    }

    let systemPrompt = '';
    let responseContent = '';

    // Handle product creation requests
    if (productRequest) {
      const productReq: ProductRequest = productRequest;
      const recommendedAgents = getRecommendedAgents(productReq.type);

      // Generate multi-agent response
      responseContent = generateProductResponse(productReq, recommendedAgents);

      // Create conversation context
      // const conversation = createAgentConversation(recommendedAgents, productReq.description)

      systemPrompt = `Sen MySonAI'nın koordinatörüsün. Müşteri taleplerini analiz edip uygun AI ajanlarını koordine ediyorsun. 
      
Mevcut ajanlar:
${recommendedAgents
  .map(id => {
    const agent = getAgentById(id);
    return `- ${agent?.name}: ${agent?.role}`;
  })
  .join('\n')}

Müşteri talebi: ${productReq.description}
Ürün türü: ${productReq.type}

Bu talebi karşılamak için ajanlar arası işbirliği yap ve detaylı bir plan sun.`;
    } else if (selectedAgent) {
      // Single agent conversation
      const agent = getAgentById(selectedAgent);
      if (!agent) {
        return NextResponse.json({ error: 'Selected agent not found' }, { status: 400 });
      }

      systemPrompt = agent.systemPrompt;
    } else {
      // Default system prompt
      systemPrompt = `Sen MySonAI'nın ana koordinatörüsün. Kullanıcılara hangi AI ajanıyla konuşmak istediklerini sor ve uygun ajanı yönlendir.

Mevcut ajanlar:
- Fevzi: Takım Lideri & Proje Yöneticisi
- Elif: Ürün Müdürü & UX Uzmanı  
- Burak: Sistem Mimarı & Teknoloji Uzmanı
- Ayşe: Geliştirici & Kod Uzmanı
- Deniz: Veri Analisti & Optimizasyon Uzmanı

Her zaman Türkçe konuş ve kullanıcı dostu ol.`;
    }

    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseMessage =
      openaiResponse.choices[0]?.message?.content || 'Üzgünüm, bir hata oluştu.';

    // If this was a product request, combine AI response with generated plan
    if (productRequest) {
      const finalResponse = `${responseMessage}\n\n${responseContent}`;

      // Update usage
      await updateUsage(userId, openaiResponse.usage?.total_tokens || 0);

      return NextResponse.json({
        message: finalResponse,
        agent: 'team',
        tokensUsed: openaiResponse.usage?.total_tokens || 0,
      });
    }

    // Update usage (only if userId provided)
    if (userId) {
      await updateUsage(userId, openaiResponse.usage?.total_tokens || 0);
    }

    return NextResponse.json({
      message: responseMessage,
      agent: selectedAgent || 'coordinator',
      tokensUsed: openaiResponse.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

function getRecommendedAgents(productType: string): string[] {
  const agentMap: { [key: string]: string[] } = {
    website: ['elif', 'burak', 'ayse', 'deniz'],
    app: ['elif', 'burak', 'ayse', 'deniz'],
    content: ['elif', 'deniz'],
    strategy: ['fevzi', 'elif', 'deniz'],
    analysis: ['deniz', 'burak', 'ayse'],
  };

  return agentMap[productType] || ['fevzi', 'elif', 'burak', 'ayse', 'deniz'];
}
