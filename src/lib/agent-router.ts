// GPT-5 önerilerine göre ajan yönlendirme sistemi
// Router + Handoff protokolü + MoA desteği

import { AIAgent, getAgentById } from './ai-agents';
import { ROUTER_SCHEMA } from './agent-card-template';

export interface RouterRequest {
  userQuery: string;
  context?: string;
  files?: string[];
  currentAgent?: string;
}

export interface RouterResponse {
  dest: string;
  confidence: number;
  reason: string;
  handoff?: boolean;
  actions?: string[];
}

export interface HandoffProtocol {
  condition: string;
  targetAgent: string;
  reason: string;
  actions: string[];
}

// Anahtar kelime tabanlı yönlendirme
const KEYWORD_ROUTING = {
  // Hukuki konular
  'hukuk|dava|dilekçe|mahkeme|sözleşme|kvkk|ticaret hukuku|avukat|yasal|normlar|anayasa|kanun|mevzuat|hukuki': 'tacettin',
  
  // Ürün/UX
  'ürün|ux|ui|tasarım|kullanıcı|pazar|strateji|wireframe|prototip|kullanıcı deneyimi': 'elif',
  
  // Proje yönetimi
  'proje|ekip|koordinasyon|strateji|risk|planlama|yönetim|liderlik': 'fevzi',
  
  // Teknoloji/Sistem
  'sistem|mimari|teknoloji|altyapı|güvenlik|performans|ölçeklenebilirlik': 'burak',
  
  // Kod/Geliştirme
  'kod|programlama|geliştirme|yazılım|debug|test|api|database': 'ayse',
  
  // Veri/Analiz
  'veri|analiz|istatistik|rapor|metrik|dashboard|insight|ölçüm': 'deniz',
  
  // E-ticaret/Pazarlama
  'e-ticaret|pazarlama|satış|müşteri|kampanya|seo|dijital|reklam': 'zeynep',
  
  // Grafik/Tasarım
  'grafik|görsel|logo|branding|tasarım|illustrasyon|infografik': 'can',
  
  // SEO/Dijital
  'seo|arama|optimizasyon|dijital|içerik|blog|sosyal medya': 'mert',
  
  // Müşteri hizmetleri
  'müşteri|destek|hizmet|şikayet|geri bildirim|iletişim': 'seda',
  
  // Finans/Muhasebe
  'finans|muhasebe|bütçe|mali|hesap|vergi|ekonomi|yatırım': 'ahmet',
  
  // Beslenme/Sağlık
  'beslenme|diyet|sağlık|kilo|metabolizma|vitamin|sporcu beslenmesi': 'nur',
  
  // Eğitim/Öğretim
  'eğitim|öğretim|öğrenme|ders|kurs|akademik|sınav|ödev': 'emre',
  
  // Psikoloji
  'psikoloji|ruh sağlığı|terapi|danışmanlık|stres|kaygı|depresyon': 'deniz',
  
  // Fitness/Spor
  'fitness|spor|antrenman|egzersiz|kas|kardio|güç|dayanıklılık': 'erdem',
  
  // Yaşam koçluğu
  'yaşam|koçluk|kişisel gelişim|motivasyon|hedef|başarı|alışkanlık': 'melis',
  
  // Müzik/Sanat
  'müzik|sanat|enstrüman|şarkı|kompozisyon|kreatif|yaratıcılık': 'pinar'
};

// Güvenlik bayrakları
const SECURITY_FLAGS = [
  'kişisel veri',
  'hasta bilgisi',
  'mali durum',
  'gizli bilgi',
  'şifre',
  'kimlik',
  'tc kimlik'
];

// Router ana fonksiyonu
export function routeToAgent(request: RouterRequest): RouterResponse {
  const { userQuery, context, files, currentAgent } = request;
  
  // Güvenlik kontrolü
  const securityCheck = checkSecurityFlags(userQuery);
  if (securityCheck.flagged) {
    return {
      dest: 'koordinator',
      confidence: 1.0,
      reason: `Güvenlik bayrağı: ${securityCheck.reason}`,
      handoff: true,
      actions: ['security_review', 'escalate_to_human']
    };
  }
  
  // Mevcut ajan kontrolü
  if (currentAgent) {
    const currentAgentObj = getAgentById(currentAgent);
    if (currentAgentObj && isInExpertise(currentAgentObj, userQuery)) {
      return {
        dest: currentAgent,
        confidence: 0.9,
        reason: 'Mevcut ajan uzmanlık alanında',
        handoff: false
      };
    }
  }
  
  // Anahtar kelime tabanlı yönlendirme
  const keywordMatch = findKeywordMatch(userQuery);
  if (keywordMatch) {
    return {
      dest: keywordMatch.agent,
      confidence: keywordMatch.confidence,
      reason: `Anahtar kelime eşleşmesi: ${keywordMatch.keywords.join(', ')}`,
      handoff: false
    };
  }
  
  // Dosya türü kontrolü
  if (files && files.length > 0) {
    const fileTypeMatch = routeByFileType(files);
    if (fileTypeMatch) {
      return {
        dest: fileTypeMatch.agent,
        confidence: fileTypeMatch.confidence,
        reason: `Dosya türü: ${fileTypeMatch.fileType}`,
        handoff: false
      };
    }
  }
  
  // Varsayılan yönlendirme
  return {
    dest: 'koordinator',
    confidence: 0.3,
    reason: 'Belirsiz talep - koordinatör gerekli',
    handoff: true,
    actions: ['clarify_request', 'suggest_agents']
  };
}

