#!/usr/bin/env tsx

/**
 * Code Style and UI Kit Check Script
 * Verifies code formatting, linting, and UI component consistency
 */

import { existsSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

interface CheckResult {
  name: string
  status: '✅' | '❌' | '⚠️'
  message: string
  details?: string
}

const checks: CheckResult[] = []

function addCheck(name: string, status: '✅' | '❌' | '⚠️', message: string, details?: string) {
  checks.push({ name, status, message, details })
}

function checkFileExists(filePath: string, description: string): boolean {
  const exists = existsSync(filePath)
  addCheck(
    description,
    exists ? '✅' : '❌',
    exists ? 'File exists' : 'File missing',
    exists ? filePath : `Expected: ${filePath}`
  )
  return exists
}

function checkFileContent(filePath: string, description: string, requiredContent: string[]): boolean {
  if (!existsSync(filePath)) {
    addCheck(description, '❌', 'File missing', `Expected: ${filePath}`)
    return false
  }

  try {
    const content = readFileSync(filePath, 'utf-8')
    const missingContent = requiredContent.filter(item => !content.includes(item))
    
    if (missingContent.length === 0) {
      addCheck(description, '✅', 'All required content found')
      return true
    } else {
      addCheck(description, '⚠️', 'Some content missing', `Missing: ${missingContent.join(', ')}`)
      return false
    }
  } catch (error) {
    addCheck(description, '❌', 'Error reading file', String(error))
    return false
  }
}

function runCommand(command: string, description: string): boolean {
  try {
    execSync(command, { stdio: 'pipe' })
    addCheck(description, '✅', 'Command executed successfully')
    return true
  } catch (error) {
    addCheck(description, '❌', 'Command failed', String(error))
    return false
  }
}

function checkESLintConfiguration() {
  console.log('🔍 Checking ESLint Configuration...')
  
  if (checkFileExists('.eslintrc.json', 'ESLint Configuration')) {
    const requiredRules = [
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/no-explicit-any',
      'react/react-in-jsx-scope',
      'react-hooks/rules-of-hooks',
      'no-console',
      'prefer-const',
      'quotes',
      'semi',
      'indent',
      'import/order'
    ]
    checkFileContent('.eslintrc.json', 'ESLint Rules', requiredRules)
  }
  
  // Check if ESLint can run without errors
  runCommand('npx eslint --version', 'ESLint Installation')
}

function checkPrettierConfiguration() {
  console.log('💅 Checking Prettier Configuration...')
  
  checkFileExists('.prettierrc', 'Prettier Configuration')
  checkFileExists('.prettierignore', 'Prettier Ignore File')
  
  if (checkFileExists('.prettierrc', 'Prettier Config')) {
    const requiredOptions = [
      'semi',
      'trailingComma',
      'singleQuote',
      'printWidth',
      'tabWidth',
      'useTabs',
      'bracketSpacing',
      'arrowParens',
      'endOfLine'
    ]
    checkFileContent('.prettierrc', 'Prettier Options', requiredOptions)
  }
  
  // Check if Prettier can run without errors
  runCommand('npx prettier --version', 'Prettier Installation')
}

function checkHuskyConfiguration() {
  console.log('🐕 Checking Husky Configuration...')
  
  checkFileExists('.husky/pre-commit', 'Pre-commit Hook')
  checkFileExists('.lintstagedrc.json', 'Lint-staged Configuration')
  
  if (checkFileExists('.lintstagedrc.json', 'Lint-staged Config')) {
    const requiredConfig = [
      'eslint --fix',
      'prettier --write',
      '*.{js,jsx,ts,tsx}',
      '*.{json,md,yml,yaml}'
    ]
    checkFileContent('.lintstagedrc.json', 'Lint-staged Rules', requiredConfig)
  }
}

function checkUIComponents() {
  console.log('🎨 Checking UI Components...')
  
  const uiComponents = [
    'src/components/ui/alert.tsx',
    'src/components/ui/avatar.tsx',
    'src/components/ui/badge.tsx',
    'src/components/ui/button.tsx',
    'src/components/ui/card.tsx',
    'src/components/ui/dialog.tsx',
    'src/components/ui/dropdown-menu.tsx',
    'src/components/ui/input.tsx',
    'src/components/ui/scroll-area.tsx',
    'src/components/ui/select.tsx',
    'src/components/ui/separator.tsx',
    'src/components/ui/textarea.tsx',
    'src/components/ui/toast.tsx'
  ]
  
  uiComponents.forEach(component => {
    checkFileExists(component, `UI Component: ${component.split('/').pop()}`)
  })
  
  // Check if components have proper exports
  const componentFiles = uiComponents.filter(file => existsSync(file))
  componentFiles.forEach(file => {
    try {
      const content = readFileSync(file, 'utf-8')
      const hasExport = content.includes('export') || content.includes('export default')
      addCheck(
        `Export Check: ${file.split('/').pop()}`,
        hasExport ? '✅' : '❌',
        hasExport ? 'Has exports' : 'Missing exports'
      )
    } catch (error) {
      addCheck(`Export Check: ${file.split('/').pop()}`, '❌', 'Error reading file')
    }
  })
}

function checkPackageJsonScripts() {
  console.log('📦 Checking Package.json Scripts...')
  
  if (checkFileExists('package.json', 'Package.json')) {
    const requiredScripts = [
      '"lint"',
      '"lint:fix"',
      '"format"',
      '"format:check"',
      '"type-check"',
      '"prepare"'
    ]
    checkFileContent('package.json', 'Code Style Scripts', requiredScripts)
  }
}

function checkTypeScriptConfiguration() {
  console.log('📝 Checking TypeScript Configuration...')
  
  checkFileExists('tsconfig.json', 'TypeScript Configuration')
  
  if (checkFileExists('tsconfig.json', 'TSConfig')) {
    const requiredOptions = [
      'strict',
      'noUnusedLocals',
      'noUnusedParameters',
      'exactOptionalPropertyTypes',
      'noImplicitReturns',
      'noFallthroughCasesInSwitch',
      'noUncheckedIndexedAccess',
      'noImplicitOverride'
    ]
    checkFileContent('tsconfig.json', 'TypeScript Strict Options', requiredOptions)
  }
}

function checkCodeQuality() {
  console.log('🔍 Checking Code Quality...')
  
  // Run linting check
  try {
    execSync('npx eslint src --ext .ts,.tsx --max-warnings 0', { stdio: 'pipe' })
    addCheck('ESLint Check', '✅', 'No linting errors found')
  } catch (error) {
    addCheck('ESLint Check', '⚠️', 'Linting issues found', 'Run npm run lint:fix to fix')
  }
  
  // Run formatting check
  try {
    execSync('npx prettier --check src', { stdio: 'pipe' })
    addCheck('Prettier Check', '✅', 'Code is properly formatted')
  } catch (error) {
    addCheck('Prettier Check', '⚠️', 'Formatting issues found', 'Run npm run format to fix')
  }
  
  // Run type check
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' })
    addCheck('TypeScript Check', '✅', 'No type errors found')
  } catch (error) {
    addCheck('TypeScript Check', '⚠️', 'Type errors found', 'Run npm run type-check to see details')
  }
}

