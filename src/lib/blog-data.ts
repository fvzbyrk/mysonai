export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
  image?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

// Blog categories
export const blogCategories: BlogCategory[] = [
  {
    id: 'ai-technology',
    name: 'AI Teknolojisi',
    slug: 'ai-teknolojisi',
    description: 'Yapay zeka teknolojileri, makine öğrenmesi ve AI trendleri',
    color: 'from-purple-500 to-pink-500',
    postCount: 0
  },
  {
    id: 'business',
    name: 'İş Dünyası',
    slug: 'is-dunyasi',
    description: 'İş süreçleri, dijital dönüşüm ve kurumsal çözümler',
    color: 'from-blue-500 to-cyan-500',
    postCount: 0
  },
  {
    id: 'tutorials',
    name: 'Eğitimler',
    slug: 'egitimler',
    description: 'Pratik rehberler, nasıl yapılır ve öğretici içerikler',
    color: 'from-green-500 to-emerald-500',
    postCount: 0
  },
  {
    id: 'case-studies',
    name: 'Vaka Çalışmaları',
    slug: 'vaka-calismalari',
    description: 'Gerçek projeler, başarı hikayeleri ve deneyimler',
    color: 'from-orange-500 to-red-500',
    postCount: 0
  },
  {
    id: 'news',
    name: 'Haberler',
    slug: 'haberler',
    description: 'Sektör haberleri, güncellemeler ve duyurular',
    color: 'from-indigo-500 to-purple-500',
    postCount: 0
  }
];

