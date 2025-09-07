import { createServerSupabaseClient } from './supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    return handler(request, user)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export async function withGuest(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return handler(request)
  } catch (error) {
    console.error('Guest middleware error:', error)
    return handler(request)
  }
}

// Check if user has specific plan
export async function requirePlan(
  request: NextRequest,
  requiredPlan: 'free' | 'pro' | 'enterprise',
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    // Get user profile to check plan
    const { data: profile } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()

    const userPlan = profile?.plan || 'free'
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 }
    
    if (planHierarchy[userPlan as keyof typeof planHierarchy] < planHierarchy[requiredPlan]) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    return handler(request, user)
  } catch (error) {
    console.error('Plan middleware error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}
