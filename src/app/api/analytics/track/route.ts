import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

interface AnalyticsEvent {
  event_name: string
  event_category: string
  event_label?: string
  value?: number
  custom_parameters?: Record<string, any>
  timestamp: number
  user_id?: string
  session_id: string
  page_url: string
  page_title: string
  user_agent: string
  referrer?: string
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json()

    // Validate required fields
    if (!event.event_name || !event.event_category || !event.session_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Insert event into analytics table
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_name: event.event_name,
        event_category: event.event_category,
        event_label: event.event_label,
        value: event.value,
        custom_parameters: event.custom_parameters,
        timestamp: new Date(event.timestamp).toISOString(),
        user_id: event.user_id,
        session_id: event.session_id,
        page_url: event.page_url,
        page_title: event.page_title,
        user_agent: event.user_agent,
        referrer: event.referrer,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Analytics tracking error:', error)
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      )
    }

    // Update user session data if user_id is provided
    if (event.user_id) {
      await supabase
        .from('user_sessions')
        .upsert({
          user_id: event.user_id,
          session_id: event.session_id,
          last_activity: new Date().toISOString(),
          page_url: event.page_url,
          user_agent: event.user_agent,
          updated_at: new Date().toISOString(),
        })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const userId = searchParams.get('user_id')
    const sessionId = searchParams.get('session_id')
    const category = searchParams.get('category')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    if (sessionId) {
      query = query.eq('session_id', sessionId)
    }

    if (category) {
      query = query.eq('event_category', category)
    }

    if (startDate) {
      query = query.gte('timestamp', startDate)
    }

    if (endDate) {
      query = query.lte('timestamp', endDate)
    }

    const { data, error } = await query

    if (error) {
      console.error('Analytics fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch analytics data' },
        { status: 500 }
      )
    }

    return NextResponse.json({ events: data })
  } catch (error) {
    console.error('Analytics GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