// Sample blog posts
export const blogPosts: BlogPost[] = [
  {
    id: 'ai-gelecegi-2024',
    title: 'AI\'nin Geleceği: 2024 Yılında Beklenen Trendler',
    slug: 'ai-gelecegi-2024',
    excerpt: '2024 yılında yapay zeka teknolojilerinde yaşanacak gelişmeler ve iş dünyasına etkileri.',
    content: `
# AI'nin Geleceği: 2024 Yılında Beklenen Trendler

Yapay zeka teknolojileri her geçen gün daha da gelişiyor ve 2024 yılı bu alanda önemli dönüm noktalarına sahne olacak. Bu makalede, AI'nin geleceğini şekillendirecek temel trendleri inceliyoruz.

## 1. Büyük Dil Modellerinin Evrimi

GPT-4 ve benzeri modellerin ardından, 2024 yılında daha da güçlü ve verimli dil modelleri göreceğiz. Bu modeller:

- Daha az kaynak tüketimi
- Daha hızlı yanıt süreleri
- Daha doğru sonuçlar
- Çoklu dil desteği

## 2. AI ve İnsan İşbirliği

Gelecekte AI, insanların yerini almak yerine onlarla işbirliği yapacak. Bu işbirliği:

- Yaratıcılığı artıracak
- Verimliliği yükseltecek
- Yeni fırsatlar yaratacak

## 3. Sektörel AI Uygulamaları

Her sektör kendi AI çözümlerini geliştirecek:

- Sağlık: Teşhis ve tedavi
- Eğitim: Kişiselleştirilmiş öğrenme
- Finans: Risk analizi
- Üretim: Akıllı fabrikalar

## Sonuç

AI teknolojileri hızla gelişiyor ve 2024 yılı bu alanda önemli dönüm noktalarına sahne olacak. Bu değişime hazır olmak için:

1. AI teknolojilerini takip edin
2. Kendi alanınızda AI uygulamaları keşfedin
3. Sürekli öğrenmeye odaklanın

MySonAI olarak, bu değişime öncülük ediyor ve müşterilerimize en güncel AI çözümlerini sunuyoruz.
    `,
    author: {
      name: 'Dr. Ahmet Yılmaz',
      avatar: 'AY',
      bio: 'AI araştırmacısı ve MySonAI kurucusu'
    },
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    tags: ['AI', 'Teknoloji', 'Gelecek', 'Trendler'],
    category: 'ai-technology',
    readTime: 8,
    featured: true,
    image: '/images/blog/ai-future-2024.jpg',
    seo: {
      title: 'AI\'nin Geleceği: 2024 Yılında Beklenen Trendler | MySonAI Blog',
      description: '2024 yılında yapay zeka teknolojilerinde yaşanacak gelişmeler ve iş dünyasına etkileri. AI trendleri ve gelecek öngörüleri.',
      keywords: ['AI geleceği', 'yapay zeka trendleri', '2024 AI', 'makine öğrenmesi', 'AI teknolojileri']
    }
  },
  {
    id: 'chatbot-implementasyonu',
    title: 'İşletmeniz İçin Chatbot Nasıl Uygulanır?',
    slug: 'chatbot-implementasyonu',
    excerpt: 'İşletmeniz için chatbot uygulama sürecinin adım adım rehberi. Planlama, geliştirme ve yayınlama.',
    content: `
# İşletmeniz İçin Chatbot Nasıl Uygulanır?

Chatbot'lar modern işletmelerin müşteri hizmetlerinde devrim yaratıyor. Bu rehberde, işletmeniz için chatbot uygulama sürecini adım adım öğreneceksiniz.

## 1. Planlama Aşaması

### İhtiyaç Analizi
- Hangi süreçleri otomatikleştirmek istiyorsunuz?
- Hangi sorular en sık soruluyor?
- Hedef kitleniz kim?

### Chatbot Türü Seçimi
- **Kural Tabanlı**: Basit soru-cevap
- **AI Destekli**: Doğal dil işleme
- **Hibrit**: İkisinin kombinasyonu

## 2. Geliştirme Süreci

### Veri Toplama
- Mevcut müşteri sorularını analiz edin
- FAQ'ları derleyin
- Müşteri geri bildirimlerini inceleyin

### Teknoloji Seçimi
- **Platform**: WhatsApp, Facebook, Web
- **AI Motoru**: OpenAI, Google Dialogflow
- **Entegrasyon**: CRM, ERP sistemleri

## 3. Test ve Optimizasyon

### Beta Testi
- Sınırlı kullanıcı grubu ile test
- Geri bildirim toplama
- Performans analizi

### Sürekli İyileştirme
- Kullanıcı etkileşimlerini analiz edin
- Yeni senaryolar ekleyin
- AI modelini güncelleyin

## 4. Yayınlama ve İzleme

### Go-Live
- Aşamalı yayınlama
- Kullanıcı eğitimi
- Destek ekibi hazırlığı

### Metrikler
- Yanıt oranı
- Kullanıcı memnuniyeti
- Zaman tasarrufu

## Sonuç

Chatbot uygulaması başarılı olmak için:

1. **Planlama**: Detaylı ihtiyaç analizi yapın
2. **Geliştirme**: Doğru teknolojiyi seçin
3. **Test**: Kapsamlı test yapın
4. **İzleme**: Sürekli optimize edin

MySonAI olarak, chatbot uygulama sürecinde size rehberlik ediyoruz. Uzman ekibimizle iletişime geçin!
    `,
    author: {
      name: 'Elif Demir',
      avatar: 'ED',
      bio: 'UX/UI Tasarımcı ve Chatbot Uzmanı'
    },
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    tags: ['Chatbot', 'Müşteri Hizmetleri', 'Otomasyon', 'AI'],
    category: 'tutorials',
    readTime: 12,
    featured: false,
    image: '/images/blog/chatbot-implementation.jpg',
    seo: {
      title: 'İşletmeniz İçin Chatbot Nasıl Uygulanır? | MySonAI Blog',
      description: 'İşletmeniz için chatbot uygulama sürecinin adım adım rehberi. Planlama, geliştirme ve yayınlama süreçleri.',
      keywords: ['chatbot uygulama', 'chatbot geliştirme', 'müşteri hizmetleri', 'AI chatbot', 'otomasyon']
    }
  },
  {
    id: 'dijital-donusum-rehberi',
    title: 'KOBİ\'ler İçin Dijital Dönüşüm Rehberi',
    slug: 'dijital-donusum-rehberi',
    excerpt: 'Küçük ve orta ölçekli işletmeler için dijital dönüşüm sürecinin pratik rehberi.',
    content: `
# KOBİ'ler İçin Dijital Dönüşüm Rehberi

Dijital dönüşüm artık büyük şirketlerin tekelinde değil. KOBİ'ler de bu süreçten faydalanabilir ve rekabet avantajı elde edebilir.

## Dijital Dönüşüm Nedir?

Dijital dönüşüm, iş süreçlerini teknoloji ile entegre etme sürecidir. Bu süreç:

- Verimliliği artırır
- Maliyetleri düşürür
- Müşteri deneyimini iyileştirir
- Rekabet avantajı sağlar

## KOBİ'ler İçin Adım Adım Rehber

### 1. Mevcut Durum Analizi
- Hangi süreçler manuel?
- Hangi teknolojiler kullanılıyor?
- Dijital okuryazarlık seviyesi?

### 2. Öncelik Belirleme
- En kritik süreçleri belirleyin
- Hızlı kazanımlar için fırsatları değerlendirin
- Uzun vadeli hedefleri planlayın

### 3. Teknoloji Seçimi
- **Bulut Çözümleri**: Esnek ve ölçeklenebilir
- **AI Araçları**: Otomasyon ve analitik
- **Mobil Uygulamalar**: Erişilebilirlik

### 4. Uygulama Stratejisi
- Aşamalı geçiş
- Personel eğitimi
- Sürekli değerlendirme

## Başarı Hikayeleri

### E-ticaret Dönüşümü
- Online satış kanalları
- Dijital pazarlama
- Müşteri yönetimi

### Operasyonel Verimlilik
- Süreç otomasyonu
- Veri analizi
- Karar destek sistemleri

## Sonuç

Dijital dönüşüm KOBİ'ler için:

1. **Zorunluluk**: Rekabet için gerekli
2. **Fırsat**: Büyüme potansiyeli
3. **Süreç**: Aşamalı ve planlı yaklaşım

MySonAI olarak, KOBİ'lerin dijital dönüşüm yolculuğunda yanlarındayız. Size özel çözümler sunuyoruz!
    `,
    author: {
      name: 'Burak Kaya',
      avatar: 'BK',
      bio: 'Sistem Mimarı ve Dijital Dönüşüm Uzmanı'
    },
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    tags: ['Dijital Dönüşüm', 'KOBİ', 'Teknoloji', 'İş Süreçleri'],
    category: 'business',
    readTime: 10,
    featured: true,
    image: '/images/blog/digital-transformation.jpg',
    seo: {
      title: 'KOBİ\'ler İçin Dijital Dönüşüm Rehberi | MySonAI Blog',
      description: 'Küçük ve orta ölçekli işletmeler için dijital dönüşüm sürecinin pratik rehberi. Adım adım uygulama.',
      keywords: ['dijital dönüşüm', 'KOBİ', 'teknoloji', 'iş süreçleri', 'verimlilik']
    }
  }
];

// Utility functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter(post => {
    const category = blogCategories.find(cat => cat.slug === categorySlug);
    return category && post.category === category.id;
  });
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getRecentBlogPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
