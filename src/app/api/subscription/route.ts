import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { action, userId } = await request.json()

    if (!action || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Get user's subscription
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('id', userId)
      .single()

    if (userError || !user || !user.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
    }

    let result

    switch (action) {
      case 'cancel':
        // Cancel subscription at period end
        result = await stripe.subscriptions.update(user.stripe_subscription_id, {
          cancel_at_period_end: true
        })
        break

      case 'reactivate':
        // Reactivate subscription
        result = await stripe.subscriptions.update(user.stripe_subscription_id, {
          cancel_at_period_end: false
        })
        break

      case 'update':
        const { newPlan } = await request.json()
        if (!newPlan) {
          return NextResponse.json({ error: 'New plan required' }, { status: 400 })
        }

        // Update subscription
        result = await stripe.subscriptions.update(user.stripe_subscription_id, {
          items: [{
            id: user.stripe_subscription_id,
            price: process.env[`STRIPE_PRICE_ID_${newPlan.toUpperCase()}`]
          }],
          proration_behavior: 'create_prorations'
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ success: true, subscription: result })
  } catch (error) {
    console.error('Error managing subscription:', error)
    return NextResponse.json({ error: 'Failed to manage subscription' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Get user's subscription info
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, stripe_subscription_id, plan')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.stripe_subscription_id) {
      return NextResponse.json({ 
        subscription: null,
        plan: user.plan 
      })
    }

    // Get subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(user.stripe_subscription_id)

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        plan: user.plan
      }
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}
