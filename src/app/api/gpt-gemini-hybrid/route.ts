import { NextRequest, NextResponse } from 'next/server';
import { GptGeminiHybridNews, HybridConfig } from '@/lib/gpt-gemini-hybrid';

// Create instance
const gptGeminiHybrid = new GptGeminiHybridNews();

// GPT + Gemini hybrid news generation endpoint
export async function POST(request: NextRequest) {
  try {
    const { action, config } = await request.json();
    
    switch (action) {
      case 'generate-hybrid':
        return await generateHybridNews(config);
      
      case 'generate-gpt-only':
        return await generateGPTOnlyNews();
      
      case 'generate-gemini-only':
        return await generateGeminiOnlyNews();
      
      case 'compare-sources':
        return await compareSources();
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('GPT + Gemini hybrid news generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate hybrid news
async function generateHybridNews(config?: Partial<HybridConfig>) {
  try {
    if (config) {
      // Update configuration
      Object.assign(gptGeminiHybrid, config);
    }
    
    const result = await gptGeminiHybrid.generateHybridTechNews();
    
    return NextResponse.json({
      success: result.success,
      data: result.data,
      total: result.total,
      sources: result.sources,
      quality: result.quality,
      message: 'GPT + Gemini hybrid news generated successfully'
    });
  } catch (error) {
    console.error('Error generating hybrid news:', error);
    return NextResponse.json(
      { error: 'Failed to generate hybrid news' },
      { status: 500 }
    );
  }
}

// Generate GPT-only news
async function generateGPTOnlyNews() {
  try {
    const result = await gptGeminiHybrid.generateHybridTechNews();
    
    // Filter only GPT news
    const gptNews = result.data.filter(item => item.source === 'GPT-4');
    
    return NextResponse.json({
      success: true,
      data: gptNews,
      total: gptNews.length,
      source: 'GPT-4',
      message: 'GPT-only news generated successfully'
    });
  } catch (error) {
    console.error('Error generating GPT-only news:', error);
    return NextResponse.json(
      { error: 'Failed to generate GPT-only news' },
      { status: 500 }
    );
  }
}

// Generate Gemini-only news
async function generateGeminiOnlyNews() {
  try {
    const result = await gptGeminiHybrid.generateHybridTechNews();
    
    // Filter only Gemini news
    const geminiNews = result.data.filter(item => item.source === 'Gemini AI');
    
    return NextResponse.json({
      success: true,
      data: geminiNews,
      total: geminiNews.length,
      source: 'Gemini AI',
      message: 'Gemini-only news generated successfully'
    });
  } catch (error) {
    console.error('Error generating Gemini-only news:', error);
    return NextResponse.json(
      { error: 'Failed to generate Gemini-only news' },
      { status: 500 }
    );
  }
}

// Compare sources
async function compareSources() {
  try {
    const result = await gptGeminiHybrid.generateHybridTechNews();
    
    const comparison = {
      gpt: {
        count: result.sources.gpt,
        quality: result.quality.gpt,
        avgScore: result.data
          .filter(item => item.source === 'GPT-4')
          .reduce((sum, item) => sum + item.gptScore, 0) / Math.max(result.sources.gpt, 1)
      },
      gemini: {
        count: result.sources.gemini,
        quality: result.quality.gemini,
        avgScore: result.data
          .filter(item => item.source === 'Gemini AI')
          .reduce((sum, item) => sum + item.geminiScore, 0) / Math.max(result.sources.gemini, 1)
      },
      hybrid: {
        count: result.sources.hybrid,
        quality: result.quality.hybrid,
        avgScore: result.data
          .reduce((sum, item) => sum + item.hybridScore, 0) / Math.max(result.sources.hybrid, 1)
      }
    };
    
    return NextResponse.json({
      success: true,
      data: comparison,
      message: 'Source comparison completed'
    });
  } catch (error) {
    console.error('Error comparing sources:', error);
    return NextResponse.json(
      { error: 'Failed to compare sources' },
      { status: 500 }
    );
  }
}

// GET endpoint for status
export async function GET() {
  try {
    const lastGenerated = gptGeminiHybrid.getLastGenerated();
    
    return NextResponse.json({
      success: true,
      data: {
        lastGenerated: lastGenerated?.toISOString() || null,
        status: 'ready',
        supportedActions: [
          'generate-hybrid',
          'generate-gpt-only',
          'generate-gemini-only',
          'compare-sources'
        ],
        apis: {
          gpt: 'OpenAI GPT-4',
          gemini: 'Google Gemini Pro'
        }
      }
    });
  } catch (error) {
    console.error('Error getting GPT + Gemini hybrid status:', error);
    return NextResponse.json(
      { error: 'Failed to get hybrid status' },
      { status: 500 }
    );
  }
}
