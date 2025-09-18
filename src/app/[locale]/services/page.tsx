import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Bot,
  Code,
  Cloud,
  Shield,
  Video,
  Music,
  GraduationCap,
  Briefcase,
  Database,
  Smartphone,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Target
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
      ? 'Hizmetlerimiz - AI Çözümleri ve Klasik Bilişim Hizmetleri | MySonAI'
      : 'Our Services - AI Solutions and Classic IT Services | MySonAI',
    description: isTurkish
      ? 'MySonAI hizmetleri: AI çözümleri, klasik bilişim, yazılım geliştirme, dijital medya, danışmanlık ve eğitim hizmetleri.'
      : 'MySonAI services: AI solutions, classic IT, software development, digital media, consulting and training services.',
    keywords: isTurkish
      ? 'AI çözümleri, bilişim hizmetleri, yazılım geliştirme, dijital medya, danışmanlık, eğitim'
      : 'AI solutions, IT services, software development, digital media, consulting, training',
  };
}

// Services data
const services = [
  {
    id: 'ai-solutions',
    title: 'AI Çözümleri',
    description: 'Yapay zeka teknolojileri ile iş süreçlerinizi optimize edin',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Prompt mühendisliği',
      'AI asistanlar geliştirme',
      'Veri analizi ve makine öğrenmesi',
      'Görüntü ve ses işleme',
      'Doğal dil işleme',
      'AI stratejisi danışmanlığı'
    ],
    benefits: [
      'İş süreçlerinde %40 verimlilik artışı',
      'Maliyet tasarrufu',
      'Rekabet avantajı',
      'Otomatik süreç yönetimi'
    ]
  },
  {
    id: 'classic-it',
    title: 'Klasik Bilişim',
    description: 'Geleneksel bilişim hizmetleri ile altyapınızı güçlendirin',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Web & mobil uygulama geliştirme',
      'API entegrasyonu',
      'Veritabanı tasarımı ve yönetimi',
      'Bulut altyapı çözümleri',
      'Siber güvenlik',
      'Sistem yönetimi'
    ],
    benefits: [
      'Güvenilir altyapı',
      'Ölçeklenebilir çözümler',
      '7/24 teknik destek',
      'Modern teknoloji stack'
    ]
  },
  {
    id: 'software-needs',
    title: 'Yazılım İhtiyaçları',
    description: 'Özel yazılım çözümleri ile işinizi dijitalleştirin',
    icon: Cloud,
    color: 'from-yellow-500 to-orange-500',
    features: [
      'Özel yazılım geliştirme',
      'Mobil uygulama tasarımı',
      'E-ticaret platformları',
      'Entegrasyon ve otomasyon',
      'Bakım ve destek hizmetleri',
      'Sistem modernizasyonu'
    ],
    benefits: [
      'İhtiyaca özel çözümler',
      'Hızlı geliştirme süreci',
      'Kullanıcı dostu arayüzler',
      'Sürekli güncelleme'
    ]
  },
  {
    id: 'digital-media',
    title: 'Dijital Medya',
    description: 'Yaratıcı içerik üretimi ile markanızı güçlendirin',
    icon: Video,
    color: 'from-red-500 to-pink-500',
    features: [
      'Video ve animasyon üretimi',
      'Sesli kitap ve podcast',
      'Sosyal medya içerikleri',
      'Grafik tasarım',
      'Marka kimliği tasarımı',
      'İçerik stratejisi'
    ],
    benefits: [
      'Profesyonel görsel kimlik',
      'Etkili pazarlama materyalleri',
      'Marka farkındalığı artışı',
      'Yaratıcı içerik üretimi'
    ]
  },
  {
    id: 'consulting-education',
    title: 'Danışmanlık & Eğitim',
    description: 'Uzmanlığımızla dijital dönüşümünüzde rehberlik edin',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    features: [
      'AI eğitimleri ve workshoplar',
      'Dijital dönüşüm danışmanlığı',
      'Hukuk ve ticaret için AI çözümleri',
      'Strateji geliştirme',
      'Teknoloji danışmanlığı',
      'Ekip eğitimleri'
    ],
    benefits: [
      'Uzman bilgi transferi',
      'Stratejik rehberlik',
      'Ekip yetkinlik artışı',
      'Rekabet avantajı'
    ]
  },
  {
    id: 'security',
    title: 'Güvenlik',
    description: 'Verilerinizi ve sistemlerinizi en yüksek güvenlik standartlarında koruyun',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Siber güvenlik denetimi',
      'Veri koruma çözümleri',
      'Güvenlik risk analizi',
      'Güvenlik eğitimleri',
      'İzinsiz giriş tespiti',
      'Güvenlik politikaları'
    ],
    benefits: [
      'Veri güvenliği garantisi',
      'Risk azaltma',
      'Yasal uyumluluk',
      'Güvenilir sistemler'
    ]
  }
];

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'İhtiyaç Analizi',
    description: 'Projenizin gereksinimlerini detaylı olarak analiz ediyoruz.',
    icon: Target
  },
  {
    step: '02',
    title: 'Çözüm Tasarımı',
    description: 'En uygun teknoloji stack\'ini belirleyip çözümü tasarlıyoruz.',
    icon: Code
  },
  {
    step: '03',
    title: 'Geliştirme',
    description: 'Agile metodoloji ile hızlı ve kaliteli geliştirme yapıyoruz.',
    icon: Zap
  },
  {
    step: '04',
    title: 'Test & Optimizasyon',
    description: 'Kapsamlı testler yapıp performansı optimize ediyoruz.',
    icon: CheckCircle
  },
  {
    step: '05',
    title: 'Teslim & Destek',
    description: 'Projeyi teslim edip sürekli destek sağlıyoruz.',
    icon: Users
  }
];

function ServicesContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Hizmetlerimiz
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              AI çözümlerinden klasik bilişim hizmetlerine kadar geniş yelpazede 
              profesyonel hizmetler sunuyoruz. İşinizi bir üst seviyeye taşıyın.
            </p>
            
            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>6</div>
                <div className='text-gray-400 text-sm'>Hizmet Kategorisi</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>50+</div>
                <div className='text-gray-400 text-sm'>Tamamlanan Proje</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>100+</div>
                <div className='text-gray-400 text-sm'>Mutlu Müşteri</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>5</div>
                <div className='text-gray-400 text-sm'>Yıl Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Hizmet Kategorilerimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Her biri kendi alanında uzmanlaşmış ekibimizle kapsamlı hizmetler sunuyoruz
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-8 hover:bg-white/15 transition-all duration-300 group'>
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white mb-4 text-center'>{service.title}</h3>
                <p className='text-gray-300 mb-6 text-center'>{service.description}</p>
                
                <div className='mb-6'>
                  <h4 className='text-lg font-semibold text-white mb-3'>Özellikler:</h4>
                  <ul className='space-y-2'>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center text-gray-300 text-sm'>
                        <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='mb-6'>
                  <h4 className='text-lg font-semibold text-white mb-3'>Faydalar:</h4>
                  <ul className='space-y-2'>
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className='flex items-center text-gray-300 text-sm'>
                        <Star className='w-4 h-4 text-yellow-400 mr-2 flex-shrink-0' />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='text-center'>
                  <Link
                    href={`/${params.locale}/contact`}
                    className='inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                  >
                    Teklif Al
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Çalışma Sürecimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Her projede standart kalite ve müşteri memnuniyeti için izlediğimiz süreç
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
            {processSteps.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <step.icon className='w-8 h-8 text-white' />
                </div>
                <div className='text-2xl font-bold text-purple-400 mb-2'>{step.step}</div>
                <h3 className='text-xl font-bold text-white mb-3'>{step.title}</h3>
                <p className='text-gray-300 text-sm'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Projenizi Hayata Geçirin
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Uzman ekibimizle projenizi planlayın ve başarıya ulaştırın
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Briefcase className='w-6 h-6 inline mr-2' />
                Teklif Al
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Bot className='w-6 h-6 inline mr-2' />
                Demo İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  return <ServicesContent params={params} />;
}
