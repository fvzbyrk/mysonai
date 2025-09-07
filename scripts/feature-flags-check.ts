#!/usr/bin/env tsx

import { getFeatureFlags, getEnabledFeatures, getDisabledFeatures, FEATURE_DESCRIPTIONS, FEATURE_CATEGORIES } from '../src/lib/feature-flags'

async function checkFeatureFlags() {
  console.log('🚀 Checking Feature Flags Implementation...\n')
  
  const flags = getFeatureFlags()
  const enabledFeatures = getEnabledFeatures()
  const disabledFeatures = getDisabledFeatures()
  
  console.log('📊 FEATURE FLAGS SUMMARY:')
  console.log(`   Total Features: ${Object.keys(flags).length}`)
  console.log(`   Enabled: ${enabledFeatures.length}`)
  console.log(`   Disabled: ${disabledFeatures.length}`)
  console.log('')
  
  // Show enabled features by category
  console.log('✅ ENABLED FEATURES:')
  for (const [category, features] of Object.entries(FEATURE_CATEGORIES)) {
    const enabledInCategory = features.filter(feature => flags[feature])
    if (enabledInCategory.length > 0) {
      console.log(`   ${category.toUpperCase()}:`)
      enabledInCategory.forEach(feature => {
        console.log(`     • ${feature}: ${FEATURE_DESCRIPTIONS[feature]}`)
      })
      console.log('')
    }
  }
  
  // Show disabled features
  if (disabledFeatures.length > 0) {
    console.log('❌ DISABLED FEATURES:')
    for (const [category, features] of Object.entries(FEATURE_CATEGORIES)) {
      const disabledInCategory = features.filter(feature => !flags[feature])
      if (disabledInCategory.length > 0) {
        console.log(`   ${category.toUpperCase()}:`)
        disabledInCategory.forEach(feature => {
          console.log(`     • ${feature}: ${FEATURE_DESCRIPTIONS[feature]}`)
        })
        console.log('')
      }
    }
  }
  
  // Check for critical features
  const criticalFeatures = ['assistants', 'demo', 'pricing', 'contact', 'auth']
  const missingCriticalFeatures = criticalFeatures.filter(feature => !flags[feature])
  
  if (missingCriticalFeatures.length > 0) {
    console.log('⚠️  MISSING CRITICAL FEATURES:')
    missingCriticalFeatures.forEach(feature => {
      console.log(`   • ${feature}: ${FEATURE_DESCRIPTIONS[feature]}`)
    })
    console.log('')
  }
  
  // Environment check
  console.log('🔧 ENVIRONMENT:')
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`)
  console.log(`   Development Mode: ${process.env.NODE_ENV === 'development'}`)
  console.log(`   Production Mode: ${process.env.NODE_ENV === 'production'}`)
  console.log('')
  
  // Environment variables check
  console.log('📋 ENVIRONMENT VARIABLES:')
  const featureEnvVars = Object.keys(flags).map(key => `NEXT_PUBLIC_FEATURE_${key.toUpperCase()}`)
  const setEnvVars = featureEnvVars.filter(envVar => process.env[envVar] !== undefined)
  const unsetEnvVars = featureEnvVars.filter(envVar => process.env[envVar] === undefined)
  
  if (setEnvVars.length > 0) {
    console.log('   Set Variables:')
    setEnvVars.forEach(envVar => {
      console.log(`     • ${envVar}=${process.env[envVar]}`)
    })
    console.log('')
  }
  
  if (unsetEnvVars.length > 0) {
    console.log('   Unset Variables (using defaults):')
    unsetEnvVars.forEach(envVar => {
      const featureName = envVar.replace('NEXT_PUBLIC_FEATURE_', '').toLowerCase()
      console.log(`     • ${envVar} (default: ${flags[featureName as keyof typeof flags]})`)
    })
    console.log('')
  }
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS:')
  if (disabledFeatures.length > 0) {
    console.log('   • Consider enabling disabled features if they are ready for production')
  }
  if (missingCriticalFeatures.length > 0) {
    console.log('   • Enable critical features for basic site functionality')
  }
  if (setEnvVars.length === 0) {
    console.log('   • Set environment variables for fine-grained control')
  }
  console.log('   • Use feature flags to gradually roll out new features')
  console.log('   • Monitor feature usage and disable unused features')
  
  console.log('\n✅ Feature flags check completed!')
}

// Run the check
checkFeatureFlags().catch(console.error)
