#!/usr/bin/env tsx

/**
 * CI/CD and Deployment System Check Script
 * Verifies the deployment infrastructure and configuration
 */

import { existsSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

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

function checkDirectoryStructure() {
  console.log('📁 Checking CI/CD Directory Structure...')
  
  const requiredFiles = [
    '.github/workflows/ci.yml',
    'Dockerfile',
    'Dockerfile.dev',
    'docker-compose.yml',
    'docker-compose.dev.yml',
    'nginx/nginx.conf',
    'nginx/conf.d/mysonai.conf',
    'monitoring/prometheus.yml',
    'monitoring/grafana/provisioning/datasources/prometheus.yml',
    'scripts/deploy.sh',
    'scripts/backup.sh',
    'scripts/init-db.sql',
    'env.production.example'
  ]

  requiredFiles.forEach(file => {
    checkFileExists(file, `File: ${file}`)
  })
}

function checkGitHubActions() {
  console.log('🔧 Checking GitHub Actions Configuration...')
  
  const workflowFile = '.github/workflows/ci.yml'
  if (checkFileExists(workflowFile, 'GitHub Actions Workflow')) {
    const requiredJobs = [
      'quality',
      'test',
      'e2e',
      'security',
      'build',
      'deploy-preview',
      'deploy-production',
      'docker-build',
      'deploy-vps'
    ]
    
    checkFileContent(workflowFile, 'Workflow Jobs', requiredJobs.map(job => `job_name: '${job}'`))
    
    const requiredSteps = [
      'Checkout code',
      'Setup Node.js',
      'Install dependencies',
      'Run tests',
      'Build application',
      'Deploy to Vercel'
    ]
    
    checkFileContent(workflowFile, 'Workflow Steps', requiredSteps)
  }
}

function checkDockerConfiguration() {
  console.log('🐳 Checking Docker Configuration...')
  
  // Check Dockerfile
  if (checkFileExists('Dockerfile', 'Production Dockerfile')) {
    const requiredDockerContent = [
      'FROM node:20-alpine',
      'WORKDIR /app',
      'COPY package.json',
      'RUN npm ci',
      'RUN npm run build',
      'EXPOSE 3000',
      'CMD ["node", "server.js"]'
    ]
    checkFileContent('Dockerfile', 'Dockerfile Content', requiredDockerContent)
  }
  
  // Check Docker Compose
  if (checkFileExists('docker-compose.yml', 'Docker Compose')) {
    const requiredServices = [
      'app:',
      'postgres:',
      'redis:',
      'nginx:',
      'prometheus:',
      'grafana:'
    ]
    checkFileContent('docker-compose.yml', 'Docker Services', requiredServices)
  }
  
  // Check Development Docker Compose
  checkFileExists('docker-compose.dev.yml', 'Development Docker Compose')
}

function checkNginxConfiguration() {
  console.log('🌐 Checking Nginx Configuration...')
  
  if (checkFileExists('nginx/nginx.conf', 'Nginx Main Config')) {
    const requiredNginxContent = [
      'worker_processes',
      'events',
      'http',
      'gzip on',
      'add_header',
      'limit_req_zone'
    ]
    checkFileContent('nginx/nginx.conf', 'Nginx Configuration', requiredNginxContent)
  }
  
  if (checkFileExists('nginx/conf.d/mysonai.conf', 'Nginx Site Config')) {
    const requiredSiteContent = [
      'upstream mysonai_app',
      'server_name mysonai.com',
      'ssl_certificate',
      'proxy_pass http://mysonai_app',
      'location /api/',
      'location /health'
    ]
    checkFileContent('nginx/conf.d/mysonai.conf', 'Site Configuration', requiredSiteContent)
  }
}

function checkMonitoringConfiguration() {
  console.log('📊 Checking Monitoring Configuration...')
  
  if (checkFileExists('monitoring/prometheus.yml', 'Prometheus Config')) {
    const requiredPrometheusContent = [
      'scrape_interval',
      'scrape_configs',
      'job_name: prometheus',
      'job_name: mysonai-app',
      'job_name: postgres-exporter',
      'job_name: redis-exporter'
    ]
    checkFileContent('monitoring/prometheus.yml', 'Prometheus Configuration', requiredPrometheusContent)
  }
  
  checkFileExists('monitoring/grafana/provisioning/datasources/prometheus.yml', 'Grafana Data Source')
}

function checkDeploymentScripts() {
  console.log('🚀 Checking Deployment Scripts...')
  
  if (checkFileExists('scripts/deploy.sh', 'Deploy Script')) {
    const requiredDeployContent = [
      '#!/bin/bash',
      'docker pull',
      'docker-compose down',
      'docker-compose up -d',
      'health check',
      'nginx -t'
    ]
    checkFileContent('scripts/deploy.sh', 'Deploy Script Content', requiredDeployContent)
  }
  
  if (checkFileExists('scripts/backup.sh', 'Backup Script')) {
    const requiredBackupContent = [
      '#!/bin/bash',
      'pg_dump',
      'redis-cli BGSAVE',
      'tar -czf',
      'aws s3 cp'
    ]
    checkFileContent('scripts/backup.sh', 'Backup Script Content', requiredBackupContent)
  }
  
  checkFileExists('scripts/init-db.sql', 'Database Initialization')
}

function checkEnvironmentConfiguration() {
  console.log('🔐 Checking Environment Configuration...')
  
  if (checkFileExists('env.production.example', 'Production Environment Example')) {
    const requiredEnvVars = [
      'NODE_ENV=production',
      'DATABASE_URL=',
      'NEXT_PUBLIC_SUPABASE_URL=',
      'OPENAI_API_KEY=',
      'STRIPE_SECRET_KEY=',
      'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=',
      'REDIS_URL=',
      'NEXT_PUBLIC_FEATURE_'
    ]
    checkFileContent('env.production.example', 'Environment Variables', requiredEnvVars)
  }
}

function checkPackageJsonScripts() {
  console.log('📦 Checking Package.json Scripts...')
  
  if (checkFileExists('package.json', 'Package.json')) {
    const requiredScripts = [
      '"docker:build"',
      '"docker:dev"',
      '"docker:prod"',
      '"docker:down"',
      '"deploy:staging"',
      '"deploy:production"',
      '"backup"',
      '"health:check"'
    ]
    checkFileContent('package.json', 'Deployment Scripts', requiredScripts)
  }
}

function checkSecurityConfiguration() {
  console.log('🔒 Checking Security Configuration...')
  
  // Check for security headers in Nginx
  if (existsSync('nginx/conf.d/mysonai.conf')) {
    const securityHeaders = [
      'X-Frame-Options',
      'X-XSS-Protection',
      'X-Content-Type-Options',
      'Strict-Transport-Security',
      'Content-Security-Policy'
    ]
    checkFileContent('nginx/conf.d/mysonai.conf', 'Security Headers', securityHeaders)
  }
  
  // Check for rate limiting
  if (existsSync('nginx/nginx.conf')) {
    const rateLimitContent = [
      'limit_req_zone',
      'limit_req zone=api',
      'limit_req zone=login'
    ]
    checkFileContent('nginx/nginx.conf', 'Rate Limiting', rateLimitContent)
  }
}

function checkHealthEndpoints() {
  console.log('🏥 Checking Health Endpoints...')
  
  // Check if health endpoint is configured
  if (existsSync('nginx/conf.d/mysonai.conf')) {
    checkFileContent('nginx/conf.d/mysonai.conf', 'Health Endpoint', ['location /health'])
  }
  
  // Check package.json for health check script
  if (existsSync('package.json')) {
    checkFileContent('package.json', 'Health Check Script', ['"health:check"'])
  }
}

function generateReport() {
  console.log('\n📋 CI/CD System Check Report')
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
  console.log('   • Set up GitHub repository secrets for deployment')
  console.log('   • Configure SSL certificates for production')
  console.log('   • Set up monitoring alerts and notifications')
  console.log('   • Configure backup schedules and cloud storage')
  console.log('   • Set up staging environment for testing')
  console.log('   • Configure domain and DNS settings')
  console.log('   • Set up log aggregation and analysis')
  console.log('   • Configure security scanning and vulnerability checks')
  console.log('   • Set up performance monitoring and alerting')
  console.log('   • Configure disaster recovery procedures')
  
  return failed === 0
}

// Main execution
function main() {
  console.log('🚀 MySonAI CI/CD System Check')
  console.log('=' .repeat(40))
  
  checkDirectoryStructure()
  checkGitHubActions()
  checkDockerConfiguration()
  checkNginxConfiguration()
  checkMonitoringConfiguration()
  checkDeploymentScripts()
  checkEnvironmentConfiguration()
  checkPackageJsonScripts()
  checkSecurityConfiguration()
  checkHealthEndpoints()
  
  const success = generateReport()
  
  if (success) {
    console.log('\n🎉 CI/CD system check completed successfully!')
    process.exit(0)
  } else {
    console.log('\n❌ CI/CD system check failed. Please fix the issues above.')
    process.exit(1)
  }
}

main()
