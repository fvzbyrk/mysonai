import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Newspaper, 
  Download, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Globe,
  Code,
  Bot,
  Heart,
  Rocket,
  Calendar,
  FileText,
  ExternalLink
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
      ? 'Basın - MySonAI Basın Materyalleri ve Haberler | AI Teknolojisi'
      : 'Press - MySonAI Press Materials and News | AI Technology',
    description: isTurkish
      ? 'MySonAI basın materyalleri, haberler ve duyurular. AI teknolojisi, şirket haberleri ve medya kaynakları.'
      : 'MySonAI press materials, news and announcements. AI technology, company news and media resources.',
    keywords: isTurkish
      ? 'MySonAI basın, haberler, duyurular, AI teknolojisi, medya kaynakları, şirket haberleri'
      : 'MySonAI press, news, announcements, AI technology, media resources, company news',
  };
}

// Press releases
const pressReleases = [
  {
    title: 'MySonAI, Türkiye\'nin En Hızlı AI Asistan Platformunu Lansman Etti',
    date: '2024-01-15',
    category: 'Lansman',
    summary: 'MySonAI, 18 uzman AI asistanı ile Türkiye\'nin en hızlı yapay zeka platformunu kullanıma sundu.',
    highlights: [
      '18 uzman AI asistanı ile hizmet',
      'Pi\'den 10x daha hızlı yanıtlar',
      'Tamamen Türkçe konuşan asistanlar',
      'Güvenli ve özel veri koruması',
    ],
  },
  {
    title: 'MySonAI, 10.000 Aktif Kullanıcıya Ulaştı',
    date: '2024-01-10',
    category: 'Büyüme',
    summary: 'Platform, lansmanından sadece 3 ay sonra 10.000 aktif kullanıcıya ulaşarak hızlı büyüme gösterdi.',
    highlights: [
      '10.000 aktif kullanıcı',
      '1 milyon+ mesaj işlendi',
      '4.8/5 kullanıcı memnuniyeti',
      'Günlük 50.000+ sohbet',
    ],
  },
  {
    title: 'MySonAI, Kurumsal Çözümlerini Duyurdu',
    date: '2024-01-05',
    category: 'Ürün',
    summary: 'Şirket, büyük işletmeler için özel AI asistan çözümlerini ve API entegrasyonlarını duyurdu.',
    highlights: [
      'Kurumsal API paketleri',
      'Özel asistan geliştirme',
      '7/24 teknik destek',
      'SLA garantisi',
    ],
  },
];

// Media coverage
const mediaCoverage = [
  {
    outlet: 'TechCrunch Türkiye',
    title: 'MySonAI: Türkiye\'nin ChatGPT\'i',
    date: '2024-01-12',
    type: 'Makale',
    url: '#',
  },
  {
    outlet: 'Webrazzi',
    title: 'Yapay Zeka Asistanları Türkiye\'de Hızla Yaygınlaşıyor',
    date: '2024-01-08',
    type: 'Haber',
    url: '#',
  },
  {
    outlet: 'Startup Türkiye',
    title: 'MySonAI: Yerli AI Devrimi',
    date: '2024-01-05',
    type: 'Röportaj',
    url: '#',
  },
  {
    outlet: 'Dijital Ajans',
    title: 'AI Asistanları İş Dünyasını Nasıl Değiştiriyor?',
    date: '2024-01-03',
    type: 'Analiz',
    url: '#',
  },
];

// Press kit
const pressKit = [
  {
    name: 'Şirket Logosu',
    description: 'Yüksek çözünürlüklü logo dosyaları',
    format: 'PNG, SVG, PDF',
    size: '2.5 MB',
  },
  {
    name: 'Ürün Görselleri',
    description: 'AI asistanları ve platform görselleri',
    format: 'PNG, JPG',
    size: '15.2 MB',
  },
  {
    name: 'Şirket Profili',
    description: 'Detaylı şirket bilgileri ve tarihçe',
    format: 'PDF',
    size: '1.8 MB',
  },
  {
    name: 'Basın Bülteni',
    description: 'Son basın bültenleri ve duyurular',
    format: 'PDF, DOC',
    size: '3.1 MB',
  },
];

// Contact info
const contactInfo = [
  {
    icon: Mail,
    title: 'Basın İletişimi',
    contact: 'press@mysonai.com',
    description: 'Basın soruları ve röportaj talepleri',
  },
  {
    icon: Phone,
    title: 'Telefon',
    contact: '+90 (212) 555 0123',
    description: 'Acil durumlar için telefon hattı',
  },
  {
    icon: Users,
    title: 'Sözcü',
    contact: 'Ahmet Yılmaz',
    description: 'CEO ve Kurucu Ortak',
  },
];

