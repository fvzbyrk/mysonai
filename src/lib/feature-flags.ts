// Feature Flags Configuration
export interface FeatureFlags {
  // Core Features
  assistants: boolean
  demo: boolean
  pricing: boolean
  blog: boolean
  contact: boolean
  
  // Authentication & User Management
  auth: boolean
  signup: boolean
  signin: boolean
  dashboard: boolean
  billing: boolean
  
  // AI Features
  chat: boolean
  visualGeneration: boolean
  codeGeneration: boolean
  voiceGeneration: boolean
  
  // Advanced Features
  api: boolean
  webhooks: boolean
  analytics: boolean
  notifications: boolean
  
  // Legal & Compliance
  privacy: boolean
  terms: boolean
  cookies: boolean
  gdpr: boolean
  
  // Development Features
  debug: boolean
  maintenance: boolean
  beta: boolean
  
  // Performance & Accessibility
  performance: boolean
  accessibility: boolean
  lazyLoading: boolean
  virtualScrolling: boolean
}

// Default feature flags (production)
const defaultFlags: FeatureFlags = {
  // Core Features - All enabled
  assistants: true,
  demo: true,
  pricing: true,
  blog: true,
  contact: true,
  
  // Authentication & User Management - All enabled
  auth: true,
  signup: true,
  signin: true,
  dashboard: true,
  billing: true,
  
  // AI Features - All enabled
  chat: true,
  visualGeneration: true,
  codeGeneration: true,
  voiceGeneration: false, // Disabled by default
  
  // Advanced Features - All enabled
  api: true,
  webhooks: true,
  analytics: true,
  notifications: true,
  
  // Legal & Compliance - All enabled
  privacy: true,
  terms: true,
  cookies: true,
  gdpr: true,
  
  // Development Features - Disabled in production
  debug: false,
  maintenance: false,
  beta: false,
  
  // Performance & Accessibility - All enabled
  performance: true,
  accessibility: true,
  lazyLoading: true,
  virtualScrolling: true,
}

// Environment-based overrides
function getEnvironmentFlags(): Partial<FeatureFlags> {
  const env = process.env.NODE_ENV
  
  if (env === 'development') {
    return {
      debug: true,
      beta: true,
    }
  }
  
  if (env === 'test') {
    return {
      debug: true,
      analytics: false,
      notifications: false,
    }
  }
  
  return {}
}

// Environment variable overrides
function getEnvironmentVariableFlags(): Partial<FeatureFlags> {
  const envFlags: Partial<FeatureFlags> = {}
  
  // Only override if environment variable is explicitly set
  if (process.env.NEXT_PUBLIC_FEATURE_ASSISTANTS !== undefined) {
    envFlags.assistants = process.env.NEXT_PUBLIC_FEATURE_ASSISTANTS === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_DEMO !== undefined) {
    envFlags.demo = process.env.NEXT_PUBLIC_FEATURE_DEMO === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_PRICING !== undefined) {
    envFlags.pricing = process.env.NEXT_PUBLIC_FEATURE_PRICING === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_BLOG !== undefined) {
    envFlags.blog = process.env.NEXT_PUBLIC_FEATURE_BLOG === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_CONTACT !== undefined) {
    envFlags.contact = process.env.NEXT_PUBLIC_FEATURE_CONTACT === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_AUTH !== undefined) {
    envFlags.auth = process.env.NEXT_PUBLIC_FEATURE_AUTH === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_SIGNUP !== undefined) {
    envFlags.signup = process.env.NEXT_PUBLIC_FEATURE_SIGNUP === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_SIGNIN !== undefined) {
    envFlags.signin = process.env.NEXT_PUBLIC_FEATURE_SIGNIN === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_DASHBOARD !== undefined) {
    envFlags.dashboard = process.env.NEXT_PUBLIC_FEATURE_DASHBOARD === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_BILLING !== undefined) {
    envFlags.billing = process.env.NEXT_PUBLIC_FEATURE_BILLING === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_CHAT !== undefined) {
    envFlags.chat = process.env.NEXT_PUBLIC_FEATURE_CHAT === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_VISUAL_GENERATION !== undefined) {
    envFlags.visualGeneration = process.env.NEXT_PUBLIC_FEATURE_VISUAL_GENERATION === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_CODE_GENERATION !== undefined) {
    envFlags.codeGeneration = process.env.NEXT_PUBLIC_FEATURE_CODE_GENERATION === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_VOICE_GENERATION !== undefined) {
    envFlags.voiceGeneration = process.env.NEXT_PUBLIC_FEATURE_VOICE_GENERATION === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_API !== undefined) {
    envFlags.api = process.env.NEXT_PUBLIC_FEATURE_API === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_WEBHOOKS !== undefined) {
    envFlags.webhooks = process.env.NEXT_PUBLIC_FEATURE_WEBHOOKS === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_ANALYTICS !== undefined) {
    envFlags.analytics = process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS !== undefined) {
    envFlags.notifications = process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_PRIVACY !== undefined) {
    envFlags.privacy = process.env.NEXT_PUBLIC_FEATURE_PRIVACY === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_TERMS !== undefined) {
    envFlags.terms = process.env.NEXT_PUBLIC_FEATURE_TERMS === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_COOKIES !== undefined) {
    envFlags.cookies = process.env.NEXT_PUBLIC_FEATURE_COOKIES === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_GDPR !== undefined) {
    envFlags.gdpr = process.env.NEXT_PUBLIC_FEATURE_GDPR === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_DEBUG !== undefined) {
    envFlags.debug = process.env.NEXT_PUBLIC_FEATURE_DEBUG === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_MAINTENANCE !== undefined) {
    envFlags.maintenance = process.env.NEXT_PUBLIC_FEATURE_MAINTENANCE === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_BETA !== undefined) {
    envFlags.beta = process.env.NEXT_PUBLIC_FEATURE_BETA === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_PERFORMANCE !== undefined) {
    envFlags.performance = process.env.NEXT_PUBLIC_FEATURE_PERFORMANCE === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_ACCESSIBILITY !== undefined) {
    envFlags.accessibility = process.env.NEXT_PUBLIC_FEATURE_ACCESSIBILITY === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_LAZY_LOADING !== undefined) {
    envFlags.lazyLoading = process.env.NEXT_PUBLIC_FEATURE_LAZY_LOADING === 'true'
  }
  if (process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_SCROLLING !== undefined) {
    envFlags.virtualScrolling = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_SCROLLING === 'true'
  }
  
  return envFlags
}

