import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Zap,
  Heart,
  Award,
  TrendingUp,
  Globe,
  Briefcase,
  Video,
  Music,
  GraduationCap,
  Shield
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
      ? 'Referanslarımız - Başarılı Projeler ve Müşteri Yorumları | MySonAI'
      : 'Our References - Successful Projects and Customer Reviews | MySonAI',
    description: isTurkish
      ? 'MySonAI referansları: Başarılı projeler, müşteri yorumları ve portföy örnekleri. AI çözümleri ve bilişim hizmetlerimizle elde ettiğimiz sonuçlar.'
      : 'MySonAI references: Successful projects, customer reviews and portfolio examples. Results achieved with our AI solutions and IT services.',
    keywords: isTurkish
      ? 'MySonAI referansları, başarılı projeler, müşteri yorumları, portföy, AI çözümleri'
      : 'MySonAI references, successful projects, customer reviews, portfolio, AI solutions',
  };
}

// Customer testimonials
const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    company: 'TechCorp',
    position: 'CTO',
    content: 'MySonAI ile çalışmak harika bir deneyimdi. AI çözümleri sayesinde iş süreçlerimizde %40 verimlilik artışı sağladık.',
    rating: 5,
    project: 'AI Otomasyon Sistemi',
    icon: Briefcase
  },
  {
    name: 'Elif Demir',
    company: 'EduTech',
    position: 'Kurucu',
    content: 'MySon Education ile eğitim platformumuzu tamamen yeniledik. Öğrenci memnuniyeti %95\'e çıktı.',
    rating: 5,
    project: 'Eğitim Platformu',
    icon: GraduationCap
  },
  {
    name: 'Burak Kaya',
    company: 'MediaPro',
    position: 'Yaratıcı Direktör',
    content: 'MySon Video ile ürettiğimiz animasyonlar müşterilerimizi büyüledi. Yaratıcı süreçte AI\'ın gücünü gördük.',
    rating: 5,
    project: 'Animasyon Serisi',
    icon: Video
  },
  {
    name: 'Ayşe Özkan',
    company: 'LawFirm',
    position: 'Ortak',
    content: 'MySon Avukat ile hukuki süreçlerimizi hızlandırdık. Sözleşme analizi süremiz %70 azaldı.',
    rating: 5,
    project: 'Hukuki Otomasyon',
    icon: Shield
  },
  {
    name: 'Deniz Çelik',
    company: 'ExportCo',
    position: 'Genel Müdür',
    content: 'MySon Firmatch ile ihracat süreçlerimizi optimize ettik. Yeni pazarlara açılımımız hızlandı.',
    rating: 5,
    project: 'Dış Ticaret Sistemi',
    icon: Globe
  },
  {
    name: 'Pınar Yıldız',
    company: 'MusicStudio',
    position: 'Prodüktör',
    content: 'MySon Music ile müzik prodüksiyon sürecimizde devrim yarattık. Kalite ve hız mükemmel.',
    rating: 5,
    project: 'Müzik Prodüksiyon',
    icon: Music
  }
];

// Project categories
const projectCategories = [
  {
    title: 'AI Çözümleri',
    count: 25,
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    projects: [
      'Chatbot Geliştirme',
      'Veri Analizi Sistemi',
      'Görüntü İşleme',
      'Doğal Dil İşleme'
    ]
  },
  {
    title: 'Web Geliştirme',
    count: 30,
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    projects: [
      'Kurumsal Web Siteleri',
      'E-ticaret Platformları',
      'Web Uygulamaları',
      'API Entegrasyonları'
    ]
  },
  {
    title: 'Mobil Uygulamalar',
    count: 20,
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    projects: [
      'iOS Uygulamaları',
      'Android Uygulamaları',
      'Cross-platform Çözümler',
      'Mobil Optimizasyon'
    ]
  },
  {
    title: 'Dijital Medya',
    count: 15,
    icon: Video,
    color: 'from-red-500 to-pink-500',
    projects: [
      'Video Prodüksiyon',
      'Animasyon Üretimi',
      'Sesli Kitap',
      'Podcast Prodüksiyon'
    ]
  }
];