// Company stats
const companyStats = [
  {
    number: '18',
    label: 'AI Asistanı',
    description: 'Farklı alanlarda uzmanlaşmış',
  },
  {
    number: '10K+',
    label: 'Aktif Kullanıcı',
    description: 'Platformda aktif olarak kullanıyor',
  },
  {
    number: '1M+',
    label: 'Mesaj',
    description: 'AI asistanları ile işlenen',
  },
  {
    number: '4.8',
    label: 'Kullanıcı Puanı',
    description: '5 üzerinden ortalama puan',
  },
];

function PressContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Basın
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI hakkında en güncel haberler, duyurular ve basın materyalleri. 
              AI teknolojisindeki gelişmeleri takip edin.
            </p>
            
            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Mail className='w-6 h-6 inline mr-2' />
                İletişime Geç
              </Link>
              <Button
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Download className='w-6 h-6 inline mr-2' />
                Basın Kiti İndir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Şirket İstatistikleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'ın büyüme rakamları
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {companyStats.map((stat, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='text-4xl font-bold text-white mb-2'>{stat.number}</div>
                <div className='text-xl font-semibold text-purple-300 mb-2'>{stat.label}</div>
                <div className='text-gray-400 text-sm'>{stat.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Basın Bültenleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              En güncel duyurular ve haberler
            </p>
          </div>

          <div className='space-y-8'>
            {pressReleases.map((release, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-8 hover:bg-white/15 transition-all duration-300'>
                <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6'>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-4 mb-4'>
                      <Badge variant='secondary' className='text-xs'>
                        {release.category}
                      </Badge>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <Calendar className='w-4 h-4 mr-2' />
                        <span>{release.date}</span>
                      </div>
                    </div>
                    <h3 className='text-2xl font-bold text-white mb-3'>{release.title}</h3>
                    <p className='text-gray-300 mb-4'>{release.summary}</p>
                  </div>
                </div>

                <div className='mb-6'>
                  <h4 className='text-lg font-bold text-white mb-3'>Öne Çıkanlar</h4>
                  <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    {release.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className='flex items-center text-gray-300 text-sm'>
                        <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0' />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button
                    variant='outline'
                    className='border-white/20 text-white hover:bg-white/10'
                  >
                    <FileText className='w-4 h-4 mr-2' />
                    Tam Metni Oku
                  </Button>
                  <Button
                    variant='outline'
                    className='border-white/20 text-white hover:bg-white/10'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    PDF İndir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Medya Kapsamı
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI hakkında yazılan haberler ve makaleler
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {mediaCoverage.map((coverage, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold text-white mb-2'>{coverage.title}</h3>
                    <div className='flex items-center space-x-4 text-gray-400 text-sm mb-3'>
                      <span className='font-semibold'>{coverage.outlet}</span>
                      <span>•</span>
                      <span>{coverage.type}</span>
                      <span>•</span>
                      <span>{coverage.date}</span>
                    </div>
                  </div>
                </div>
                <Button
                  asChild
                  variant='outline'
                  className='border-white/20 text-white hover:bg-white/10'
                >
                  <Link href={coverage.url}>
                    <ExternalLink className='w-4 h-4 mr-2' />
                    Haberi Oku
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Basın Kiti
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Medya için hazırlanmış materyaller
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {pressKit.map((item, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Download className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>{item.name}</h3>
                <p className='text-gray-300 text-sm mb-3'>{item.description}</p>
                <div className='text-gray-400 text-xs mb-4'>
                  <div>{item.format}</div>
                  <div>{item.size}</div>
                </div>
                <Button
                  variant='outline'
                  className='w-full border-white/20 text-white hover:bg-white/10'
                >
                  <Download className='w-4 h-4 mr-2' />
                  İndir
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Basın İletişimi
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Basın soruları ve röportaj talepleri için iletişim bilgileri
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {contactInfo.map((contact, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <contact.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>{contact.title}</h3>
                <p className='text-purple-300 font-semibold mb-2'>{contact.contact}</p>
                <p className='text-gray-300 text-sm'>{contact.description}</p>
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
              Basın ile İletişim
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              MySonAI hakkında haber yapmak veya röportaj yapmak istiyorsanız, 
              bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Mail className='w-6 h-6 inline mr-2' />
                İletişime Geç
              </Link>
              <Button
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Download className='w-6 h-6 inline mr-2' />
                Basın Kiti İndir
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PressPage({ params }: { params: { locale: Locale } }) {
  return <PressContent params={params} />;
}
