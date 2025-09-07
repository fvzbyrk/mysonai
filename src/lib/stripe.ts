import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe
export const getStripe = () => {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublishableKey) {
    throw new Error('Stripe publishable key is not set');
  }

  return loadStripe(stripePublishableKey);
};

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key', {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

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
      'Topluluk forumu',
    ],
    limits: {
      messages: 100,
      tokens: 10000,
      images: 10,
      assistants: 5,
    },
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
      'Özel entegrasyonlar',
    ],
    limits: {
      messages: 1000,
      tokens: 100000,
      images: 100,
      assistants: 18,
    },
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
      'Dedicated sunucu',
    ],
    limits: {
      messages: -1, // unlimited
      tokens: -1, // unlimited
      images: -1, // unlimited
      assistants: 18,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;

// Stripe Product IDs (will be created in Stripe dashboard)
export const STRIPE_PRODUCT_IDS = {
  pro: process.env.STRIPE_PRODUCT_ID_PRO || 'prod_pro_monthly_try',
  enterprise: process.env.STRIPE_PRODUCT_ID_ENTERPRISE || 'prod_enterprise_monthly_try',
} as const;

// Stripe Price IDs (will be created in Stripe dashboard)
export const STRIPE_PRICE_IDS = {
  pro: process.env.STRIPE_PRICE_ID_PRO || 'price_pro_monthly_try',
  enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE || 'price_enterprise_monthly_try',
} as const;

// Stripe Dashboard Setup Instructions
export const STRIPE_SETUP_INSTRUCTIONS = {
  products: [
    {
      name: 'MySonAI Pro Plan',
      description: 'Professional AI assistant plan with 1000 messages/month',
      productId: 'prod_pro_monthly_try',
      prices: [
        {
          amount: 9900, // 99₺ in kuruş
          currency: 'try',
          interval: 'month',
          priceId: 'price_pro_monthly_try',
        },
      ],
    },
    {
      name: 'MySonAI Enterprise Plan',
      description: 'Enterprise AI assistant plan with unlimited usage',
      productId: 'prod_enterprise_monthly_try',
      prices: [
        {
          amount: 29900, // 299₺ in kuruş
          currency: 'try',
          interval: 'month',
          priceId: 'price_enterprise_monthly_try',
        },
      ],
    },
  ],
  webhooks: [
    {
      url: 'https://mysonai.com/api/webhooks/stripe',
      events: [
        'checkout.session.completed',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_failed',
        'invoice.payment_succeeded',
      ],
    },
  ],
} as const;
