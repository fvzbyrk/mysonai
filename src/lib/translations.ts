import { Locale } from './i18n';

export const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.dashboard': 'Panel',
    'nav.demo': 'Demo',
    'nav.signin': 'Giriş Yap',
    'nav.signup': 'Kayıt Ol',
    'nav.signout': 'Çıkış Yap',
    
    // Hero Section
    'hero.title': 'AI Destekli Hukuki Danışmanlık',
    'hero.subtitle': 'Yapay zeka teknolojisi ile hukuki sorularınıza anında yanıt alın',
    'hero.cta': 'Hemen Başla',
    'hero.demo': 'Demo İzle',
    
    // Features
    'features.title': 'AI Asistanlarınız',
    'features.ai.title': 'AI Destekli Analiz',
    'features.ai.desc': 'Her biri kendi alanında uzman olan AI asistanlarımızla tanışın',
    'features.fast.title': 'Hızlı Yanıt',
    'features.fast.desc': 'Saniyeler içinde profesyonel hukuki tavsiyeler alın',
    'features.secure.title': 'Güvenli',
    'features.secure.desc': 'Verileriniz en yüksek güvenlik standartlarında korunur',
    
    // Chat Section
    'chat.title': 'AI Asistanlarla Sohbet Edin',
    'chat.desc': 'Fevzi, Elif, Burak, Ayşe ve diğer AI asistanlarımızla gerçek zamanlı olarak sohbet edin. Her biri kendi alanında uzman olan asistanlarınız size yardımcı olmaya hazır!',
    'chat.button': 'Demo Başlat',
    
    // CTA Section
    'cta.title': 'Hemen Başlayın',
    'cta.desc': 'AI asistanlarınızla tanışın ve projelerinizi bir üst seviyeye taşıyın',
    'cta.signup': 'Ücretsiz Hesap Oluştur',
    'cta.demo': 'Demo İncele',
    
    // Footer
    'footer.desc': 'Türkçe AI asistanlarınızla geleceği şekillendirin',
    'footer.copyright': '© 2024 MySonAI. Tüm hakları saklıdır.',
    
    // Auth
    'auth.signin.title': 'Giriş Yap',
    'auth.signup.title': 'Kayıt Ol',
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.confirmPassword': 'Şifreyi Onayla',
    'auth.signin.button': 'Giriş Yap',
    'auth.signup.button': 'Kayıt Ol',
    'auth.forgotPassword': 'Şifremi Unuttum',
    'auth.noAccount': 'Hesabınız yok mu?',
    'auth.hasAccount': 'Zaten hesabınız var mı?',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.welcome': 'Hoş Geldiniz',
    'dashboard.usage': 'Kullanım',
    'dashboard.queries': 'Sorgular',
    'dashboard.remaining': 'Kalan',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata oluştu',
    'common.success': 'Başarılı',
    'common.cancel': 'İptal',
    'common.save': 'Kaydet',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.close': 'Kapat',
    'common.language': 'Dil',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.demo': 'Demo',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.signout': 'Sign Out',
    
    // Hero Section
    'hero.title': 'AI-Powered Legal Consultation',
    'hero.subtitle': 'Get instant answers to your legal questions with artificial intelligence technology',
    'hero.cta': 'Get Started',
    'hero.demo': 'Watch Demo',
    
    // Features
    'features.title': 'Your AI Assistants',
    'features.ai.title': 'AI-Powered Analysis',
    'features.ai.desc': 'Meet our AI assistants, each expert in their own field',
    'features.fast.title': 'Fast Response',
    'features.fast.desc': 'Get professional legal advice in seconds',
    'features.secure.title': 'Secure',
    'features.secure.desc': 'Your data is protected with the highest security standards',
    
    // Chat Section
    'chat.title': 'Chat with AI Assistants',
    'chat.desc': 'Chat in real-time with Fevzi, Elif, Burak, Ayşe and our other AI assistants. Each expert in their own field, your assistants are ready to help you!',
    'chat.button': 'Start Demo',
    
    // CTA Section
    'cta.title': 'Get Started Now',
    'cta.desc': 'Meet your AI assistants and take your projects to the next level',
    'cta.signup': 'Create Free Account',
    'cta.demo': 'Explore Demo',
    
    // Footer
    'footer.desc': 'Shape the future with your Turkish AI assistants',
    'footer.copyright': '© 2024 MySonAI. All rights reserved.',
    
    // Auth
    'auth.signin.title': 'Sign In',
    'auth.signup.title': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.signin.button': 'Sign In',
    'auth.signup.button': 'Sign Up',
    'auth.forgotPassword': 'Forgot Password',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.usage': 'Usage',
    'dashboard.queries': 'Queries',
    'dashboard.remaining': 'Remaining',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.language': 'Language',
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
