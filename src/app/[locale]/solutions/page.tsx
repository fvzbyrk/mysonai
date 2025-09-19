import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Video,
  Briefcase,
  Shield,
  Users,
  GraduationCap,
  Music,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Target,
  Zap,
  Globe,
  Heart,
  Sparkles,
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
      ? 'Çözümlerimiz - MySon Video, Firmatch, Avukat, Kids, Education, Music | MySonAI'
      : 'Our Solutions - MySon Video, Firmatch, Avukat, Kids, Education, Music | MySonAI',
    description: isTurkish
      ? 'MySonAI alt markaları: MySon Video, Firmatch, Avukat, Kids, Education, Music. Her biri kendi alanında uzmanlaşmış çözümler.'
      : 'MySonAI sub-brands: MySon Video, Firmatch, Avukat, Kids, Education, Music. Specialized solutions in each field.',
    keywords: isTurkish
      ? 'MySon Video, Firmatch, MySon Avukat, MySon Kids, MySon Education, MySon Music, AI çözümleri'
      : 'MySon Video, Firmatch, MySon Avukat, MySon Kids, MySon Education, MySon Music, AI solutions',
  };
}

// Solutions data
const solutions = [
  {
    id: 'myson-video',
    title: 'MySon Video',
    subtitle: 'AI Destekli Animasyon & Medya',
    description:
      'Yapay zeka teknolojisi ile profesyonel video ve animasyon üretimi. Markanızı güçlendiren görsel içerikler.',
    icon: Video,
    color: 'from-red-500 to-pink-500',
    features: [
      'AI destekli animasyon üretimi',
      'Profesyonel video edit',
      'Sesli kitap animasyonları',
      'Sosyal medya içerikleri',
      'Marka tanıtım videoları',
      'Eğitim videoları',
    ],
    benefits: [
      'Hızlı üretim süreci',
      'Yüksek kalite standartları',
      'Maliyet etkin çözümler',
      'Yaratıcı tasarım yaklaşımı',
    ],
    useCases: [
      'Kurumsal tanıtım videoları',
      'E-ticaret ürün videoları',
      'Eğitim içerikleri',
      'Sosyal medya kampanyaları',
    ],
  },
  {
    id: 'myson-firmatch',
    title: 'MySon Firmatch',
    subtitle: 'Akıllı Dış Ticaret Asistanı',
    description:
      'Dış ticaret süreçlerinizi AI ile optimize edin. Pazar analizi, müşteri bulma ve iş geliştirme çözümleri.',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Pazar analizi ve araştırma',
      'Müşteri segmentasyonu',
      'Fiyat optimizasyonu',
      'Rekabet analizi',
      'İhracat stratejileri',
      'Müşteri ilişkileri yönetimi',
    ],
    benefits: [
      'Pazar fırsatlarını keşfetme',
      'Müşteri kazanımında artış',
      'Operasyonel verimlilik',
      'Risk azaltma',
    ],
    useCases: [
      'İhracat pazarı araştırması',
      'Müşteri portföyü analizi',
      'Fiyatlandırma stratejileri',
      'Rekabet analizi',
    ],
  },
  {
    id: 'myson-avukat',
    title: 'MySon Avukat',
    subtitle: 'AI Hukuk Çözümleri',
    description:
      'Hukuki süreçlerinizi AI ile hızlandırın. Sözleşme analizi, hukuki danışmanlık ve uyumluluk çözümleri.',
    icon: Shield,
    color: 'from-yellow-500 to-orange-500',
    features: [
      'Sözleşme analizi ve inceleme',
      'Hukuki belge hazırlama',
      'Uyumluluk denetimi',
      'Risk değerlendirmesi',
      'Hukuki araştırma',
      'Dava süreç yönetimi',
    ],
    benefits: [
      'Hızlı hukuki analiz',
      'Maliyet tasarrufu',
      'Risk azaltma',
      'Süreç standardizasyonu',
    ],
    useCases: ['Sözleşme inceleme', 'Uyumluluk denetimi', 'Hukuki araştırma', 'Belge hazırlama'],
  },
  {
    id: 'myson-kids',
    title: 'MySon Kids',
    subtitle: 'Çocuk İçerikleri & Eğitim',
    description:
      'Çocuklar için eğitici ve eğlenceli içerikler. Animasyonlu hikayeler, sesli kitaplar ve interaktif öğrenme.',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Animasyonlu çocuk hikayeleri',
      'Sesli kitap üretimi',
      'Eğitici oyunlar',
      'İnteraktif öğrenme içerikleri',
      'Yaş grubuna özel içerik',
      'Ebeveyn kontrolü',
    ],
    benefits: [
      'Eğitici ve eğlenceli içerik',
      'Güvenli dijital ortam',
      'Yaş grubuna uygun tasarım',
      'Öğrenme motivasyonu',
    ],
    useCases: ['Okul öncesi eğitim', 'Dil öğrenme', 'Matematik eğitimi', 'Yaratıcılık geliştirme'],
  },
  {
    id: 'myson-education',
    title: 'MySon Education',
    subtitle: 'AI Tabanlı Eğitim Çözümleri',
    description:
      'Eğitim sektörü için AI destekli çözümler. Kişiselleştirilmiş öğrenme, değerlendirme ve eğitim yönetimi.',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Kişiselleştirilmiş öğrenme yolları',
      'Otomatik değerlendirme',
      'Öğrenci performans analizi',
      'Eğitim içerik üretimi',
      'Sanal sınıf yönetimi',
      'Öğretmen asistanı',
    ],
    benefits: [
      'Bireysel öğrenme deneyimi',
      'Öğretmen iş yükü azaltma',
      'Veri odaklı eğitim',
      'Erişilebilir eğitim',
    ],
    useCases: [
      'Online eğitim platformları',
      'Okul yönetim sistemleri',
      'Özel ders uygulamaları',
      'Kurumsal eğitim programları',
    ],
  },
  {
    id: 'myson-music',
    title: 'MySon Music',
    subtitle: 'AI Tabanlı Müzik Düzenlemeleri',
    description:
      'Müzik prodüksiyonunu AI ile güçlendirin. Kompozisyon, düzenleme, mastering ve ses tasarımı çözümleri.',
    icon: Music,
    color: 'from-indigo-500 to-purple-500',
    features: [
      'AI destekli kompozisyon',
      'Otomatik düzenleme',
      'Ses kalitesi iyileştirme',
      'Müzik analizi',
      'Jenerik müzik üretimi',
      'Podcast ses düzenleme',
    ],
    benefits: [
      'Hızlı prodüksiyon',
      'Profesyonel kalite',
      'Maliyet etkin çözümler',
      'Yaratıcı süreç desteği',
    ],
    useCases: [
      'Film ve dizi müzikleri',
      'Podcast prodüksiyonu',
      'Reklam müzikleri',
      'Kişisel müzik projeleri',
    ],
  },
];

function SolutionsContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>Çözümlerimiz</h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              Her biri kendi alanında uzmanlaşmış 6 alt markamızla, farklı sektörlerin ihtiyaçlarına
              özel çözümler sunuyoruz.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>6</div>
                <div className='text-gray-400 text-sm'>Alt Marka</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>15+</div>
                <div className='text-gray-400 text-sm'>Sektör</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>200+</div>
                <div className='text-gray-400 text-sm'>Başarılı Proje</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>98%</div>
                <div className='text-gray-400 text-sm'>Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Alt Marka Çözümlerimiz</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Her alt markamız, kendi alanında derin uzmanlık ve özel çözümler sunar
            </p>
          </div>

          <div className='space-y-20'>
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className='flex items-center mb-6'>
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-full flex items-center justify-center mr-4`}
                    >
                      <solution.icon className='w-8 h-8 text-white' />
                    </div>
                    <div>
                      <h3 className='text-3xl font-bold text-white'>{solution.title}</h3>
                      <p className='text-purple-300 text-lg'>{solution.subtitle}</p>
                    </div>
                  </div>

                  <p className='text-gray-300 text-lg mb-8'>{solution.description}</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                    <div>
                      <h4 className='text-lg font-semibold text-white mb-3 flex items-center'>
                        <CheckCircle className='w-5 h-5 text-green-400 mr-2' />
                        Özellikler
                      </h4>
                      <ul className='space-y-2'>
                        {solution.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='text-gray-300 text-sm flex items-center'
                          >
                            <Star className='w-3 h-3 text-yellow-400 mr-2 flex-shrink-0' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className='text-lg font-semibold text-white mb-3 flex items-center'>
                        <Target className='w-5 h-5 text-blue-400 mr-2' />
                        Kullanım Alanları
                      </h4>
                      <ul className='space-y-2'>
                        {solution.useCases.map((useCase, useCaseIndex) => (
                          <li
                            key={useCaseIndex}
                            className='text-gray-300 text-sm flex items-center'
                          >
                            <Zap className='w-3 h-3 text-purple-400 mr-2 flex-shrink-0' />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Link
                      href={`/${params.locale}/contact`}
                      className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center'
                    >
                      <Sparkles className='w-5 h-5 mr-2' />
                      Teklif Al
                    </Link>
                    <Link
                      href={`/${params.locale}/demo`}
                      className='bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center'
                    >
                      <Play className='w-5 h-5 mr-2' />
                      Demo İncele
                    </Link>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8 text-center'>
                    <div
                      className={`w-32 h-32 bg-gradient-to-r ${solution.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <solution.icon className='w-16 h-16 text-white' />
                    </div>
                    <h4 className='text-2xl font-bold text-white mb-4'>{solution.title}</h4>
                    <p className='text-gray-300 mb-6'>{solution.subtitle}</p>

                    <div className='space-y-4'>
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className='flex items-center text-gray-300 text-sm'>
                          <CheckCircle className='w-4 h-4 text-green-400 mr-3 flex-shrink-0' />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>Size Uygun Çözümü Bulun</h2>
            <p className='text-xl text-gray-300 mb-8'>
              İhtiyaçlarınıza en uygun alt markamızla tanışın ve projenizi hayata geçirin
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Heart className='w-6 h-6 inline mr-2' />
                Ücretsiz Danışmanlık
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Play className='w-6 h-6 inline mr-2' />
                Demo İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SolutionsPage({ params }: { params: { locale: Locale } }) {
  return <SolutionsContent params={params} />;
}
