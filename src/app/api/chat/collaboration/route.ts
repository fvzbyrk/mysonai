import { NextRequest, NextResponse } from 'next/server';
import { findSuitableTeam, getTeamAgents, getTeamById } from '@/lib/agent-collaboration';
import { getAgentById } from '@/lib/ai-agents';

export async function POST(request: NextRequest) {
  try {
    const { userQuery, currentAgentId, collaborationType } = await request.json();

    if (!userQuery) {
      return NextResponse.json({ error: 'Kullanıcı sorgusu gerekli' }, { status: 400 });
    }

    // Uygun takımı bul
    const suitableTeam = findSuitableTeam(userQuery);
    
    if (!suitableTeam) {
      return NextResponse.json({ 
        error: 'Bu sorgu için uygun ajan takımı bulunamadı',
        suggestion: 'Tek ajan ile devam edebilirsiniz'
      }, { status: 404 });
    }

    // Takım üyelerini getir
    const teamAgents = getTeamAgents(suitableTeam.id);
    
    if (teamAgents.length === 0) {
      return NextResponse.json({ 
        error: 'Takım üyeleri bulunamadı' 
      }, { status: 404 });
    }

    // İşbirliği tipine göre yanıt oluştur
    let collaborationResponse = '';
    let agentResponses: Array<{ agentId: string; name: string; response: string }> = [];

    switch (suitableTeam.collaborationType) {
      case 'sequential':
        collaborationResponse = await handleSequentialCollaboration(teamAgents, userQuery);
        break;
      case 'parallel':
        collaborationResponse = await handleParallelCollaboration(teamAgents, userQuery);
        break;
      case 'consultative':
        collaborationResponse = await handleConsultativeCollaboration(teamAgents, userQuery);
        break;
      case 'integrated':
        collaborationResponse = await handleIntegratedCollaboration(teamAgents, userQuery);
        break;
      default:
        collaborationResponse = await handleIntegratedCollaboration(teamAgents, userQuery);
    }

    return NextResponse.json({
      success: true,
      team: suitableTeam,
      collaborationType: suitableTeam.collaborationType,
      response: collaborationResponse,
      agents: teamAgents.map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        icon: agent.icon
      })),
      agentResponses
    });

  } catch (error) {
    console.error('Collaboration API error:', error);
    return NextResponse.json({ 
      error: 'Ajan işbirliği sırasında hata oluştu' 
    }, { status: 500 });
  }
}

// Sıralı işbirliği: Ajanlar sırayla çalışır
async function handleSequentialCollaboration(agents: any[], userQuery: string): Promise<string> {
  let response = `**${agents[0].name}** (${agents[0].role}) ile başlayalım:\n\n`;
  
  // İlk ajanın yanıtı
  response += `${agents[0].name}: "${userQuery}" konusunda size yardımcı olabilirim. `;
  response += `Bu konuda ${agents[0].expertise.join(', ')} alanlarında uzmanım.\n\n`;
  
  if (agents.length > 1) {
    response += `**${agents[1].name}** (${agents[1].role}) devam ediyor:\n\n`;
    response += `${agents[1].name}: ${agents[0].name}'in önerilerini destekliyorum. `;
    response += `Ben de ${agents[1].expertise.join(', ')} konularında katkı sağlayabilirim.\n\n`;
  }
  
  response += `**Birlikte Çalışma:** Her iki uzmanımız da bu konuda size kapsamlı destek sağlayacak. `;
  response += `Hangi alanı daha detaylı incelemek istersiniz?`;
  
  return response;
}

// Paralel işbirliği: Ajanlar aynı anda çalışır
async function handleParallelCollaboration(agents: any[], userQuery: string): Promise<string> {
  let response = `**Paralel Uzman Görüşü** - ${agents.map(a => a.name).join(' & ')}\n\n`;
  
  agents.forEach((agent, index) => {
    response += `**${agent.name}** (${agent.role}):\n`;
    response += `"${userQuery}" konusunda ${agent.expertise.join(', ')} perspektifinden yaklaşıyorum. `;
    response += `Bu alanda ${agent.personality}\n\n`;
  });
  
  response += `**Ortak Öneri:** Her iki uzmanımız da farklı açılardan yaklaşarak `;
  response += `size en kapsamlı çözümü sunacak. Hangi perspektifi daha detaylı incelemek istersiniz?`;
  
  return response;
}

// Danışmanlık işbirliği: Ana ajan + uzman danışman
async function handleConsultativeCollaboration(agents: any[], userQuery: string): Promise<string> {
  const [primaryAgent, consultantAgent] = agents;
  
  let response = `**Ana Uzman: ${primaryAgent.name}** (${primaryAgent.role})\n`;
  response += `**Danışman: ${consultantAgent.name}** (${consultantAgent.role})\n\n`;
  
  response += `${primaryAgent.name}: "${userQuery}" konusunda size ana destek sağlayacağım. `;
  response += `${primaryAgent.expertise.join(', ')} alanlarında uzmanım.\n\n`;
  
  response += `${consultantAgent.name}: ${primaryAgent.name}'e danışman olarak katkı sağlayacağım. `;
  response += `${consultantAgent.expertise.join(', ')} konularında ek perspektif sunabilirim.\n\n`;
  
  response += `**İşbirliği:** ${primaryAgent.name} ana çözümü sunarken, `;
  response += `${consultantAgent.name} uzman danışmanlık sağlayacak. `;
  response += `Bu yaklaşım size en kapsamlı desteği verecek.`;
  
  return response;
}

// Entegre işbirliği: Ajanlar birlikte tek cevap verir
async function handleIntegratedCollaboration(agents: any[], userQuery: string): Promise<string> {
  let response = `**Entegre Uzman Takımı** - ${agents.map(a => a.name).join(' & ')}\n\n`;
  
  response += `Merhaba! Biz ${agents.map(a => a.name).join(' ve ')}, `;
  response += `"${userQuery}" konusunda size birlikte yardımcı olacağız.\n\n`;
  
  response += `**Uzmanlık Alanlarımız:**\n`;
  agents.forEach(agent => {
    response += `• ${agent.name} (${agent.role}): ${agent.expertise.join(', ')}\n`;
  });
  
  response += `\n**Birlikte Çalışma Yaklaşımımız:**\n`;
  response += `Her birimiz kendi uzmanlık alanından katkı sağlayarak, `;
  response += `size en kapsamlı ve entegre çözümü sunacağız. `;
  response += `Bu konuda hangi alanı daha detaylı incelemek istersiniz?`;
  
  return response;
}
