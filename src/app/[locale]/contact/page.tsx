import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactAIAssistant } from '@/components/contact-ai-assistant';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Target,
  Zap,
  Heart,
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
      ? 'İletişim - MySonAI | AI Çözümleri ve Bilişim Hizmetleri'
      : 'Contact - MySonAI | AI Solutions and IT Services',
    description: isTurkish
      ? 'MySonAI ile iletişime geçin. AI çözümleri ve klasik bilişim hizmetleri için ücretsiz danışmanlık alın. Projenizi hayata geçirin.'
      : 'Contact MySonAI. Get free consultation for AI solutions and classic IT services. Bring your project to life.',
    keywords: isTurkish
      ? 'MySonAI iletişim, AI çözümleri danışmanlık, bilişim hizmetleri, proje teklifi'
      : 'MySonAI contact, AI solutions consultation, IT services, project proposal',
  };
}

// Contact information
const contactInfo = [
  {
    icon: Mail,
    title: 'E-posta',
    details: ['info@mysonai.com', 'projeler@mysonai.com'],
    description: '7/24 e-posta desteği'
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+90 (553) 204 04 09', '+90 (532) 345 04 09'],
    description: 'Pazartesi-Cuma 09:00-18:00'
  },
  {
    icon: MapPin,
    title: 'Adres',
    details: ['Dodurga Mah. Zakir Caddesi 11/2', 'Çankaya, ANKARA'],
    description: 'Merkez ofisimiz'
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    details: ['Pazartesi-Cuma: 09:00-18:00', 'Cumartesi: 10:00-16:00'],
    description: 'Hafta sonu destek'
  }
];

// Service areas
const serviceAreas = [
  {
    title: 'AI Çözümleri',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    description: 'Prompt mühendisliği, AI asistanlar, veri analizi'
  },
  {
    title: 'Web Geliştirme',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Kurumsal web siteleri, e-ticaret, web uygulamaları'
  },
  {
    title: 'Mobil Uygulamalar',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    description: 'iOS, Android, cross-platform çözümler'
  },
  {
    title: 'Dijital Medya',
    icon: Video,
    color: 'from-red-500 to-pink-500',
    description: 'Video prodüksiyon, animasyon, sesli kitap'
  },
  {
    title: 'Eğitim Çözümleri',
    icon: GraduationCap,
    color: 'from-yellow-500 to-orange-500',
    description: 'Eğitim platformları, öğrenme yönetimi'
  },
  {
    title: 'Hukuki Çözümler',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    description: 'Hukuki otomasyon, sözleşme analizi'
  }
];

// FAQ data
const faqs = [
  {
    question: 'Proje süreci nasıl işliyor?',
    answer: 'İhtiyaç analizi, çözüm tasarımı, geliştirme, test ve teslim aşamalarından oluşan 5 adımlı süreç izliyoruz.'
  },
  {
    question: 'AI çözümleri için ön koşul var mı?',
    answer: 'Hayır, mevcut sisteminizle entegre edilebilir çözümler sunuyoruz. Teknik altyapı analizi yapıyoruz.'
  },
  {
    question: 'Proje süresi ne kadar?',
    answer: 'Proje büyüklüğüne göre değişir. Basit web siteleri 2-4 hafta, karmaşık AI projeleri 2-6 ay sürebilir.'
  },
  {
    question: 'Destek hizmeti veriyor musunuz?',
    answer: 'Evet, tüm projelerimiz için 6 ay ücretsiz destek, sonrasında ücretli destek hizmeti sunuyoruz.'
  },
  {
    question: 'Fiyatlandırma nasıl yapılıyor?',
    answer: 'Proje kapsamına göre özel fiyatlandırma yapıyoruz. Ücretsiz danışmanlık ve teklif hazırlıyoruz.'
  },
  {
    question: 'Hangi teknolojileri kullanıyorsunuz?',
    answer: 'Modern teknoloji stack kullanıyoruz: React, Next.js, Node.js, Python, AI/ML kütüphaneleri, bulut servisleri.'
  }
];

function ContactContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              İletişim
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              Projenizi hayata geçirmek için bizimle iletişime geçin. 
              AI çözümleri ve klasik bilişim hizmetlerimizle işinizi bir üst seviyeye taşıyın.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              İletişim Bilgileri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Size en uygun iletişim kanalını seçin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {contactInfo.map((info, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <info.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{info.title}</h3>
                <div className='space-y-2 mb-4'>
                  {info.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className='text-gray-300 text-sm'>{detail}</div>
                  ))}
                </div>
                <div className='text-purple-300 text-sm'>{info.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className='py-16 bg-gradient-to-b from-black/30 to-black/50'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-white mb-4'>
              Hemen Sorunuzu Sorun
            </h2>
            <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
              AI asistanımızla anında konuşun, proje danışmanlığı alın
            </p>
          </div>

          <div className='flex justify-center'>
            <div className='w-full max-w-4xl'>
              <ContactAIAssistant locale={params.locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Hizmet Alanlarımız
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Uzmanlaştığımız alanlar ve sunduğumuz çözümler
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {serviceAreas.map((area, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group'>
                <div className={`w-16 h-16 bg-gradient-to-r ${area.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3 text-center'>{area.title}</h3>
                <p className='text-gray-300 text-sm text-center'>{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Proje Teklifi Alın
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Projenizi detaylandırın, size özel çözüm önerisi hazırlayalım
            </p>
          </div>

          <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>Ad Soyad</label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Adınız ve soyadınız'
                  />
                </div>
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>E-posta</label>
                  <input
                    type='email'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='ornek@email.com'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>Telefon</label>
                  <input
                    type='tel'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='+90 (555) 123 45 67'
                  />
                </div>
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>Şirket</label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Şirket adınız'
                  />
                </div>
              </div>

              <div>
                <label className='block text-white text-sm font-semibold mb-2'>Hizmet Türü</label>
                <select className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'>
                  <option value=''>Hizmet türünü seçin</option>
                  <option value='ai-solutions'>AI Çözümleri</option>
                  <option value='custom-ai-assistant'>Özel Uzmanlık Alanı AI Asistanı</option>
                  <option value='chatbot-ai-support'>Chatbot AI Desteği</option>
                  <option value='web-development'>Web Geliştirme</option>
                  <option value='mobile-apps'>Mobil Uygulamalar</option>
                  <option value='digital-media'>Dijital Medya</option>
                  <option value='education'>Eğitim Çözümleri</option>
                  <option value='legal'>Hukuki Çözümler</option>
                  <option value='consulting'>Danışmanlık</option>
                </select>
              </div>

              <div>
                <label className='block text-white text-sm font-semibold mb-2'>Proje Açıklaması</label>
                <textarea
                  rows={4}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Projenizi detaylı olarak açıklayın...'
                ></textarea>
              </div>

              <div>
                <label className='block text-white text-sm font-semibold mb-2'>Bütçe Aralığı</label>
                <select className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500'>
                  <option value=''>Bütçe aralığını seçin</option>
                  <option value='10k-25k'>10.000 - 25.000 TL +KDV</option>
                  <option value='25k-50k'>25.000 - 50.000 TL +KDV</option>
                  <option value='50k-100k'>50.000 - 100.000 TL +KDV</option>
                  <option value='100k+'>100.000 TL+ +KDV</option>
                  <option value='discuss'>Görüşelim</option>
                </select>
              </div>

              <div className='text-center'>
                <Button
                  type='submit'
                  className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                >
                  <Send className='w-6 h-6 inline mr-2' />
                  Teklif Gönder
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Sıkça Sorulan Sorular
            </h2>
            <p className='text-xl text-gray-300'>
              Merak ettiğiniz konular hakkında bilgi alın
            </p>
          </div>

          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <h3 className='text-lg font-bold text-white mb-3'>{faq.question}</h3>
                <p className='text-gray-300'>{faq.answer}</p>
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
              Hemen Başlayın
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Projenizi hayata geçirmek için ilk adımı atın. Ücretsiz danışmanlık alın.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <MessageCircle className='w-6 h-6 inline mr-2' />
                Demo İncele
              </Link>
              <Link
                href='tel:+905551234567'
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Phone className='w-6 h-6 inline mr-2' />
                Hemen Ara
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  return <ContactContent params={params} />;
}