#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkBlogDocsSystem() {
  console.log('📝 Checking Blog & Documentation System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('📊 BLOG & DOCS SYSTEM STATUS:')
  console.log(`   Blog Feature Enabled: ${flags.blog ? '✅' : '❌'}`)
  console.log(`   API Feature Enabled: ${flags.api ? '✅' : '❌'}`)
  console.log(`   Docs Feature Enabled: ${flags.api ? '✅' : '❌'} (uses API flag)`)
  console.log('')
  
  // Check blog/docs-related files
  const blogDocsFiles = [
    'src/hooks/useBlog.ts',
    'src/app/[locale]/blog/page.tsx',
    'src/app/[locale]/blog/[slug]/page.tsx',
    'src/app/[locale]/docs/page.tsx',
  ]
  
  console.log('📁 BLOG & DOCS FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of blogDocsFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check environment variables
  console.log('🔧 BLOG & DOCS ENVIRONMENT:')
  const blogDocsEnvVars = [
    'NEXT_PUBLIC_FEATURE_BLOG',
    'NEXT_PUBLIC_FEATURE_API',
  ]
  
  for (const envVar of blogDocsEnvVars) {
    const value = process.env[envVar]
    const status = value ? '✅' : '❌'
    console.log(`   ${status} ${envVar}${value ? `=${value}` : ''}`)
  }
  console.log('')
  
  // Check component integration
  console.log('🔗 BLOG & DOCS INTEGRATION CHECK:')
  
  // Check if Blog page uses FeatureGuard
  try {
    const blogContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/blog/page.tsx'), 'utf-8')
    const hasFeatureGuard = blogContent.includes('FeatureGuard')
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Blog page uses FeatureGuard`)
  } catch (error) {
    console.log('   ❌ Blog page not found')
  }
  
  // Check if Docs page uses FeatureGuard
  try {
    const docsContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/docs/page.tsx'), 'utf-8')
    const hasFeatureGuard = docsContent.includes('FeatureGuard')
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Docs page uses FeatureGuard`)
  } catch (error) {
    console.log('   ❌ Docs page not found')
  }
  
  // Check if useBlog hook exists
  try {
    const useBlogContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useBlog.ts'), 'utf-8')
    const hasBlogInterface = useBlogContent.includes('BlogPost')
    const hasBlogMethods = useBlogContent.includes('getPost')
    console.log(`   ${hasBlogInterface ? '✅' : '❌'} useBlog hook has BlogPost interface`)
    console.log(`   ${hasBlogMethods ? '✅' : '❌'} useBlog hook has blog methods`)
  } catch (error) {
    console.log('   ❌ useBlog hook not found')
  }
  
  console.log('')
  
  // Check blog content structure
  console.log('📋 BLOG CONTENT STRUCTURE:')
  try {
    const blogPageContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/blog/page.tsx'), 'utf-8')
    
    // Check for blog posts data
    const hasBlogPosts = blogPageContent.includes('blogPosts')
    const hasCategories = blogPageContent.includes('categories')
    const hasFeaturedPosts = blogPageContent.includes('featuredPosts')
    const hasRegularPosts = blogPageContent.includes('regularPosts')
    
    console.log(`   ${hasBlogPosts ? '✅' : '❌'} Blog posts data structure`)
    console.log(`   ${hasCategories ? '✅' : '❌'} Categories filter`)
    console.log(`   ${hasFeaturedPosts ? '✅' : '❌'} Featured posts section`)
    console.log(`   ${hasRegularPosts ? '✅' : '❌'} Regular posts section`)
  } catch (error) {
    console.log('   ❌ Blog page content not found')
  }
  
  console.log('')
  
  // Check docs content structure
  console.log('📚 DOCS CONTENT STRUCTURE:')
  try {
    const docsPageContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/docs/page.tsx'), 'utf-8')
    
    // Check for docs sections
    const hasDocSections = docsPageContent.includes('docSections')
    const hasQuickStart = docsPageContent.includes('Hızlı Başlangıç')
    const hasApiReference = docsPageContent.includes('API Referansı')
    const hasIntegrations = docsPageContent.includes('Entegrasyonlar')
    
    console.log(`   ${hasDocSections ? '✅' : '❌'} Documentation sections`)
    console.log(`   ${hasQuickStart ? '✅' : '❌'} Quick start section`)
    console.log(`   ${hasApiReference ? '✅' : '❌'} API reference section`)
    console.log(`   ${hasIntegrations ? '✅' : '❌'} Integrations section`)
  } catch (error) {
    console.log('   ❌ Docs page content not found')
  }
  
  console.log('')
  
  // Check navigation integration
  console.log('🧭 NAVIGATION INTEGRATION:')
  
  // Check if Header has blog link
  try {
    const headerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/header.tsx'), 'utf-8')
    const hasBlogLink = headerContent.includes('nav.blog')
    console.log(`   ${hasBlogLink ? '✅' : '❌'} Header has blog navigation link`)
  } catch (error) {
    console.log('   ❌ Header component not found')
  }
  
  // Check if Footer has docs link
  try {
    const footerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/footer.tsx'), 'utf-8')
    const hasDocsLink = footerContent.includes('nav.docs')
    console.log(`   ${hasDocsLink ? '✅' : '❌'} Footer has docs navigation link`)
  } catch (error) {
    console.log('   ❌ Footer component not found')
  }
  
  console.log('')
  
  // Check SEO and metadata
  console.log('🔍 SEO & METADATA:')
  try {
    const blogPageContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/blog/page.tsx'), 'utf-8')
    const docsPageContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/docs/page.tsx'), 'utf-8')
    
    const blogHasMetadata = blogPageContent.includes('generateMetadata')
    const docsHasMetadata = docsPageContent.includes('generateMetadata')
    const blogHasTitle = blogPageContent.includes('title:')
    const docsHasTitle = docsPageContent.includes('title:')
    
    console.log(`   ${blogHasMetadata ? '✅' : '❌'} Blog page has metadata generation`)
    console.log(`   ${docsHasMetadata ? '✅' : '❌'} Docs page has metadata generation`)
    console.log(`   ${blogHasTitle ? '✅' : '❌'} Blog page has SEO title`)
    console.log(`   ${docsHasTitle ? '✅' : '❌'} Docs page has SEO title`)
  } catch (error) {
    console.log('   ❌ SEO metadata check failed')
  }
  
  console.log('')
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS:')
  if (!flags.blog) {
    console.log('   • Enable blog feature flag for blog functionality')
  }
  if (!flags.api) {
    console.log('   • Enable API feature flag for documentation')
  }
  
  const missingEnvVars = blogDocsEnvVars.filter(envVar => !process.env[envVar])
  if (missingEnvVars.length > 0) {
    console.log(`   • Set missing environment variables: ${missingEnvVars.join(', ')}`)
  }
  
  console.log('   • Test blog functionality: list, search, categories')
  console.log('   • Test documentation sections and navigation')
  console.log('   • Verify SEO metadata for blog posts and docs')
  console.log('   • Test responsive design on mobile devices')
  console.log('   • Verify search functionality in blog and docs')
  console.log('   • Test related posts and cross-references')
  
  console.log('\n✅ Blog & Documentation system check completed!')
}

// Run the check
checkBlogDocsSystem().catch(console.error)
