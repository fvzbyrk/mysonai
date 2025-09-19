// Content audit utilities
export interface ContentAuditItem {
  id: string;
  title: string;
  url: string;
  status: 'complete' | 'incomplete' | 'missing' | 'needs-update';
  priority: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  issues: string[];
  recommendations: string[];
  lastUpdated?: string;
}

export interface ContentAuditReport {
  totalPages: number;
  completePages: number;
  incompletePages: number;
  missingPages: number;
  needsUpdatePages: number;
  highPriorityIssues: number;
  mediumPriorityIssues: number;
  lowPriorityIssues: number;
  categories: {
    [key: string]: {
      total: number;
      complete: number;
      incomplete: number;
      missing: number;
    };
  };
  recommendations: string[];
}

// Content audit data
export const contentAuditData: ContentAuditItem[] = [
  // Core Pages
  {
    id: 'home',
    title: 'Ana Sayfa',
    url: '/',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description: 'Ana sayfa - hero section, features, testimonials',
    issues: [],
    recommendations: ['Add more testimonials', 'Update hero content', 'Add video demo'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'about',
    title: 'Hakkımızda',
    url: '/about',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description: 'Şirket hakkında bilgiler, ekip, misyon, vizyon',
    issues: [],
    recommendations: ['Add team photos', 'Update company story', 'Add awards section'],
    lastUpdated: '2024-01-10',
  },
  {
    id: 'services',
    title: 'Hizmetler',
    url: '/services',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description: 'AI çözümleri, klasik bilişim, yazılım ihtiyaçları',
    issues: [],
    recommendations: ['Add service pricing', 'Add case studies', 'Add service comparison'],
    lastUpdated: '2024-01-12',
  },
  {
    id: 'solutions',
    title: 'Çözümler',
    url: '/solutions',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description:
      'MySon Video, MySon Firmatch, MySon Avukat, MySon Kids, MySon Education, MySon Music',
    issues: [],
    recommendations: [
      'Add solution demos',
      'Add pricing for each solution',
      'Add integration guides',
    ],
    lastUpdated: '2024-01-14',
  },
  {
    id: 'pricing',
    title: 'Fiyatlandırma',
    url: '/pricing',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description: 'Plan fiyatları, özellikler, karşılaştırma',
    issues: [],
    recommendations: ['Add annual discounts', 'Add enterprise pricing', 'Add free trial info'],
    lastUpdated: '2024-01-13',
  },
  {
    id: 'contact',
    title: 'İletişim',
    url: '/contact',
    status: 'complete',
    priority: 'high',
    category: 'core',
    description: 'İletişim formu, adres, telefon, e-posta',
    issues: [],
    recommendations: ['Add live chat', 'Add office hours', 'Add map integration'],
    lastUpdated: '2024-01-11',
  },

  // Blog System
  {
    id: 'blog',
    title: 'Blog',
    url: '/blog',
    status: 'complete',
    priority: 'high',
    category: 'content',
    description: 'Blog ana sayfası, makale listesi, kategoriler',
    issues: [],
    recommendations: ['Add more blog posts', 'Add newsletter signup', 'Add related posts'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'blog-post',
    title: 'Blog Makalesi',
    url: '/blog/[slug]',
    status: 'complete',
    priority: 'high',
    category: 'content',
    description: 'Blog makale detay sayfası',
    issues: [],
    recommendations: ['Add more blog posts', 'Add social sharing', 'Add comment system'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'blog-category',
    title: 'Blog Kategorisi',
    url: '/blog/kategori/[slug]',
    status: 'complete',
    priority: 'medium',
    category: 'content',
    description: 'Blog kategori sayfası',
    issues: [],
    recommendations: ['Add category descriptions', 'Add category images'],
    lastUpdated: '2024-01-15',
  },

  // User Pages
  {
    id: 'signin',
    title: 'Giriş Yap',
    url: '/signin',
    status: 'complete',
    priority: 'high',
    category: 'user',
    description: 'Kullanıcı giriş sayfası',
    issues: [],
    recommendations: ['Add social login', 'Add forgot password', 'Add remember me'],
    lastUpdated: '2024-01-10',
  },
  {
    id: 'signup',
    title: 'Kayıt Ol',
    url: '/signup',
    status: 'complete',
    priority: 'high',
    category: 'user',
    description: 'Kullanıcı kayıt sayfası',
    issues: [],
    recommendations: ['Add email verification', 'Add terms acceptance', 'Add referral system'],
    lastUpdated: '2024-01-10',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    status: 'complete',
    priority: 'high',
    category: 'user',
    description: 'Kullanıcı dashboard',
    issues: [],
    recommendations: ['Add usage analytics', 'Add quick actions', 'Add recent activity'],
    lastUpdated: '2024-01-12',
  },
  {
    id: 'billing',
    title: 'Faturalandırma',
    url: '/billing',
    status: 'complete',
    priority: 'high',
    category: 'user',
    description: 'Fatura ve ödeme sayfası',
    issues: [],
    recommendations: ['Add payment history', 'Add invoice download', 'Add payment methods'],
    lastUpdated: '2024-01-12',
  },

  // Demo & Tools
  {
    id: 'demo',
    title: 'Demo',
    url: '/demo',
    status: 'complete',
    priority: 'high',
    category: 'demo',
    description: 'AI asistanları demo sayfası',
    issues: [],
    recommendations: ['Add more demo scenarios', 'Add video tutorials', 'Add interactive examples'],
    lastUpdated: '2024-01-14',
  },
  {
    id: 'tools',
    title: 'Araçlar',
    url: '/tools',
    status: 'complete',
    priority: 'medium',
    category: 'demo',
    description: 'AI araçları sayfası',
    issues: [],
    recommendations: ['Add tool descriptions', 'Add usage examples', 'Add tool comparison'],
    lastUpdated: '2024-01-13',
  },

  // Legal Pages
  {
    id: 'privacy',
    title: 'Gizlilik Politikası',
    url: '/privacy',
    status: 'complete',
    priority: 'high',
    category: 'legal',
    description: 'Gizlilik politikası sayfası',
    issues: [],
    recommendations: ['Update GDPR compliance', 'Add cookie policy', 'Add data retention info'],
    lastUpdated: '2024-01-08',
  },
  {
    id: 'terms',
    title: 'Kullanım Şartları',
    url: '/terms',
    status: 'complete',
    priority: 'high',
    category: 'legal',
    description: 'Kullanım şartları sayfası',
    issues: [],
    recommendations: [
      'Update terms for new features',
      'Add dispute resolution',
      'Add liability info',
    ],
    lastUpdated: '2024-01-08',
  },
  {
    id: 'cookies',
    title: 'Çerez Politikası',
    url: '/cookies',
    status: 'complete',
    priority: 'medium',
    category: 'legal',
    description: 'Çerez politikası sayfası',
    issues: [],
    recommendations: ['Add cookie categories', 'Add opt-out options', 'Add third-party cookies'],
    lastUpdated: '2024-01-08',
  },
  {
    id: 'gdpr',
    title: 'GDPR',
    url: '/gdpr',
    status: 'complete',
    priority: 'medium',
    category: 'legal',
    description: 'GDPR uyumluluk sayfası',
    issues: [],
    recommendations: ['Add data processing info', 'Add user rights', 'Add contact for GDPR'],
    lastUpdated: '2024-01-08',
  },

  // Support Pages
  {
    id: 'faq',
    title: 'Sık Sorulan Sorular',
    url: '/faq',
    status: 'complete',
    priority: 'high',
    category: 'support',
    description: 'SSS sayfası',
    issues: [],
    recommendations: ['Add more FAQs', 'Add search functionality', 'Add category filters'],
    lastUpdated: '2024-01-09',
  },
  {
    id: 'docs',
    title: 'Dokümantasyon',
    url: '/docs',
    status: 'incomplete',
    priority: 'high',
    category: 'support',
    description: 'API dokümantasyonu, kullanım kılavuzu',
    issues: ['Missing API documentation', 'Missing integration guides', 'Missing code examples'],
    recommendations: [
      'Add API documentation',
      'Add integration guides',
      'Add code examples',
      'Add SDKs',
    ],
    lastUpdated: '2024-01-05',
  },
  {
    id: 'tutorial',
    title: 'Eğitimler',
    url: '/tutorial',
    status: 'incomplete',
    priority: 'medium',
    category: 'support',
    description: 'Eğitim videoları, rehberler',
    issues: [
      'Missing video tutorials',
      'Missing step-by-step guides',
      'Missing beginner tutorials',
    ],
    recommendations: [
      'Add video tutorials',
      'Add step-by-step guides',
      'Add beginner tutorials',
      'Add advanced tutorials',
    ],
    lastUpdated: '2024-01-05',
  },

  // Company Pages
  {
    id: 'careers',
    title: 'Kariyer',
    url: '/careers',
    status: 'incomplete',
    priority: 'medium',
    category: 'company',
    description: 'İş ilanları, kariyer fırsatları',
    issues: ['Missing job listings', 'Missing company culture', 'Missing benefits info'],
    recommendations: [
      'Add job listings',
      'Add company culture',
      'Add benefits info',
      'Add application process',
    ],
    lastUpdated: '2024-01-05',
  },
  {
    id: 'press',
    title: 'Basın',
    url: '/press',
    status: 'incomplete',
    priority: 'low',
    category: 'company',
    description: 'Basın bültenleri, medya kiti',
    issues: ['Missing press releases', 'Missing media kit', 'Missing press contacts'],
    recommendations: [
      'Add press releases',
      'Add media kit',
      'Add press contacts',
      'Add company logos',
    ],
    lastUpdated: '2024-01-05',
  },
  {
    id: 'references',
    title: 'Referanslar',
    url: '/references',
    status: 'incomplete',
    priority: 'medium',
    category: 'company',
    description: 'Müşteri referansları, başarı hikayeleri',
    issues: ['Missing customer testimonials', 'Missing case studies', 'Missing success stories'],
    recommendations: [
      'Add customer testimonials',
      'Add case studies',
      'Add success stories',
      'Add customer logos',
    ],
    lastUpdated: '2024-01-05',
  },

  // Developer Pages
  {
    id: 'developer',
    title: 'Geliştirici',
    url: '/developer',
    status: 'incomplete',
    priority: 'medium',
    category: 'developer',
    description: 'Geliştirici kaynakları, API, SDK',
    issues: ['Missing API documentation', 'Missing SDKs', 'Missing developer tools'],
    recommendations: [
      'Add API documentation',
      'Add SDKs',
      'Add developer tools',
      'Add code examples',
    ],
    lastUpdated: '2024-01-05',
  },
  {
    id: 'api',
    title: 'API',
    url: '/api',
    status: 'incomplete',
    priority: 'high',
    category: 'developer',
    description: "API dokümantasyonu, endpoint'ler",
    issues: ['Missing API endpoints', 'Missing authentication', 'Missing rate limits'],
    recommendations: [
      'Add API endpoints',
      'Add authentication',
      'Add rate limits',
      'Add API examples',
    ],
    lastUpdated: '2024-01-05',
  },

  // Missing Pages
  {
    id: 'sitemap',
    title: 'Site Haritası',
    url: '/sitemap',
    status: 'missing',
    priority: 'low',
    category: 'utility',
    description: 'Site haritası sayfası',
    issues: ['Page not found'],
    recommendations: ['Create sitemap page', 'Add page categories', 'Add search functionality'],
    lastUpdated: null,
  },
  {
    id: 'search',
    title: 'Arama',
    url: '/search',
    status: 'missing',
    priority: 'medium',
    category: 'utility',
    description: 'Site içi arama sayfası',
    issues: ['Page not found'],
    recommendations: ['Create search page', 'Add search filters', 'Add search suggestions'],
    lastUpdated: null,
  },
  {
    id: 'newsletter',
    title: 'Bülten',
    url: '/newsletter',
    status: 'missing',
    priority: 'medium',
    category: 'content',
    description: 'Newsletter kayıt sayfası',
    issues: ['Page not found'],
    recommendations: ['Create newsletter page', 'Add subscription form', 'Add newsletter archive'],
    lastUpdated: null,
  },
  {
    id: 'affiliate',
    title: 'Affiliate',
    url: '/affiliate',
    status: 'missing',
    priority: 'low',
    category: 'business',
    description: 'Affiliate program sayfası',
    issues: ['Page not found'],
    recommendations: ['Create affiliate page', 'Add program details', 'Add commission rates'],
    lastUpdated: null,
  },
  {
    id: 'partners',
    title: 'Ortaklar',
    url: '/partners',
    status: 'missing',
    priority: 'low',
    category: 'business',
    description: 'Ortaklık sayfası',
    issues: ['Page not found'],
    recommendations: ['Create partners page', 'Add partnership info', 'Add partner logos'],
    lastUpdated: null,
  },
];

// Generate content audit report
export function generateContentAuditReport(): ContentAuditReport {
  const totalPages = contentAuditData.length;
  const completePages = contentAuditData.filter(item => item.status === 'complete').length;
  const incompletePages = contentAuditData.filter(item => item.status === 'incomplete').length;
  const missingPages = contentAuditData.filter(item => item.status === 'missing').length;
  const needsUpdatePages = contentAuditData.filter(item => item.status === 'needs-update').length;

  const highPriorityIssues = contentAuditData.filter(
    item => item.priority === 'high' && item.status !== 'complete'
  ).length;
  const mediumPriorityIssues = contentAuditData.filter(
    item => item.priority === 'medium' && item.status !== 'complete'
  ).length;
  const lowPriorityIssues = contentAuditData.filter(
    item => item.priority === 'low' && item.status !== 'complete'
  ).length;

  const categories = contentAuditData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { total: 0, complete: 0, incomplete: 0, missing: 0 };
    }
    acc[item.category].total++;
    acc[item.category][item.status]++;
    return acc;
  }, {} as any);

  const recommendations = [
    'Complete missing high-priority pages',
    'Update incomplete pages with missing content',
    'Add more blog content',
    'Improve documentation',
    'Add more testimonials and case studies',
    'Create video tutorials',
    'Add search functionality',
    'Improve mobile experience',
    'Add more interactive demos',
    'Create comprehensive FAQ section',
  ];

  return {
    totalPages,
    completePages,
    incompletePages,
    missingPages,
    needsUpdatePages,
    highPriorityIssues,
    mediumPriorityIssues,
    lowPriorityIssues,
    categories,
    recommendations,
  };
}

// Get content audit by category
export function getContentAuditByCategory(category: string): ContentAuditItem[] {
  return contentAuditData.filter(item => item.category === category);
}

// Get high priority issues
export function getHighPriorityIssues(): ContentAuditItem[] {
  return contentAuditData.filter(item => item.priority === 'high' && item.status !== 'complete');
}

// Get missing pages
export function getMissingPages(): ContentAuditItem[] {
  return contentAuditData.filter(item => item.status === 'missing');
}

// Get incomplete pages
export function getIncompletePages(): ContentAuditItem[] {
  return contentAuditData.filter(item => item.status === 'incomplete');
}
