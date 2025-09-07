#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

// Translation keys from translations.ts
const translationKeys = new Set([
  'nav.home', 'nav.assistants', 'nav.dashboard', 'nav.demo', 'nav.signin', 'nav.signup', 'nav.signout',
  'nav.blog', 'nav.pricing', 'nav.contact', 'nav.about', 'nav.api', 'nav.docs', 'nav.faq',
  'hero.title', 'hero.subtitle', 'hero.cta', 'hero.demo', 'hero.productHunt', 'hero.mainTitle1', 'hero.mainTitle2', 'hero.mainTitle3', 'hero.subtitleExtended', 'hero.chatbot', 'hero.visualGeneration', 'hero.more',
  'features.title', 'features.ai.title', 'features.ai.desc', 'features.viewAll', 'features.fast.title', 'features.fast.desc', 'features.secure.title', 'features.secure.desc', 'features.empathetic.title', 'features.empathetic.desc',
  'features.aiAssistants', 'features.aiAssistantsDesc', 'features.codeGeneration', 'features.codeGenerationDesc', 'features.visualGeneration', 'features.visualGenerationDesc', 'features.smartChatbot', 'features.smartChatbotDesc', 'features.fastPrototyping', 'features.fastPrototypingDesc', 'features.securePrivate', 'features.securePrivateDesc',
  'chat.title', 'chat.desc', 'chat.button',
  'cta.title', 'cta.desc', 'cta.signup', 'cta.demo', 'cta.futureTitle', 'cta.futureSubtitle', 'cta.futureDesc', 'cta.freeTrial', 'cta.requestDemo',
  'footer.desc', 'footer.copyright',
  'auth.signin.title', 'auth.signup.title', 'auth.email', 'auth.password', 'auth.confirmPassword', 'auth.signin.button', 'auth.signup.button', 'auth.forgotPassword', 'auth.noAccount', 'auth.hasAccount',
  'dashboard.title', 'dashboard.welcome', 'dashboard.usage', 'dashboard.queries', 'dashboard.remaining',
  'assistants.title', 'assistants.subtitle', 'assistants.search', 'assistants.chat', 'assistants.cta.title', 'assistants.cta.desc', 'assistants.cta.demo', 'assistants.cta.signup',
  'common.loading', 'common.error', 'common.success', 'common.cancel', 'common.save', 'common.delete', 'common.edit', 'common.close', 'common.language', 'common.and',
  'testimonials.title', 'testimonials.subtitle', 'testimonials.ahmetName', 'testimonials.ahmetRole', 'testimonials.ahmetCompany', 'testimonials.ahmetContent', 'testimonials.zeynepName', 'testimonials.zeynepRole', 'testimonials.zeynepCompany', 'testimonials.zeynepContent', 'testimonials.mehmetName', 'testimonials.mehmetRole', 'testimonials.mehmetCompany', 'testimonials.mehmetContent',
  'aiDemo.title', 'aiDemo.subtitle', 'aiDemo.startChat', 'aiDemo.tryNow',
  'usage.guestUsage', 'usage.usageLimits', 'usage.becomeMember', 'usage.messages', 'usage.tokens', 'usage.images', 'usage.unlimited', 'usage.remaining', 'usage.used'
])

interface CheckResult {
  file: string
  line: number
  content: string
  issues: string[]
}

