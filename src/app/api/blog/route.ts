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
    category: 'Genel',
    tags: ['tech', 'günlük', 'gelişmeler', 'ai'],
    source: 'Gemini AI',
    priority: 'high',
    author: 'MySonAI',
    readTime: 5
  },
  {
    id: '2',
    title: 'AI ve Machine Learning Trendleri',
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
    category: 'Yapay Zeka',
    tags: ['ai', 'machine-learning', 'trend'],
    source: 'Gemini AI',
    priority: 'medium',
    author: 'MySonAI',
    readTime: 7
  },
  {
    id: '3',
    title: 'Startup Ekosistemi Güncellemeleri',
    content: `
      <h2>Startup Dünyasından Haberler</h2>
      <p>Bu hafta startup ekosisteminde önemli gelişmeler yaşandı. Yeni yatırımlar ve başarı hikayeleri dikkat çekiyor.</p>
      
      <h3>Öne Çıkan Startuplar:</h3>
      <ul>
        <li>TechCorp - 50M$ yatırım aldı</li>
        <li>AIStart - Yeni AI çözümü duyurdu</li>
        <li>GreenTech - Sürdürülebilir teknoloji</li>
      </ul>
    `,
    status: 'published',
    publishedAt: '2024-09-18T16:00:00Z',
    category: 'Startup',
    tags: ['startup', 'ekosistem', 'güncelleme'],
    source: 'Gemini AI',
    priority: 'low',
    author: 'MySonAI',
    readTime: 4
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
