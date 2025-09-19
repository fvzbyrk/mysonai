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
      ? 'Geliştirici - MySonAI API ve SDK | AI Asistanları Entegrasyonu'
      : 'Developer - MySonAI API and SDK | AI Assistants Integration',
    description: isTurkish
      ? 'MySonAI API ve SDK ile AI asistanlarınızı kendi uygulamalarınıza entegre edin. Dokümantasyon, örnekler ve geliştirici araçları.'
      : 'Integrate MySonAI assistants into your applications with our API and SDK. Documentation, examples and developer tools.',
    keywords: isTurkish
      ? 'MySonAI API, SDK, geliştirici, entegrasyon, AI asistanları API, dokümantasyon'
      : 'MySonAI API, SDK, developer, integration, AI assistants API, documentation',
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

// SDK languages
const sdkLanguages = [
  {
    name: 'JavaScript',
    icon: '🟨',
    description: 'Node.js ve browser desteği',
    status: 'Available',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Python',
    icon: '🐍',
    description: 'Python 3.7+ desteği',
    status: 'Available',
    color: 'from-green-500 to-blue-500',
  },
  {
    name: 'PHP',
    icon: '🐘',
    description: 'PHP 7.4+ desteği',
    status: 'Available',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Go',
    icon: '🐹',
    description: 'Go 1.18+ desteği',
    status: 'Coming Soon',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Java',
    icon: '☕',
    description: 'Java 8+ desteği',
    status: 'Coming Soon',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'C#',
    icon: '🔷',
    description: '.NET 6+ desteği',
    status: 'Coming Soon',
    color: 'from-blue-500 to-purple-500',
  },
];

// Code examples
const codeExamples = [
  {
    language: 'JavaScript',
    title: 'Basit Chat Entegrasyonu',
    code: `import { MySonAI } from '@mysonai/sdk';

const client = new MySonAI({
  apiKey: 'your-api-key',
  agent: 'fevzi' // Takım Lideri
});

const response = await client.chat({
  message: 'Merhaba! Proje planımı hazırlamama yardım eder misin?',
  context: 'yazılım geliştirme'
});

console.log(response.message);`,
  },
  {
    language: 'Python',
    title: 'Python SDK Kullanımı',
    code: `from mysonai import MySonAI

client = MySonAI(
    api_key="your-api-key",
    agent="elif"  # Ürün Müdürü
)

response = client.chat(
    message="Ürün roadmap'imizi nasıl oluşturabiliriz?",
    context="ürün yönetimi"
)

print(response.message)`,
  },
  {
    language: 'PHP',
    title: 'PHP Entegrasyonu',
    code: `<?php
require_once 'vendor/autoload.php';

use MySonAI\\Client;

$client = new Client([
    'api_key' => 'your-api-key',
    'agent' => 'burak'  // Mimar
]);

$response = $client->chat([
    'message' => 'Sistem mimarisi nasıl tasarlanmalı?',
    'context' => 'yazılım mimarisi'
]);

echo $response->message;
?>`,
  },
];

// API endpoints
const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/v1/chat',
    description: 'AI asistanı ile sohbet et',
    parameters: ['message', 'agent', 'context'],
  },
  {
    method: 'GET',
    endpoint: '/api/v1/agents',
    description: 'Mevcut AI asistanlarını listele',
    parameters: ['limit', 'offset'],
  },
  {
    method: 'POST',
    endpoint: '/api/v1/agents/{id}/chat',
    description: 'Belirli bir asistan ile sohbet et',
    parameters: ['message', 'context'],
  },
  {
    method: 'GET',
    endpoint: '/api/v1/usage',
    description: 'API kullanım istatistikleri',
    parameters: ['start_date', 'end_date'],
  },
];

function DeveloperContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>Geliştirici</h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI API ve SDK ile AI asistanlarınızı kendi uygulamalarınıza entegre edin. Hızlı,
              güvenli ve ölçeklenebilir çözümler.
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
            <h2 className='text-4xl font-bold text-white mb-4'>API Özellikleri</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI API'nin güçlü özellikleri
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {apiFeatures.map((feature, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{feature.title}</h3>
                <p className='text-gray-300 text-sm'>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Languages */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>SDK Dilleri</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Favori programlama dilinizde MySonAI'ı kullanın
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {sdkLanguages.map((sdk, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'
              >
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

      {/* Code Examples */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Kod Örnekleri</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Hızlı başlangıç için kod örnekleri
            </p>
          </div>

          <div className='space-y-8'>
            {codeExamples.map((example, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-xl font-bold text-white'>{example.title}</h3>
                  <div className='flex items-center space-x-2'>
                    <Badge variant='secondary'>{example.language}</Badge>
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-white/20 text-white hover:bg-white/10'
                    >
                      <Copy className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
                <pre className='bg-black/20 rounded-lg p-4 overflow-x-auto'>
                  <code className='text-gray-300 text-sm'>{example.code}</code>
                </pre>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>API Endpoints</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI API'nin temel endpoint'leri
            </p>
          </div>

          <div className='space-y-6'>
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
                <div className='flex flex-wrap gap-2'>
                  {endpoint.parameters.map((param, paramIndex) => (
                    <Badge key={paramIndex} variant='outline' className='text-xs'>
                      {param}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Hızlı Başlangıç</h2>
            <p className='text-xl text-gray-300'>MySonAI API'yi 5 dakikada kullanmaya başlayın</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-white'>1</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>API Anahtarı Alın</h3>
              <p className='text-gray-300 mb-4'>Dashboard'dan API anahtarınızı oluşturun</p>
              <Link href={`/${params.locale}/dashboard`}>
                <Button
                  variant='outline'
                  className='w-full border-white/20 text-white hover:bg-white/10'
                >
                  Dashboard'a Git
                </Button>
              </Link>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-white'>2</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>SDK'yı Yükleyin</h3>
              <p className='text-gray-300 mb-4'>NPM veya pip ile SDK'yı yükleyin</p>
              <Button
                variant='outline'
                className='w-full border-white/20 text-white hover:bg-white/10'
              >
                <Terminal className='w-4 h-4 mr-2' />
                Kodu Kopyala
              </Button>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl font-bold text-white'>3</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>İlk Sohbeti Başlatın</h3>
              <p className='text-gray-300 mb-4'>AI asistanınızla konuşmaya başlayın</p>
              <Link href={`/${params.locale}/demo`}>
                <Button
                  variant='outline'
                  className='w-full border-white/20 text-white hover:bg-white/10'
                >
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
            <h2 className='text-4xl font-bold text-white mb-6'>Geliştirmeye Başlayın</h2>
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

export default function DeveloperPage({ params }: { params: { locale: Locale } }) {
  return (
    <FeatureGuard feature='api' fallback={<div>Geliştirici sayfası devre dışı</div>}>
      <DeveloperContent params={params} />
    </FeatureGuard>
  );
}
