import { NextRequest, NextResponse } from 'next/server';
import { GeminiChat } from '@/lib/gemini-chat';
import { GptGeminiIntegration } from '@/lib/gpt-gemini-integration';

// Create instances
const geminiChat = new GeminiChat();
const gptGeminiIntegration = new GptGeminiIntegration();

export async function POST(request: NextRequest) {
  try {
    const { action, config, postData } = await request.json();
    
    switch (action) {
      case 'generate-daily':
        return await generateDailyPost();
      
      case 'generate-category':
        return await generateCategoryPost(config?.category || 'Genel');
      
      case 'sync-blog-post':
        return await syncBlogPost(postData);
      
      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Auto-blog API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Auto-blog generation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Generate daily tech post
async function generateDailyPost() {
  try {
    // Check if Gemini is available
    const geminiStatus = await geminiChat.getStatus();
    
    if (!geminiStatus.available) {
      return NextResponse.json({
        success: false,
        message: 'Gemini API not available',
        error: geminiStatus.error
      }, { status: 400 });
    }

    // Generate daily tech news using Gemini
    const result = await geminiChat.generateTechNews(['AI', 'Web Development', 'Mobile', 'Security']);
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate daily post',
        error: result.error
      }, { status: 400 });
    }

    // Create mock blog post data
    const blogPost = {
      id: `daily-${Date.now()}`,
      title: 'Günün Tech Gelişmeleri - ' + new Date().toLocaleDateString('tr-TR'),
      content: result.content,
      status: 'published',
      publishedAt: new Date().toISOString(),
      category: 'Genel',
      tags: ['tech', 'günlük', 'gelişmeler'],
      source: 'Gemini AI',
      priority: 'high',
      usage: result.usage
    };

    return NextResponse.json({
      success: true,
      message: 'Daily post generated successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Daily post generation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Daily post generation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Generate category-specific post
async function generateCategoryPost(category: string) {
  try {
    const geminiStatus = await geminiChat.getStatus();
    
    if (!geminiStatus.available) {
      return NextResponse.json({
        success: false,
        message: 'Gemini API not available',
        error: geminiStatus.error
      }, { status: 400 });
    }

    // Generate category-specific content
    const result = await geminiChat.generateBlogPost(
      `${category} konusunda güncel gelişmeler`,
      'technical'
    );
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate category post',
        error: result.error
      }, { status: 400 });
    }

    const blogPost = {
      id: `category-${Date.now()}`,
      title: `${category} Güncellemeleri - ${new Date().toLocaleDateString('tr-TR')}`,
      content: result.content,
      status: 'published',
      publishedAt: new Date().toISOString(),
      category: category,
      tags: [category.toLowerCase(), 'güncelleme'],
      source: 'Gemini AI',
      priority: 'medium',
      usage: result.usage
    };

    return NextResponse.json({
      success: true,
      message: 'Category post generated successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Category post generation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Category post generation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Sync blog post from blog API
async function syncBlogPost(postData: any) {
  try {
    // In a real app, you would store this in a database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Blog post synced successfully',
      data: postData
    });
  } catch (error) {
    console.error('Sync blog post error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to sync blog post',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
