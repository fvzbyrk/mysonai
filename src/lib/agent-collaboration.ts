import { AIAgent, getAgentById } from './ai-agents';

// Ajan işbirliği tipleri
export type CollaborationType =
  | 'sequential' // Sıralı: Bir ajan bitirince diğeri başlar
  | 'parallel' // Paralel: İki ajan aynı anda çalışır
  | 'consultative' // Danışmanlık: Ana ajan + uzman danışman
  | 'integrated'; // Entegre: İki ajan birlikte tek cevap verir

// Ajan takımı konfigürasyonu
export interface AgentTeam {
  id: string;
  name: string;
  description: string;
  icon: string;
  agents: string[]; // Ajan ID'leri
  collaborationType: CollaborationType;
  triggerKeywords: string[]; // Bu takımı tetikleyen kelimeler
  useCase: string; // Ne zaman kullanılır
  example: string; // Örnek kullanım
}

// Önceden tanımlanmış ajan takımları
export const AGENT_TEAMS: AgentTeam[] = [
  {
    id: 'health-fitness-team',
    name: 'Sağlık & Fitness Takımı',
    description: 'Diyetisyen + Spor Koçu kombinasyonu',
    icon: '💪',
    agents: ['nur', 'erdem'], // Diyetisyen + Spor Koçu
    collaborationType: 'integrated',
    triggerKeywords: [
      'diyet',
      'beslenme',
      'spor',
      'fitness',
      'egzersiz',
      'kilo',
      'zayıflama',
      'kas',
      'antrenman',
      'beslenme programı',
      'spor programı',
      'sağlıklı yaşam',
      'vücut geliştirme',
      'kardiyo',
      'güç antrenmanı',
      'beslenme planı',
    ],
    useCase: 'Kullanıcı hem beslenme hem de spor konusunda kapsamlı bir program istediğinde',
    example: 'Kilo vermek için hem beslenme hem de spor programı istiyorum',
  },
  {
    id: 'legal-finance-team',
    name: 'Hukuk & Finans Takımı',
    description: 'Hukuki Danışman + Finansal Analist kombinasyonu',
    icon: '⚖️💰',
    agents: ['tacettin', 'ahmet'], // Hukuki + Finansal
    collaborationType: 'consultative',
    triggerKeywords: [
      'şirket kurma',
      'iş kurma',
      'yatırım',
      'hukuki',
      'finansal',
      'bütçe',
      'sözleşme',
      'vergi',
      'muhasebe',
      'hukuki danışmanlık',
      'finansal planlama',
      'iş planı',
      'yatırım analizi',
      'hukuki risk',
      'finansal risk',
    ],
    useCase:
      'İş kurma, yatırım veya finansal planlama konularında hem hukuki hem finansal danışmanlık gerektiğinde',
    example: 'Şirket kurmak istiyorum, hem hukuki hem finansal danışmanlık alabilir miyim?',
  },
  {
    id: 'education-psychology-team',
    name: 'Eğitim & Psikoloji Takımı',
    description: 'Eğitim Koçu + Psikolog kombinasyonu',
    icon: '🎓🧠',
    agents: ['emre', 'deniz'], // Eğitim Koçu + Psikolog
    collaborationType: 'integrated',
    triggerKeywords: [
      'öğrenme',
      'eğitim',
      'psikoloji',
      'motivasyon',
      'konsantrasyon',
      'stres',
      'sınav',
      'ders',
      'öğrenci',
      'başarı',
      'performans',
      'öğrenme güçlüğü',
      'dikkat',
      'hafıza',
      'öğrenme stratejisi',
      'psikolojik destek',
    ],
    useCase: 'Öğrenme sürecinde hem eğitim hem de psikolojik destek gerektiğinde',
    example: 'Sınav stresi yaşıyorum ve öğrenme stratejileri istiyorum',
  },
  {
    id: 'business-strategy-team',
    name: 'İş Stratejisi Takımı',
    description: 'Proje Yöneticisi + Ürün Müdürü kombinasyonu',
    icon: '📊🎯',
    agents: ['fevzi', 'elif'], // Proje Yöneticisi + Ürün Müdürü
    collaborationType: 'sequential',
    triggerKeywords: [
      'proje',
      'ürün',
      'strateji',
      'planlama',
      'geliştirme',
      'pazar',
      'ürün stratejisi',
      'proje yönetimi',
      'iş planı',
      'pazar analizi',
      'ürün geliştirme',
      'proje planlaması',
      'stratejik planlama',
    ],
    useCase: 'Ürün geliştirme ve proje yönetimi konularında kapsamlı strateji gerektiğinde',
    example: 'Yeni bir ürün geliştirmek ve projesini yönetmek istiyorum',
  },
  {
    id: 'tech-development-team',
    name: 'Teknoloji Geliştirme Takımı',
    description: 'Sistem Mimarı + Geliştirici kombinasyonu',
    icon: '💻🔧',
    agents: ['burak', 'ayse'], // Sistem Mimarı + Geliştirici
    collaborationType: 'consultative',
    triggerKeywords: [
      'yazılım',
      'geliştirme',
      'mimari',
      'kod',
      'programlama',
      'sistem',
      'teknoloji',
      'altyapı',
      'güvenlik',
      'api',
      'frontend',
      'backend',
      'yazılım mimarisi',
      'sistem tasarımı',
      'kod geliştirme',
    ],
    useCase: 'Yazılım projesi için hem mimari tasarım hem de geliştirme danışmanlığı gerektiğinde',
    example: 'Yazılım projesi için mimari tasarım ve geliştirme danışmanlığı istiyorum',
  },
  {
    id: 'marketing-seo-team',
    name: 'Pazarlama & SEO Takımı',
    description: 'E-ticaret Stratejisti + SEO Uzmanı kombinasyonu',
    icon: '📈🔍',
    agents: ['zeynep', 'mert'], // E-ticaret + SEO
    collaborationType: 'integrated',
    triggerKeywords: [
      'pazarlama',
      'seo',
      'e-ticaret',
      'dijital',
      'satış',
      'arama',
      'online',
      'pazarlama stratejisi',
      'seo stratejisi',
      'dijital pazarlama',
      'e-ticaret stratejisi',
      'arama motoru',
      'pazarlama kampanyası',
    ],
    useCase: 'Online pazarlama ve SEO konularında kapsamlı strateji gerektiğinde',
    example: 'E-ticaret sitesi için pazarlama ve SEO stratejisi istiyorum',
  },
  {
    id: 'creative-design-team',
    name: 'Kreatif & Tasarım Takımı',
    description: 'Grafik Tasarımcı + Müzik Sanat Öğretmeni kombinasyonu',
    icon: '🎨🎵',
    agents: ['can', 'pinar'], // Grafik Tasarımcı + Müzik Sanat
    collaborationType: 'parallel',
    triggerKeywords: [
      'tasarım',
      'grafik',
      'müzik',
      'sanat',
      'kreatif',
      'görsel',
      'logo',
      'marka',
      'sanat',
      'müzik',
      'kreatif proje',
      'görsel tasarım',
      'sanat projesi',
      'müzik projesi',
      'kreatif strateji',
    ],
    useCase: 'Kreatif projeler için hem görsel hem de müzik/sanat danışmanlığı gerektiğinde',
    example: 'Kreatif proje için hem görsel tasarım hem de müzik danışmanlığı istiyorum',
  },
  {
    id: 'wellness-life-team',
    name: 'Yaşam & Wellness Takımı',
    description: 'Yaşam Koçu + Psikolog kombinasyonu',
    icon: '🌱💚',
    agents: ['melis', 'deniz'], // Yaşam Koçu + Psikolog
    collaborationType: 'integrated',
    triggerKeywords: [
      'yaşam',
      'wellness',
      'psikoloji',
      'motivasyon',
      'kişisel gelişim',
      'yaşam koçluğu',
      'psikolojik destek',
      'kişisel dönüşüm',
      'wellness',
      'yaşam kalitesi',
      'psikolojik sağlık',
      'kişisel gelişim planı',
    ],
    useCase:
      'Kişisel gelişim ve yaşam kalitesi konularında hem koçluk hem psikolojik destek gerektiğinde',
    example: 'Yaşam kalitemi artırmak için hem koçluk hem psikolojik destek istiyorum',
  },
];

