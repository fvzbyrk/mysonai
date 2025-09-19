import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeatureGuard } from '@/components/feature-guard';
import Link from 'next/link';
import { Check, Star, Zap, Shield, Users, ArrowRight, Crown, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Fiyatlandırma - MySonAI AI Asistanları | Ücretsiz, Pro ve Kurumsal Planlar'
      : 'Pricing - MySonAI AI Assistants | Free, Pro and Enterprise Plans',
    description: isTurkish
      ? 'MySonAI fiyatlandırma planları: Ücretsiz, Pro ve Kurumsal seçenekleri. 18 AI asistanı, hızlı yanıtlar ve güvenli sohbet. Hemen başlayın!'
      : 'MySonAI pricing plans: Free, Pro and Enterprise options. 18 AI assistants, fast responses and secure chat. Start now!',
    keywords: isTurkish
      ? 'MySonAI fiyatlandırma, AI asistan fiyatları, ücretsiz AI, Pro plan, kurumsal AI, chatbot fiyatları'
      : 'MySonAI pricing, AI assistant prices, free AI, Pro plan, enterprise AI, chatbot prices',
  };
}

// Pricing plans data
const plans = (locale: Locale) => [
  {
    id: 'free',
    name: t(locale, 'pricing.free'),
    price: '0₺',
    period: '/ay',
    description: 'Bireysel kullanıcılar için',
    features: [
      '5 AI asistan erişimi',
      '100 mesaj/ay',
      'Temel chatbot',
      'Email desteği',
      'Topluluk forumu',
    ],
    popular: false,
    cta: 'Ücretsiz Başla',
    highlight: false,
    icon: Users,
    color: 'from-gray-500 to-gray-600',
  },
  {
    id: 'pro',
    name: t(locale, 'pricing.pro'),
    price: '29₺',
    period: '/ay',
    description: 'Profesyonel kullanıcılar için',
    features: [
      '18 AI asistan erişimi',
      '1000 mesaj/ay',
      'Gelişmiş chatbot',
      'Öncelikli destek',
      'API erişimi',
      'Özel asistanlar',
      'Gelişmiş analitik',
    ],
    popular: true,
    cta: "Pro'ya Geç",
    highlight: true,
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'enterprise',
    name: t(locale, 'pricing.enterprise'),
    price: 'Özel',
    period: '',
    description: 'Büyük ekipler için',
    features: [
      'Sınırsız AI asistan',
      'Sınırsız mesaj',
      'Özel entegrasyonlar',
      '7/24 telefon desteği',
      'Özel eğitim',
      'SLA garantisi',
      'Dedicated sunucu',
      'Özel güvenlik',
    ],
    popular: false,
    cta: 'İletişime Geç',
    highlight: false,
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
  },
];

// Comparison features
const comparisonFeatures = [
  {
    feature: 'AI Asistan Sayısı',
    free: '5',
    pro: '18',
    enterprise: 'Sınırsız',
  },
  {
    feature: 'Aylık Mesaj Limiti',
    free: '100',
    pro: '1,000',
    enterprise: 'Sınırsız',
  },
  {
    feature: 'API Erişimi',
    free: '❌',
    pro: '✅',
    enterprise: '✅',
  },
  {
    feature: 'Öncelikli Destek',
    free: '❌',
    pro: '✅',
    enterprise: '✅',
  },
  {
    feature: 'Özel Entegrasyonlar',
    free: '❌',
    pro: '❌',
    enterprise: '✅',
  },
  {
    feature: 'SLA Garantisi',
    free: '❌',
    pro: '❌',
    enterprise: '✅',
  },
];

function PricingContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>Fiyatlandırma</h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              Her ihtiyaca uygun plan. Ücretsiz başlayın, ihtiyacınıza göre yükseltin.
            </p>

            {/* Trust Indicators */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm mb-8'>
              <div className='flex items-center space-x-2'>
                <span className='text-green-400'>✓</span>
                <span>Kredi kartı gerekmez</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-blue-400'>✓</span>
                <span>İstediğiniz zaman iptal</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-purple-400'>✓</span>
                <span>7 gün ücretsiz deneme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {plans(params.locale).map(plan => (
              <Card
                key={plan.id}
                className={`relative bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className='absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold'>
                    <Star className='w-4 h-4 inline mr-1' />
                    En Popüler
                  </div>
                )}

                <div
                  className={`h-32 bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                >
                  <plan.icon className='w-12 h-12 text-white' />
                </div>

                <div className='p-6'>
                  <div className='text-center mb-6'>
                    <h3 className='text-2xl font-bold text-white mb-2'>{plan.name}</h3>
                    <p className='text-gray-300 text-sm mb-4'>{plan.description}</p>
                    <div className='flex items-baseline justify-center'>
                      <span className='text-4xl font-bold text-white'>{plan.price}</span>
                      <span className='text-gray-400 ml-1'>{plan.period}</span>
                    </div>
                  </div>

                  <ul className='space-y-3 mb-6'>
                    {plan.features.map((feature, index) => (
                      <li key={index} className='flex items-center text-gray-300'>
                        <Check className='w-4 h-4 text-green-400 mr-3 flex-shrink-0' />
                        <span className='text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    } text-white`}
                  >
                    <Link
                      href={
                        plan.id === 'enterprise'
                          ? `/${params.locale}/contact`
                          : `/${params.locale}/signup`
                      }
                    >
                      {plan.cta}
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-white mb-4'>Plan Karşılaştırması</h2>
            <p className='text-xl text-gray-300'>Hangi planın size uygun olduğunu görün</p>
          </div>

          <div className='bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-white/5'>
                  <tr>
                    <th className='px-6 py-4 text-left text-white font-semibold'>Özellik</th>
                    <th className='px-6 py-4 text-center text-white font-semibold'>Ücretsiz</th>
                    <th className='px-6 py-4 text-center text-white font-semibold'>Pro</th>
                    <th className='px-6 py-4 text-center text-white font-semibold'>Kurumsal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className='border-t border-white/10'>
                      <td className='px-6 py-4 text-gray-300 font-medium'>{item.feature}</td>
                      <td className='px-6 py-4 text-center text-gray-300'>{item.free}</td>
                      <td className='px-6 py-4 text-center text-gray-300'>{item.pro}</td>
                      <td className='px-6 py-4 text-center text-gray-300'>{item.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-white mb-4'>Sık Sorulan Sorular</h2>
            <p className='text-xl text-gray-300'>Fiyatlandırma hakkında merak ettikleriniz</p>
          </div>

          <div className='space-y-6'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Ücretsiz plan gerçekten ücretsiz mi?
              </h3>
              <p className='text-gray-300'>
                Evet! Ücretsiz plan tamamen ücretsizdir. Kredi kartı bilgisi istemiyoruz. 5 AI
                asistanı ve 100 mesaj ile MySonAI'ı deneyebilirsiniz.
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Plan değişikliği yapabilir miyim?
              </h3>
              <p className='text-gray-300'>
                Tabii ki! İstediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz.
                Değişiklikler anında geçerli olur ve fark ücreti alınmaz.
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                İptal ettiğimde para iadesi alabilir miyim?
              </h3>
              <p className='text-gray-300'>
                İlk 7 gün içinde iptal ederseniz tam para iadesi alırsınız. Sonrasında
                kullanmadığınız süre için orantılı iade yapılır.
              </p>
            </Card>

            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
              <h3 className='text-xl font-bold text-white mb-3'>
                Kurumsal plan için özel fiyat var mı?
              </h3>
              <p className='text-gray-300'>
                Kurumsal planlar için özel fiyatlandırma yapıyoruz. İhtiyaçlarınıza göre özel
                çözümler sunuyoruz. İletişime geçin!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>Hangi Plan Size Uygun?</h2>
            <p className='text-xl text-gray-300 mb-8'>
              Ücretsiz başlayın, ihtiyacınıza göre yükseltin. 7 gün ücretsiz deneme!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/signup`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Sparkles className='w-6 h-6 inline mr-2' />
                Ücretsiz Başla
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                Demo Dene
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PricingPage({ params }: { params: { locale: Locale } }) {
  return (
    <FeatureGuard feature='pricing' fallback={<div>Fiyatlandırma sayfası devre dışı</div>}>
      <PricingContent params={params} />
    </FeatureGuard>
  );
}
