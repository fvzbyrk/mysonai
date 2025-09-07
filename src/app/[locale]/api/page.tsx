import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeatureGuard } from '@/components/feature-guard';
import Link from 'next/link';
import { 
  Code, 
  Terminal, 
  Zap, 
  Shield, 
  BookOpen, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Lightbulb,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Key,
  Database
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'API - MySonAI RESTful API | AI Asistanları Entegrasyonu'
      : 'API - MySonAI RESTful API | AI Assistants Integration',
    description: isTurkish
      ? 'MySonAI RESTful API ile AI asistanlarınızı kendi uygulamalarınıza entegre edin. Hızlı, güvenli ve ölçeklenebilir API çözümleri.'
      : 'Integrate MySonAI assistants into your applications with our RESTful API. Fast, secure and scalable API solutions.',
    keywords: isTurkish
      ? 'MySonAI API, RESTful API, AI asistanları API, entegrasyon, dokümantasyon, SDK'
      : 'MySonAI API, RESTful API, AI assistants API, integration, documentation, SDK',
  };
}

// API features
const apiFeatures = [
  {
    icon: Zap,
    title: 'Hızlı API',
    description: 'RESTful API ile hızlı ve güvenilir entegrasyon',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Güvenli',
    description: 'End-to-end şifreleme ve API anahtarı koruması',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code,
    title: 'Kolay Entegrasyon',
    description: 'Basit SDK ve kapsamlı dokümantasyon',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Ölçeklenebilir',
    description: 'Milyonlarca istek için optimize edilmiş',
    color: 'from-orange-500 to-red-500',
  },
];

