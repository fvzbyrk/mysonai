// GPT-5 önerilerine göre gelişmiş işbirliği sistemi
// Router + MoA + Handoff protokolü + Durum makinesi

import { AIAgent, getAgentById } from './ai-agents';
import { routeToAgent, RouterRequest, RouterResponse } from './agent-router';

export interface CollaborationState {
  id: string;
  status: 'intake' | 'triage' | 'solve' | 'review' | 'deliver';
  userQuery: string;
  assignedAgents: string[];
  responses: AgentResponse[];
  finalResponse?: string;
  handoffs: HandoffRecord[];
  startTime: Date;
  endTime?: Date;
}

export interface AgentResponse {
  agentId: string;
  response: string;
  confidence: number;
  timestamp: Date;
  quality: number;
  metadata?: Record<string, any>;
}

export interface HandoffRecord {
  fromAgent: string;
  toAgent: string;
  reason: string;
  timestamp: Date;
  context: string;
}

export interface MoAConfig {
  draftAgents: string[];
  judgeAgent: string;
  synthesisMethod: 'best_parts' | 'consensus' | 'weighted';
  maxIterations: number;
}

// Durum makinesi sınıfı
export class CollaborationStateMachine {
  private state: CollaborationState;
  private router: typeof routeToAgent;

  constructor(userQuery: string) {
    this.state = {
      id: `collab_${Date.now()}`,
      status: 'intake',
      userQuery,
      assignedAgents: [],
      responses: [],
      handoffs: [],
      startTime: new Date(),
    };
    this.router = routeToAgent;
  }

  // Ana işlem döngüsü
  async process(): Promise<CollaborationState> {
    try {
      // 1. Intake - Giriş analizi
      await this.intake();

      // 2. Triage - Yönlendirme
      await this.triage();

      // 3. Solve - Çözüm üretimi
      await this.solve();

      // 4. Review - İnceleme
      await this.review();

      // 5. Deliver - Teslim
      await this.deliver();

      this.state.endTime = new Date();
      return this.state;
    } catch (error) {
      console.error('Collaboration error:', error);
      this.state.status = 'deliver';
      this.state.finalResponse = 'Üzgünüm, işlem sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      return this.state;
    }
  }

  // 1. Intake - Giriş analizi
  private async intake(): Promise<void> {
    console.log('📥 Intake: Giriş analizi başlıyor...');

    // Güvenlik kontrolü
    const securityCheck = this.checkSecurity();
    if (securityCheck.flagged) {
      this.state.status = 'deliver';
      this.state.finalResponse = `Güvenlik nedeniyle işlem durduruldu: ${securityCheck.reason}`;
      return;
    }

    // Karmaşıklık analizi
    const complexity = this.analyzeComplexity();
    console.log(`📊 Karmaşıklık seviyesi: ${complexity}`);

    this.state.status = 'triage';
  }

  // 2. Triage - Yönlendirme
  private async triage(): Promise<void> {
    console.log('🔀 Triage: Yönlendirme başlıyor...');

    const routerRequest: RouterRequest = {
      userQuery: this.state.userQuery,
    };

    const routerResponse = this.router(routerRequest);
    console.log(`🎯 Router yanıtı: ${routerResponse.dest} (${routerResponse.confidence})`);

    if (routerResponse.handoff) {
      // Handoff gerekli
      this.recordHandoff('system', routerResponse.dest, routerResponse.reason);
    }

    // Ajan ataması
    if (routerResponse.confidence > 0.7) {
      // Yüksek güven - tek ajan
      this.state.assignedAgents = [routerResponse.dest];
    } else if (routerResponse.confidence > 0.4) {
      // Orta güven - MoA
      this.state.assignedAgents = this.selectMoAAgents(routerResponse.dest);
    } else {
      // Düşük güven - koordinatör
      this.state.assignedAgents = ['koordinator'];
    }

    this.state.status = 'solve';
  }

  // 3. Solve - Çözüm üretimi
  private async solve(): Promise<void> {
    console.log('🔧 Solve: Çözüm üretimi başlıyor...');

    if (this.state.assignedAgents.length === 1) {
      // Tek ajan
      await this.singleAgentSolve();
    } else {
      // Çoklu ajan (MoA)
      await this.multiAgentSolve();
    }

    this.state.status = 'review';
  }