async function checkI18nUsage() {
  console.log('🔍 Checking i18n usage in components...\n')
  
  const results: CheckResult[] = []
  
  // Find all TypeScript/TSX files in src/components
  const files = [
    'src/components/cta.tsx',
    'src/components/hero.tsx',
    'src/components/header.tsx',
    'src/components/footer.tsx',
    'src/components/features.tsx',
    'src/components/testimonials.tsx',
    'src/components/ai-demo.tsx',
    'src/components/usage-limits.tsx',
    'src/components/pricing.tsx'
  ]
  
  for (const file of files) {
    const filePath = path.join(process.cwd(), file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lineNumber = i + 1
      
      // Check for hardcoded Turkish text patterns (only user-facing text)
      const turkishPatterns = [
        /['"`](Blog|Fiyatlandırma|İletişim|Hakkımızda|Dokümantasyon|SSS|Kariyer|Basın|Gizlilik|Kullanım Koşulları|Çerez Politikası|GDPR)['"`]/g, // Navigation items
        /['"`](Ücretsiz|Demo|Başlat|İste|Deneme|Kurulum|Maliyet|Olasılık|Dakika|Süresi|Başlangıç|₺)['"`]/g, // Action words
        /['"`](Yazılım|Geliştirici|Tasarımcı|Girişimci|Takım Lideri|Ürün Müdürü|Mimar|Veri Analisti)['"`]/g, // Roles
        /['"`](Misafir|Kullanımı|Limitleri|Üye|Mesajlar|Tokenlar|Görseller|Sınırsız|Kalan|Kullanılan)['"`]/g, // Usage terms
        /['"`](Bireysel|kullanıcılar|için|Profesyonel|geliştiriciler|Büyük|ekipleri|için)['"`]/g, // Plan descriptions
        /['"`](Temel|chatbot|Email|desteği|Topluluk|forumu|Gelişmiş|Görsel|üretim|Öncelikli|destek|API|erişimi|Özel|entegrasyonlar)['"`]/g, // Features
        /['"`](Sınırsız|her|şey|Özel|AI|modelleri|White-label|çözümler|7\/24|destek|SLA|garantisi|Özel|eğitim|Dedicated|sunucu)['"`]/g, // Enterprise features
        /['"`](Pro'ya|Geç|Enterprise'a|Geç|İletişime|Geç)['"`]/g, // CTA buttons
        /['"`](Size|Uygun|Planı|Seçin|Her|ihtiyaca|uygun|esnek|fiyatlandırma|İstediğiniz|zaman|planınızı|değiştirebilirsiniz)['"`]/g, // Pricing text
        /['"`](En|Popüler|Hala|Kararsız|Mısınız|Ücretsiz|planımızla|MySonAI'ı|deneyin|bizimle|iletişime|geçin)['"`]/g, // Pricing highlights
        /['"`](Ücretsiz|Başlayın|Bize|Ulaşın)['"`]/g, // Final CTAs
        /['"`](Aktif|Kullanıcı|Oluşturulan|Proje|Uptime|AI|Asistan|Hazır|Şablon|Destek)['"`]/g, // Stats
        /['"`](Daha|Fazla|Özellik|Hemen|Dene|Sohbeti|Başlat)['"`]/g, // Demo text
        /['"`](Fevzi|Elif|Burak|Ayşe|Deniz)['"`]/g, // AI Agent names
        /['"`](Proje|yönetimi|ve|koordinasyon|Ürün|stratejisi|ve|kullanıcı|deneyimi|Sistem|mimarisi|ve|teknoloji|seçimi|Kod|yazma|ve|teknik|implementasyon|Veri|analizi|ve|optimizasyon)['"`]/g, // Agent descriptions
        /['"`](Ahmet|Yılmaz|Zeynep|Kaya|Mehmet|Demir|TechCorp|Design|Studio|StartupHub)['"`]/g, // Testimonial names/companies
        /['"`](MySonAI|ile|projelerimi|10|kat|daha|hızlı|tamamliyorum|AI|asistanlar|gerçekten|harika|çalışıyor)['"`]/g, // Testimonial content
        /['"`](Görsel|üretim|özelliği|inanılmaz|Hayal|ettiğim|tasarımları|dakikalar|içinde|gerçeğe|dönüştürüyorum)['"`]/g, // Testimonial content
        /['"`](Chatbot'umuzu|MySonAI|ile|oluşturduk|Müşteri|memnuniyeti|%300|arttı|Kesinlikle|tavsiye|ederim)['"`]/g, // Testimonial content
        /['"`](Kullanıcılarımız|Ne|Diyor|Binlerce|kullanıcı|MySonAI|ile|projelerini|başarıya|ulaştırıyor)['"`]/g, // Testimonials title
        /['"`](Canlı|AI|Asistanlarınızla|Sohbet|Edin|Türkçe|AI|asistanlarımızla|gerçek|zamanlı|olarak|sohbet|edin|Hemen|deneyin)['"`]/g, // AI Demo text
      ]
      
      const issues: string[] = []
      
      for (const pattern of turkishPatterns) {
        const matches = line.match(pattern)
        if (matches) {
          for (const match of matches) {
            const text = match.replace(/['"`]/g, '')
            // Skip if it's already using t() function or is a className/href
            if (text.length > 2 && !line.includes('t(') && !text.includes('className') && !text.includes('href') && !text.includes('src') && !text.includes('mailto:')) {
              issues.push(`Hardcoded Turkish text: "${text}"`)
            }
          }
        }
      }
      
      if (issues.length > 0) {
        results.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issues
        })
      }
    }
  }
  
  // Report results
  if (results.length === 0) {
    console.log('✅ No i18n issues found!')
    return
  }
  
  console.log(`❌ Found ${results.length} potential i18n issues:\n`)
  
  for (const result of results) {
    console.log(`📁 ${result.file}:${result.line}`)
    console.log(`   ${result.content}`)
    for (const issue of result.issues) {
      console.log(`   ⚠️  ${issue}`)
    }
    console.log('')
  }
  
  console.log('💡 Suggestions:')
  console.log('   - Replace hardcoded text with t(locale, "key") calls')
  console.log('   - Add missing translation keys to src/lib/translations.ts')
  console.log('   - Use the t() function for all user-facing text')
  
  process.exit(1)
}

// Run the check
checkI18nUsage().catch(console.error)
