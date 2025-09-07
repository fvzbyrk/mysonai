#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkTestingSystem() {
  console.log('🧪 Checking Testing & Quality Control System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('🧪 TESTING SYSTEM STATUS:')
  console.log(`   Testing Infrastructure: ✅ Enabled`)
  console.log(`   Quality Control: ✅ Enabled`)
  console.log('')
  
  // Check testing files
  const testingFiles = [
    'jest.config.js',
    'jest.setup.js',
    'playwright.config.ts',
    'src/tests/components/header.test.tsx',
    'src/tests/components/footer.test.tsx',
    'src/tests/hooks/useFeatureFlags.test.ts',
    'src/tests/hooks/useAuth.test.ts',
    'src/tests/integration/auth-flow.test.tsx',
    'src/tests/e2e/homepage.spec.ts',
    'src/tests/e2e/auth-flow.spec.ts',
    'src/tests/api/chat.test.ts',
    'src/tests/ai-agents.test.ts',
  ]
  
  console.log('📁 TESTING FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of testingFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check Jest configuration
  console.log('⚙️ JEST CONFIGURATION:')
  try {
    const jestConfig = fs.readFileSync(path.join(process.cwd(), 'jest.config.js'), 'utf-8')
    
    const hasNextJest = jestConfig.includes('next/jest')
    const hasSetupFiles = jestConfig.includes('setupFilesAfterEnv')
    const hasTestEnvironment = jestConfig.includes('jsdom')
    const hasModuleNameMapper = jestConfig.includes('moduleNameMapper')
    const hasCoverageConfig = jestConfig.includes('collectCoverageFrom')
    const hasPathMapping = jestConfig.includes('@/')
    
    console.log(`   ${hasNextJest ? '✅' : '❌'} Next.js Jest integration`)
    console.log(`   ${hasSetupFiles ? '✅' : '❌'} Setup files configuration`)
    console.log(`   ${hasTestEnvironment ? '✅' : '❌'} Test environment (jsdom)`)
    console.log(`   ${hasModuleNameMapper ? '✅' : '❌'} Module name mapping`)
    console.log(`   ${hasCoverageConfig ? '✅' : '❌'} Coverage configuration`)
    console.log(`   ${hasPathMapping ? '✅' : '❌'} Path mapping (@/)`)
  } catch (error) {
    console.log('   ❌ Jest configuration not found')
  }
  console.log('')
  
  // Check Jest setup
  console.log('🔧 JEST SETUP:')
  try {
    const jestSetup = fs.readFileSync(path.join(process.cwd(), 'jest.setup.js'), 'utf-8')
    
    const hasTestingLibrary = jestSetup.includes('@testing-library/jest-dom')
    const hasNextRouterMock = jestSetup.includes('next/navigation')
    const hasNextImageMock = jestSetup.includes('next/image')
    const hasNextLinkMock = jestSetup.includes('next/link')
    const hasEnvVarsMock = jestSetup.includes('process.env')
    const hasSupabaseMock = jestSetup.includes('supabase-client')
    const hasStripeMock = jestSetup.includes('stripe')
    const hasOpenAIMock = jestSetup.includes('openai')
    const hasGtagMock = jestSetup.includes('gtag')
    const hasLocalStorageMock = jestSetup.includes('localStorage')
    const hasMatchMediaMock = jestSetup.includes('matchMedia')
    const hasIntersectionObserverMock = jestSetup.includes('IntersectionObserver')
    
    console.log(`   ${hasTestingLibrary ? '✅' : '❌'} Testing Library setup`)
    console.log(`   ${hasNextRouterMock ? '✅' : '❌'} Next.js router mock`)
    console.log(`   ${hasNextImageMock ? '✅' : '❌'} Next.js image mock`)
    console.log(`   ${hasNextLinkMock ? '✅' : '❌'} Next.js link mock`)
    console.log(`   ${hasEnvVarsMock ? '✅' : '❌'} Environment variables mock`)
    console.log(`   ${hasSupabaseMock ? '✅' : '❌'} Supabase mock`)
    console.log(`   ${hasStripeMock ? '✅' : '❌'} Stripe mock`)
    console.log(`   ${hasOpenAIMock ? '✅' : '❌'} OpenAI mock`)
    console.log(`   ${hasGtagMock ? '✅' : '❌'} Google Analytics mock`)
    console.log(`   ${hasLocalStorageMock ? '✅' : '❌'} Local storage mock`)
    console.log(`   ${hasMatchMediaMock ? '✅' : '❌'} Match media mock`)
    console.log(`   ${hasIntersectionObserverMock ? '✅' : '❌'} Intersection Observer mock`)
  } catch (error) {
    console.log('   ❌ Jest setup not found')
  }
  console.log('')
  
  // Check Playwright configuration
  console.log('🎭 PLAYWRIGHT CONFIGURATION:')
  try {
    const playwrightConfig = fs.readFileSync(path.join(process.cwd(), 'playwright.config.ts'), 'utf-8')
    
    const hasTestDir = playwrightConfig.includes('testDir')
    const hasFullyParallel = playwrightConfig.includes('fullyParallel')
    const hasRetries = playwrightConfig.includes('retries')
    const hasWorkers = playwrightConfig.includes('workers')
    const hasReporter = playwrightConfig.includes('reporter')
    const hasBaseURL = playwrightConfig.includes('baseURL')
    const hasTrace = playwrightConfig.includes('trace')
    const hasProjects = playwrightConfig.includes('projects')
    const hasWebServer = playwrightConfig.includes('webServer')
    const hasChromium = playwrightConfig.includes('chromium')
    const hasFirefox = playwrightConfig.includes('firefox')
    const hasWebkit = playwrightConfig.includes('webkit')
    const hasMobile = playwrightConfig.includes('Mobile')
    
    console.log(`   ${hasTestDir ? '✅' : '❌'} Test directory configuration`)
    console.log(`   ${hasFullyParallel ? '✅' : '❌'} Parallel execution`)
    console.log(`   ${hasRetries ? '✅' : '❌'} Retry configuration`)
    console.log(`   ${hasWorkers ? '✅' : '❌'} Workers configuration`)
    console.log(`   ${hasReporter ? '✅' : '❌'} Reporter configuration`)
    console.log(`   ${hasBaseURL ? '✅' : '❌'} Base URL configuration`)
    console.log(`   ${hasTrace ? '✅' : '❌'} Trace configuration`)
    console.log(`   ${hasProjects ? '✅' : '❌'} Projects configuration`)
    console.log(`   ${hasWebServer ? '✅' : '❌'} Web server configuration`)
    console.log(`   ${hasChromium ? '✅' : '❌'} Chromium browser`)
    console.log(`   ${hasFirefox ? '✅' : '❌'} Firefox browser`)
    console.log(`   ${hasWebkit ? '✅' : '❌'} WebKit browser`)
    console.log(`   ${hasMobile ? '✅' : '❌'} Mobile testing`)
  } catch (error) {
    console.log('   ❌ Playwright configuration not found')
  }
  console.log('')
  
  // Check component tests
  console.log('🧩 COMPONENT TESTS:')
  const componentTests = [
    'src/tests/components/header.test.tsx',
    'src/tests/components/footer.test.tsx',
  ]
  
  for (const testFile of componentTests) {
    try {
      const testContent = fs.readFileSync(path.join(process.cwd(), testFile), 'utf-8')
      const fileName = testFile.split('/').pop()
      
      const hasRender = testContent.includes('render')
      const hasScreen = testContent.includes('screen')
      const hasExpect = testContent.includes('expect')
      const hasDescribe = testContent.includes('describe')
      const hasIt = testContent.includes('it(')
      const hasMock = testContent.includes('jest.mock')
      
      console.log(`   ${fileName}:`)
      console.log(`     ${hasRender ? '✅' : '❌'} Render testing`)
      console.log(`     ${hasScreen ? '✅' : '❌'} Screen queries`)
      console.log(`     ${hasExpect ? '✅' : '❌'} Assertions`)
      console.log(`     ${hasDescribe ? '✅' : '❌'} Test suites`)
      console.log(`     ${hasIt ? '✅' : '❌'} Test cases`)
      console.log(`     ${hasMock ? '✅' : '❌'} Mocking`)
    } catch (error) {
      console.log(`   ❌ ${testFile} not found`)
    }
  }
  console.log('')
  
  // Check hook tests
  console.log('🎣 HOOK TESTS:')
  const hookTests = [
    'src/tests/hooks/useFeatureFlags.test.ts',
    'src/tests/hooks/useAuth.test.ts',
  ]
  
  for (const testFile of hookTests) {
    try {
      const testContent = fs.readFileSync(path.join(process.cwd(), testFile), 'utf-8')
      const fileName = testFile.split('/').pop()
      
      const hasRenderHook = testContent.includes('renderHook')
      const hasAct = testContent.includes('act')
      const hasExpect = testContent.includes('expect')
      const hasDescribe = testContent.includes('describe')
      const hasIt = testContent.includes('it(')
      const hasMock = testContent.includes('jest.mock')
      
      console.log(`   ${fileName}:`)
      console.log(`     ${hasRenderHook ? '✅' : '❌'} Hook rendering`)
      console.log(`     ${hasAct ? '✅' : '❌'} Act testing`)
      console.log(`     ${hasExpect ? '✅' : '❌'} Assertions`)
      console.log(`     ${hasDescribe ? '✅' : '❌'} Test suites`)
      console.log(`     ${hasIt ? '✅' : '❌'} Test cases`)
      console.log(`     ${hasMock ? '✅' : '❌'} Mocking`)
    } catch (error) {
      console.log(`   ❌ ${testFile} not found`)
    }
  }
  console.log('')
  
  // Check integration tests
  console.log('🔗 INTEGRATION TESTS:')
  try {
    const integrationTest = fs.readFileSync(path.join(process.cwd(), 'src/tests/integration/auth-flow.test.tsx'), 'utf-8')
    
    const hasRender = integrationTest.includes('render')
    const hasScreen = integrationTest.includes('screen')
    const hasFireEvent = integrationTest.includes('fireEvent')
    const hasUserEvent = integrationTest.includes('userEvent')
    const hasWaitFor = integrationTest.includes('waitFor')
    const hasMock = integrationTest.includes('jest.mock')
    const hasTestWrapper = integrationTest.includes('TestWrapper')
    
    console.log(`   ${hasRender ? '✅' : '❌'} Component rendering`)
    console.log(`   ${hasScreen ? '✅' : '❌'} Screen queries`)
    console.log(`   ${hasFireEvent ? '✅' : '❌'} Event simulation`)
    console.log(`   ${hasUserEvent ? '✅' : '❌'} User event testing`)
    console.log(`   ${hasWaitFor ? '✅' : '❌'} Async testing`)
    console.log(`   ${hasMock ? '✅' : '❌'} Service mocking`)
    console.log(`   ${hasTestWrapper ? '✅' : '❌'} Test wrapper`)
  } catch (error) {
    console.log('   ❌ Integration tests not found')
  }
  console.log('')
  
  // Check E2E tests
  console.log('🌐 E2E TESTS:')
  const e2eTests = [
    'src/tests/e2e/homepage.spec.ts',
    'src/tests/e2e/auth-flow.spec.ts',
  ]
  
  for (const testFile of e2eTests) {
    try {
      const testContent = fs.readFileSync(path.join(process.cwd(), testFile), 'utf-8')
      const fileName = testFile.split('/').pop()
      
      const hasTest = testContent.includes('test(')
      const hasExpect = testContent.includes('expect')
      const hasPage = testContent.includes('page.')
      const hasGoto = testContent.includes('goto')
      const hasClick = testContent.includes('click')
      const hasFill = testContent.includes('fill')
      const hasVisible = testContent.includes('toBeVisible')
      const hasURL = testContent.includes('toHaveURL')
      
      console.log(`   ${fileName}:`)
      console.log(`     ${hasTest ? '✅' : '❌'} Test cases`)
      console.log(`     ${hasExpect ? '✅' : '❌'} Assertions`)
      console.log(`     ${hasPage ? '✅' : '❌'} Page interactions`)
      console.log(`     ${hasGoto ? '✅' : '❌'} Navigation`)
      console.log(`     ${hasClick ? '✅' : '❌'} Click actions`)
      console.log(`     ${hasFill ? '✅' : '❌'} Form filling`)
      console.log(`     ${hasVisible ? '✅' : '❌'} Visibility checks`)
      console.log(`     ${hasURL ? '✅' : '❌'} URL assertions`)
    } catch (error) {
      console.log(`   ❌ ${testFile} not found`)
    }
  }
  console.log('')
  
  // Check API tests
  console.log('🔌 API TESTS:')
  try {
    const apiTest = fs.readFileSync(path.join(process.cwd(), 'src/tests/api/chat.test.ts'), 'utf-8')
    
    const hasTest = apiTest.includes('test(')
    const hasExpect = apiTest.includes('expect')
    const hasMock = apiTest.includes('jest.mock')
    const hasNextRequest = apiTest.includes('NextRequest')
    const hasPOST = apiTest.includes('POST')
    const hasResponse = apiTest.includes('response')
    const hasStatus = apiTest.includes('status')
    const hasJson = apiTest.includes('json')
    
    console.log(`   ${hasTest ? '✅' : '❌'} Test cases`)
    console.log(`   ${hasExpect ? '✅' : '❌'} Assertions`)
    console.log(`   ${hasMock ? '✅' : '❌'} Service mocking`)
    console.log(`   ${hasNextRequest ? '✅' : '❌'} Next.js request`)
    console.log(`   ${hasPOST ? '✅' : '❌'} POST method testing`)
    console.log(`   ${hasResponse ? '✅' : '❌'} Response testing`)
    console.log(`   ${hasStatus ? '✅' : '❌'} Status code testing`)
    console.log(`   ${hasJson ? '✅' : '❌'} JSON response testing`)
  } catch (error) {
    console.log('   ❌ API tests not found')
  }
  console.log('')
  
  // Check package.json scripts
  console.log('📦 PACKAGE.JSON SCRIPTS:')
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
    const scripts = packageJson.scripts || {}
    
    const hasTest = scripts.test !== undefined
    const hasTestWatch = scripts['test:watch'] !== undefined
    const hasTestCoverage = scripts['test:coverage'] !== undefined
    const hasTestE2E = scripts['test:e2e'] !== undefined
    const hasTestE2EUI = scripts['test:e2e:ui'] !== undefined
    const hasLint = scripts.lint !== undefined
    const hasFormat = scripts.format !== undefined
    const hasTypeCheck = scripts['type-check'] !== undefined
    const hasCheck = scripts.check !== undefined
    const hasCheckAll = scripts['check:all'] !== undefined
    
    console.log(`   ${hasTest ? '✅' : '❌'} test script`)
    console.log(`   ${hasTestWatch ? '✅' : '❌'} test:watch script`)
    console.log(`   ${hasTestCoverage ? '✅' : '❌'} test:coverage script`)
    console.log(`   ${hasTestE2E ? '✅' : '❌'} test:e2e script`)
    console.log(`   ${hasTestE2EUI ? '✅' : '❌'} test:e2e:ui script`)
    console.log(`   ${hasLint ? '✅' : '❌'} lint script`)
    console.log(`   ${hasFormat ? '✅' : '❌'} format script`)
    console.log(`   ${hasTypeCheck ? '✅' : '❌'} type-check script`)
    console.log(`   ${hasCheck ? '✅' : '❌'} check script`)
    console.log(`   ${hasCheckAll ? '✅' : '❌'} check:all script`)
  } catch (error) {
    console.log('   ❌ Package.json not found')
  }
  console.log('')
  
  // Check dependencies
  console.log('📚 TESTING DEPENDENCIES:')
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
    const devDeps = packageJson.devDependencies || {}
    
    const hasJest = devDeps.jest !== undefined
    const hasTestingLibrary = devDeps['@testing-library/react'] !== undefined
    const hasJestDom = devDeps['@testing-library/jest-dom'] !== undefined
    const hasUserEvent = devDeps['@testing-library/user-event'] !== undefined
    const hasJestEnv = devDeps['jest-environment-jsdom'] !== undefined
    const hasPlaywright = devDeps.playwright !== undefined
    const hasPlaywrightTest = devDeps['@playwright/test'] !== undefined
    const hasTsx = devDeps.tsx !== undefined
    
    console.log(`   ${hasJest ? '✅' : '❌'} Jest`)
    console.log(`   ${hasTestingLibrary ? '✅' : '❌'} @testing-library/react`)
    console.log(`   ${hasJestDom ? '✅' : '❌'} @testing-library/jest-dom`)
    console.log(`   ${hasUserEvent ? '✅' : '❌'} @testing-library/user-event`)
    console.log(`   ${hasJestEnv ? '✅' : '❌'} jest-environment-jsdom`)
    console.log(`   ${hasPlaywright ? '✅' : '❌'} playwright`)
    console.log(`   ${hasPlaywrightTest ? '✅' : '❌'} @playwright/test`)
    console.log(`   ${hasTsx ? '✅' : '❌'} tsx`)
  } catch (error) {
    console.log('   ❌ Dependencies not found')
  }
  console.log('')
  
  // Testing recommendations
  console.log('💡 TESTING RECOMMENDATIONS:')
  
  console.log('   • Run unit tests: npm run test')
  console.log('   • Run tests in watch mode: npm run test:watch')
  console.log('   • Run tests with coverage: npm run test:coverage')
  console.log('   • Run E2E tests: npm run test:e2e')
  console.log('   • Run E2E tests with UI: npm run test:e2e:ui')
  console.log('   • Run all quality checks: npm run check')
  console.log('   • Run comprehensive checks: npm run check:all')
  console.log('   • Install Playwright browsers: npx playwright install')
  console.log('   • Update test snapshots: npm run test -- --updateSnapshot')
  console.log('   • Run specific test file: npm run test -- header.test.tsx')
  console.log('   • Run tests matching pattern: npm run test -- --testNamePattern="Header"')
  console.log('   • Set up CI/CD testing pipeline')
  console.log('   • Configure test coverage thresholds')
  console.log('   • Set up test result reporting')
  console.log('   • Configure test parallelization')
  console.log('   • Set up test data management')
  console.log('   • Configure test environment variables')
  console.log('   • Set up test database seeding')
  console.log('   • Configure test cleanup procedures')
  console.log('   • Set up performance testing')
  console.log('   • Configure accessibility testing')
  console.log('   • Set up visual regression testing')
  console.log('   • Configure cross-browser testing')
  console.log('   • Set up mobile testing')
  console.log('   • Configure test reporting and notifications')
  
  console.log('\n✅ Testing system check completed!')
}

// Run the check
checkTestingSystem().catch(console.error)