  // 4. Review - İnceleme
  private async review(): Promise<void> {
    console.log('🔍 Review: İnceleme başlıyor...');

    if (this.state.responses.length === 0) {
      this.state.finalResponse = 'Üzgünüm, uygun bir yanıt üretilemedi.';
      this.state.status = 'deliver';
      return;
    }

    // Kalite kontrolü
    const qualityCheck = this.checkQuality();
    if (!qualityCheck.passed) {
      console.log(`⚠️ Kalite kontrolü başarısız: ${qualityCheck.reason}`);
      // Yeniden deneme veya alternatif yöntem
    }

    this.state.status = 'deliver';
  }

  // 5. Deliver - Teslim
  private async deliver(): Promise<void> {
    console.log('📤 Deliver: Teslim başlıyor...');

    if (!this.state.finalResponse) {
      this.state.finalResponse = this.synthesizeResponse();
    }

    console.log('✅ İşbirliği tamamlandı');
  }

  // Tek ajan çözümü
  private async singleAgentSolve(): Promise<void> {
    const agentId = this.state.assignedAgents[0];
    const agent = getAgentById(agentId);

    if (!agent) {
      console.error(`Ajan bulunamadı: ${agentId}`);
      return;
    }

    console.log(`👤 Tek ajan çözümü: ${agent.name}`);

    // Mock yanıt (gerçek implementasyonda OpenAI API çağrısı)
    const response: AgentResponse = {
      agentId,
      response: `${agent.name} olarak size yardımcı olmaya çalışıyorum. "${this.state.userQuery}" konusunda uzmanlığımı kullanarak yanıt vereceğim.`,
      confidence: 0.9,
      timestamp: new Date(),
      quality: 8,
    };

    this.state.responses.push(response);
  }

  // Çoklu ajan çözümü (MoA)
  private async multiAgentSolve(): Promise<void> {
    console.log(`👥 Çoklu ajan çözümü: ${this.state.assignedAgents.join(', ')}`);

    // Her ajan için taslak üret
    const draftPromises = this.state.assignedAgents.map(async agentId => {
      const agent = getAgentById(agentId);
      if (!agent) {
        return null;
      }

      const response: AgentResponse = {
        agentId,
        response: `${agent.name} perspektifinden: "${this.state.userQuery}" konusunda önerilerim...`,
        confidence: 0.7,
        timestamp: new Date(),
        quality: 6,
      };

      return response;
    });

    const drafts = await Promise.all(draftPromises);
    this.state.responses.push(...(drafts.filter(Boolean) as AgentResponse[]));

    // Hakem ajan ile sentez
    await this.synthesizeWithJudge();
  }

  // Hakem ajan ile sentez
  private async synthesizeWithJudge(): Promise<void> {
    console.log('⚖️ Hakem ajan ile sentez başlıyor...');

    const judgeResponse: AgentResponse = {
      agentId: 'koordinator',
      response: 'Hakem olarak tüm ajanların önerilerini değerlendirip en iyi çözümü sunuyorum...',
      confidence: 0.8,
      timestamp: new Date(),
      quality: 9,
    };

    this.state.responses.push(judgeResponse);
  }

  // Yanıt sentezi
  private synthesizeResponse(): string {
    if (this.state.responses.length === 1) {
      return this.state.responses[0].response;
    }

    // Çoklu yanıt sentezi
    const responses = this.state.responses.sort((a, b) => b.quality - a.quality).slice(0, 3); // En iyi 3 yanıt

    return `**İşbirliği Sonucu:**\n\n${responses
      .map(r => `**${getAgentById(r.agentId)?.name}:** ${r.response}`)
      .join('\n\n')}`;
  }

