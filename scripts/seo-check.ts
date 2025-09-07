#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

interface SeoIssue {
  file: string
  line: number
  content: string
  issue: string
}

async function checkSeoIssues() {
  console.log('🔍 Checking SEO implementation...\n')
  
  const issues: SeoIssue[] = []
  
  // Check middleware for redirects
  const middlewarePath = 'src/middleware.ts'
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8')
  const middlewareLines = middlewareContent.split('\n')
  
  // Check for www redirect
  const hasWwwRedirect = middlewareContent.includes('www.')
  if (!hasWwwRedirect) {
    issues.push({
      file: middlewarePath,
      line: 0,
      content: 'Middleware',
      issue: 'Missing www. redirect implementation'
    })
  }
  
  // Check for root redirect
  const hasRootRedirect = middlewareContent.includes("pathname === '/'")
  if (!hasRootRedirect) {
    issues.push({
      file: middlewarePath,
      line: 0,
      content: 'Middleware',
      issue: 'Missing root URL (/) redirect to default locale'
    })
  }
  
  // Check sitemap
  const sitemapPath = 'src/app/sitemap.ts'
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
  
  // Check for alternates in sitemap
  const hasAlternates = sitemapContent.includes('alternates')
  if (!hasAlternates) {
    issues.push({
      file: sitemapPath,
      line: 0,
      content: 'Sitemap',
      issue: 'Missing alternates (hreflang) in sitemap'
    })
  }
  
  // Check robots.txt
  const robotsPath = 'src/app/robots.ts'
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8')
  
  // Check for host directive
  const hasHost = robotsContent.includes('host:')
  if (!hasHost) {
    issues.push({
      file: robotsPath,
      line: 0,
      content: 'Robots',
      issue: 'Missing host directive in robots.txt'
    })
  }
  
  // Check hreflang component
  const hreflangPath = 'src/components/hreflang.tsx'
  if (!fs.existsSync(hreflangPath)) {
    issues.push({
      file: hreflangPath,
      line: 0,
      content: 'Hreflang component',
      issue: 'Hreflang component not found'
    })
  } else {
    const hreflangContent = fs.readFileSync(hreflangPath, 'utf-8')
    
    // Check for hreflang tags
    const hasHreflangTags = hreflangContent.includes('hrefLang')
    if (!hasHreflangTags) {
      issues.push({
        file: hreflangPath,
        line: 0,
        content: 'Hreflang component',
        issue: 'Missing hreflang tags implementation'
      })
    }
    
    // Check for canonical
    const hasCanonical = hreflangContent.includes('canonical')
    if (!hasCanonical) {
      issues.push({
        file: hreflangPath,
        line: 0,
        content: 'Hreflang component',
        issue: 'Missing canonical URL implementation'
      })
    }
    
    // Check for x-default
    const hasXDefault = hreflangContent.includes('x-default')
    if (!hasXDefault) {
      issues.push({
        file: hreflangPath,
        line: 0,
        content: 'Hreflang component',
        issue: 'Missing x-default hreflang'
      })
    }
  }
  
  // Check JSON-LD component
  const jsonLdPath = 'src/components/json-ld.tsx'
  if (!fs.existsSync(jsonLdPath)) {
    issues.push({
      file: jsonLdPath,
      line: 0,
      content: 'JSON-LD component',
      issue: 'JSON-LD component not found'
    })
  } else {
    const jsonLdContent = fs.readFileSync(jsonLdPath, 'utf-8')
    
    // Check for schema.org
    const hasSchema = jsonLdContent.includes('schema.org')
    if (!hasSchema) {
      issues.push({
        file: jsonLdPath,
        line: 0,
        content: 'JSON-LD component',
        issue: 'Missing schema.org implementation'
      })
    }
  }
  
  // Check locale layout for SEO components
  const localeLayoutPath = 'src/app/[locale]/layout.tsx'
  const localeLayoutContent = fs.readFileSync(localeLayoutPath, 'utf-8')
  
  // Check for HreflangTags
  const hasHreflangTagsInLayout = localeLayoutContent.includes('<HreflangTags')
  if (!hasHreflangTagsInLayout) {
    issues.push({
      file: localeLayoutPath,
      line: 0,
      content: 'Locale layout',
      issue: 'HreflangTags component not included in layout'
    })
  }
  
  // Check for JsonLd
  const hasJsonLdInLayout = localeLayoutContent.includes('<JsonLd')
  if (!hasJsonLdInLayout) {
    issues.push({
      file: localeLayoutPath,
      line: 0,
      content: 'Locale layout',
      issue: 'JsonLd component not included in layout'
    })
  }
  
  // Report results
  if (issues.length === 0) {
    console.log('✅ No SEO issues found!')
    console.log('✅ SEO implementation is complete:')
    console.log('   - www. redirect implemented')
    console.log('   - Root URL redirect implemented')
    console.log('   - Hreflang tags implemented')
    console.log('   - Canonical URLs implemented')
    console.log('   - JSON-LD schema implemented')
    console.log('   - Sitemap with alternates')
    console.log('   - Robots.txt with host directive')
    return
  }
  
  console.log(`❌ Found ${issues.length} SEO issues:\n`)
  
  for (const issue of issues) {
    console.log(`📁 ${issue.file}`)
    console.log(`   ${issue.content}`)
    console.log(`   ⚠️  ${issue.issue}`)
    console.log('')
  }
  
  console.log('💡 Suggestions:')
  console.log('   - Implement www. redirect in middleware')
  console.log('   - Add root URL redirect to default locale')
  console.log('   - Include hreflang tags for all locales')
  console.log('   - Add canonical URLs for each page')
  console.log('   - Implement JSON-LD structured data')
  console.log('   - Update sitemap with alternates')
  console.log('   - Add host directive to robots.txt')
  
  process.exit(1)
}

// Run the check
checkSeoIssues().catch(console.error)
