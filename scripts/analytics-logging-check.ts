#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkAnalyticsLoggingSystem() {
  console.log('📊 Checking Analytics & Logging System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('📊 ANALYTICS & LOGGING SYSTEM STATUS:')
  console.log(`   Analytics Feature Enabled: ${flags.analytics ? '✅' : '❌'}`)
  console.log(`   Notifications Feature Enabled: ${flags.notifications ? '✅' : '❌'}`)
  console.log('')
  
  // Check analytics/logging-related files
  const analyticsFiles = [
    'src/hooks/useAnalytics.ts',
    'src/hooks/useErrorMonitoring.ts',
    'src/hooks/useLogging.ts',
    'src/app/api/analytics/track/route.ts',
    'src/app/api/monitoring/error/route.ts',
    'src/app/api/logging/log/route.ts',
    'src/lib/analytics.ts',
  ]
  
  console.log('📁 ANALYTICS & LOGGING FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of analyticsFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check Google Analytics integration
  console.log('🔍 GOOGLE ANALYTICS INTEGRATION:')
  try {
    const layoutContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/layout.tsx'), 'utf-8')
    
    const hasGoogleAnalytics = layoutContent.includes('GOOGLE_ANALYTICS_ID')
    const hasGtagScript = layoutContent.includes('gtag')
    const hasAnalyticsScript = layoutContent.includes('googletagmanager')
    
    console.log(`   ${hasGoogleAnalytics ? '✅' : '❌'} Google Analytics ID configuration`)
    console.log(`   ${hasGtagScript ? '✅' : '❌'} Gtag script integration`)
    console.log(`   ${hasAnalyticsScript ? '✅' : '❌'} Google Tag Manager script`)
  } catch (error) {
    console.log('   ❌ Layout file not found')
  }
  
  // Check analytics library
  try {
    const analyticsContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/analytics.ts'), 'utf-8')
    
    const hasTrackingFunctions = analyticsContent.includes('trackEvent')
    const hasPageViewTracking = analyticsContent.includes('trackPageView')
    const hasConversionTracking = analyticsContent.includes('trackConversion')
    const hasUserTracking = analyticsContent.includes('setUserId')
    const hasEcommerceTracking = analyticsContent.includes('trackPurchase')
    
    console.log(`   ${hasTrackingFunctions ? '✅' : '❌'} Event tracking functions`)
    console.log(`   ${hasPageViewTracking ? '✅' : '❌'} Page view tracking`)
    console.log(`   ${hasConversionTracking ? '✅' : '❌'} Conversion tracking`)
    console.log(`   ${hasUserTracking ? '✅' : '❌'} User ID tracking`)
    console.log(`   ${hasEcommerceTracking ? '✅' : '❌'} E-commerce tracking`)
  } catch (error) {
    console.log('   ❌ Analytics library not found')
  }
  console.log('')
  
  // Check analytics hooks
  console.log('🎣 ANALYTICS HOOKS:')
  try {
    const useAnalyticsContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useAnalytics.ts'), 'utf-8')
    
    const hasPageViewTracking = useAnalyticsContent.includes('trackPageView')
    const hasEventTracking = useAnalyticsContent.includes('trackEvent')
    const hasInteractionTracking = useAnalyticsContent.includes('trackInteraction')
    const hasFormTracking = useAnalyticsContent.includes('trackFormSubmission')
    const hasConversionTracking = useAnalyticsContent.includes('trackConversion')
    const hasErrorTracking = useAnalyticsContent.includes('trackError')
    const hasPerformanceTracking = useAnalyticsContent.includes('trackPerformance')
    const hasAIUsageTracking = useAnalyticsContent.includes('trackAIUsage')
    const hasSubscriptionTracking = useAnalyticsContent.includes('trackSubscription')
    const hasUserProperties = useAnalyticsContent.includes('setUserProperties')
    
    console.log(`   ${hasPageViewTracking ? '✅' : '❌'} useAnalytics: Page view tracking`)
    console.log(`   ${hasEventTracking ? '✅' : '❌'} useAnalytics: Event tracking`)
    console.log(`   ${hasInteractionTracking ? '✅' : '❌'} useAnalytics: Interaction tracking`)
    console.log(`   ${hasFormTracking ? '✅' : '❌'} useAnalytics: Form submission tracking`)
    console.log(`   ${hasConversionTracking ? '✅' : '❌'} useAnalytics: Conversion tracking`)
    console.log(`   ${hasErrorTracking ? '✅' : '❌'} useAnalytics: Error tracking`)
    console.log(`   ${hasPerformanceTracking ? '✅' : '❌'} useAnalytics: Performance tracking`)
    console.log(`   ${hasAIUsageTracking ? '✅' : '❌'} useAnalytics: AI usage tracking`)
    console.log(`   ${hasSubscriptionTracking ? '✅' : '❌'} useAnalytics: Subscription tracking`)
    console.log(`   ${hasUserProperties ? '✅' : '❌'} useAnalytics: User properties`)
  } catch (error) {
    console.log('   ❌ useAnalytics hook not found')
  }
  console.log('')
  
  // Check error monitoring
  console.log('🚨 ERROR MONITORING:')
  try {
    const errorMonitoringContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useErrorMonitoring.ts'), 'utf-8')
    
    const hasGlobalErrorHandler = errorMonitoringContent.includes('handleGlobalError')
    const hasPromiseRejectionHandler = errorMonitoringContent.includes('handleUnhandledRejection')
    const hasNetworkErrorHandler = errorMonitoringContent.includes('handleNetworkError')
    const hasCustomErrorLogging = errorMonitoringContent.includes('logError')
    const hasAPIErrorLogging = errorMonitoringContent.includes('logAPIError')
    const hasReactErrorLogging = errorMonitoringContent.includes('logReactError')
    const hasValidationErrorLogging = errorMonitoringContent.includes('logValidationError')
    const hasErrorStats = errorMonitoringContent.includes('getErrorStats')
    const hasErrorBoundary = errorMonitoringContent.includes('useErrorBoundary')
    
    console.log(`   ${hasGlobalErrorHandler ? '✅' : '❌'} Global error handler`)
    console.log(`   ${hasPromiseRejectionHandler ? '✅' : '❌'} Promise rejection handler`)
    console.log(`   ${hasNetworkErrorHandler ? '✅' : '❌'} Network error handler`)
    console.log(`   ${hasCustomErrorLogging ? '✅' : '❌'} Custom error logging`)
    console.log(`   ${hasAPIErrorLogging ? '✅' : '❌'} API error logging`)
    console.log(`   ${hasReactErrorLogging ? '✅' : '❌'} React error logging`)
    console.log(`   ${hasValidationErrorLogging ? '✅' : '❌'} Validation error logging`)
    console.log(`   ${hasErrorStats ? '✅' : '❌'} Error statistics`)
    console.log(`   ${hasErrorBoundary ? '✅' : '❌'} Error boundary hook`)
  } catch (error) {
    console.log('   ❌ Error monitoring hook not found')
  }
  console.log('')
  
  // Check logging system
  console.log('📝 LOGGING SYSTEM:')
  try {
    const loggingContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useLogging.ts'), 'utf-8')
    
    const hasLogLevels = loggingContent.includes('debug') && loggingContent.includes('info') && loggingContent.includes('warn') && loggingContent.includes('error')
    const hasUserActionLogging = loggingContent.includes('logUserAction')
    const hasAPILogging = loggingContent.includes('logAPICall')
    const hasPerformanceLogging = loggingContent.includes('logPerformance')
    const hasSecurityLogging = loggingContent.includes('logSecurity')
    const hasBusinessLogging = loggingContent.includes('logBusiness')
    const hasLogFiltering = loggingContent.includes('getLogsByLevel')
    const hasLogSearch = loggingContent.includes('searchLogs')
    const hasLogStats = loggingContent.includes('getLogStats')
    const hasLogExport = loggingContent.includes('exportLogs')
    const hasRemoteLogging = loggingContent.includes('sendLogToRemote')
    const hasStorageLogging = loggingContent.includes('saveLogToStorage')
    
    console.log(`   ${hasLogLevels ? '✅' : '❌'} Log levels (debug, info, warn, error)`)
    console.log(`   ${hasUserActionLogging ? '✅' : '❌'} User action logging`)
    console.log(`   ${hasAPILogging ? '✅' : '❌'} API call logging`)
    console.log(`   ${hasPerformanceLogging ? '✅' : '❌'} Performance logging`)
    console.log(`   ${hasSecurityLogging ? '✅' : '❌'} Security logging`)
    console.log(`   ${hasBusinessLogging ? '✅' : '❌'} Business event logging`)
    console.log(`   ${hasLogFiltering ? '✅' : '❌'} Log filtering`)
    console.log(`   ${hasLogSearch ? '✅' : '❌'} Log search`)
    console.log(`   ${hasLogStats ? '✅' : '❌'} Log statistics`)
    console.log(`   ${hasLogExport ? '✅' : '❌'} Log export`)
    console.log(`   ${hasRemoteLogging ? '✅' : '❌'} Remote logging`)
    console.log(`   ${hasStorageLogging ? '✅' : '❌'} Local storage logging`)
  } catch (error) {
    console.log('   ❌ Logging hook not found')
  }
  console.log('')
  
  // Check API routes
  console.log('🔌 API ROUTES:')
  const apiRoutes = [
    'src/app/api/analytics/track/route.ts',
    'src/app/api/monitoring/error/route.ts',
    'src/app/api/logging/log/route.ts',
  ]
  
  for (const route of apiRoutes) {
    const routePath = path.join(process.cwd(), route)
    const exists = fs.existsSync(routePath)
    console.log(`   ${exists ? '✅' : '❌'} ${route}`)
  }
  console.log('')
  
  // Check environment variables
  console.log('🔧 ANALYTICS & LOGGING ENVIRONMENT:')
  const analyticsEnvVars = [
    'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
    'NEXT_PUBLIC_FEATURE_ANALYTICS',
    'NEXT_PUBLIC_FEATURE_NOTIFICATIONS',
  ]
  
  for (const envVar of analyticsEnvVars) {
    const value = process.env[envVar]
    const status = value ? '✅' : '❌'
    console.log(`   ${status} ${envVar}${value ? `=${value}` : ''}`)
  }
  console.log('')
  
  // Check database schema requirements
  console.log('🗄️ DATABASE SCHEMA REQUIREMENTS:')
  console.log('   Required tables:')
  console.log('   • analytics_events (event tracking)')
  console.log('   • user_sessions (session management)')
  console.log('   • error_monitoring (error tracking)')
  console.log('   • error_statistics (error stats)')
  console.log('   • application_logs (application logging)')
  console.log('   • log_statistics (log stats)')
  console.log('')
  
  // Analytics recommendations
  console.log('💡 ANALYTICS & LOGGING RECOMMENDATIONS:')
  
  if (!flags.analytics) {
    console.log('   • Enable analytics feature flag')
  }
  
  if (!flags.notifications) {
    console.log('   • Enable notifications feature flag')
  }
  
  const missingEnvVars = analyticsEnvVars.filter(envVar => !process.env[envVar])
  if (missingEnvVars.length > 0) {
    console.log(`   • Set missing environment variables: ${missingEnvVars.join(', ')}`)
  }
  
  console.log('   • Set up Google Analytics 4 property')
  console.log('   • Configure conversion goals in GA4')
  console.log('   • Set up custom dimensions for user properties')
  console.log('   • Configure error monitoring alerts')
  console.log('   • Set up log aggregation and analysis')
  console.log('   • Configure notification channels (Slack, Discord)')
  console.log('   • Test analytics tracking with GA4 DebugView')
  console.log('   • Verify error monitoring with test errors')
  console.log('   • Test logging with different log levels')
  console.log('   • Set up log retention policies')
  console.log('   • Configure log export functionality')
  console.log('   • Test API routes with sample data')
  console.log('   • Verify database schema and indexes')
  console.log('   • Set up monitoring dashboards')
  console.log('   • Configure automated error reporting')
  
  console.log('\n✅ Analytics & Logging system check completed!')
}

// Run the check
checkAnalyticsLoggingSystem().catch(console.error)