// Kullanıcı sorgusuna göre uygun takımı bul
export function findSuitableTeam(userQuery: string): AgentTeam | null {
  const query = userQuery.toLowerCase();

  // Her takım için skor hesapla
  const teamScores = AGENT_TEAMS.map(team => {
    const score = team.triggerKeywords.reduce((total, keyword) => {
      if (query.includes(keyword.toLowerCase())) {
        return total + 1;
      }
      return total;
    }, 0);

    return { team, score };
  });

  // En yüksek skorlu takımı bul
  const bestMatch = teamScores.reduce(
    (best, current) => {
      return current.score > best.score ? current : best;
    },
    { team: null, score: 0 }
  );

  // Minimum 1 keyword eşleşmesi gerekli
  return bestMatch.score > 0 ? bestMatch.team : null;
}

// Takım üyelerini getir
export function getTeamAgents(teamId: string): AIAgent[] {
  const team = AGENT_TEAMS.find(t => t.id === teamId);
  if (!team) {
    return [];
  }

  return team.agents.map(agentId => getAgentById(agentId)).filter(Boolean) as AIAgent[];
}

// Takım bilgilerini getir
export function getTeamById(teamId: string): AgentTeam | null {
  return AGENT_TEAMS.find(team => team.id === teamId) || null;
}

// Tüm takımları getir
export function getAllTeams(): AgentTeam[] {
  return AGENT_TEAMS;
}

// İşbirliği tipine göre açıklama
export function getCollaborationDescription(type: CollaborationType): string {
  const descriptions = {
    sequential:
      'Sıralı İşbirliği: Ajanlar sırayla çalışır, her biri kendi uzmanlık alanında katkı sağlar',
    parallel: 'Paralel İşbirliği: Ajanlar aynı anda çalışır, farklı açılardan yaklaşır',
    consultative:
      'Danışmanlık İşbirliği: Ana ajan çalışır, diğer ajanlar danışman olarak katkı sağlar',
    integrated: 'Entegre İşbirliği: Ajanlar birlikte tek, kapsamlı cevap oluşturur',
  };

  return descriptions[type];
}
