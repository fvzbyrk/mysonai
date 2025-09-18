import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  priority: 'high' | 'medium' | 'low';
  author?: string;
  readTime?: number;
  imageUrl?: string;
  imageAlt?: string;
}

// Global blog posts storage - in real app, this would be a database
let blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Günün Tech Gelişmeleri - 18.09.2025',
    content: `
      <h2>Yapay Zeka ve Gelecek</h2>
      <p>Bugün yapay zeka alanında önemli gelişmeler yaşandı. OpenAI'nin yeni GPT-5 modeli duyuruldu ve performans testleri başladı.</p>
      
      <h3>Öne Çıkan Gelişmeler:</h3>
      <ul>
        <li>OpenAI GPT-5 duyurusu</li>
        <li>Google Gemini 2.0 beta sürümü</li>
        <li>Microsoft Copilot güncellemeleri</li>
        <li>AI güvenlik standartları</li>
      </ul>
      
      <p>Bu gelişmeler, yapay zeka teknolojisinin geleceğini şekillendirecek önemli adımlar olarak değerlendiriliyor.</p>
    `,
    status: 'published',
    publishedAt: '2024-09-18T09:00:00Z',
    category: 'AI Teknolojisi',
    tags: ['tech', 'günlük', 'gelişmeler', 'ai'],
    source: 'Gemini AI',
    priority: 'high',
    author: 'MySonAI',
    readTime: 5
  },
  {
    id: '2',
    title: 'Machine Learning Trendleri 2024',
    content: `
      <h2>Machine Learning'de Yeni Trendler</h2>
      <p>2024 yılında machine learning alanında önemli trendler ortaya çıktı. Bu trendler, gelecekteki teknoloji gelişmelerini etkileyecek.</p>
      
      <h3>Önemli Trendler:</h3>
      <ul>
        <li>Federated Learning</li>
        <li>AutoML platformları</li>
        <li>Edge AI uygulamaları</li>
        <li>Explainable AI</li>
      </ul>
    `,
    status: 'published',
    publishedAt: '2024-09-18T14:00:00Z',
    category: 'AI Teknolojisi',
    tags: ['ai', 'machine-learning', 'trend'],
    source: 'Gemini AI',
    priority: 'medium',
    author: 'MySonAI',
    readTime: 7
  },
  {
    id: '3',
    title: 'Dijital Dönüşüm Rehberi',
    content: `
      <h2>İş Dünyasında Dijital Dönüşüm</h2>
      <p>Modern iş dünyasında dijital dönüşüm artık bir seçenek değil, zorunluluk haline geldi. Bu süreçte dikkat edilmesi gereken önemli noktalar var.</p>
      
      <h3>Dijital Dönüşüm Adımları:</h3>
      <ul>
        <li>Mevcut süreçleri analiz etme</li>
        <li>Teknoloji altyapısını güçlendirme</li>
        <li>Çalışan eğitimleri</li>
        <li>Sürekli iyileştirme</li>
      </ul>
    `,
    status: 'published',
    publishedAt: '2024-09-18T16:00:00Z',
    category: 'İş Dünyası',
    tags: ['dijital-dönüşüm', 'iş-süreçleri', 'teknoloji'],
    source: 'Gemini AI',
    priority: 'medium',
    author: 'MySonAI',
    readTime: 6
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredPosts = blogPosts;

    // Filter by status
    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Apply pagination
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        total: filteredPosts.length,
        hasMore: offset + limit < filteredPosts.length
      }
    });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch blog posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, postData } = await request.json();
    
    switch (action) {
      case 'create':
        return await createPost(postData);
      
      case 'update':
        return await updatePost(postData);
      
      case 'delete':
        return await deletePost(postData.id);
      
      case 'generate-category':
        return await generateCategoryContent(postData.category);
      
      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Blog operation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function createPost(postData: Partial<BlogPost>) {
  try {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: postData.title || 'Yeni Post',
      content: postData.content || '',
      status: postData.status || 'draft',
      publishedAt: new Date().toISOString(),
      category: postData.category || 'Genel',
      tags: postData.tags || [],
      source: postData.source || 'MySonAI',
      priority: postData.priority || 'medium',
      author: postData.author || 'MySonAI',
      readTime: postData.readTime || 5
    };

    // In real app, save to database
    blogPosts.push(newPost);

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create post',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function updatePost(postData: Partial<BlogPost> & { id: string }) {
  try {
    const postIndex = mockPosts.findIndex(post => post.id === postData.id);
    
    if (postIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Post not found'
      }, { status: 404 });
    }

    // Update post
    mockPosts[postIndex] = { ...mockPosts[postIndex], ...postData };

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: mockPosts[postIndex]
    });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update post',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function deletePost(postId: string) {
  try {
    const postIndex = mockPosts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Post not found'
      }, { status: 404 });
    }

    // Remove post
    const deletedPost = mockPosts.splice(postIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete post',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Get image from Unsplash based on category
async function getCategoryImage(category: string): Promise<{url: string, alt: string}> {
  try {
    const searchTerms = {
      'AI Teknolojisi': 'artificial intelligence technology',
      'İş Dünyası': 'business technology digital',
      'Eğitimler': 'education learning technology',
      'Vaka Çalışmaları': 'success business case study',
      'Haberler': 'news technology updates'
    };

    const searchTerm = searchTerms[category as keyof typeof searchTerms] || 'technology';
    
    // Using Unsplash Source API (no API key required for basic usage)
    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(searchTerm)}`;
    
    return {
      url: imageUrl,
      alt: `${category} ile ilgili görsel`
    };
  } catch (error) {
    console.error('Error getting category image:', error);
    // Fallback image
    return {
      url: 'https://source.unsplash.com/800x600/?technology',
      alt: 'Teknoloji görseli'
    };
  }
}

// Generate content for specific category using AI
async function generateCategoryContent(category: string) {
  try {
    // Import Gemini chat for content generation
    const { GeminiChat } = await import('@/lib/gemini-chat');
    const geminiChat = new GeminiChat();

    // Check if Gemini is available
    const geminiStatus = await geminiChat.getStatus();
    
    if (!geminiStatus.available) {
      return NextResponse.json({
        success: false,
        message: 'Gemini API not available',
        error: geminiStatus.error
      }, { status: 400 });
    }

    // Generate content based on category with more detailed prompts
    let prompt = '';
    let title = '';
    let tags: string[] = [];

    switch (category) {
      case 'AI Teknolojisi':
        prompt = `Yapay zeka teknolojileri, makine öğrenmesi ve AI trendleri hakkında kapsamlı ve detaylı bir makale yaz. Türkçe olarak yaz ve şu konuları detaylı şekilde ele al:

1. Güncel AI modelleri ve gelişmeleri
2. Makine öğrenmesi algoritmaları ve uygulamaları
3. Derin öğrenme teknikleri
4. AI'ın farklı sektörlerdeki kullanımı
5. Gelecek trendleri ve öngörüler
6. Etik ve güvenlik konuları
7. Pratik örnekler ve vaka çalışmaları

Makale 1500-2000 kelime arasında olsun, teknik detaylar içersin ve okuyucuya değer katsın.`;
        title = 'AI Teknolojilerinde Yeni Gelişmeler';
        tags = ['ai', 'teknoloji', 'makine-öğrenmesi', 'trendler', 'yapay-zeka'];
        break;
      
      case 'İş Dünyası':
        prompt = `İş süreçleri, dijital dönüşüm ve kurumsal çözümler hakkında kapsamlı bir makale yaz. Türkçe olarak yaz ve şu konuları detaylı şekilde ele al:

1. Dijital dönüşüm stratejileri ve uygulama yöntemleri
2. İş süreçleri optimizasyonu teknikleri
3. Kurumsal teknoloji çözümleri ve entegrasyon
4. Veri analizi ve iş zekası uygulamaları
5. Uzaktan çalışma ve dijital iş modelleri
6. Müşteri deneyimi ve dijital pazarlama
7. Başarı hikayeleri ve pratik örnekler

Makale 1500-2000 kelime arasında olsun, iş dünyasına değer katsın.`;
        title = 'Dijital Dönüşümde Başarı Stratejileri';
        tags = ['dijital-dönüşüm', 'iş-süreçleri', 'kurumsal-çözümler', 'teknoloji', 'iş-dünyası'];
        break;
      
      case 'Eğitimler':
        prompt = `Pratik rehberler, nasıl yapılır ve öğretici içerikler hakkında detaylı bir makale yaz. Türkçe olarak yaz ve şu konuları kapsamlı şekilde ele al:

1. Adım adım rehberler ve uygulama yöntemleri
2. Pratik ipuçları ve en iyi uygulamalar
3. Öğrenme stratejileri ve kaynak önerileri
4. Teknik beceri geliştirme yöntemleri
5. Proje tabanlı öğrenme yaklaşımları
6. Sertifikasyon ve kariyer gelişimi
7. Gerçek örnekler ve uygulamalar

Makale 1500-2000 kelime arasında olsun, öğrenmeye değer katsın.`;
        title = 'Teknoloji Öğrenme Rehberi';
        tags = ['eğitim', 'rehber', 'öğrenme', 'pratik-ipuçları', 'beceri-geliştirme'];
        break;
      
      case 'Vaka Çalışmaları':
        prompt = `Gerçek projeler, başarı hikayeleri ve deneyimler hakkında detaylı bir vaka çalışması yaz. Türkçe olarak yaz ve şu konuları kapsamlı şekilde ele al:

1. Proje detayları ve teknik özellikler
2. Karşılaşılan zorluklar ve çözüm yöntemleri
3. Kullanılan teknolojiler ve araçlar
4. Takım yönetimi ve süreç organizasyonu
5. Sonuçlar ve başarı metrikleri
6. Öğrenilen dersler ve öneriler
7. Gelecek projeler için ipuçları

Makale 1500-2000 kelime arasında olsun, gerçek deneyimler içersin.`;
        title = 'Başarılı Teknoloji Projesi Vaka Çalışması';
        tags = ['vaka-çalışması', 'başarı-hikayesi', 'proje-yönetimi', 'deneyim', 'teknoloji'];
        break;
      
      case 'Haberler':
        prompt = `Sektör haberleri, güncellemeler ve duyurular hakkında güncel bir haber makalesi yaz. Türkçe olarak yaz ve şu konuları kapsamlı şekilde ele al:

1. Son teknoloji haberleri ve gelişmeler
2. Sektör güncellemeleri ve trend analizi
3. Önemli duyurular ve lansmanlar
4. Şirket haberleri ve yatırımlar
5. Teknoloji etkinlikleri ve konferanslar
6. Uzman görüşleri ve yorumlar
7. Gelecek öngörüleri ve beklentiler

Makale 1500-2000 kelime arasında olsun, güncel ve bilgilendirici olsun.`;
        title = 'Teknoloji Sektöründen Son Haberler';
        tags = ['haberler', 'sektör-güncellemeleri', 'teknoloji-haberleri', 'duyurular', 'güncel-gelişmeler'];
        break;
      
      default:
        prompt = `Genel teknoloji konuları hakkında bilgilendirici bir makale yaz. Türkçe olarak yaz ve güncel teknoloji trendlerini kapsamlı şekilde ele al:

1. Güncel teknoloji trendleri ve gelişmeler
2. Sektör analizi ve pazar durumu
3. Teknoloji etkisi ve toplumsal değişim
4. Gelecek öngörüleri ve beklentiler
5. Uzman görüşleri ve analizler
6. Pratik uygulamalar ve örnekler
7. Öneriler ve sonuçlar

Makale 1500-2000 kelime arasında olsun, okuyucuya değer katsın.`;
        title = 'Teknoloji Dünyasından Güncel Gelişmeler';
        tags = ['teknoloji', 'güncel-gelişmeler', 'trendler', 'sektör-analizi'];
    }

    // Generate content using Gemini
    const result = await geminiChat.generateResponse([
      {
        role: 'user',
        content: prompt
      }
    ]);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate content',
        error: result.error
      }, { status: 400 });
    }

    // Get image for the category
    const imageData = await getCategoryImage(category);

    // Create new blog post
    const newPost: BlogPost = {
      id: `generated-${Date.now()}`,
      title: title,
      content: result.content,
      status: 'published',
      publishedAt: new Date().toISOString(),
      category: category,
      tags: tags,
      source: 'Gemini AI',
      priority: 'medium',
      author: 'MySonAI',
      readTime: Math.ceil(result.content.length / 200), // Approximate reading time
      imageUrl: imageData.url,
      imageAlt: imageData.alt
    };

    // Add to blog posts
    blogPosts.push(newPost);

    // Also add to auto-blog posts for admin panel
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auto-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'sync-blog-post',
          postData: newPost
        })
      });
    } catch (error) {
      console.error('Error syncing with auto-blog:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Category content generated successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Generate category content error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to generate category content',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
