import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
  category: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId: string;
  url: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    const logEntry: LogEntry = await request.json();

    // Validate required fields
    if (!logEntry.level || !logEntry.message || !logEntry.sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Insert log entry into logging table
    const { error } = await supabase.from('application_logs').insert({
      log_id: logEntry.id,
      level: logEntry.level,
      message: logEntry.message,
      timestamp: new Date(logEntry.timestamp).toISOString(),
      category: logEntry.category,
      context: logEntry.context,
      user_id: logEntry.userId,
      session_id: logEntry.sessionId,
      url: logEntry.url,
      user_agent: logEntry.userAgent,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Logging error:', error);
      return NextResponse.json({ error: 'Failed to log entry' }, { status: 500 });
    }

    // Update log statistics
    await supabase.from('log_statistics').upsert(
      {
        date: new Date().toISOString().split('T')[0],
        level: logEntry.level,
        category: logEntry.category,
        count: 1,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'date,level,category',
        ignoreDuplicates: false,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logging API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('user_id');
    const sessionId = searchParams.get('session_id');
    const level = searchParams.get('level');
    const category = searchParams.get('category');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = supabase
      .from('application_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    if (level) {
      query = query.eq('level', level);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (startDate) {
      query = query.gte('timestamp', startDate);
    }

    if (endDate) {
      query = query.lte('timestamp', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Logging fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch log data' }, { status: 500 });
    }

    return NextResponse.json({ logs: data });
  } catch (error) {
    console.error('Logging GET API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
