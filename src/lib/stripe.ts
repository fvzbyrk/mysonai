import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Client-side Stripe
export const getStripe = () => {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!stripePublishableKey) {
    throw new Error('Stripe publishable key is not set')
  }
  
  return loadStripe(stripePublishableKey)
}

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

// Plan configurations
export const PLANS = {
  free: {
    name: 'Ücretsiz',
    price: 0,
    currency: 'try',
    interval: 'month',
    features: [
      '5 AI asistan erişimi',
      '100 mesaj/ay',
      'Temel chatbot',
      'Email desteği',
      'Topluluk forumu'
    ],
    limits: {
      messages: 100,
      tokens: 10000,
      images: 10,
      assistants: 5
    }
  },
  pro: {
    name: 'Pro',
    price: 9900, // 99₺ in kuruş
    currency: 'try',
    interval: 'month',
    features: [
      'Sınırsız AI asistan',
      '1000 mesaj/ay',
      'Gelişmiş chatbot',
      'Görsel üretim',
      'Öncelikli destek',
      'API erişimi',
      'Özel entegrasyonlar'
    ],
    limits: {
      messages: 1000,
      tokens: 100000,
      images: 100,
      assistants: 18
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 29900, // 299₺ in kuruş
    currency: 'try',
    interval: 'month',
    features: [
      'Sınırsız her şey',
      'Özel AI modelleri',
      'White-label çözümler',
      '7/24 destek',
      'SLA garantisi',
      'Özel eğitim',
      'Dedicated sunucu'
    ],
    limits: {
      messages: -1, // unlimited
      tokens: -1, // unlimited
      images: -1, // unlimited
      assistants: 18
    }
  }
} as const

export type PlanType = keyof typeof PLANS

// Stripe Product IDs (will be created in Stripe dashboard)
export const STRIPE_PRODUCT_IDS = {
  pro: 'prod_pro_monthly',
  enterprise: 'prod_enterprise_monthly'
} as const

// Stripe Price IDs (will be created in Stripe dashboard)
export const STRIPE_PRICE_IDS = {
  pro: 'price_pro_monthly',
  enterprise: 'price_enterprise_monthly'
} as const
