import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAgentById, generateProductResponse, ProductRequest } from '@/lib/ai-agents'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Placeholder functions for usage tracking
async function checkUsageLimits(_userId: string | null) {
  // TODO: Implement actual usage checking
  return { canProceed: true, remainingMessages: 100 }
}

async function updateUsage(_userId: string | null, _tokensUsed: number) {
  // TODO: Implement actual usage updating
  // console.log(`Usage updated: ${_tokensUsed} tokens for user ${_userId}`)
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userId, selectedAgent, productRequest } = await request.json()

    // Usage check
    const usageCheck = await checkUsageLimits(userId)
    if (!usageCheck.canProceed) {
      return NextResponse.json(
        { error: 'Usage limit exceeded. Please upgrade your plan.' },
        { status: 429 }
      )
    }

    let systemPrompt = ''
    let responseContent = ''

    // Handle product creation requests
    if (productRequest) {
      const productReq: ProductRequest = productRequest
      const recommendedAgents = getRecommendedAgents(productReq.type)
      
      // Generate multi-agent response
      responseContent = generateProductResponse(productReq, recommendedAgents)
      
      // Create conversation context
      // const conversation = createAgentConversation(recommendedAgents, productReq.description)
      
      systemPrompt = `Sen MySonAI'nın koordinatörüsün. Müşteri taleplerini analiz edip uygun AI ajanlarını koordine ediyorsun. 
      
Mevcut ajanlar:
${recommendedAgents.map(id => {
  const agent = getAgentById(id)
  return `- ${agent?.name}: ${agent?.role}`
}).join('\n')}

Müşteri talebi: ${productReq.description}
Ürün türü: ${productReq.type}

Bu talebi karşılamak için ajanlar arası işbirliği yap ve detaylı bir plan sun.`
    } else if (selectedAgent) {
      // Single agent conversation
      const agent = getAgentById(selectedAgent)
      if (!agent) {
        return NextResponse.json(
          { error: 'Selected agent not found' },
          { status: 400 }
        )
      }

      systemPrompt = agent.systemPrompt
    } else {
      // Default system prompt
      systemPrompt = `Sen MySonAI'nın ana koordinatörüsün. Kullanıcılara hangi AI ajanıyla konuşmak istediklerini sor ve uygun ajanı yönlendir.

Mevcut ajanlar:
- Fevzi: Takım Lideri & Proje Yöneticisi
- Elif: Ürün Müdürü & UX Uzmanı  
- Burak: Sistem Mimarı & Teknoloji Uzmanı
- Ayşe: Geliştirici & Kod Uzmanı
- Deniz: Veri Analisti & Optimizasyon Uzmanı

Her zaman Türkçe konuş ve kullanıcı dostu ol.`
    }

    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const responseMessage = openaiResponse.choices[0]?.message?.content || 'Üzgünüm, bir hata oluştu.'

    // If this was a product request, combine AI response with generated plan
    if (productRequest) {
      const finalResponse = `${responseMessage}\n\n${responseContent}`
      
      // Update usage
      await updateUsage(userId, openaiResponse.usage?.total_tokens || 0)
      
      return NextResponse.json({
        message: finalResponse,
        agent: 'team',
        tokensUsed: openaiResponse.usage?.total_tokens || 0
      })
    }

    // Update usage
    await updateUsage(userId, openaiResponse.usage?.total_tokens || 0)

    return NextResponse.json({
      message: responseMessage,
      agent: selectedAgent || 'coordinator',
      tokensUsed: openaiResponse.usage?.total_tokens || 0
    })

  } catch (error) {
    // console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getRecommendedAgents(productType: string): string[] {
  const agentMap: { [key: string]: string[] } = {
    'website': ['elif', 'burak', 'ayse', 'deniz'],
    'app': ['elif', 'burak', 'ayse', 'deniz'],
    'content': ['elif', 'deniz'],
    'strategy': ['fevzi', 'elif', 'deniz'],
    'analysis': ['deniz', 'burak', 'ayse']
  }
  
  return agentMap[productType] || ['fevzi', 'elif', 'burak', 'ayse', 'deniz']
}
