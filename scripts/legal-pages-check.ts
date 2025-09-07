#!/usr/bin/env tsx

import { getFeatureFlags } from '../src/lib/feature-flags'

async function checkLegalPagesSystem() {
  console.log('⚖️ Checking Legal Pages & Cookie Management System...\n')
  
  const flags = getFeatureFlags()
  
  console.log('⚖️ LEGAL PAGES SYSTEM STATUS:')
  console.log(`   Privacy Feature Enabled: ${flags.privacy ? '✅' : '❌'}`)
  console.log(`   Terms Feature Enabled: ${flags.terms ? '✅' : '❌'}`)
  console.log(`   Cookies Feature Enabled: ${flags.cookies ? '✅' : '❌'}`)
  console.log(`   GDPR Feature Enabled: ${flags.gdpr ? '✅' : '❌'}`)
  console.log('')
  
  // Check legal pages files
  const legalFiles = [
    'src/app/[locale]/privacy/page.tsx',
    'src/app/[locale]/terms/page.tsx',
    'src/app/[locale]/cookies/page.tsx',
    'src/components/cookie-consent.tsx',
    'src/hooks/useCookieConsent.ts',
  ]
  
  console.log('📁 LEGAL PAGES FILES CHECK:')
  const fs = require('fs')
  const path = require('path')
  
  for (const file of legalFiles) {
    const filePath = path.join(process.cwd(), file)
    const exists = fs.existsSync(filePath)
    console.log(`   ${exists ? '✅' : '❌'} ${file}`)
  }
  console.log('')
  
  // Check Privacy Policy page
  console.log('🔒 PRIVACY POLICY PAGE:')
  try {
    const privacyContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/privacy/page.tsx'), 'utf-8')
    
    const hasMetadata = privacyContent.includes('generateMetadata')
    const hasFeatureGuard = privacyContent.includes('FeatureGuard')
    const hasTurkishContent = privacyContent.includes('Gizlilik Politikası')
    const hasEnglishContent = privacyContent.includes('Privacy Policy')
    const hasDataCollection = privacyContent.includes('Veri Toplama') || privacyContent.includes('Data Collection')
    const hasDataUsage = privacyContent.includes('Veri Kullanımı') || privacyContent.includes('Data Usage')
    const hasDataSharing = privacyContent.includes('Veri Paylaşımı') || privacyContent.includes('Data Sharing')
    const hasDataSecurity = privacyContent.includes('Veri Güvenliği') || privacyContent.includes('Data Security')
    const hasUserRights = privacyContent.includes('Haklarınız') || privacyContent.includes('Your Rights')
    const hasCookies = privacyContent.includes('Çerezler') || privacyContent.includes('Cookies')
    const hasContact = privacyContent.includes('İletişim') || privacyContent.includes('Contact')
    
    console.log(`   ${hasMetadata ? '✅' : '❌'} Dynamic metadata generation`)
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Feature guard integration`)
    console.log(`   ${hasTurkishContent ? '✅' : '❌'} Turkish content`)
    console.log(`   ${hasEnglishContent ? '✅' : '❌'} English content`)
    console.log(`   ${hasDataCollection ? '✅' : '❌'} Data collection section`)
    console.log(`   ${hasDataUsage ? '✅' : '❌'} Data usage section`)
    console.log(`   ${hasDataSharing ? '✅' : '❌'} Data sharing section`)
    console.log(`   ${hasDataSecurity ? '✅' : '❌'} Data security section`)
    console.log(`   ${hasUserRights ? '✅' : '❌'} User rights section`)
    console.log(`   ${hasCookies ? '✅' : '❌'} Cookies section`)
    console.log(`   ${hasContact ? '✅' : '❌'} Contact section`)
  } catch (error) {
    console.log('   ❌ Privacy policy page not found')
  }
  console.log('')
  
  // Check Terms of Service page
  console.log('📄 TERMS OF SERVICE PAGE:')
  try {
    const termsContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/terms/page.tsx'), 'utf-8')
    
    const hasMetadata = termsContent.includes('generateMetadata')
    const hasFeatureGuard = termsContent.includes('FeatureGuard')
    const hasTurkishContent = termsContent.includes('Kullanım Koşulları')
    const hasEnglishContent = termsContent.includes('Terms of Service')
    const hasServiceDescription = termsContent.includes('Hizmet Tanımı') || termsContent.includes('Service Description')
    const hasUserObligations = termsContent.includes('Kullanıcı Yükümlülükleri') || termsContent.includes('User Obligations')
    const hasProviderObligations = termsContent.includes('Hizmet Sağlayıcı Yükümlülükleri') || termsContent.includes('Service Provider Obligations')
    const hasPaymentBilling = termsContent.includes('Ödeme ve Faturalandırma') || termsContent.includes('Payment and Billing')
    const hasLiabilityLimitations = termsContent.includes('Sorumluluk Sınırları') || termsContent.includes('Liability Limitations')
    const hasServiceChanges = termsContent.includes('Hizmet Değişiklikleri') || termsContent.includes('Service Changes')
    const hasApplicableLaw = termsContent.includes('Uygulanacak Hukuk') || termsContent.includes('Applicable Law')
    const hasContact = termsContent.includes('İletişim') || termsContent.includes('Contact')
    
    console.log(`   ${hasMetadata ? '✅' : '❌'} Dynamic metadata generation`)
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Feature guard integration`)
    console.log(`   ${hasTurkishContent ? '✅' : '❌'} Turkish content`)
    console.log(`   ${hasEnglishContent ? '✅' : '❌'} English content`)
    console.log(`   ${hasServiceDescription ? '✅' : '❌'} Service description section`)
    console.log(`   ${hasUserObligations ? '✅' : '❌'} User obligations section`)
    console.log(`   ${hasProviderObligations ? '✅' : '❌'} Provider obligations section`)
    console.log(`   ${hasPaymentBilling ? '✅' : '❌'} Payment and billing section`)
    console.log(`   ${hasLiabilityLimitations ? '✅' : '❌'} Liability limitations section`)
    console.log(`   ${hasServiceChanges ? '✅' : '❌'} Service changes section`)
    console.log(`   ${hasApplicableLaw ? '✅' : '❌'} Applicable law section`)
    console.log(`   ${hasContact ? '✅' : '❌'} Contact section`)
  } catch (error) {
    console.log('   ❌ Terms of service page not found')
  }
  console.log('')
  
  // Check Cookie Policy page
  console.log('🍪 COOKIE POLICY PAGE:')
  try {
    const cookiesContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/cookies/page.tsx'), 'utf-8')
    
    const hasMetadata = cookiesContent.includes('generateMetadata')
    const hasFeatureGuard = cookiesContent.includes('FeatureGuard')
    const hasTurkishContent = cookiesContent.includes('Çerez Politikası')
    const hasEnglishContent = cookiesContent.includes('Cookie Policy')
    const hasWhatAreCookies = cookiesContent.includes('Çerez Nedir') || cookiesContent.includes('What Are Cookies')
    const hasCookieTypes = cookiesContent.includes('Çerez Türleri') || cookiesContent.includes('Cookie Types')
    const hasCookieUsage = cookiesContent.includes('Hangi Çerezleri Kullanıyoruz') || cookiesContent.includes('What Cookies Do We Use')
    const hasCookieManagement = cookiesContent.includes('Çerez Ayarlarınızı Nasıl Yönetirsiniz') || cookiesContent.includes('How Do You Manage Your Cookie Settings')
    const hasThirdPartyCookies = cookiesContent.includes('Üçüncü Taraf Çerezler') || cookiesContent.includes('Third-Party Cookies')
    const hasCookieDurations = cookiesContent.includes('Çerez Süreleri') || cookiesContent.includes('Cookie Durations')
    const hasCookiePolicyChanges = cookiesContent.includes('Çerez Politikası Değişiklikleri') || cookiesContent.includes('Cookie Policy Changes')
    const hasContact = cookiesContent.includes('İletişim') || cookiesContent.includes('Contact')
    
    console.log(`   ${hasMetadata ? '✅' : '❌'} Dynamic metadata generation`)
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Feature guard integration`)
    console.log(`   ${hasTurkishContent ? '✅' : '❌'} Turkish content`)
    console.log(`   ${hasEnglishContent ? '✅' : '❌'} English content`)
    console.log(`   ${hasWhatAreCookies ? '✅' : '❌'} What are cookies section`)
    console.log(`   ${hasCookieTypes ? '✅' : '❌'} Cookie types section`)
    console.log(`   ${hasCookieUsage ? '✅' : '❌'} Cookie usage section`)
    console.log(`   ${hasCookieManagement ? '✅' : '❌'} Cookie management section`)
    console.log(`   ${hasThirdPartyCookies ? '✅' : '❌'} Third-party cookies section`)
    console.log(`   ${hasCookieDurations ? '✅' : '❌'} Cookie durations section`)
    console.log(`   ${hasCookiePolicyChanges ? '✅' : '❌'} Cookie policy changes section`)
    console.log(`   ${hasContact ? '✅' : '❌'} Contact section`)
  } catch (error) {
    console.log('   ❌ Cookie policy page not found')
  }
  console.log('')
  
  // Check Cookie Consent Banner
  console.log('🍪 COOKIE CONSENT BANNER:')
  try {
    const cookieConsentContent = fs.readFileSync(path.join(process.cwd(), 'src/components/cookie-consent.tsx'), 'utf-8')
    
    const hasFeatureGuard = cookieConsentContent.includes('FeatureGuard')
    const hasAcceptAll = cookieConsentContent.includes('acceptAll')
    const hasRejectAll = cookieConsentContent.includes('rejectAll')
    const hasSavePreferences = cookieConsentContent.includes('savePreferences')
    const hasEssentialCookies = cookieConsentContent.includes('Essential Cookies') || cookieConsentContent.includes('Gerekli Çerezler')
    const hasAnalyticsCookies = cookieConsentContent.includes('Analytics Cookies') || cookieConsentContent.includes('Analitik Çerezler')
    const hasFunctionalCookies = cookieConsentContent.includes('Functional Cookies') || cookieConsentContent.includes('Fonksiyonel Çerezler')
    const hasDetailedSettings = cookieConsentContent.includes('Detailed Settings') || cookieConsentContent.includes('Detaylı Ayarlar')
    const hasLocalStorage = cookieConsentContent.includes('localStorage')
    const hasGoogleAnalytics = cookieConsentContent.includes('gtag')
    const hasTurkishSupport = cookieConsentContent.includes('isTurkish')
    const hasEnglishSupport = cookieConsentContent.includes('locale')
    
    console.log(`   ${hasFeatureGuard ? '✅' : '❌'} Feature guard integration`)
    console.log(`   ${hasAcceptAll ? '✅' : '❌'} Accept all functionality`)
    console.log(`   ${hasRejectAll ? '✅' : '❌'} Reject all functionality`)
    console.log(`   ${hasSavePreferences ? '✅' : '❌'} Save preferences functionality`)
    console.log(`   ${hasEssentialCookies ? '✅' : '❌'} Essential cookies section`)
    console.log(`   ${hasAnalyticsCookies ? '✅' : '❌'} Analytics cookies section`)
    console.log(`   ${hasFunctionalCookies ? '✅' : '❌'} Functional cookies section`)
    console.log(`   ${hasDetailedSettings ? '✅' : '❌'} Detailed settings`)
    console.log(`   ${hasLocalStorage ? '✅' : '❌'} Local storage integration`)
    console.log(`   ${hasGoogleAnalytics ? '✅' : '❌'} Google Analytics integration`)
    console.log(`   ${hasTurkishSupport ? '✅' : '❌'} Turkish language support`)
    console.log(`   ${hasEnglishSupport ? '✅' : '❌'} English language support`)
  } catch (error) {
    console.log('   ❌ Cookie consent banner not found')
  }
  console.log('')
  
  // Check Cookie Consent Hook
  console.log('🎣 COOKIE CONSENT HOOK:')
  try {
    const cookieHookContent = fs.readFileSync(path.join(process.cwd(), 'src/hooks/useCookieConsent.ts'), 'utf-8')
    
    const hasPreferences = cookieHookContent.includes('CookiePreferences')
    const hasAcceptAll = cookieHookContent.includes('acceptAll')
    const hasRejectAll = cookieHookContent.includes('rejectAll')
    const hasUpdatePreferences = cookieHookContent.includes('updatePreferences')
    const hasShowBanner = cookieHookContent.includes('showBanner')
    const hasHideBanner = cookieHookContent.includes('hideBanner')
    const hasResetConsent = cookieHookContent.includes('resetConsent')
    const hasIsAllowed = cookieHookContent.includes('isAllowed')
    const hasGetCookieStats = cookieHookContent.includes('getCookieStats')
    const hasLocalStorage = cookieHookContent.includes('localStorage')
    const hasGoogleAnalytics = cookieHookContent.includes('gtag')
    const hasFeatureFlag = cookieHookContent.includes('useFeatureFlag')
    
    console.log(`   ${hasPreferences ? '✅' : '❌'} Cookie preferences interface`)
    console.log(`   ${hasAcceptAll ? '✅' : '❌'} Accept all function`)
    console.log(`   ${hasRejectAll ? '✅' : '❌'} Reject all function`)
    console.log(`   ${hasUpdatePreferences ? '✅' : '❌'} Update preferences function`)
    console.log(`   ${hasShowBanner ? '✅' : '❌'} Show banner function`)
    console.log(`   ${hasHideBanner ? '✅' : '❌'} Hide banner function`)
    console.log(`   ${hasResetConsent ? '✅' : '❌'} Reset consent function`)
    console.log(`   ${hasIsAllowed ? '✅' : '❌'} Is allowed function`)
    console.log(`   ${hasGetCookieStats ? '✅' : '❌'} Get cookie stats function`)
    console.log(`   ${hasLocalStorage ? '✅' : '❌'} Local storage integration`)
    console.log(`   ${hasGoogleAnalytics ? '✅' : '❌'} Google Analytics integration`)
    console.log(`   ${hasFeatureFlag ? '✅' : '❌'} Feature flag integration`)
  } catch (error) {
    console.log('   ❌ Cookie consent hook not found')
  }
  console.log('')
  
  // Check Footer integration
  console.log('🔗 FOOTER INTEGRATION:')
  try {
    const footerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/footer.tsx'), 'utf-8')
    
    const hasPrivacyLink = footerContent.includes('/privacy')
    const hasTermsLink = footerContent.includes('/terms')
    const hasCookiesLink = footerContent.includes('/cookies')
    const hasGDPRLink = footerContent.includes('/gdpr')
    const hasLegalSection = footerContent.includes('legal')
    const hasTranslationSupport = footerContent.includes('t(locale')
    
    console.log(`   ${hasPrivacyLink ? '✅' : '❌'} Privacy policy link`)
    console.log(`   ${hasTermsLink ? '✅' : '❌'} Terms of service link`)
    console.log(`   ${hasCookiesLink ? '✅' : '❌'} Cookie policy link`)
    console.log(`   ${hasGDPRLink ? '✅' : '❌'} GDPR link`)
    console.log(`   ${hasLegalSection ? '✅' : '❌'} Legal section`)
    console.log(`   ${hasTranslationSupport ? '✅' : '❌'} Translation support`)
  } catch (error) {
    console.log('   ❌ Footer integration not found')
  }
  console.log('')
  
  // Check Layout integration
  console.log('🏗️ LAYOUT INTEGRATION:')
  try {
    const layoutContent = fs.readFileSync(path.join(process.cwd(), 'src/app/[locale]/layout.tsx'), 'utf-8')
    
    const hasCookieConsentImport = layoutContent.includes('CookieConsent')
    const hasCookieConsentComponent = layoutContent.includes('<CookieConsent')
    
    console.log(`   ${hasCookieConsentImport ? '✅' : '❌'} Cookie consent import`)
    console.log(`   ${hasCookieConsentComponent ? '✅' : '❌'} Cookie consent component`)
  } catch (error) {
    console.log('   ❌ Layout integration not found')
  }
  console.log('')
  
  // Check translations
  console.log('🌐 TRANSLATIONS:')
  try {
    const translationsContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/translations.ts'), 'utf-8')
    
    const hasPrivacyNav = translationsContent.includes("'nav.privacy'")
    const hasTermsNav = translationsContent.includes("'nav.terms'")
    const hasCookiesNav = translationsContent.includes("'nav.cookies'")
    const hasGDPRNav = translationsContent.includes("'nav.gdpr'")
    const hasTurkishPrivacy = translationsContent.includes("'nav.privacy': 'Gizlilik'")
    const hasEnglishPrivacy = translationsContent.includes("'nav.privacy': 'Privacy'")
    const hasTurkishTerms = translationsContent.includes("'nav.terms': 'Kullanım Koşulları'")
    const hasEnglishTerms = translationsContent.includes("'nav.terms': 'Terms of Service'")
    const hasTurkishCookies = translationsContent.includes("'nav.cookies': 'Çerez Politikası'")
    const hasEnglishCookies = translationsContent.includes("'nav.cookies': 'Cookie Policy'")
    
    console.log(`   ${hasPrivacyNav ? '✅' : '❌'} Privacy navigation key`)
    console.log(`   ${hasTermsNav ? '✅' : '❌'} Terms navigation key`)
    console.log(`   ${hasCookiesNav ? '✅' : '❌'} Cookies navigation key`)
    console.log(`   ${hasGDPRNav ? '✅' : '❌'} GDPR navigation key`)
    console.log(`   ${hasTurkishPrivacy ? '✅' : '❌'} Turkish privacy translation`)
    console.log(`   ${hasEnglishPrivacy ? '✅' : '❌'} English privacy translation`)
    console.log(`   ${hasTurkishTerms ? '✅' : '❌'} Turkish terms translation`)
    console.log(`   ${hasEnglishTerms ? '✅' : '❌'} English terms translation`)
    console.log(`   ${hasTurkishCookies ? '✅' : '❌'} Turkish cookies translation`)
    console.log(`   ${hasEnglishCookies ? '✅' : '❌'} English cookies translation`)
  } catch (error) {
    console.log('   ❌ Translations not found')
  }
  console.log('')
  
  // Legal pages recommendations
  console.log('💡 LEGAL PAGES RECOMMENDATIONS:')
  
  if (!flags.privacy) {
    console.log('   • Enable privacy feature flag')
  }
  
  if (!flags.terms) {
    console.log('   • Enable terms feature flag')
  }
  
  if (!flags.cookies) {
    console.log('   • Enable cookies feature flag')
  }
  
  if (!flags.gdpr) {
    console.log('   • Enable GDPR feature flag')
  }
  
  console.log('   • Review and update legal content regularly')
  console.log('   • Ensure compliance with local regulations')
  console.log('   • Test cookie consent banner functionality')
  console.log('   • Verify legal page accessibility')
  console.log('   • Set up legal page monitoring')
  console.log('   • Configure cookie consent analytics')
  console.log('   • Test legal page SEO optimization')
  console.log('   • Verify multilingual legal content')
  console.log('   • Set up legal page backups')
  console.log('   • Configure legal page notifications')
  console.log('   • Test legal page performance')
  console.log('   • Verify legal page security')
  console.log('   • Set up legal page versioning')
  console.log('   • Configure legal page archiving')
  
  console.log('\n✅ Legal pages system check completed!')
}

// Run the check
checkLegalPagesSystem().catch(console.error)
