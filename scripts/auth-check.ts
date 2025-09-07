#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkAuthSystem() {
  console.log('🔐 Checking Authentication System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('📊 AUTH SYSTEM STATUS:')
  console.log(`   Auth Feature Enabled: ${flags.auth ? '✅' : '❌'}`)
  console.log(`   Signup Feature Enabled: ${flags.signup ? '✅' : '❌'}`)
  console.log(`   Signin Feature Enabled: ${flags.signin ? '✅' : '❌'}`)
  console.log(`   Dashboard Feature Enabled: ${flags.dashboard ? '✅' : '❌'}`)
  console.log(`   Billing Feature Enabled: ${flags.billing ? '✅' : '❌'}`)
  console.log('')
  
  // Check auth-related files
  const authFiles = [
    'src/contexts/auth-context.tsx',
    'src/hooks/useAuth.ts',
    'src/components/auth-guard.tsx',
    'src/lib/auth-middleware.ts',
    'src/app/signin/page.tsx',
    'src/app/[locale]/dashboard/page.tsx',
    'src/components/social-auth.tsx',
    'src/app/auth/callback/route.ts',
  ]
  
  console.log('📁 AUTH FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of authFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check environment variables
  console.log('🔧 AUTH ENVIRONMENT:')
  const authEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_FEATURE_AUTH',
    'NEXT_PUBLIC_FEATURE_SIGNUP',
    'NEXT_PUBLIC_FEATURE_SIGNIN',
    'NEXT_PUBLIC_FEATURE_DASHBOARD',
    'NEXT_PUBLIC_FEATURE_BILLING',
  ]
  
  for (const envVar of authEnvVars) {
    const value = process.env[envVar]
    const status = value ? '✅' : '❌'
    console.log(`   ${status} ${envVar}${value ? `=${value.substring(0, 20)}...` : ''}`)
  }
  console.log('')
  
  // Check auth components integration
  console.log('🔗 AUTH INTEGRATION CHECK:')
  
  // Check if AuthGuard is used in signin page
  try {
    const signinContent = fs.readFileSync(path.join(process.cwd(), 'src/app/signin/page.tsx'), 'utf-8')
    const hasAuthGuard = signinContent.includes('AuthGuard')
    console.log(`   ${hasAuthGuard ? '✅' : '❌'} Signin page uses AuthGuard`)
  } catch (error) {
    console.log('   ❌ Signin page not found')
  }
  
  // Check if AuthGuard is used in dashboard page
  try {
    const dashboardContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/dashboard/page.tsx'), 'utf-8')
    const hasAuthGuard = dashboardContent.includes('AuthGuard')
    console.log(`   ${hasAuthGuard ? '✅' : '❌'} Dashboard page uses AuthGuard`)
  } catch (error) {
    console.log('   ❌ Dashboard page not found')
  }
  
  // Check if Header has auth links
  try {
    const headerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/header.tsx'), 'utf-8')
    const hasSigninLink = headerContent.includes('signin')
    const hasSignupLink = headerContent.includes('signup')
    console.log(`   ${hasSigninLink ? '✅' : '❌'} Header has signin link`)
    console.log(`   ${hasSignupLink ? '✅' : '❌'} Header has signup link`)
  } catch (error) {
    console.log('   ❌ Header component not found')
  }
  
  console.log('')
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS:')
  if (!flags.auth) {
    console.log('   • Enable auth feature flag for authentication system')
  }
  if (!flags.signup || !flags.signin) {
    console.log('   • Enable signup/signin features for user registration')
  }
  if (!flags.dashboard) {
    console.log('   • Enable dashboard feature for user panel')
  }
  if (!flags.billing) {
    console.log('   • Enable billing feature for subscription management')
  }
  
  const missingEnvVars = authEnvVars.filter(envVar => !process.env[envVar])
  if (missingEnvVars.length > 0) {
    console.log(`   • Set missing environment variables: ${missingEnvVars.join(', ')}`)
  }
  
  console.log('   • Test authentication flow: signup -> signin -> dashboard')
  console.log('   • Verify social auth (Google OAuth) integration')
  console.log('   • Test protected routes and redirects')
  console.log('   • Verify user session persistence')
  
  console.log('\n✅ Auth system check completed!')
}

// Run the check
checkAuthSystem().catch(console.error)
