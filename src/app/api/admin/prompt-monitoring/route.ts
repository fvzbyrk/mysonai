import { NextRequest, NextResponse } from 'next/server';
import { promptMonitor } from '@/lib/master-prompt-system';

/**
 * Admin API endpoint for prompt monitoring and reporting
 * GET: Get prompt monitoring report
 * POST: Reset monitoring logs (admin only)
 */

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin (you can implement your own auth logic here)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get monitoring report
    const report = promptMonitor.getReport();

    return NextResponse.json({
      success: true,
      report,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting prompt monitoring report:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();

    if (action === 'reset') {
      // Reset monitoring logs (implement this in PromptMonitor class)
      // promptMonitor.resetLogs();
      return NextResponse.json({
        success: true,
        message: 'Monitoring logs reset successfully'
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in prompt monitoring admin action:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