// Success metrics
const successMetrics = [
  {
    metric: '50+',
    label: 'Tamamlanan Proje',
    description: 'Başarıyla teslim edilen proje sayısı'
  },
  {
    metric: '100+',
    label: 'Mutlu Müşteri',
    description: 'Hizmetlerimizden memnun kalan müşteri sayısı'
  },
  {
    metric: '98%',
    label: 'Müşteri Memnuniyeti',
    description: 'Müşteri geri bildirim puanı ortalaması'
  },
  {
    metric: '5',
    label: 'Yıl Deneyim',
    description: 'Sektördeki toplam deneyim süremiz'
  }
];

function ReferencesContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Referanslarımız
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              Başarılı projelerimiz ve mutlu müşterilerimizin hikayeleri. 
              AI çözümleri ve klasik bilişim hizmetlerimizle elde ettiğimiz sonuçlar.
            </p>
            
            {/* Success Metrics */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
              {successMetrics.map((metric, index) => (
                <div key={index} className='text-center'>
                  <div className='text-3xl font-bold text-white mb-2'>{metric.metric}</div>
                  <div className='text-gray-400 text-sm mb-1'>{metric.label}</div>
                  <div className='text-gray-500 text-xs'>{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Müşteri Yorumları
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Projelerimizden memnun kalan müşterilerimizin deneyimleri
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4'>
                    <testimonial.icon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h4 className='text-lg font-bold text-white'>{testimonial.name}</h4>
                    <p className='text-purple-300 text-sm'>{testimonial.position}</p>
                    <p className='text-gray-400 text-sm'>{testimonial.company}</p>
                  </div>
                </div>
                
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 text-yellow-400 fill-current' />
                  ))}
                </div>
                
                <blockquote className='text-gray-300 mb-4 italic'>
                  "{testimonial.content}"
                </blockquote>
                
                <div className='text-sm text-purple-400 font-semibold'>
                  Proje: {testimonial.project}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Proje Kategorilerimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Farklı sektörlerde gerçekleştirdiğimiz başarılı projeler
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {projectCategories.map((category, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300 group'>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white mb-2'>{category.title}</h3>
                <div className='text-3xl font-bold text-purple-400 mb-4'>{category.count}+</div>
                <div className='text-gray-300 text-sm mb-4'>Proje</div>
                
                <div className='space-y-2'>
                  {category.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className='flex items-center text-gray-300 text-sm'>
                      <CheckCircle className='w-3 h-3 text-green-400 mr-2 flex-shrink-0' />
                      {project}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Başarı Hikayeleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Müşterilerimizin dijital dönüşüm yolculukları ve elde ettikleri sonuçlar
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Case Study 1 */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <TrendingUp className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>E-ticaret Optimizasyonu</h3>
              <p className='text-gray-300 text-sm mb-4'>
                AI destekli müşteri analizi ile satış artışı sağladık.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Satış Artışı:</span>
                  <span className='text-green-400 font-semibold'>+150%</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Müşteri Memnuniyeti:</span>
                  <span className='text-blue-400 font-semibold'>+40%</span>
                </div>
              </div>
              <div className='text-sm text-purple-400 font-semibold'>TechCorp</div>
            </Card>

            {/* Case Study 2 */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>Eğitim Platformu</h3>
              <p className='text-gray-300 text-sm mb-4'>
                Kişiselleştirilmiş öğrenme deneyimi ile başarı oranını artırdık.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Öğrenci Başarısı:</span>
                  <span className='text-green-400 font-semibold'>+95%</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Tamamlanma Oranı:</span>
                  <span className='text-blue-400 font-semibold'>+80%</span>
                </div>
              </div>
              <div className='text-sm text-purple-400 font-semibold'>EduTech</div>
            </Card>

            {/* Case Study 3 */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Award className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>Hukuki Otomasyon</h3>
              <p className='text-gray-300 text-sm mb-4'>
                AI destekli sözleşme analizi ile süreçleri hızlandırdık.
              </p>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Süre Azalması:</span>
                  <span className='text-green-400 font-semibold'>-70%</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-400'>Doğruluk Oranı:</span>
                  <span className='text-blue-400 font-semibold'>+90%</span>
                </div>
              </div>
              <div className='text-sm text-purple-400 font-semibold'>LawFirm</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Siz de Başarı Hikayemizin Parçası Olun
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Projenizi hayata geçirin ve başarı hikayelerimiz arasında yer alın
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Heart className='w-6 h-6 inline mr-2' />
                Proje Başlat
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <ArrowRight className='w-6 h-6 inline mr-2' />
                Demo İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReferencesPage({ params }: { params: { locale: Locale } }) {
  return <ReferencesContent params={params} />;
}
