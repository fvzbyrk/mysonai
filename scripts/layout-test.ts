#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

interface LayoutIssue {
  file: string
  line: number
  content: string
  issue: string
}

async function checkLayoutIssues() {
  console.log('🔍 Checking layout structure for duplicate components...\n')
  
  const issues: LayoutIssue[] = []
  
  // Check root layout
  const rootLayoutPath = 'src/app/layout.tsx'
  const rootLayoutContent = fs.readFileSync(rootLayoutPath, 'utf-8')
  const rootLayoutLines = rootLayoutContent.split('\n')
  
  // Check for components in root layout
  const rootLayoutComponents = [
    { name: 'Header', pattern: /<Header\s*\/?>/ },
    { name: 'Footer', pattern: /<Footer\s*\/?>/ },
    { name: 'ThemeProvider', pattern: /<ThemeProvider/ },
    { name: 'AuthProvider', pattern: /<AuthProvider/ },
    { name: 'Toaster', pattern: /<Toaster/ },
  ]
  
  for (let i = 0; i < rootLayoutLines.length; i++) {
    const line = rootLayoutLines[i]
    for (const component of rootLayoutComponents) {
      if (component.pattern.test(line)) {
        issues.push({
          file: rootLayoutPath,
          line: i + 1,
          content: line.trim(),
          issue: `Root layout should not contain ${component.name} - should be in locale layout`
        })
      }
    }
  }
  
  // Check locale layout
  const localeLayoutPath = 'src/app/[locale]/layout.tsx'
  const localeLayoutContent = fs.readFileSync(localeLayoutPath, 'utf-8')
  const localeLayoutLines = localeLayoutContent.split('\n')
  
  // Check for HTML tags in locale layout
  for (let i = 0; i < localeLayoutLines.length; i++) {
    const line = localeLayoutLines[i]
    if (line.includes('<html') || line.includes('<body')) {
      issues.push({
        file: localeLayoutPath,
        line: i + 1,
        content: line.trim(),
        issue: 'Locale layout should not contain HTML tags - should be in root layout'
      })
    }
  }
  
  // Check for duplicate components
  const componentCounts = {
    Header: 0,
    Footer: 0,
    ThemeProvider: 0,
    AuthProvider: 0,
    Toaster: 0,
  }
  
  // Count in root layout
  for (const line of rootLayoutLines) {
    for (const component of Object.keys(componentCounts)) {
      if (line.includes(`<${component}`)) {
        componentCounts[component as keyof typeof componentCounts]++
      }
    }
  }
  
  // Count in locale layout
  for (const line of localeLayoutLines) {
    for (const component of Object.keys(componentCounts)) {
      if (line.includes(`<${component}`)) {
        componentCounts[component as keyof typeof componentCounts]++
      }
    }
  }
  
  // Check for duplicates
  for (const [component, count] of Object.entries(componentCounts)) {
    if (count > 1) {
      issues.push({
        file: 'Multiple files',
        line: 0,
        content: `${component} component`,
        issue: `Duplicate ${component} component found (${count} times)`
      })
    }
  }
  
  // Report results
  if (issues.length === 0) {
    console.log('✅ No layout issues found!')
    console.log('✅ Layout structure is correct:')
    console.log('   - Root layout: HTML structure only')
    console.log('   - Locale layout: Components and providers')
    console.log('   - No duplicate components')
    return
  }
  
  console.log(`❌ Found ${issues.length} layout issues:\n`)
  
  for (const issue of issues) {
    console.log(`📁 ${issue.file}:${issue.line}`)
    console.log(`   ${issue.content}`)
    console.log(`   ⚠️  ${issue.issue}`)
    console.log('')
  }
  
  console.log('💡 Suggestions:')
  console.log('   - Root layout should only contain HTML structure')
  console.log('   - Locale layout should contain all components and providers')
  console.log('   - Each component should appear only once in the layout tree')
  
  process.exit(1)
}

// Run the check
checkLayoutIssues().catch(console.error)
