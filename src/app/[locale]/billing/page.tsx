'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Users, Crown, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: any;
  color: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Ücretsiz',
    price: 0,
    currency: 'TRY',
    period: 'ay',
    description: 'Kişisel kullanım için ideal',
    features: [
      '50 mesaj/ay',
      '10,000 token/ay',
      '10 görsel üretimi/ay',
      'Temel AI asistanları',
      'E-posta desteği',
      'Temel analitikler',
    ],
    icon: Users,
    color: 'from-gray-600 to-gray-700',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    currency: 'TRY',
    period: 'ay',
    description: 'Profesyoneller için',
    features: [
      '500 mesaj/ay',
      '100,000 token/ay',
      '100 görsel üretimi/ay',
      'Tüm AI asistanları',
      'Öncelikli destek',
      'Gelişmiş analitikler',
      'API erişimi',
      'Özel entegrasyonlar',
    ],
    popular: true,
    icon: Zap,
    color: 'from-purple-600 to-purple-700',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: 'TRY',
    period: 'ay',
    description: 'Büyük ekipler için',
    features: [
      'Sınırsız mesaj',
      'Sınırsız token',
      'Sınırsız görsel üretimi',
      'Tüm AI asistanları',
      '7/24 telefon desteği',
      'Detaylı raporlama',
      'Tam API erişimi',
      'Özel entegrasyonlar',
      'Dedicated hesap yöneticisi',
      'Özel eğitimler',
    ],
    icon: Crown,
    color: 'from-orange-600 to-orange-700',
  },
];

