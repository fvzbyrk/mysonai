import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ExternalLink, 
  Calendar, 
  Tag, 
  ArrowRight,
  Home,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  Shield,
  Settings,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Site Haritası - MySonAI | Tüm Sayfalar ve İçerikler'
      : 'Sitemap - MySonAI | All Pages and Content',
    description: isTurkish
      ? 'MySonAI web sitesinin tüm sayfaları ve içerikleri. Kolay navigasyon için site haritası.'
      : 'All pages and content of MySonAI website. Sitemap for easy navigation.',
    keywords: isTurkish
      ? 'site haritası, MySonAI sayfalar, navigasyon, içerik listesi'
      : 'sitemap, MySonAI pages, navigation, content list',
  };
}

// Site structure data
const siteStructure = [
  {
    category: 'Ana Sayfalar',
    icon: Home,
    color: 'from-blue-500 to-cyan-500',
    pages: [
      { name: 'Ana Sayfa', url: '/', description: 'MySonAI ana sayfası' },
      { name: 'Hakkımızda', url: '/about', description: 'Şirket hakkında bilgiler' },
      { name: 'Hizmetler', url: '/services', description: 'AI çözümleri ve hizmetler' },
      { name: 'Çözümler', url: '/solutions', description: 'MySon marka çözümleri' },
      { name: 'Fiyatlandırma', url: '/pricing', description: 'Plan fiyatları ve özellikler' },
      { name: 'İletişim', url: '/contact', description: 'İletişim bilgileri ve form' },
    ]
  },
  {
    category: 'Kullanıcı Sayfaları',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    pages: [
      { name: 'Giriş Yap', url: '/signin', description: 'Kullanıcı giriş sayfası' },
      { name: 'Kayıt Ol', url: '/signup', description: 'Yeni kullanıcı kaydı' },
      { name: 'Dashboard', url: '/dashboard', description: 'Kullanıcı paneli' },
      { name: 'Faturalandırma', url: '/billing', description: 'Fatura ve ödeme' },
    ]
  },
  {
    category: 'Demo ve Araçlar',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500',
    pages: [
      { name: 'Demo', url: '/demo', description: 'AI asistanları demo' },
      { name: 'Araçlar', url: '/tools', description: 'AI araçları' },
      { name: 'Asistanlar', url: '/assistants', description: 'AI asistanları listesi' },
    ]
  },
  {
    category: 'İçerik',
    icon: BookOpen,
    color: 'from-orange-500 to-red-500',
    pages: [
      { name: 'Blog', url: '/blog', description: 'Blog makaleleri' },
      { name: 'Eğitimler', url: '/tutorial', description: 'Eğitim videoları' },
      { name: 'Dokümantasyon', url: '/docs', description: 'API dokümantasyonu' },
    ]
  },
  {
    category: 'Destek',
    icon: HelpCircle,
    color: 'from-indigo-500 to-purple-500',
    pages: [
      { name: 'Sık Sorulan Sorular', url: '/faq', description: 'SSS sayfası' },
      { name: 'Geliştirici', url: '/developer', description: 'Geliştirici kaynakları' },
      { name: 'API', url: '/api', description: 'API dokümantasyonu' },
    ]
  },
  {
    category: 'Şirket',
    icon: Globe,
    color: 'from-teal-500 to-cyan-500',
    pages: [
      { name: 'Kariyer', url: '/careers', description: 'İş ilanları' },
      { name: 'Basın', url: '/press', description: 'Basın bültenleri' },
      { name: 'Referanslar', url: '/references', description: 'Müşteri referansları' },
    ]
  },
  {
    category: 'Yasal',
    icon: Shield,
    color: 'from-gray-500 to-slate-500',
    pages: [
      { name: 'Gizlilik Politikası', url: '/privacy', description: 'Gizlilik politikası' },
      { name: 'Kullanım Şartları', url: '/terms', description: 'Kullanım şartları' },
      { name: 'Çerez Politikası', url: '/cookies', description: 'Çerez politikası' },
      { name: 'GDPR', url: '/gdpr', description: 'GDPR uyumluluk' },
    ]
  }
];

export default function SitemapPage({ params }: { params: { locale: Locale } }) {
  const isTurkish = params.locale === 'tr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isTurkish ? 'Site Haritası' : 'Sitemap'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isTurkish 
                ? 'MySonAI web sitesinin tüm sayfaları ve içerikleri. Kolay navigasyon için site haritası.'
                : 'All pages and content of MySonAI website. Sitemap for easy navigation.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Site Structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {siteStructure.map((section, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mr-4`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {section.category}
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    {section.pages.map((page, pageIndex) => (
                      <div key={pageIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="flex-1">
                          <Link 
                            href={`/${params.locale}${page.url}`}
                            className="text-white hover:text-purple-300 transition-colors font-medium"
                          >
                            {page.name}
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">
                            {page.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isTurkish ? 'Hızlı Erişim' : 'Quick Access'}
            </h2>
            <p className="text-gray-300">
              {isTurkish 
                ? 'En çok kullanılan sayfalar ve özellikler'
                : 'Most used pages and features'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href={`/${params.locale}/demo`}>
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="p-6 text-center">
                  <Briefcase className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Demo</h3>
                  <p className="text-sm opacity-80">AI asistanları deneyin</p>
                </div>
              </Card>
            </Link>
            
            <Link href={`/${params.locale}/blog`}>
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="p-6 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Blog</h3>
                  <p className="text-sm opacity-80">AI makaleleri</p>
                </div>
              </Card>
            </Link>
            
            <Link href={`/${params.locale}/pricing`}>
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="p-6 text-center">
                  <Tag className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Fiyatlar</h3>
                  <p className="text-sm opacity-80">Plan seçenekleri</p>
                </div>
              </Card>
            </Link>
            
            <Link href={`/${params.locale}/contact`}>
              <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">İletişim</h3>
                  <p className="text-sm opacity-80">Bizimle iletişime geçin</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isTurkish ? 'Aradığınızı Bulamadınız mı?' : 'Can\'t Find What You\'re Looking For?'}
            </h2>
            <p className="text-gray-300 mb-8">
              {isTurkish 
                ? 'İletişim sayfamızdan bizimle iletişime geçin veya demo sayfamızı ziyaret edin.'
                : 'Contact us through our contact page or visit our demo page.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${params.locale}/contact`}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  İletişime Geç
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link href={`/${params.locale}/demo`}>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-lg"
                >
                  Demo Dene
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
