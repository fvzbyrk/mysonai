#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'
import { PLANS, STRIPE_PRODUCT_IDS, STRIPE_PRICE_IDS } from '../src/lib/stripe'

async function checkPaymentSystem() {
  console.log('💳 Checking Payment System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('📊 PAYMENT SYSTEM STATUS:')
  console.log(`   Pricing Feature Enabled: ${flags.pricing ? '✅' : '❌'}`)
  console.log(`   Billing Feature Enabled: ${flags.billing ? '✅' : '❌'}`)
  console.log(`   Auth Feature Enabled: ${flags.auth ? '✅' : '❌'}`)
  console.log('')
  
  // Check payment-related files
  const paymentFiles = [
    'src/lib/stripe.ts',
    'src/hooks/usePayment.ts',
    'src/components/payment-manager.tsx',
    'src/components/pricing.tsx',
    'src/app/api/checkout/route.ts',
    'src/app/api/subscription/route.ts',
    'src/app/api/billing/portal/route.ts',
    'src/app/api/billing/invoices/route.ts',
    'src/app/api/webhooks/stripe/route.ts',
  ]
  
  console.log('📁 PAYMENT FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of paymentFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check environment variables
  console.log('🔧 PAYMENT ENVIRONMENT:')
  const paymentEnvVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRODUCT_ID_PRO',
    'STRIPE_PRODUCT_ID_ENTERPRISE',
    'STRIPE_PRICE_ID_PRO',
    'STRIPE_PRICE_ID_ENTERPRISE',
    'NEXT_PUBLIC_FEATURE_PRICING',
    'NEXT_PUBLIC_FEATURE_BILLING',
  ]
  
  for (const envVar of paymentEnvVars) {
    const value = process.env[envVar]
    const status = value ? '✅' : '❌'
    console.log(`   ${status} ${envVar}${value ? `=${value.substring(0, 20)}...` : ''}`)
  }
  console.log('')
  
  // Check plan configurations
  console.log('📋 PLAN CONFIGURATIONS:')
  for (const [planId, plan] of Object.entries(PLANS)) {
    console.log(`   ${planId.toUpperCase()}:`)
    console.log(`     Name: ${plan.name}`)
    console.log(`     Price: ${plan.price / 100}₺/${plan.interval}`)
    console.log(`     Features: ${plan.features.length} items`)
    console.log(`     Limits: ${JSON.stringify(plan.limits)}`)
    console.log('')
  }
  
  // Check Stripe configuration
  console.log('🎯 STRIPE CONFIGURATION:')
  console.log(`   Product IDs:`)
  for (const [plan, productId] of Object.entries(STRIPE_PRODUCT_IDS)) {
    console.log(`     ${plan}: ${productId}`)
  }
  console.log(`   Price IDs:`)
  for (const [plan, priceId] of Object.entries(STRIPE_PRICE_IDS)) {
    console.log(`     ${plan}: ${priceId}`)
  }
  console.log('')
  
  // Check component integration
  console.log('🔗 PAYMENT INTEGRATION CHECK:')
  
  // Check if Pricing component uses FeatureGuard
  try {
    const pricingContent = fs.readFileSync(path.join(process.cwd(), 'src/components/pricing.tsx'), 'utf-8')
    const hasFeatureGuard = pricingContent.includes('FeatureGuard')
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Pricing component uses FeatureGuard`)
  } catch (error) {
    console.log('   ❌ Pricing component not found')
  }
  
  // Check if PaymentManager component exists
  try {
    const paymentManagerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/payment-manager.tsx'), 'utf-8')
    const hasFeatureFlag = paymentManagerContent.includes('useFeatureFlag')
    console.log(`   ${hasFeatureFlag ? '✅' : '❌'} PaymentManager uses feature flags`)
  } catch (error) {
    console.log('   ❌ PaymentManager component not found')
  }
  
  // Check if usePayment hook exists
  try {
    const usePaymentContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/usePayment.ts'), 'utf-8')
    const hasStripeIntegration = usePaymentContent.includes('getStripe')
    console.log(`   ${hasStripeIntegration ? '✅' : '❌'} usePayment hook has Stripe integration`)
  } catch (error) {
    console.log('   ❌ usePayment hook not found')
  }
  
  console.log('')
  
  // Check API routes
  console.log('🚀 API ROUTES CHECK:')
  const apiRoutes = [
    'src/app/api/checkout/route.ts',
    'src/app/api/subscription/route.ts',
    'src/app/api/billing/portal/route.ts',
    'src/app/api/billing/invoices/route.ts',
    'src/app/api/webhooks/stripe/route.ts',
  ]
  
  for (const route of apiRoutes) {
    const routePath = path.join(process.cwd(), route)
    const exists = fs.existsSync(routePath)
    console.log(`   ${exists ? '✅' : '❌'} ${route}`)
  }
  console.log('')
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS:')
  if (!flags.pricing) {
    console.log('   • Enable pricing feature flag for pricing page')
  }
  if (!flags.billing) {
    console.log('   • Enable billing feature flag for payment management')
  }
  if (!flags.auth) {
    console.log('   • Enable auth feature flag for user authentication')
  }
  
  const missingEnvVars = paymentEnvVars.filter(envVar => !process.env[envVar])
  if (missingEnvVars.length > 0) {
    console.log(`   • Set missing environment variables: ${missingEnvVars.join(', ')}`)
  }
  
  console.log('   • Test checkout flow: pricing -> checkout -> success')
  console.log('   • Verify Stripe webhook integration')
  console.log('   • Test subscription management (cancel/resume)')
  console.log('   • Verify billing portal access')
  console.log('   • Test plan upgrade/downgrade flows')
  console.log('   • Verify usage limits enforcement')
  
  console.log('\n✅ Payment system check completed!')
}

// Run the check
checkPaymentSystem().catch(console.error)