// Güvenlik bayrağı kontrolü
function checkSecurityFlags(query: string): { flagged: boolean; reason?: string } {
  const lowerQuery = query.toLowerCase();
  
  for (const flag of SECURITY_FLAGS) {
    if (lowerQuery.includes(flag)) {
      return {
        flagged: true,
        reason: `Hassas bilgi tespit edildi: ${flag}`
      };
    }
  }
  
  return { flagged: false };
}

// Uzmanlık alanı kontrolü
function isInExpertise(agent: AIAgent, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  return agent.expertise.some(expertise => 
    lowerQuery.includes(expertise.toLowerCase())
  );
}

// Anahtar kelime eşleşmesi
function findKeywordMatch(query: string): { agent: string; confidence: number; keywords: string[] } | null {
  const lowerQuery = query.toLowerCase();
  
  for (const [pattern, agent] of Object.entries(KEYWORD_ROUTING)) {
    const keywords = pattern.split('|');
    const matchedKeywords = keywords.filter(keyword => 
      lowerQuery.includes(keyword)
    );
    
    if (matchedKeywords.length > 0) {
      const confidence = Math.min(0.9, 0.5 + (matchedKeywords.length * 0.1));
      return {
        agent,
        confidence,
        keywords: matchedKeywords
      };
    }
  }
  
  return null;
}

// Dosya türü tabanlı yönlendirme
function routeByFileType(files: string[]): { agent: string; confidence: number; fileType: string } | null {
  const fileExtensions = files.map(file => 
    file.split('.').pop()?.toLowerCase()
  );
  
  // Hukuki belgeler
  if (fileExtensions.some(ext => ['pdf', 'doc', 'docx'].includes(ext || ''))) {
    return {
      agent: 'tacettin',
      confidence: 0.8,
      fileType: 'hukuki belge'
    };
  }
  
  // Kod dosyaları
  if (fileExtensions.some(ext => ['js', 'ts', 'py', 'java', 'cpp', 'cs'].includes(ext || ''))) {
    return {
      agent: 'ayse',
      confidence: 0.9,
      fileType: 'kod dosyası'
    };
  }
  
  // Görsel dosyalar
  if (fileExtensions.some(ext => ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || ''))) {
    return {
      agent: 'can',
      confidence: 0.8,
      fileType: 'görsel dosya'
    };
  }
  
  // Veri dosyaları
  if (fileExtensions.some(ext => ['csv', 'xlsx', 'json', 'xml'].includes(ext || ''))) {
    return {
      agent: 'deniz',
      confidence: 0.8,
      fileType: 'veri dosyası'
    };
  }
  
  return null;
}

// Handoff protokolü
export function executeHandoff(
  fromAgent: string,
  toAgent: string,
  reason: string,
  context: string
): HandoffProtocol {
  return {
    condition: `Agent ${fromAgent} → ${toAgent}`,
    targetAgent: toAgent,
    reason,
    actions: [
      `Transfer context: ${context}`,
      `Notify user of handoff`,
      `Maintain conversation continuity`
    ]
  };
}

// MoA (Mixture of Agents) koordinatörü
export function coordinateMoA(
  agents: string[],
  userQuery: string,
  method: 'best_parts' | 'consensus' | 'weighted' = 'best_parts'
): {
  draftAgents: string[];
  judgeAgent: string;
  synthesisMethod: string;
} {
  return {
    draftAgents: agents,
    judgeAgent: 'koordinator',
    synthesisMethod: method
  };
}

// Router test fonksiyonu
export function testRouter(): void {
  const testCases = [
    { query: 'Dava dilekçesi yazabilir misin?', expected: 'tacettin' },
    { query: 'Ürün stratejisi nasıl geliştiririm?', expected: 'elif' },
    { query: 'Proje planlaması yapabilir misin?', expected: 'fevzi' },
    { query: 'Kod yazma konusunda yardım', expected: 'ayse' },
    { query: 'Veri analizi nasıl yapılır?', expected: 'deniz' }
  ];
  
  console.log('🧪 Router Test Sonuçları:');
  testCases.forEach(testCase => {
    const result = routeToAgent({ userQuery: testCase.query });
    const status = result.dest === testCase.expected ? '✅' : '❌';
    console.log(`${status} "${testCase.query}" → ${result.dest} (${result.confidence})`);
  });
}