// API endpoints
const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/v1/chat',
    description: 'AI asistanı ile sohbet et',
    parameters: ['message', 'agent', 'context'],
    example: {
      request: `{
  "message": "Merhaba! Proje planımı hazırlamama yardım eder misin?",
  "agent": "fevzi",
  "context": "yazılım geliştirme"
}`,
      response: `{
  "message": "Tabii ki! Proje planınızı hazırlamanıza yardımcı olabilirim...",
  "agent": "fevzi",
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    },
  },
  {
    method: 'GET',
    endpoint: '/api/v1/agents',
    description: 'Mevcut AI asistanlarını listele',
    parameters: ['limit', 'offset'],
    example: {
      request: `GET /api/v1/agents?limit=10&offset=0`,
      response: `{
  "agents": [
    {
      "id": "fevzi",
      "name": "Fevzi",
      "role": "Takım Lideri",
      "description": "Proje yönetimi ve koordinasyon"
    }
  ],
  "total": 18
}`,
    },
  },
  {
    method: 'POST',
    endpoint: '/api/v1/agents/{id}/chat',
    description: 'Belirli bir asistan ile sohbet et',
    parameters: ['message', 'context'],
    example: {
      request: `{
  "message": "Ürün roadmap'imizi nasıl oluşturabiliriz?",
  "context": "ürün yönetimi"
}`,
      response: `{
  "message": "Ürün roadmap'i oluştururken şu adımları takip edebiliriz...",
  "agent": "elif",
  "timestamp": "2024-01-15T10:35:00Z"
}`,
    },
  },
  {
    method: 'GET',
    endpoint: '/api/v1/usage',
    description: 'API kullanım istatistikleri',
    parameters: ['start_date', 'end_date'],
    example: {
      request: `GET /api/v1/usage?start_date=2024-01-01&end_date=2024-01-31`,
      response: `{
  "total_requests": 1250,
  "total_tokens": 45000,
  "remaining_quota": 8750,
  "period": "2024-01-01 to 2024-01-31"
}`,
    },
  },
];

// SDK languages
const sdkLanguages = [
  {
    name: 'JavaScript',
    icon: '🟨',
    description: 'Node.js ve browser desteği',
    status: 'Available',
    color: 'from-yellow-500 to-orange-500',
    install: 'npm install @mysonai/sdk',
  },
  {
    name: 'Python',
    icon: '🐍',
    description: 'Python 3.7+ desteği',
    status: 'Available',
    color: 'from-green-500 to-blue-500',
    install: 'pip install mysonai-sdk',
  },
  {
    name: 'PHP',
    icon: '🐘',
    description: 'PHP 7.4+ desteği',
    status: 'Available',
    color: 'from-purple-500 to-pink-500',
    install: 'composer require mysonai/sdk',
  },
  {
    name: 'Go',
    icon: '🐹',
    description: 'Go 1.18+ desteği',
    status: 'Coming Soon',
    color: 'from-blue-500 to-cyan-500',
    install: 'go get github.com/mysonai/sdk-go',
  },
];

// Pricing tiers
const pricingTiers = [
  {
    name: 'Free',
    requests: '1,000',
    price: '0₺',
    features: ['Temel API erişimi', '5 AI asistan', 'Email desteği'],
  },
  {
    name: 'Pro',
    requests: '100,000',
    price: '29₺',
    features: ['Tüm AI asistanlar', 'Öncelikli destek', 'API dokümantasyonu'],
  },
  {
    name: 'Enterprise',
    requests: 'Unlimited',
    price: 'Özel',
    features: ['Özel entegrasyonlar', '7/24 destek', 'SLA garantisi'],
  },
];

function APIContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              MySonAI API
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              RESTful API ile AI asistanlarınızı kendi uygulamalarınıza entegre edin. 
              Hızlı, güvenli ve ölçeklenebilir çözümler.
            </p>
            
            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/docs`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <BookOpen className='w-6 h-6 inline mr-2' />
                Dokümantasyon
              </Link>
              <Link
                href='https://github.com/mysonai/sdk'
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Github className='w-6 h-6 inline mr-2' />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              API Özellikleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI API'nin güçlü özellikleri
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {apiFeatures.map((feature, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{feature.title}</h3>
                <p className='text-gray-300 text-sm'>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              API Endpoints
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI API'nin temel endpoint'leri
            </p>
          </div>

          <div className='space-y-8'>
            {apiEndpoints.map((endpoint, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-4'>
                    <Badge 
                      variant={endpoint.method === 'POST' ? 'default' : 'secondary'}
                      className={endpoint.method === 'POST' ? 'bg-green-500' : 'bg-blue-500'}
                    >
                      {endpoint.method}
                    </Badge>
                    <code className='text-white font-mono text-lg'>{endpoint.endpoint}</code>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>{endpoint.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {endpoint.parameters.map((param, paramIndex) => (
                    <Badge key={paramIndex} variant='outline' className='text-xs'>
                      {param}
                    </Badge>
                  ))}
                </div>
                
                {/* Example */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='text-white font-semibold mb-2'>Request:</h4>
                    <pre className='bg-black/20 rounded-lg p-4 overflow-x-auto'>
                      <code className='text-gray-300 text-sm'>{endpoint.example.request}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-2'>Response:</h4>
                    <pre className='bg-black/20 rounded-lg p-4 overflow-x-auto'>
                      <code className='text-gray-300 text-sm'>{endpoint.example.response}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Languages */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              SDK Dilleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Favori programlama dilinizde MySonAI'ı kullanın
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {sdkLanguages.map((sdk, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-3xl mr-3'>{sdk.icon}</span>
                  <div>
                    <h3 className='text-xl font-bold text-white'>{sdk.name}</h3>
                    <Badge 
                      variant={sdk.status === 'Available' ? 'default' : 'secondary'}
                      className={sdk.status === 'Available' ? 'bg-green-500' : 'bg-gray-500'}
                    >
                      {sdk.status}
                    </Badge>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mb-4'>{sdk.description}</p>
                <div className='bg-black/20 rounded-lg p-3 mb-4'>
                  <code className='text-gray-300 text-xs'>{sdk.install}</code>
                </div>
                {sdk.status === 'Available' && (
                  <Button
                    asChild
                    variant='outline'
                    className='w-full border-white/20 text-white hover:bg-white/10'
                  >
                    <Link href={`/${params.locale}/docs`}>
                      Dokümantasyon
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              API Fiyatlandırması
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              İhtiyacınıza uygun API planını seçin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {pricingTiers.map((tier, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <h3 className='text-2xl font-bold text-white mb-2'>{tier.name}</h3>
                <div className='text-3xl font-bold text-white mb-2'>{tier.price}</div>
                <div className='text-gray-400 text-sm mb-4'>{tier.requests} istek/ay</div>
                <ul className='space-y-2 mb-6'>
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center text-gray-300 text-sm'>
                      <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${
                    tier.name === 'Pro'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  } text-white`}
                >
                  <Link href={tier.name === 'Enterprise' ? `/${params.locale}/contact` : `/${params.locale}/signup`}>
                    {tier.name === 'Enterprise' ? 'İletişime Geç' : 'Başla'}
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Hızlı Başlangıç
            </h2>
            <p className='text-xl text-gray-300'>
              MySonAI API'yi 5 dakikada kullanmaya başlayın
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Key className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                API Anahtarı Alın
              </h3>
              <p className='text-gray-300 mb-4'>
                Dashboard'dan API anahtarınızı oluşturun
              </p>
              <Link href={`/${params.locale}/dashboard`}>
                <Button variant='outline' className='w-full border-white/20 text-white hover:bg-white/10'>
                  Dashboard'a Git
                </Button>
              </Link>
            </Card>
            
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Terminal className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                SDK'yı Yükleyin
              </h3>
              <p className='text-gray-300 mb-4'>
                NPM veya pip ile SDK'yı yükleyin
              </p>
              <Button variant='outline' className='w-full border-white/20 text-white hover:bg-white/10'>
                <Copy className='w-4 h-4 mr-2' />
                Kodu Kopyala
              </Button>
            </Card>
            
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Code className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                İlk İsteği Gönderin
              </h3>
              <p className='text-gray-300 mb-4'>
                AI asistanınızla konuşmaya başlayın
              </p>
              <Link href={`/${params.locale}/demo`}>
                <Button variant='outline' className='w-full border-white/20 text-white hover:bg-white/10'>
                  Demo'yu Dene
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              API ile Geliştirmeye Başlayın
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              MySonAI API ile AI asistanlarınızı kendi uygulamalarınıza entegre edin
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/docs`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <BookOpen className='w-6 h-6 inline mr-2' />
                Dokümantasyon
              </Link>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Lightbulb className='w-6 h-6 inline mr-2' />
                Destek Al
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function APIPage({ params }: { params: { locale: Locale } }) {
  return (
    <FeatureGuard feature='api' fallback={<div>API sayfası devre dışı</div>}>
      <APIContent params={params} />
    </FeatureGuard>
  );
}
