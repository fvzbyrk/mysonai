import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Globe,
  Code,
  Bot,
  MessageCircle
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
      ? 'Tutorial - MySonAI Kullanım Kılavuzu | AI Asistanları Nasıl Kullanılır'
      : 'Tutorial - MySonAI Usage Guide | How to Use AI Assistants',
    description: isTurkish
      ? 'MySonAI kullanım kılavuzu ve tutorialları. AI asistanları nasıl kullanılır, en iyi uygulamalar ve ipuçları.'
      : 'MySonAI usage guide and tutorials. How to use AI assistants, best practices and tips.',
    keywords: isTurkish
      ? 'MySonAI tutorial, kullanım kılavuzu, AI asistanları nasıl kullanılır, rehber'
      : 'MySonAI tutorial, usage guide, how to use AI assistants, guide',
  };
}

// Tutorial categories
const tutorialCategories = [
  {
    icon: Play,
    title: 'Başlangıç',
    description: 'MySonAI\'a hızlıca başlamak için temel adımlar',
    color: 'from-green-500 to-emerald-500',
    tutorials: 5,
  },
  {
    icon: Bot,
    title: 'AI Asistanları',
    description: 'AI asistanlarını etkili şekilde kullanma',
    color: 'from-blue-500 to-cyan-500',
    tutorials: 8,
  },
  {
    icon: Code,
    title: 'API & Entegrasyon',
    description: 'API kullanımı ve uygulama entegrasyonu',
    color: 'from-purple-500 to-pink-500',
    tutorials: 6,
  },
  {
    icon: Target,
    title: 'İleri Seviye',
    description: 'Gelişmiş özellikler ve optimizasyon',
    color: 'from-orange-500 to-red-500',
    tutorials: 4,
  },
];

// Featured tutorials
const featuredTutorials = [
  {
    title: 'MySonAI\'a İlk Adım',
    description: 'Hesap oluşturma, giriş yapma ve temel kullanım',
    duration: '5 dk',
    difficulty: 'Başlangıç',
    category: 'Başlangıç',
    icon: Play,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'AI Asistanları ile Sohbet',
    description: 'Doğal dilde sohbet etme ve en iyi sonuçları alma',
    duration: '8 dk',
    difficulty: 'Orta',
    category: 'AI Asistanları',
    icon: MessageCircle,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'API Entegrasyonu',
    description: 'Kendi uygulamanızda MySonAI kullanma',
    duration: '15 dk',
    difficulty: 'İleri',
    category: 'API & Entegrasyon',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Özel Asistan Oluşturma',
    description: 'Kendi AI asistanınızı özelleştirme',
    duration: '12 dk',
    difficulty: 'İleri',
    category: 'İleri Seviye',
    icon: Bot,
    color: 'from-orange-500 to-red-500',
  },
];

// Step-by-step guides
const stepGuides = [
  {
    title: 'Hesap Oluşturma',
    steps: [
      'MySonAI.com\'a gidin',
      'Kayıt ol butonuna tıklayın',
      'E-posta ve şifre girin',
      'E-posta doğrulaması yapın',
      'Profil bilgilerinizi tamamlayın',
    ],
  },
  {
    title: 'İlk Sohbet',
    steps: [
      'Demo sayfasına gidin',
      'Bir AI asistanı seçin',
      'Merhaba yazın',
      'Asistanın yanıtını bekleyin',
      'Sohbeti devam ettirin',
    ],
  },
  {
    title: 'API Kullanımı',
    steps: [
      'Dashboard\'dan API anahtarı alın',
      'SDK\'yı projenize yükleyin',
      'API anahtarını yapılandırın',
      'İlk isteği gönderin',
      'Yanıtı işleyin',
    ],
  },
];

// Best practices
const bestPractices = [
  {
    icon: Lightbulb,
    title: 'Açık Sorular Sorun',
    description: 'Evet/hayır soruları yerine açık uçlu sorular kullanın. Bu, daha detaylı yanıtlar almanızı sağlar.',
  },
  {
    icon: Target,
    title: 'Bağlam Sağlayın',
    description: 'Sorularınızda yeterli bağlam verin. AI asistanı size daha doğru ve yararlı yanıtlar verebilir.',
  },
  {
    icon: Zap,
    title: 'Kısa ve Net Olun',
    description: 'Uzun ve karmaşık sorular yerine kısa, net sorular sorun. Bu, daha hızlı yanıtlar almanızı sağlar.',
  },
  {
    icon: Shield,
    title: 'Güvenli Bilgiler Paylaşın',
    description: 'Kişisel veya hassas bilgileri paylaşmayın. AI asistanları güvenli olsa da dikkatli olun.',
  },
];

function TutorialContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Tutorial
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI kullanım kılavuzu ve tutorial'ları. AI asistanları nasıl kullanılır, 
              en iyi uygulamalar ve ipuçları ile hızlıca öğrenin.
            </p>
            
            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Play className='w-6 h-6 inline mr-2' />
                Hemen Başla
              </Link>
              <Link
                href={`/${params.locale}/docs`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <BookOpen className='w-6 h-6 inline mr-2' />
                Dokümantasyon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Tutorial Kategorileri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Seviyenize uygun tutorial'ları keşfedin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {tutorialCategories.map((category, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{category.title}</h3>
                <p className='text-gray-300 text-sm mb-4'>{category.description}</p>
                <div className='flex items-center justify-center space-x-2 text-gray-400 text-sm'>
                  <BookOpen className='w-4 h-4' />
                  <span>{category.tutorials} tutorial</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Öne Çıkan Tutorial'lar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              En popüler ve faydalı tutorial'larımız
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {featuredTutorials.map((tutorial, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                <div className='flex items-start space-x-4'>
                  <div className={`w-12 h-12 bg-gradient-to-r ${tutorial.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <tutorial.icon className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-white mb-2'>{tutorial.title}</h3>
                    <p className='text-gray-300 text-sm mb-4'>{tutorial.description}</p>
                    <div className='flex items-center space-x-4 mb-4'>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <Clock className='w-4 h-4 mr-1' />
                        <span>{tutorial.duration}</span>
                      </div>
                      <Badge variant='secondary' className='text-xs'>
                        {tutorial.difficulty}
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {tutorial.category}
                      </Badge>
                    </div>
                    <Link href={`/${params.locale}/demo`}>
                      <Button
                        variant='outline'
                        className='border-white/20 text-white hover:bg-white/10'
                      >
                        Başla
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

      {/* Step-by-Step Guides */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Adım Adım Kılavuzlar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Temel işlemler için detaylı adım adım kılavuzlar
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {stepGuides.map((guide, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <h3 className='text-xl font-bold text-white mb-4'>{guide.title}</h3>
                <ol className='space-y-3'>
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className='flex items-start space-x-3'>
                      <div className='w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <span className='text-white text-xs font-bold'>{stepIndex + 1}</span>
                      </div>
                      <span className='text-gray-300 text-sm'>{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              En İyi Uygulamalar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI\'ı en etkili şekilde kullanmak için ipuçları
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {bestPractices.map((practice, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <practice.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{practice.title}</h3>
                <p className='text-gray-300 text-sm'>{practice.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Sık Sorulan Sorular
            </h2>
            <p className='text-xl text-gray-300'>
              Tutorial hakkında merak ettikleriniz
            </p>
          </div>

          <div className='space-y-6'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Tutorial'ları takip etmek için önceden bilgi gerekli mi?
              </h3>
              <p className='text-gray-300'>
                Hayır! Tutorial'larımız başlangıç seviyesinden başlar ve adım adım ilerler. 
                Teknik bilgi gerektirmez, herkes takip edebilir.
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Tutorial'ları tamamladıktan sonra ne yapabilirim?
              </h3>
              <p className='text-gray-300'>
                Tutorial'ları tamamladıktan sonra MySonAI'ın tüm özelliklerini kullanabilir, 
                kendi projelerinizde AI asistanlarını entegre edebilirsiniz.
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Tutorial'larda sorun yaşarsam ne yapmalıyım?
              </h3>
              <p className='text-gray-300'>
                Sorun yaşarsanız destek ekibimizle iletişime geçebilirsiniz. 
                7/24 hizmetinizdeyiz ve size yardımcı olmaktan mutluluk duyarız.
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
              Öğrenmeye Başlayın
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Tutorial'larımızı takip ederek MySonAI'ı hızlıca öğrenin ve 
              AI asistanlarının gücünü keşfedin!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Play className='w-6 h-6 inline mr-2' />
                Hemen Başla
              </Link>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <MessageCircle className='w-6 h-6 inline mr-2' />
                Destek Al
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function TutorialPage({ params }: { params: { locale: Locale } }) {
  return <TutorialContent params={params} />;
}