export default function BillingPage() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = user?.plan || 'free';

  const handleUpgrade = () => {
    // Burada Stripe checkout'a yönlendirme yapılacak
    // window.location.href = `/api/stripe/checkout?plan=${planId}`;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Fiyatlandırma</h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            İhtiyacınıza uygun planı seçin ve AI asistanlarımızın gücünden tam olarak faydalanın
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className='flex justify-center'>
          <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1'>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Yıllık
              <Badge className='ml-2 bg-green-500/20 text-green-400 border-green-500/50 text-xs'>
                %20 İndirim
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {pricingPlans.map(plan => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;
            const isPopular = plan.popular;

            return (
              <Card
                key={plan.id}
                className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${
                  isPopular ? 'ring-2 ring-purple-500' : ''
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
              >
                {isPopular && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <Badge className='bg-purple-500 text-white'>
                      <Star className='w-3 h-3 mr-1' />
                      En Popüler
                    </Badge>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <Badge className='bg-green-500 text-white'>
                      <Check className='w-3 h-3 mr-1' />
                      Mevcut Plan
                    </Badge>
                  </div>
                )}

                <div className='p-8'>
                  <div className='text-center mb-6'>
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${plan.color}`}
                    >
                      <Icon className='w-8 h-8 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-white mb-2'>{plan.name}</h3>
                    <p className='text-gray-300 mb-4'>{plan.description}</p>
                    <div className='mb-4'>
                      <span className='text-4xl font-bold text-white'>
                        {billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price}
                      </span>
                      <span className='text-gray-300 ml-2'>
                        {plan.currency}/{billingCycle === 'yearly' ? 'yıl' : plan.period}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price > 0 && (
                      <p className='text-green-400 text-sm'>
                        Aylık {plan.price} {plan.currency} yerine {Math.round(plan.price * 0.8)}{' '}
                        {plan.currency}
                      </p>
                    )}
                  </div>

                  <div className='space-y-3 mb-8'>
                    {plan.features.map((feature, index) => (
                      <div key={index} className='flex items-center space-x-3'>
                        <Check className='w-5 h-5 text-green-400 flex-shrink-0' />
                        <span className='text-gray-300'>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleUpgrade}
                    disabled={isCurrentPlan}
                    className={`w-full ${
                      isCurrentPlan
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : isPopular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {isCurrentPlan ? (
                      'Mevcut Plan'
                    ) : (
                      <>
                        {plan.price === 0 ? 'Ücretsiz Başla' : 'Planı Seç'}
                        <ArrowRight className='w-4 h-4 ml-2' />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-8'>
            <h3 className='text-2xl font-bold text-white mb-6 text-center'>
              Özellik Karşılaştırması
            </h3>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-white/20'>
                    <th className='text-left text-white py-4'>Özellik</th>
                    <th className='text-center text-white py-4'>Ücretsiz</th>
                    <th className='text-center text-white py-4'>Pro</th>
                    <th className='text-center text-white py-4'>Enterprise</th>
                  </tr>
                </thead>
                <tbody className='space-y-4'>
                  <tr className='border-b border-white/10'>
                    <td className='text-gray-300 py-4'>Aylık Mesaj Limiti</td>
                    <td className='text-center text-gray-300 py-4'>50</td>
                    <td className='text-center text-gray-300 py-4'>500</td>
                    <td className='text-center text-gray-300 py-4'>Sınırsız</td>
                  </tr>
                  <tr className='border-b border-white/10'>
                    <td className='text-gray-300 py-4'>Token Limiti</td>
                    <td className='text-center text-gray-300 py-4'>10K</td>
                    <td className='text-center text-gray-300 py-4'>100K</td>
                    <td className='text-center text-gray-300 py-4'>Sınırsız</td>
                  </tr>
                  <tr className='border-b border-white/10'>
                    <td className='text-gray-300 py-4'>Görsel Üretimi</td>
                    <td className='text-center text-gray-300 py-4'>10</td>
                    <td className='text-center text-gray-300 py-4'>100</td>
                    <td className='text-center text-gray-300 py-4'>Sınırsız</td>
                  </tr>
                  <tr className='border-b border-white/10'>
                    <td className='text-gray-300 py-4'>AI Asistanları</td>
                    <td className='text-center text-gray-300 py-4'>Temel</td>
                    <td className='text-center text-gray-300 py-4'>Tümü</td>
                    <td className='text-center text-gray-300 py-4'>Tümü</td>
                  </tr>
                  <tr className='border-b border-white/10'>
                    <td className='text-gray-300 py-4'>Destek</td>
                    <td className='text-center text-gray-300 py-4'>E-posta</td>
                    <td className='text-center text-gray-300 py-4'>Öncelikli</td>
                    <td className='text-center text-gray-300 py-4'>7/24 Telefon</td>
                  </tr>
                  <tr>
                    <td className='text-gray-300 py-4'>API Erişimi</td>
                    <td className='text-center text-gray-300 py-4'>-</td>
                    <td className='text-center text-gray-300 py-4'>✓</td>
                    <td className='text-center text-gray-300 py-4'>✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-8'>
            <h3 className='text-2xl font-bold text-white mb-6 text-center'>Sık Sorulan Sorular</h3>
            <div className='space-y-6'>
              <div>
                <h4 className='text-lg font-semibold text-white mb-2'>
                  Plan değişikliği nasıl yapılır?
                </h4>
                <p className='text-gray-300'>
                  İstediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler
                  anında geçerli olur.
                </p>
              </div>
              <div>
                <h4 className='text-lg font-semibold text-white mb-2'>
                  Ödeme güvenliği nasıl sağlanıyor?
                </h4>
                <p className='text-gray-300'>
                  Tüm ödemeler Stripe üzerinden güvenli şekilde işlenir. Kart bilgileriniz
                  saklanmaz.
                </p>
              </div>
              <div>
                <h4 className='text-lg font-semibold text-white mb-2'>
                  İptal etme politikası nedir?
                </h4>
                <p className='text-gray-300'>
                  İstediğiniz zaman iptal edebilirsiniz. Ödediğiniz tutarın kullanılmamış kısmı iade
                  edilir.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <div className='text-center'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-2xl mx-auto'>
            <h3 className='text-xl font-bold text-white mb-4'>Özel İhtiyaçlarınız mı var?</h3>
            <p className='text-gray-300 mb-6'>
              Büyük ekipler için özel çözümler sunuyoruz. Bizimle iletişime geçin.
            </p>
            <Link href='/tr/contact'>
              <Button className='bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700'>
                İletişime Geç
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
