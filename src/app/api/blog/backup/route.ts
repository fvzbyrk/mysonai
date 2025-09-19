import { NextRequest, NextResponse } from 'next/server';
import { blogStorage } from '@/lib/blog-storage';

export async function POST(request: NextRequest) {
  try {
    const backupFile = await blogStorage.backupPosts();
    
    return NextResponse.json({
      success: true,
      message: 'Blog posts backed up successfully',
      data: {
        backupFile: backupFile
      }
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to backup blog posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await blogStorage.getAllPosts();
    
    return NextResponse.json({
      success: true,
      data: {
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        scheduledPosts: posts.filter(p => p.status === 'scheduled').length
      }
    });
  } catch (error) {
    console.error('Blog stats error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get blog statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

