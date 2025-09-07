import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Clock, 
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
  Heart,
  Rocket,
  Briefcase
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
      ? 'Kariyer - MySonAI İş İmkanları | AI Teknolojisi Kariyeri'
      : 'Careers - MySonAI Job Opportunities | AI Technology Career',
    description: isTurkish
      ? 'MySonAI\'da kariyer fırsatları. AI teknolojisi, yazılım geliştirme ve ürün yönetimi pozisyonları. Uzaktan çalışma imkanları.'
      : 'Career opportunities at MySonAI. AI technology, software development and product management positions. Remote work opportunities.',
    keywords: isTurkish
      ? 'MySonAI kariyer, iş ilanları, AI teknolojisi kariyeri, yazılım geliştirici, uzaktan çalışma'
      : 'MySonAI careers, job openings, AI technology career, software developer, remote work',
  };
}

// Company values
const companyValues = [
  {
    icon: Lightbulb,
    title: 'İnovasyon',
    description: 'Sürekli öğrenme ve gelişim odaklı yaklaşım',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Takım Çalışması',
    description: 'Birlikte çalışarak büyük hedeflere ulaşma',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Empati',
    description: 'Müşteri ve takım üyelerine karşı empati',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Target,
    title: 'Hedef Odaklılık',
    description: 'Net hedefler ve başarı odaklı çalışma',
    color: 'from-green-500 to-emerald-500',
  },
];

// Open positions
const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote / İstanbul',
    type: 'Full-time',
    experience: '3+ years',
    description: 'React, Node.js ve AI entegrasyonu konularında deneyimli geliştirici arıyoruz.',
    requirements: [
      'React, Next.js ve TypeScript deneyimi',
      'Node.js ve Express.js bilgisi',
      'AI/ML entegrasyonu deneyimi',
      'PostgreSQL ve Supabase bilgisi',
      'Git ve CI/CD deneyimi',
    ],
    benefits: [
      'Uzaktan çalışma imkanı',
      'Esnek çalışma saatleri',
      'Eğitim ve gelişim desteği',
      'Sağlık sigortası',
      'Performans primi',
    ],
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI Research',
    location: 'Remote / İstanbul',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Doğal dil işleme ve makine öğrenmesi konularında uzman mühendis arıyoruz.',
    requirements: [
      'Python ve ML kütüphaneleri deneyimi',
      'NLP ve transformer modelleri bilgisi',
      'TensorFlow veya PyTorch deneyimi',
      'API geliştirme deneyimi',
      'Veri analizi ve görselleştirme',
    ],
    benefits: [
      'Araştırma ve geliştirme imkanı',
      'Konferans katılım desteği',
      'Ekipman desteği',
      'Esnek çalışma saatleri',
      'Yüksek maaş',
    ],
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'İstanbul',
    type: 'Full-time',
    experience: '4+ years',
    description: 'AI ürünleri için strateji geliştirme ve roadmap yönetimi yapacak ürün müdürü arıyoruz.',
    requirements: [
      'Ürün yönetimi deneyimi',
      'AI/ML ürünleri deneyimi',
      'Agile/Scrum metodolojisi bilgisi',
      'Veri analizi ve metrikleri',
      'Müşteri deneyimi odaklı düşünme',
    ],
    benefits: [
      'Stratejik karar verme imkanı',
      'Takım liderliği deneyimi',
      'Üst düzey maaş',
      'Hisse senedi opsiyonu',
      'Liderlik eğitimleri',
    ],
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote / İstanbul',
    type: 'Full-time',
    experience: '2+ years',
    description: 'AI arayüzleri için kullanıcı deneyimi tasarımı yapacak tasarımcı arıyoruz.',
    requirements: [
      'Figma ve Adobe Creative Suite',
      'Kullanıcı araştırması deneyimi',
      'Prototipleme ve test etme',
      'Responsive tasarım bilgisi',
      'AI/ML arayüzleri deneyimi',
    ],
    benefits: [
      'Yaratıcı projeler',
      'Tasarım araçları desteği',
      'Kullanıcı araştırması imkanı',
      'Portfolyo geliştirme',
      'Tasarım konferansları',
    ],
  },
];