// Merge all flag sources
function mergeFlags(): FeatureFlags {
  const envFlags = getEnvironmentFlags()
  const envVarFlags = getEnvironmentVariableFlags()
  
  return {
    ...defaultFlags,
    ...envFlags,
    ...envVarFlags,
  }
}

// Get feature flags
export function getFeatureFlags(): FeatureFlags {
  return mergeFlags()
}

// Check if a feature is enabled
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags()
  return flags[feature] === true
}

// Check if multiple features are enabled
export function areFeaturesEnabled(features: (keyof FeatureFlags)[]): boolean {
  return features.every(feature => isFeatureEnabled(feature))
}

// Get enabled features
export function getEnabledFeatures(): (keyof FeatureFlags)[] {
  const flags = getFeatureFlags()
  return Object.keys(flags).filter(key => flags[key as keyof FeatureFlags]) as (keyof FeatureFlags)[]
}

// Get disabled features
export function getDisabledFeatures(): (keyof FeatureFlags)[] {
  const flags = getFeatureFlags()
  return Object.keys(flags).filter(key => !flags[key as keyof FeatureFlags]) as (keyof FeatureFlags)[]
}

// Feature flag descriptions for admin panel
export const FEATURE_DESCRIPTIONS: Record<keyof FeatureFlags, string> = {
  assistants: 'AI Asistanlar sayfası ve özellikleri',
  demo: 'Demo sayfası ve canlı örnekler',
  pricing: 'Fiyatlandırma sayfası ve planlar',
  blog: 'Blog sayfası ve makaleler',
  contact: 'İletişim sayfası ve formu',
  auth: 'Kimlik doğrulama sistemi',
  signup: 'Kayıt ol sayfası',
  signin: 'Giriş yap sayfası',
  dashboard: 'Kullanıcı paneli',
  billing: 'Faturalandırma ve ödeme',
  chat: 'AI sohbet özelliği',
  visualGeneration: 'Görsel üretim (DALL-E)',
  codeGeneration: 'Kod üretim özelliği',
  voiceGeneration: 'Ses üretim özelliği',
  api: 'API erişimi ve dokümantasyon',
  webhooks: 'Webhook entegrasyonları',
  analytics: 'Analitik ve takip',
  notifications: 'Bildirim sistemi',
  privacy: 'Gizlilik politikası sayfası',
  terms: 'Kullanım koşulları sayfası',
  cookies: 'Çerez politikası sayfası',
  gdpr: 'GDPR uyumluluk sayfası',
  debug: 'Debug modu ve geliştirici araçları',
  maintenance: 'Bakım modu',
  beta: 'Beta özellikleri',
  performance: 'Performans izleme ve optimizasyon',
  accessibility: 'Erişilebilirlik özellikleri',
  lazyLoading: 'Lazy loading ve görsel optimizasyon',
  virtualScrolling: 'Sanal kaydırma ve büyük listeler',
}

// Feature categories for organization
export const FEATURE_CATEGORIES = {
  core: ['assistants', 'demo', 'pricing', 'blog', 'contact'] as (keyof FeatureFlags)[],
  auth: ['auth', 'signup', 'signin', 'dashboard', 'billing'] as (keyof FeatureFlags)[],
  ai: ['chat', 'visualGeneration', 'codeGeneration', 'voiceGeneration'] as (keyof FeatureFlags)[],
  advanced: ['api', 'webhooks', 'analytics', 'notifications'] as (keyof FeatureFlags)[],
  legal: ['privacy', 'terms', 'cookies', 'gdpr'] as (keyof FeatureFlags)[],
  dev: ['debug', 'maintenance', 'beta'] as (keyof FeatureFlags)[],
  performance: ['performance', 'accessibility', 'lazyLoading', 'virtualScrolling'] as (keyof FeatureFlags)[],
}
