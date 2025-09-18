import { NextRequest, NextResponse } from 'next/server';
import { geminiChat } from '@/lib/gemini-chat';
import { gptGeminiIntegration } from '@/lib/gpt-gemini-integration';

// Test Gemini API integration
export async function GET(request: NextRequest) {
  try {
    // Test Gemini availability
    const geminiStatus = await geminiChat.getStatus();
    
    if (!geminiStatus.available) {
      return NextResponse.json({
        success: false,
        message: 'Gemini API not available',
        error: geminiStatus.error
      }, { status: 400 });
    }

    // Test simple Gemini response
    const testResponse = await geminiChat.generateResponse([
      {
        role: 'user',
        content: 'Merhaba! Gemini API çalışıyor mu?'
      }
    ]);

    if (!testResponse.success) {
      return NextResponse.json({
        success: false,
        message: 'Gemini API test failed',
        error: testResponse.error
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Gemini API is working!',
      data: {
        response: testResponse.content,
        usage: testResponse.usage,
        geminiStatus: geminiStatus
      }
    });
  } catch (error) {
    console.error('Gemini API test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Gemini API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Test GPT + Gemini hybrid system
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    switch (action) {
      case 'test-hybrid':
        return await testHybridSystem();
      
      case 'test-gemini-news':
        return await testGeminiNews();
      
      case 'test-gemini-blog':
        return await testGeminiBlog();
      
      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Gemini test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Test hybrid system
async function testHybridSystem() {
  try {
    const result = await gptGeminiIntegration.generateHybridTechNews();
    
    return NextResponse.json({
      success: result.success,
      message: 'Hybrid system test completed',
      data: {
        total: result.total,
        sources: result.sources,
        quality: result.quality,
        sampleNews: result.data.slice(0, 3) // First 3 news items
      }
    });
  } catch (error) {
    console.error('Hybrid system test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Hybrid system test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Test Gemini news generation
async function testGeminiNews() {
  try {
    const result = await geminiChat.generateTechNews(['AI', 'Web Development', 'Mobile']);
    
    return NextResponse.json({
      success: result.success,
      message: 'Gemini news test completed',
      data: {
        content: result.content,
        usage: result.usage
      }
    });
  } catch (error) {
    console.error('Gemini news test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Gemini news test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Test Gemini blog generation
async function testGeminiBlog() {
  try {
    const result = await geminiChat.generateBlogPost('Yapay Zeka ve Gelecek', 'technical');
    
    return NextResponse.json({
      success: result.success,
      message: 'Gemini blog test completed',
      data: {
        content: result.content,
        usage: result.usage
      }
    });
  } catch (error) {
    console.error('Gemini blog test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Gemini blog test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