function checkImportOrganization() {
  console.log('📚 Checking Import Organization...')
  
  const srcFiles = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/components/header.tsx',
    'src/components/footer.tsx'
  ]
  
  srcFiles.forEach(file => {
    if (existsSync(file)) {
      try {
        const content = readFileSync(file, 'utf-8')
        const lines = content.split('\n')
        const importLines = lines.filter(line => line.trim().startsWith('import'))
        
        if (importLines.length > 0) {
          const hasProperOrder = importLines.every((line, index) => {
            if (index === 0) return true
            const prevLine = importLines[index - 1]
            const currentLine = line
            
            // Check if imports are properly ordered (external first, then internal)
            const prevIsExternal = prevLine.includes('from \'') && !prevLine.includes('from \'@/')
            const currentIsExternal = currentLine.includes('from \'') && !currentLine.includes('from \'@/')
            
            if (prevIsExternal && !currentIsExternal) return false
            return true
          })
          
          addCheck(
            `Import Order: ${file.split('/').pop()}`,
            hasProperOrder ? '✅' : '⚠️',
            hasProperOrder ? 'Imports properly ordered' : 'Imports need reordering'
          )
        }
      } catch (error) {
        addCheck(`Import Order: ${file.split('/').pop()}`, '❌', 'Error reading file')
      }
    }
  })
}

