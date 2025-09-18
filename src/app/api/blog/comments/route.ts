import { NextRequest, NextResponse } from 'next/server';

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  parentId?: string; // For replies
}

// Mock comments data
const comments: Comment[] = [
  {
    id: '1',
    postId: '1',
    author: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    content: 'Çok faydalı bir makale olmuş, teşekkürler!',
    createdAt: '2024-09-18T10:00:00Z',
    isApproved: true
  },
  {
    id: '2',
    postId: '1',
    author: 'Ayşe Demir',
    email: 'ayse@example.com',
    content: 'AI teknolojileri gerçekten hızla gelişiyor. Bu konuda daha fazla makale bekliyoruz.',
    createdAt: '2024-09-18T11:30:00Z',
    isApproved: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const approved = searchParams.get('approved') !== 'false';

    let filteredComments = comments;

    if (postId) {
      filteredComments = filteredComments.filter(comment => comment.postId === postId);
    }

    if (approved) {
      filteredComments = filteredComments.filter(comment => comment.isApproved);
    }

    // Sort by creation date (newest first)
    filteredComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: filteredComments
    });
  } catch (error) {
    console.error('Comments API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch comments',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { postId, author, email, content, parentId } = await request.json();

    if (!postId || !author || !email || !content) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      author,
      email,
      content,
      createdAt: new Date().toISOString(),
      isApproved: false, // Comments need approval
      parentId
    };

    comments.push(newComment);

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully',
      data: newComment
    });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create comment',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