  // Güvenlik kontrolü
  private checkSecurity(): { flagged: boolean; reason?: string } {
    const sensitiveKeywords = ['kişisel veri', 'hasta bilgisi', 'mali durum', 'gizli'];
    const lowerQuery = this.state.userQuery.toLowerCase();

    for (const keyword of sensitiveKeywords) {
      if (lowerQuery.includes(keyword)) {
        return { flagged: true, reason: `Hassas bilgi: ${keyword}` };
      }
    }

    return { flagged: false };
  }

  // Karmaşıklık analizi
  private analyzeComplexity(): 'low' | 'medium' | 'high' {
    const query = this.state.userQuery;

    if (query.length < 50) {
      return 'low';
    }
    if (query.length < 200) {
      return 'medium';
    }
    return 'high';
  }

  // MoA ajan seçimi
  private selectMoAAgents(primaryAgent: string): string[] {
    // Basit MoA stratejisi - gerçek implementasyonda daha sofistike olabilir
    const relatedAgents = {
      tacettin: ['elif', 'ahmet'], // Hukuk + Ürün + Finans
      elif: ['fevzi', 'can'], // Ürün + Proje + Tasarım
      fevzi: ['elif', 'burak'], // Proje + Ürün + Sistem
      burak: ['ayse', 'fevzi'], // Sistem + Kod + Proje
      ayse: ['burak', 'deniz'], // Kod + Sistem + Veri
      deniz: ['ayse', 'ahmet'], // Veri + Kod + Finans
    };

    const related = relatedAgents[primaryAgent as keyof typeof relatedAgents] || [];
    return [primaryAgent, ...related.slice(0, 2)];
  }

  // Kalite kontrolü
  private checkQuality(): { passed: boolean; reason?: string } {
    if (this.state.responses.length === 0) {
      return { passed: false, reason: 'Hiç yanıt yok' };
    }

    const avgQuality =
      this.state.responses.reduce((sum, r) => sum + r.quality, 0) / this.state.responses.length;

    if (avgQuality < 5) {
      return { passed: false, reason: `Düşük kalite: ${avgQuality.toFixed(1)}` };
    }

    return { passed: true };
  }

  // Handoff kaydı
  private recordHandoff(fromAgent: string, toAgent: string, reason: string): void {
    const handoff: HandoffRecord = {
      fromAgent,
      toAgent,
      reason,
      timestamp: new Date(),
      context: this.state.userQuery,
    };

    this.state.handoffs.push(handoff);
  }

  // Durum getter
  getState(): CollaborationState {
    return { ...this.state };
  }
}

// Ana işbirliği koordinatörü
export class CollaborationCoordinator {
  private activeCollaborations: Map<string, CollaborationStateMachine> = new Map();

  // Yeni işbirliği başlat
  async startCollaboration(userQuery: string): Promise<CollaborationState> {
    const stateMachine = new CollaborationStateMachine(userQuery);
    const state = await stateMachine.process();

    this.activeCollaborations.set(state.id, stateMachine);

    // 5 dakika sonra temizle
    setTimeout(
      () => {
        this.activeCollaborations.delete(state.id);
      },
      5 * 60 * 1000
    );

    return state;
  }

  // Aktif işbirliği getir
  getCollaboration(id: string): CollaborationState | null {
    const stateMachine = this.activeCollaborations.get(id);
    return stateMachine ? stateMachine.getState() : null;
  }

  // Tüm aktif işbirlikleri
  getActiveCollaborations(): CollaborationState[] {
    return Array.from(this.activeCollaborations.values()).map(sm => sm.getState());
  }
}

// Test fonksiyonu
export function testCollaboration(): void {
  console.log('🧪 İşbirliği Sistemi Test Başlıyor...');

  const coordinator = new CollaborationCoordinator();

  const testQueries = [
    'Dava dilekçesi yazabilir misin?',
    'Ürün stratejisi nasıl geliştiririm?',
    'Proje planlaması yapabilir misin?',
    'Kod yazma konusunda yardım',
    'Veri analizi nasıl yapılır?',
  ];

  testQueries.forEach(async (query, index) => {
    console.log(`\n📝 Test ${index + 1}: "${query}"`);
    const result = await coordinator.startCollaboration(query);
    console.log(`✅ Sonuç: ${result.finalResponse?.substring(0, 100)}...`);
  });
}
