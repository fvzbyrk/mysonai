import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Bot, 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Lightbulb,
  Sparkles,
  Target,
  Rocket
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
      ? 'AI Araçları - MySonAI Yapay Zeka Araçları ve Özellikleri'
      : 'AI Tools - MySonAI Artificial Intelligence Tools and Features',
    description: isTurkish
      ? 'MySonAI AI araçları: Chatbot, görsel üretim, metin analizi, kod yazma ve daha fazlası. 18 uzman AI asistanı ile güçlü araçlar.'
      : 'MySonAI AI tools: Chatbot, image generation, text analysis, code writing and more. Powerful tools with 18 expert AI assistants.',
    keywords: isTurkish
      ? 'AI araçları, yapay zeka araçları, chatbot, görsel üretim, metin analizi, kod yazma'
      : 'AI tools, artificial intelligence tools, chatbot, image generation, text analysis, code writing',
  };
}

// AI Tools categories
const toolCategories = [
  {
    icon: Bot,
    title: 'Sohbet & İletişim',
    description: 'AI asistanları ile doğal dilde sohbet edin',
    color: 'from-blue-500 to-cyan-500',
    tools: [
      'Gerçek zamanlı sohbet',
      'Çok dilli destek',
      'Bağlam koruma',
      'Emoji ve ifade desteği',
    ],
  },
  {
    icon: Code,
    title: 'Kod Geliştirme',
    description: 'Yazılım geliştirme için AI destekli araçlar',
    color: 'from-green-500 to-emerald-500',
    tools: [
      'Kod yazma yardımı',
      'Hata düzeltme',
      'Kod optimizasyonu',
      'Dokümantasyon oluşturma',
    ],
  },
  {
    icon: Lightbulb,
    title: 'İçerik Üretimi',
    description: 'Metin, görsel ve medya içeriği oluşturun',
    color: 'from-purple-500 to-pink-500',
    tools: [
      'Makale yazma',
      'Sosyal medya içeriği',
      'E-posta şablonları',
      'Sunum hazırlama',
    ],
  },
  {
    icon: Target,
    title: 'Analiz & Raporlama',
    description: 'Veri analizi ve raporlama araçları',
    color: 'from-orange-500 to-red-500',
    tools: [
      'Veri analizi',
      'Trend analizi',
      'Rapor oluşturma',
      'Görselleştirme',
    ],
  },
];

// Featured tools
const featuredTools = [
  {
    name: 'Akıllı Chatbot',
    description: '18 uzman AI asistanı ile doğal dilde sohbet edin. Her asistan kendi alanında uzman.',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    features: ['7/24 kullanılabilir', 'Çok dilli destek', 'Bağlam koruma'],
  },
  {
    name: 'Kod Asistanı',
    description: 'Yazılım geliştirme sürecinizi hızlandırın. Kod yazma, hata düzeltme ve optimizasyon.',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    features: ['Çoklu dil desteği', 'Hata tespiti', 'Performans optimizasyonu'],
  },
  {
    name: 'İçerik Üretici',
    description: 'Blog yazıları, sosyal medya içeriği ve e-posta şablonları oluşturun.',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
    features: ['SEO optimizasyonu', 'Ton ayarlama', 'Çoklu format'],
  },
  {
    name: 'Veri Analisti',
    description: 'Verilerinizi analiz edin, trendleri keşfedin ve görsel raporlar oluşturun.',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    features: ['Otomatik analiz', 'Görselleştirme', 'Rapor oluşturma'],
  },
];

// Tool benefits
const toolBenefits = [
  {
    icon: Zap,
    title: 'Hızlı Sonuçlar',
    description: 'Pi\'den 10x daha hızlı yanıtlar alın. Zamanınızı tasarruf edin.',
  },
  {
    icon: Shield,
    title: 'Güvenli',
    description: 'Verileriniz en yüksek güvenlik standartları ile korunur.',
  },
  {
    icon: Globe,
    title: 'Türkçe',
    description: 'Tamamen Türkçe konuşan AI araçları. Dil ve kültür uyumu.',
  },
  {
    icon: Users,
    title: 'Kolay Kullanım',
    description: 'Teknik bilgi gerektirmez. Herkes kolayca kullanabilir.',
  },
];

function ToolsContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              AI Araçları
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI'ın güçlü AI araçları ile işinizi kolaylaştırın. 
              18 uzman asistan ile her türlü görevi hızlı ve etkili şekilde tamamlayın.
            </p>
            
            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Sparkles className='w-6 h-6 inline mr-2' />
                Araçları Dene
              </Link>
              <Link
                href={`/${params.locale}/assistants`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Bot className='w-6 h-6 inline mr-2' />
                Asistanları Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Araç Kategorileri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              İhtiyacınıza uygun AI araçlarını keşfedin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {toolCategories.map((category, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3 text-center'>{category.title}</h3>
                <p className='text-gray-300 text-sm mb-4 text-center'>{category.description}</p>
                <ul className='space-y-2'>
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} className='flex items-center text-gray-300 text-sm'>
                      <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0' />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Öne Çıkan Araçlar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              En popüler ve güçlü AI araçlarımız
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {featuredTools.map((tool, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-8 hover:bg-white/15 transition-all duration-300'>
                <div className='flex items-start space-x-6'>
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <tool.icon className='w-8 h-8 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-2xl font-bold text-white mb-3'>{tool.name}</h3>
                    <p className='text-gray-300 mb-4'>{tool.description}</p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {tool.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant='secondary' className='text-xs'>
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/${params.locale}/demo`}>
                      <Button
                        variant='outline'
                        className='border-white/20 text-white hover:bg-white/10'
                      >
                        Dene
                        <ArrowRight className='w-4 h-4 ml-2' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Benefits */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Neden MySonAI Araçları?
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI araçlarını benzersiz kılan özellikler
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {toolBenefits.map((benefit, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <benefit.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{benefit.title}</h3>
                <p className='text-gray-300 text-sm'>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Kullanım Alanları
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI araçları hangi alanlarda kullanılabilir?
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>💼</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>İş Dünyası</h3>
              <p className='text-gray-300 text-sm mb-4'>
                E-posta yazma, rapor hazırlama, sunum oluşturma, müşteri hizmetleri
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🎓</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>Eğitim</h3>
              <p className='text-gray-300 text-sm mb-4'>
                Ödev yardımı, araştırma, dil öğrenme, proje hazırlama
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>💻</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>Teknoloji</h3>
              <p className='text-gray-300 text-sm mb-4'>
                Kod yazma, hata düzeltme, dokümantasyon, test yazma
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              AI Araçlarını Keşfedin
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              MySonAI'ın güçlü AI araçları ile işinizi kolaylaştırın. 
              Hemen başlayın ve farkı görün!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Rocket className='w-6 h-6 inline mr-2' />
                Hemen Başla
              </Link>
              <Link
                href={`/${params.locale}/pricing`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Star className='w-6 h-6 inline mr-2' />
                Planları Gör
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ToolsPage({ params }: { params: { locale: Locale } }) {
  return <ToolsContent params={params} />;
}
