import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { plan, testMode = true } = await request.json()

    if (!plan) {
      return NextResponse.json({ error: 'Plan required' }, { status: 400 })
    }

    // Test için basit checkout session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_IDS[plan as keyof typeof STRIPE_PRICE_IDS],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true&test=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true&test=true`,
      metadata: {
        test_mode: testMode.toString(),
        plan: plan
      }
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
      testMode: testMode
    })
  } catch (error) {
    console.error('Error creating test checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Stripe configuration test
    const config = {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Set' : 'Not Set',
      secretKey: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not Set',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not Set',
      productIds: {
        pro: process.env.STRIPE_PRODUCT_ID_PRO ? 'Set' : 'Not Set',
        enterprise: process.env.STRIPE_PRODUCT_ID_ENTERPRISE ? 'Set' : 'Not Set'
      },
      priceIds: {
        pro: process.env.STRIPE_PRICE_ID_PRO ? 'Set' : 'Not Set',
        enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE ? 'Set' : 'Not Set'
      }
    }

    return NextResponse.json({ 
      status: 'Stripe configuration check',
      config,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error checking Stripe configuration:', error)
    return NextResponse.json({ error: 'Failed to check configuration' }, { status: 500 })
  }
}