// Benefits
const benefits = [
  {
    icon: Globe,
    title: 'Uzaktan Çalışma',
    description: 'Dünyanın her yerinden çalışabilirsiniz',
  },
  {
    icon: Clock,
    title: 'Esnek Saatler',
    description: 'Kendi programınızı oluşturun',
  },
  {
    icon: Lightbulb,
    title: 'Öğrenme Desteği',
    description: 'Kurslar, kitaplar ve konferanslar',
  },
  {
    icon: Heart,
    title: 'Sağlık Sigortası',
    description: 'Tam kapsamlı sağlık sigortası',
  },
  {
    icon: Star,
    title: 'Performans Primi',
    description: 'Başarılarınızın karşılığı',
  },
  {
    icon: Rocket,
    title: 'Hisse Senedi',
    description: 'Şirketin büyümesinden pay alın',
  },
];

// Team culture
const teamCulture = [
  {
    title: 'Açık İletişim',
    description: 'Her seviyede açık ve şeffaf iletişim kuruyoruz.',
  },
  {
    title: 'Sürekli Öğrenme',
    description: 'Takım üyelerimizin sürekli gelişimini destekliyoruz.',
  },
  {
    title: 'Çeşitlilik',
    description: 'Farklı geçmişlerden insanları bir araya getiriyoruz.',
  },
  {
    title: 'İnovasyon',
    description: 'Yeni fikirleri teşvik ediyor ve destekliyoruz.',
  },
];

function CareersContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Kariyer
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              AI teknolojisinin geleceğini birlikte şekillendirin. 
              MySonAI ekibine katılın ve yapay zeka devriminde yer alın.
            </p>
            
            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Briefcase className='w-6 h-6 inline mr-2' />
                Başvuru Yap
              </Link>
              <Link
                href={`/${params.locale}/about`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Users className='w-6 h-6 inline mr-2' />
                Ekibi Tanı
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Şirket Değerlerimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'ı benzersiz kılan değerler ve kültür
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {companyValues.map((value, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{value.title}</h3>
                <p className='text-gray-300 text-sm'>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Açık Pozisyonlar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Şu anda aradığımız pozisyonlar
            </p>
          </div>

          <div className='space-y-8'>
            {openPositions.map((position, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-8 hover:bg-white/15 transition-all duration-300'>
                <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6'>
                  <div className='flex-1'>
                    <h3 className='text-2xl font-bold text-white mb-2'>{position.title}</h3>
                    <div className='flex flex-wrap gap-4 mb-4'>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <Briefcase className='w-4 h-4 mr-2' />
                        <span>{position.department}</span>
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <MapPin className='w-4 h-4 mr-2' />
                        <span>{position.location}</span>
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <Clock className='w-4 h-4 mr-2' />
                        <span>{position.type}</span>
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <Star className='w-4 h-4 mr-2' />
                        <span>{position.experience}</span>
                      </div>
                    </div>
                    <p className='text-gray-300 mb-4'>{position.description}</p>
                  </div>
                  <div className='lg:ml-6'>
                    <Link href={`/${params.locale}/contact`}>
                      <Button className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'>
                        Başvuru Yap
                        <ArrowRight className='w-4 h-4 ml-2' />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  <div>
                    <h4 className='text-lg font-bold text-white mb-3'>Gereksinimler</h4>
                    <ul className='space-y-2'>
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className='flex items-start text-gray-300 text-sm'>
                          <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5' />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-lg font-bold text-white mb-3'>Yan Haklar</h4>
                    <ul className='space-y-2'>
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className='flex items-start text-gray-300 text-sm'>
                          <Star className='w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5' />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Yan Haklar
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'da çalışmanın avantajları
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {benefits.map((benefit, index) => (
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

      {/* Team Culture */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Takım Kültürü
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'da nasıl bir ortamda çalışırsınız?
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {teamCulture.map((culture, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <h3 className='text-xl font-bold text-white mb-3'>{culture.title}</h3>
                <p className='text-gray-300'>{culture.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Ekibimize Katılın
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              AI teknolojisinin geleceğini birlikte şekillendirin. 
              MySonAI ekibine katılın ve yapay zeka devriminde yer alın!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Briefcase className='w-6 h-6 inline mr-2' />
                Başvuru Yap
              </Link>
              <Link
                href={`/${params.locale}/about`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Users className='w-6 h-6 inline mr-2' />
                Ekibi Tanı
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CareersPage({ params }: { params: { locale: Locale } }) {
  return <CareersContent params={params} />;
}
