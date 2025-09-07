import { Locale } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FeatureGuard } from '@/components/feature-guard'
import Link from 'next/link'
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  Users, 
  Settings, 
  ArrowRight,
  Search,
  Filter,
  Clock,
  Star
} from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';
  
  return {
    title: isTurkish 
      ? 'Dokümantasyon - MySonAI API ve Kullanım Kılavuzu'
      : 'Documentation - MySonAI API and Usage Guide',
    description: isTurkish
      ? 'MySonAI API dokümantasyonu, entegrasyon kılavuzları ve kullanım örnekleri. Hızlı başlangıç ve gelişmiş özellikler.'
      : 'MySonAI API documentation, integration guides and usage examples. Quick start and advanced features.',
    keywords: isTurkish
      ? 'MySonAI API, dokümantasyon, entegrasyon, kullanım kılavuzu, API referansı'
      : 'MySonAI API, documentation, integration, usage guide, API reference',
  };
}

// Documentation sections
const docSections = [
  {
    id: 'getting-started',
    title: 'Hızlı Başlangıç',
    description: 'MySonAI\'a hızlıca başlamak için temel adımlar',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
    articles: [
      { id: 'installation', title: 'Kurulum ve Yapılandırma', readTime: '5 dk' },
      { id: 'first-chat', title: 'İlk Sohbetinizi Başlatın', readTime: '3 dk' },
      { id: 'basic-usage', title: 'Temel Kullanım', readTime: '7 dk' }
    ]
  },
  {
    id: 'api-reference',
    title: 'API Referansı',
    description: 'MySonAI API\'nin detaylı dokümantasyonu',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    articles: [
      { id: 'authentication', title: 'Kimlik Doğrulama', readTime: '4 dk' },
      { id: 'endpoints', title: 'API Endpoints', readTime: '10 dk' },
      { id: 'rate-limits', title: 'Rate Limiting', readTime: '3 dk' },
      { id: 'error-handling', title: 'Hata Yönetimi', readTime: '5 dk' }
    ]
  },
  {
    id: 'integrations',
    title: 'Entegrasyonlar',
    description: 'Popüler platformlarla entegrasyon kılavuzları',
    icon: Settings,
    color: 'from-purple-500 to-pink-500',
    articles: [
      { id: 'webhook-setup', title: 'Webhook Kurulumu', readTime: '6 dk' },
      { id: 'slack-integration', title: 'Slack Entegrasyonu', readTime: '8 dk' },
      { id: 'discord-bot', title: 'Discord Bot', readTime: '10 dk' },
      { id: 'wordpress-plugin', title: 'WordPress Eklentisi', readTime: '12 dk' }
    ]
  },
  {
    id: 'security',
    title: 'Güvenlik',
    description: 'Güvenlik en iyi uygulamaları ve öneriler',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    articles: [
      { id: 'api-keys', title: 'API Anahtarları', readTime: '4 dk' },
      { id: 'data-privacy', title: 'Veri Gizliliği', readTime: '6 dk' },
      { id: 'encryption', title: 'Şifreleme', readTime: '5 dk' }
    ]
  },
  {
    id: 'advanced',
    title: 'Gelişmiş Özellikler',
    description: 'Gelişmiş kullanım senaryoları ve optimizasyon',
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
    articles: [
      { id: 'custom-models', title: 'Özel Modeller', readTime: '15 dk' },
      { id: 'batch-processing', title: 'Toplu İşlem', readTime: '8 dk' },
      { id: 'performance-tuning', title: 'Performans Optimizasyonu', readTime: '10 dk' }
    ]
  },
  {
    id: 'support',
    title: 'Destek',
    description: 'Yardım ve destek kaynakları',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    articles: [
      { id: 'faq', title: 'Sık Sorulan Sorular', readTime: '5 dk' },
      { id: 'troubleshooting', title: 'Sorun Giderme', readTime: '7 dk' },
      { id: 'contact-support', title: 'Destek ile İletişim', readTime: '2 dk' }
    ]
  }
];

const categories = ['Tümü', 'Hızlı Başlangıç', 'API Referansı', 'Entegrasyonlar', 'Güvenlik', 'Gelişmiş Özellikler', 'Destek'];

function DocsContent({
  params,
}: {
  params: { locale: Locale }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Dokümantasyon
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              MySonAI API dokümantasyonu, entegrasyon kılavuzları ve kullanım örnekleri
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Dokümantasyonda ara..."
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === 'Tümü' ? 'default' : 'secondary'}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-600 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docSections.map((section) => (
              <Card key={section.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                <div className={`h-32 bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  <section.icon className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {section.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {section.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {section.articles.slice(0, 3).map((article) => (
                      <div key={article.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{article.title}</span>
                        <div className="flex items-center text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    ))}
                    {section.articles.length > 3 && (
                      <div className="text-sm text-gray-400">
                        +{section.articles.length - 3} daha fazla makale
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/${params.locale}/docs/${section.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Bölümü Görüntüle
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hızlı Başlangıç
            </h2>
            <p className="text-xl text-gray-300">
              MySonAI\'a 5 dakikada başlayın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  API Anahtarı Alın
                </h3>
                <p className="text-gray-300 mb-4">
                  Dashboard\'dan API anahtarınızı oluşturun
                </p>
                <Link href={`/${params.locale}/dashboard`}>
                  <Button variant="outline" className="w-full">
                    Dashboard\'a Git
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Kodu Entegre Edin
                </h3>
                <p className="text-gray-300 mb-4">
                  SDK\'mızı projenize ekleyin
                </p>
                <Button variant="outline" className="w-full">
                  <Code className="w-4 h-4 mr-2" />
                  Kodu Kopyala
                </Button>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  İlk Sohbeti Başlatın
                </h3>
                <p className="text-gray-300 mb-4">
                  AI asistanınızla konuşmaya başlayın
                </p>
                <Link href={`/${params.locale}/demo`}>
                  <Button variant="outline" className="w-full">
                    Demo\'yu Dene
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Yardıma mı İhtiyacınız Var?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Dokümantasyonu inceledikten sonra hala sorularınız varsa, destek ekibimizle iletişime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${params.locale}/contact`} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Destek ile İletişim
              </Link>
              <Link href={`/${params.locale}/demo`} className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                Canlı Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DocsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  return (
    <FeatureGuard feature="api" fallback={<div>Dokümantasyon sayfası devre dışı</div>}>
      <DocsContent params={params} />
    </FeatureGuard>
  )
}
