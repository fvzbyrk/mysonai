import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  errorBoundary?: string
  timestamp: number
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'javascript' | 'react' | 'network' | 'api' | 'validation' | 'unknown'
  context?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const errorInfo: ErrorInfo = await request.json();

    // Validate required fields
    if (!errorInfo.message || !errorInfo.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Insert error into monitoring table
    const { error } = await supabase
      .from('error_monitoring')
      .insert({
        message: errorInfo.message,
        stack: errorInfo.stack,
        component_stack: errorInfo.componentStack,
        error_boundary: errorInfo.errorBoundary,
        timestamp: new Date(errorInfo.timestamp).toISOString(),
        user_agent: errorInfo.userAgent,
        url: errorInfo.url,
        user_id: errorInfo.userId,
        session_id: errorInfo.sessionId,
        severity: errorInfo.severity,
        category: errorInfo.category,
        context: errorInfo.context,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error monitoring error:', error);
      return NextResponse.json(
        { error: 'Failed to log error' },
        { status: 500 }
      );
    }

    // Update error statistics
    await supabase
      .from('error_statistics')
      .upsert({
        date: new Date().toISOString().split('T')[0],
        category: errorInfo.category,
        severity: errorInfo.severity,
        count: 1,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'date,category,severity',
        ignoreDuplicates: false,
      });

    // Send critical errors to notification service
    if (errorInfo.severity === 'critical') {
      await sendCriticalErrorNotification(errorInfo);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error monitoring API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('user_id');
    const sessionId = searchParams.get('session_id');
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = supabase
      .from('error_monitoring')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (severity) {
      query = query.eq('severity', severity);
    }

    if (startDate) {
      query = query.gte('timestamp', startDate);
    }

    if (endDate) {
      query = query.lte('timestamp', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error monitoring fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch error data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ errors: data });
  } catch (error) {
    console.error('Error monitoring GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendCriticalErrorNotification(errorInfo: ErrorInfo) {
  try {
    // Send to notification service (Slack, Discord, etc.)
    await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'critical_error',
        title: 'Critical Error Detected',
        message: `Critical error in ${errorInfo.category}: ${errorInfo.message}`,
        data: {
          error: errorInfo,
          timestamp: new Date().toISOString(),
        },
      }),
    });
  } catch (error) {
    console.error('Failed to send critical error notification:', error);
  }
}
