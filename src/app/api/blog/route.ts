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

// Mock blog posts data - in real app, this would come from database
const mockPosts: BlogPost[] = [
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

    let filteredPosts = mockPosts;

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
    mockPosts.push(newPost);

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

    // Generate content based on category
    let prompt = '';
    let title = '';
    let tags: string[] = [];

    switch (category) {
      case 'AI Teknolojisi':
        prompt = 'Yapay zeka teknolojileri, makine öğrenmesi ve AI trendleri hakkında güncel bir makale yaz. Türkçe olarak yaz ve şu konuları kapsa: yeni AI modelleri, uygulama alanları, gelecek trendleri. 800-1000 kelime arasında olsun.';
        title = 'AI Teknolojilerinde Yeni Gelişmeler';
        tags = ['ai', 'teknoloji', 'makine-öğrenmesi', 'trendler'];
        break;
      
      case 'İş Dünyası':
        prompt = 'İş süreçleri, dijital dönüşüm ve kurumsal çözümler hakkında pratik bir makale yaz. Türkçe olarak yaz ve şu konuları kapsa: dijital dönüşüm stratejileri, iş süreçleri optimizasyonu, kurumsal teknoloji çözümleri. 800-1000 kelime arasında olsun.';
        title = 'Dijital Dönüşümde Başarı Stratejileri';
        tags = ['dijital-dönüşüm', 'iş-süreçleri', 'kurumsal-çözümler', 'teknoloji'];
        break;
      
      case 'Eğitimler':
        prompt = 'Pratik rehberler, nasıl yapılır ve öğretici içerikler hakkında detaylı bir makale yaz. Türkçe olarak yaz ve şu konuları kapsa: adım adım rehberler, pratik ipuçları, öğrenme stratejileri. 800-1000 kelime arasında olsun.';
        title = 'Teknoloji Öğrenme Rehberi';
        tags = ['eğitim', 'rehber', 'öğrenme', 'pratik-ipuçları'];
        break;
      
      case 'Vaka Çalışmaları':
        prompt = 'Gerçek projeler, başarı hikayeleri ve deneyimler hakkında detaylı bir vaka çalışması yaz. Türkçe olarak yaz ve şu konuları kapsa: proje detayları, karşılaşılan zorluklar, çözüm yöntemleri, sonuçlar. 800-1000 kelime arasında olsun.';
        title = 'Başarılı Teknoloji Projesi Vaka Çalışması';
        tags = ['vaka-çalışması', 'başarı-hikayesi', 'proje-yönetimi', 'deneyim'];
        break;
      
      case 'Haberler':
        prompt = 'Sektör haberleri, güncellemeler ve duyurular hakkında güncel bir haber makalesi yaz. Türkçe olarak yaz ve şu konuları kapsa: son teknoloji haberleri, sektör güncellemeleri, önemli duyurular. 800-1000 kelime arasında olsun.';
        title = 'Teknoloji Sektöründen Son Haberler';
        tags = ['haberler', 'sektör-güncellemeleri', 'teknoloji-haberleri', 'duyurular'];
        break;
      
      default:
        prompt = 'Genel teknoloji konuları hakkında bilgilendirici bir makale yaz. Türkçe olarak yaz ve güncel teknoloji trendlerini kapsa. 800-1000 kelime arasında olsun.';
        title = 'Teknoloji Dünyasından Güncel Gelişmeler';
        tags = ['teknoloji', 'güncel-gelişmeler', 'trendler'];
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

    // Add to mock posts
    mockPosts.push(newPost);

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
