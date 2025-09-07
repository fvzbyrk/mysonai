#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkPerformanceOptimizations() {
  console.log('⚡ Checking Performance & Accessibility Optimizations...\n')
  
  const flags = getFeatureFlags()
  
  console.log('📊 PERFORMANCE SYSTEM STATUS:')
  console.log(`   Performance Monitoring: ${flags.performance ? '✅' : '❌'}`)
  console.log(`   Accessibility Features: ${flags.accessibility ? '✅' : '❌'}`)
  console.log('')
  
  // Check performance-related files
  const performanceFiles = [
    'src/components/lazy-image.tsx',
    'src/components/virtual-scroll.tsx',
    'src/hooks/usePerformance.ts',
    'src/hooks/useAccessibility.ts',
  ]
  
  console.log('📁 PERFORMANCE FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of performanceFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check Next.js config optimizations
  console.log('⚙️ NEXT.JS CONFIG OPTIMIZATIONS:')
  try {
    const nextConfigContent = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf-8')
    
    const hasImageOptimization = nextConfigContent.includes('images:')
    const hasCompression = nextConfigContent.includes('compress: true')
    const hasSwcMinify = nextConfigContent.includes('swcMinify: true')
    const hasConsoleRemoval = nextConfigContent.includes('removeConsole')
    const hasBundleAnalyzer = nextConfigContent.includes('BundleAnalyzerPlugin')
    const hasPackageOptimization = nextConfigContent.includes('optimizePackageImports')
    
    console.log(`   ${hasImageOptimization ? '✅' : '❌'} Image optimization configured`)
    console.log(`   ${hasCompression ? '✅' : '❌'} Compression enabled`)
    console.log(`   ${hasSwcMinify ? '✅' : '❌'} SWC minification enabled`)
    console.log(`   ${hasConsoleRemoval ? '✅' : '❌'} Console removal in production`)
    console.log(`   ${hasBundleAnalyzer ? '✅' : '❌'} Bundle analyzer configured`)
    console.log(`   ${hasPackageOptimization ? '✅' : '❌'} Package import optimization`)
  } catch (error) {
    console.log('   ❌ Next.js config not found')
  }
  console.log('')
  
  // Check package.json for performance dependencies
  console.log('📦 PERFORMANCE DEPENDENCIES:')
  try {
    const packageJsonContent = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
    const packageJson = JSON.parse(packageJsonContent)
    
    const hasWebpackAnalyzer = packageJson.devDependencies?.['webpack-bundle-analyzer']
    const hasFramerMotion = packageJson.dependencies?.['framer-motion']
    const hasNextThemes = packageJson.dependencies?.['next-themes']
    
    console.log(`   ${hasWebpackAnalyzer ? '✅' : '❌'} webpack-bundle-analyzer`)
    console.log(`   ${hasFramerMotion ? '✅' : '❌'} framer-motion (animations)`)
    console.log(`   ${hasNextThemes ? '✅' : '❌'} next-themes (theme switching)`)
  } catch (error) {
    console.log('   ❌ package.json not found')
  }
  console.log('')
  
  // Check component optimizations
  console.log('🧩 COMPONENT OPTIMIZATIONS:')
  
  // Check if LazyImage component exists and has optimizations
  try {
    const lazyImageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/lazy-image.tsx'), 'utf-8')
    
    const hasIntersectionObserver = lazyImageContent.includes('IntersectionObserver')
    const hasImageOptimization = lazyImageContent.includes('next/image')
    const hasBlurPlaceholder = lazyImageContent.includes('blurDataURL')
    const hasErrorHandling = lazyImageContent.includes('onError')
    const hasLoadingStates = lazyImageContent.includes('isLoaded')
    
    console.log(`   ${hasIntersectionObserver ? '✅' : '❌'} LazyImage: Intersection Observer`)
    console.log(`   ${hasImageOptimization ? '✅' : '❌'} LazyImage: Next.js Image optimization`)
    console.log(`   ${hasBlurPlaceholder ? '✅' : '❌'} LazyImage: Blur placeholder`)
    console.log(`   ${hasErrorHandling ? '✅' : '❌'} LazyImage: Error handling`)
    console.log(`   ${hasLoadingStates ? '✅' : '❌'} LazyImage: Loading states`)
  } catch (error) {
    console.log('   ❌ LazyImage component not found')
  }
  
  // Check VirtualScroll component
  try {
    const virtualScrollContent = fs.readFileSync(path.join(process.cwd(), 'src/components/virtual-scroll.tsx'), 'utf-8')
    
    const hasVirtualization = virtualScrollContent.includes('visibleRange')
    const hasOverscan = virtualScrollContent.includes('overscan')
    const hasDynamicHeights = virtualScrollContent.includes('getItemHeight')
    
    console.log(`   ${hasVirtualization ? '✅' : '❌'} VirtualScroll: Virtualization`)
    console.log(`   ${hasOverscan ? '✅' : '❌'} VirtualScroll: Overscan optimization`)
    console.log(`   ${hasDynamicHeights ? '✅' : '❌'} VirtualScroll: Dynamic heights`)
  } catch (error) {
    console.log('   ❌ VirtualScroll component not found')
  }
  console.log('')
  
  // Check performance monitoring
  console.log('📈 PERFORMANCE MONITORING:')
  try {
    const performanceContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/usePerformance.ts'), 'utf-8')
    
    const hasCoreWebVitals = performanceContent.includes('lcp') && performanceContent.includes('fid') && performanceContent.includes('cls')
    const hasPerformanceObserver = performanceContent.includes('PerformanceObserver')
    const hasMemoryUsage = performanceContent.includes('memory')
    const hasNetworkInfo = performanceContent.includes('connection')
    const hasScoring = performanceContent.includes('getPerformanceScore')
    
    console.log(`   ${hasCoreWebVitals ? '✅' : '❌'} Core Web Vitals monitoring`)
    console.log(`   ${hasPerformanceObserver ? '✅' : '❌'} Performance Observer API`)
    console.log(`   ${hasMemoryUsage ? '✅' : '❌'} Memory usage tracking`)
    console.log(`   ${hasNetworkInfo ? '✅' : '❌'} Network information`)
    console.log(`   ${hasScoring ? '✅' : '❌'} Performance scoring`)
  } catch (error) {
    console.log('   ❌ Performance monitoring hook not found')
  }
  console.log('')
  
  // Check accessibility features
  console.log('♿ ACCESSIBILITY FEATURES:')
  try {
    const accessibilityContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useAccessibility.ts'), 'utf-8')
    
    const hasReducedMotion = accessibilityContent.includes('prefers-reduced-motion')
    const hasHighContrast = accessibilityContent.includes('prefers-contrast')
    const hasColorScheme = accessibilityContent.includes('prefers-color-scheme')
    const hasScreenReader = accessibilityContent.includes('screenReader')
    const hasFocusManagement = accessibilityContent.includes('focusElement')
    const hasAriaSupport = accessibilityContent.includes('aria-label')
    const hasKeyboardNavigation = accessibilityContent.includes('keyboardNavigation')
    
    console.log(`   ${hasReducedMotion ? '✅' : '❌'} Reduced motion preference`)
    console.log(`   ${hasHighContrast ? '✅' : '❌'} High contrast preference`)
    console.log(`   ${hasColorScheme ? '✅' : '❌'} Color scheme preference`)
    console.log(`   ${hasScreenReader ? '✅' : '❌'} Screen reader detection`)
    console.log(`   ${hasFocusManagement ? '✅' : '❌'} Focus management`)
    console.log(`   ${hasAriaSupport ? '✅' : '❌'} ARIA support`)
    console.log(`   ${hasKeyboardNavigation ? '✅' : '❌'} Keyboard navigation`)
  } catch (error) {
    console.log('   ❌ Accessibility hook not found')
  }
  console.log('')
  
  // Check CSS optimizations
  console.log('🎨 CSS OPTIMIZATIONS:')
  try {
    const globalsCssContent = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf-8')
    
    const hasTailwind = globalsCssContent.includes('@tailwind')
    const hasCustomProperties = globalsCssContent.includes('--')
    const hasResponsiveDesign = globalsCssContent.includes('@media') || globalsCssContent.includes('sm:') || globalsCssContent.includes('md:')
    
    console.log(`   ${hasTailwind ? '✅' : '❌'} Tailwind CSS`)
    console.log(`   ${hasCustomProperties ? '✅' : '❌'} CSS custom properties`)
    console.log(`   ${hasResponsiveDesign ? '✅' : '❌'} Responsive design`)
  } catch (error) {
    console.log('   ❌ Global CSS not found')
  }
  console.log('')
  
  // Check environment variables
  console.log('🔧 PERFORMANCE ENVIRONMENT:')
  const performanceEnvVars = [
    'NEXT_PUBLIC_FEATURE_PERFORMANCE',
    'NEXT_PUBLIC_FEATURE_ACCESSIBILITY',
    'ANALYZE',
  ]
  
  for (const envVar of performanceEnvVars) {
    const value = process.env[envVar]
    const status = value ? '✅' : '❌'
    console.log(`   ${status} ${envVar}${value ? `=${value}` : ''}`)
  }
  console.log('')
  
  // Performance recommendations
  console.log('💡 PERFORMANCE RECOMMENDATIONS:')
  
  if (!flags.performance) {
    console.log('   • Enable performance feature flag')
  }
  
  if (!flags.accessibility) {
    console.log('   • Enable accessibility feature flag')
  }
  
  const missingEnvVars = performanceEnvVars.filter(envVar => !process.env[envVar])
  if (missingEnvVars.length > 0) {
    console.log(`   • Set missing environment variables: ${missingEnvVars.join(', ')}`)
  }
  
  console.log('   • Run bundle analyzer: ANALYZE=true npm run build')
  console.log('   • Test Core Web Vitals with Lighthouse')
  console.log('   • Verify image optimization with WebP/AVIF')
  console.log('   • Test lazy loading with slow network')
  console.log('   • Verify virtual scrolling with large lists')
  console.log('   • Test accessibility with screen readers')
  console.log('   • Verify keyboard navigation')
  console.log('   • Test reduced motion preferences')
  console.log('   • Check color contrast ratios')
  console.log('   • Verify focus management')
  console.log('   • Test responsive design on various devices')
  
  console.log('\n✅ Performance & Accessibility check completed!')
}

// Run the check
checkPerformanceOptimizations().catch(console.error)
