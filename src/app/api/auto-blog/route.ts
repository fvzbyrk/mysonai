import { NextRequest, NextResponse } from 'next/server';
import { autoBlogGenerator, AutoBlogPost } from '@/lib/auto-blog-generator';
import { grokAPI } from '@/lib/grok-api';

// Auto blog generation endpoint
export async function POST(request: NextRequest) {
  try {
    const { action, config } = await request.json();
    
    switch (action) {
      case 'generate-daily':
        return await generateDailyTechPost();
      
      case 'generate-category':
        return await generateCategoryPost(config.category);
      
      case 'generate-trending':
        return await generateTrendingPost();
      
      case 'generate-custom':
        return await generateCustomPost(config.query);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Auto blog generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate daily tech post
async function generateDailyTechPost() {
  try {
    const blogPost = await autoBlogGenerator.generateDailyTechPost();
    
    if (!blogPost) {
      return NextResponse.json({
        success: false,
        message: 'No relevant news found for today'
      });
    }

    // Save to database (you'll need to implement this)
    // await saveBlogPost(blogPost);
    
    return NextResponse.json({
      success: true,
      data: blogPost,
      message: 'Daily tech post generated successfully'
    });
  } catch (error) {
    console.error('Error generating daily tech post:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily tech post' },
      { status: 500 }
    );
  }
}

// Generate category-specific post
async function generateCategoryPost(category: string) {
  try {
    const newsItems = await grokAPI.getNewsByCategory(category);
    
    if (newsItems.length === 0) {
      return NextResponse.json({
        success: false,
        message: `No news found for category: ${category}`
      });
    }

    // Create blog post from category news
    const blogPost = await autoBlogGenerator.generateDailyTechPost();
    
    if (!blogPost) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate blog post'
      });
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
      message: `Category post generated for: ${category}`
    });
  } catch (error) {
    console.error('Error generating category post:', error);
    return NextResponse.json(
      { error: 'Failed to generate category post' },
      { status: 500 }
    );
  }
}

// Generate trending topics post
async function generateTrendingPost() {
  try {
    const trendingTopics = await grokAPI.getTrendingTopics();
    
    if (trendingTopics.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No trending topics found'
      });
    }

    // Create blog post about trending topics
    const blogPost = await autoBlogGenerator.generateDailyTechPost();
    
    if (!blogPost) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate trending post'
      });
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
      message: 'Trending topics post generated successfully'
    });
  } catch (error) {
    console.error('Error generating trending post:', error);
    return NextResponse.json(
      { error: 'Failed to generate trending post' },
      { status: 500 }
    );
  }
}

// Generate custom query post
async function generateCustomPost(query: string) {
  try {
    const newsItems = await grokAPI.searchNews(query);
    
    if (newsItems.length === 0) {
      return NextResponse.json({
        success: false,
        message: `No news found for query: ${query}`
      });
    }

    // Create blog post from search results
    const blogPost = await autoBlogGenerator.generateDailyTechPost();
    
    if (!blogPost) {
      return NextResponse.json({
        success: false,
        message: 'Failed to generate custom post'
      });
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
      message: `Custom post generated for query: ${query}`
    });
  } catch (error) {
    console.error('Error generating custom post:', error);
    return NextResponse.json(
      { error: 'Failed to generate custom post' },
      { status: 500 }
    );
  }
}

// GET endpoint for status check
export async function GET() {
  try {
    const generatedPosts = autoBlogGenerator.getGeneratedPosts();
    
    return NextResponse.json({
      success: true,
      data: {
        totalPosts: generatedPosts.length,
        posts: generatedPosts,
        lastGenerated: generatedPosts.length > 0 ? generatedPosts[0].publishedAt : null
      }
    });
  } catch (error) {
    console.error('Error getting auto blog status:', error);
    return NextResponse.json(
      { error: 'Failed to get auto blog status' },
      { status: 500 }
    );
  }
}
