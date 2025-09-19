import { NextRequest, NextResponse } from 'next/server';
import { getTeamAgents } from '@/lib/agent-collaboration';

export async function POST(request: NextRequest) {
  try {
    const { messages, teamId, userQuery } = await request.json();

    if (!teamId) {
      return NextResponse.json({ error: 'Takım ID gerekli' }, { status: 400 });
    }

    const team = getTeamById(teamId);
    if (!team) {
      return NextResponse.json({ error: 'Takım bulunamadı' }, { status: 404 });
    }

    const teamAgents = getTeamAgents(teamId);
    if (teamAgents.length === 0) {
      return NextResponse.json({ error: 'Takım üyeleri bulunamadı' }, { status: 404 });
    }

    // İşbirliği tipine göre yanıt oluştur
    let response = '';
    const agentResponses: Array<{ agentId: string; name: string; response: string }> = [];

    switch (team.collaborationType) {
      case 'sequential':
        response = await handleSequentialCollaboration(teamAgents, userQuery);
        break;
      case 'parallel':
        response = await handleParallelCollaboration(teamAgents, userQuery);
        break;
      case 'consultative':
        response = await handleConsultativeCollaboration(teamAgents, userQuery);
        break;
      case 'integrated':
        response = await handleIntegratedCollaboration(teamAgents, userQuery);
        break;
      default:
        response = await handleIntegratedCollaboration(teamAgents, userQuery);
    }

    return NextResponse.json({
      message: response,
      team: team,
      agents: teamAgents.map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        icon: agent.icon,
      })),
      agentResponses,
      tokensUsed: 0,
    });
  } catch (error) {
    console.error('Team collaboration API error:', error);
    return NextResponse.json(
      {
        error: 'Takım işbirliği sırasında hata oluştu',
      },
      { status: 500 }
    );
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

  response +=
    '**Birlikte Çalışma:** Her iki uzmanımız da bu konuda size kapsamlı destek sağlayacak. ';
  response += 'Hangi alanı daha detaylı incelemek istersiniz?';

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

  response += '**Ortak Öneri:** Her iki uzmanımız da farklı açılardan yaklaşarak ';
  response +=
    'size en kapsamlı çözümü sunacak. Hangi perspektifi daha detaylı incelemek istersiniz?';

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
  response += 'Bu yaklaşım size en kapsamlı desteği verecek.';

  return response;
}

// Entegre işbirliği: Ajanlar birlikte tek cevap verir
async function handleIntegratedCollaboration(agents: any[], userQuery: string): Promise<string> {
  let response = `**Entegre Uzman Takımı** - ${agents.map(a => a.name).join(' & ')}\n\n`;

  response += `Merhaba! Biz ${agents.map(a => a.name).join(' ve ')}, `;
  response += `"${userQuery}" konusunda size birlikte yardımcı olacağız.\n\n`;

  response += '**Uzmanlık Alanlarımız:**\n';
  agents.forEach(agent => {
    response += `• ${agent.name} (${agent.role}): ${agent.expertise.join(', ')}\n`;
  });

  response += '\n**Birlikte Çalışma Yaklaşımımız:**\n';
  response += 'Her birimiz kendi uzmanlık alanından katkı sağlayarak, ';
  response += 'size en kapsamlı ve entegre çözümü sunacağız. ';
  response += 'Bu konuda hangi alanı daha detaylı incelemek istersiniz?';

  return response;
}