function checkComponentConsistency() {
  console.log('🎯 Checking Component Consistency...')
  
  const componentFiles = [
    'src/components/ui/button.tsx',
    'src/components/ui/input.tsx',
    'src/components/ui/card.tsx'
  ]
  
  componentFiles.forEach(file => {
    if (existsSync(file)) {
      try {
        const content = readFileSync(file, 'utf-8')
        const hasForwardRef = content.includes('React.forwardRef')
        const hasDisplayName = content.includes('.displayName')
        const hasProperExports = content.includes('export {') || content.includes('export default')
        
        addCheck(
          `Component Structure: ${file.split('/').pop()}`,
          hasForwardRef && hasDisplayName && hasProperExports ? '✅' : '⚠️',
          hasForwardRef && hasDisplayName && hasProperExports ? 'Proper component structure' : 'Missing component patterns'
        )
      } catch (error) {
        addCheck(`Component Structure: ${file.split('/').pop()}`, '❌', 'Error reading file')
      }
    }
  })
}

function generateReport() {
  console.log('\n📋 Code Style and UI Kit Check Report')
  console.log('=' .repeat(50))
  
  const passed = checks.filter(c => c.status === '✅').length
  const failed = checks.filter(c => c.status === '❌').length
  const warnings = checks.filter(c => c.status === '⚠️').length
  
  console.log(`\n📊 Summary:`)
  console.log(`   ✅ Passed: ${passed}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   ⚠️  Warnings: ${warnings}`)
  console.log(`   📈 Total: ${checks.length}`)
  
  console.log('\n📝 Detailed Results:')
  checks.forEach(check => {
    console.log(`   ${check.status} ${check.name}: ${check.message}`)
    if (check.details) {
      console.log(`      ${check.details}`)
    }
  })
  
  if (failed > 0) {
    console.log('\n❌ Critical Issues Found:')
    checks.filter(c => c.status === '❌').forEach(check => {
      console.log(`   • ${check.name}: ${check.message}`)
    })
  }
  
  if (warnings > 0) {
    console.log('\n⚠️  Warnings:')
    checks.filter(c => c.status === '⚠️').forEach(check => {
      console.log(`   • ${check.name}: ${check.message}`)
    })
  }
  
  console.log('\n💡 Recommendations:')
  console.log('   • Run npm run lint:fix to fix linting issues')
  console.log('   • Run npm run format to fix formatting issues')
  console.log('   • Run npm run type-check to verify TypeScript')
  console.log('   • Ensure all UI components follow consistent patterns')
  console.log('   • Use proper import organization (external first, then internal)')
  console.log('   • Add proper TypeScript types to all components')
  console.log('   • Use forwardRef for components that need ref forwarding')
  console.log('   • Add displayName to all components for better debugging')
  console.log('   • Use consistent naming conventions (camelCase for variables, PascalCase for components)')
  console.log('   • Add proper JSDoc comments to complex functions')
  console.log('   • Use proper error handling and validation')
  
  return failed === 0
}

// Main execution
function main() {
  console.log('🎨 MySonAI Code Style and UI Kit Check')
  console.log('=' .repeat(40))
  
  checkESLintConfiguration()
  checkPrettierConfiguration()
  checkHuskyConfiguration()
  checkUIComponents()
  checkPackageJsonScripts()
  checkTypeScriptConfiguration()
  checkCodeQuality()
  checkImportOrganization()
  checkComponentConsistency()
  
  const success = generateReport()
  
  if (success) {
    console.log('\n🎉 Code style check completed successfully!')
    process.exit(0)
  } else {
    console.log('\n❌ Code style check failed. Please fix the issues above.')
    process.exit(1)
  }
}

main()
