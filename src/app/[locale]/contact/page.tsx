import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Headphones,
  Zap
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
      ? 'İletişim - MySonAI Destek ve İletişim Bilgileri | 7/24 Destek'
      : 'Contact - MySonAI Support and Contact Information | 24/7 Support',
    description: isTurkish
      ? 'MySonAI ile iletişime geçin. 7/24 destek, teknik yardım, satış ve iş ortaklığı için iletişim bilgilerimiz.'
      : 'Contact MySonAI. 24/7 support, technical help, sales and partnership contact information.',
    keywords: isTurkish
      ? 'MySonAI iletişim, destek, teknik yardım, satış, iş ortaklığı, 7/24 destek'
      : 'MySonAI contact, support, technical help, sales, partnership, 24/7 support',
  };
}

// Contact methods
const contactMethods = [
  {
    icon: Mail,
    title: 'E-posta',
    description: 'info@mysonai.com',
    subtitle: '24 saat içinde yanıt',
    color: 'from-purple-500 to-pink-500',
    action: 'mailto:info@mysonai.com',
  },
  {
    icon: Phone,
    title: 'Telefon',
    description: '+90 (212) 555 0123',
    subtitle: 'Pazartesi - Cuma, 09:00 - 18:00',
    color: 'from-blue-500 to-cyan-500',
    action: 'tel:+902125550123',
  },
  {
    icon: MessageCircle,
    title: 'Canlı Destek',
    description: '7/24 Canlı Chat',
    subtitle: 'Anında yanıt',
    color: 'from-green-500 to-emerald-500',
    action: '/demo',
  },
  {
    icon: MapPin,
    title: 'Ofis',
    description: 'Levent Mahallesi, Beşiktaş',
    subtitle: 'İstanbul, Türkiye',
    color: 'from-orange-500 to-red-500',
    action: 'https://maps.google.com/?q=Levent+Mahallesi+Beşiktaş+İstanbul',
  },
];

// FAQ items
const faqItems = [
  {
    question: 'Teknik destek alabilir miyim?',
    answer: 'Evet! Teknik destek ekibimiz 7/24 hizmetinizde. E-posta, telefon veya canlı chat ile ulaşabilirsiniz.',
  },
  {
    question: 'API entegrasyonu için yardım alabilir miyim?',
    answer: 'Tabii ki! API entegrasyonu konusunda uzman ekibimiz size yardımcı olacaktır. Detaylı dokümantasyon da mevcut.',
  },
  {
    question: 'Kurumsal çözümler hakkında bilgi alabilir miyim?',
    answer: 'Kurumsal çözümlerimiz hakkında detaylı bilgi için satış ekibimizle iletişime geçin. Özel demo ve sunum yapabiliriz.',
  },
  {
    question: 'İş ortaklığı teklifleriniz var mı?',
    answer: 'Evet! İş ortaklığı programımız mevcut. Detaylar için partnership@mysonai.com adresine yazabilirsiniz.',
  },
  {
    question: 'Geri bildirim gönderebilir miyim?',
    answer: 'Elbette! Geri bildirimleriniz bizim için çok değerli. feedback@mysonai.com adresine gönderebilirsiniz.',
  },
  {
    question: 'Basın ve medya iletişimi nasıl?',
    answer: 'Basın ve medya iletişimi için press@mysonai.com adresine yazabilirsiniz. Hızlı yanıt garantisi veriyoruz.',
  },
];

// Support categories
const supportCategories = [
  {
    icon: Zap,
    title: 'Teknik Destek',
    description: 'API, entegrasyon ve teknik sorunlar',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Satış',
    description: 'Plan seçimi ve kurumsal çözümler',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Headphones,
    title: 'Müşteri Hizmetleri',
    description: 'Genel sorular ve hesap yönetimi',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Star,
    title: 'İş Ortaklığı',
    description: 'Partner programı ve işbirliği',
    color: 'from-orange-500 to-red-500',
  },
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
              Sorularınız mı var? Bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
            </p>
            
            {/* Trust Indicators */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm mb-8'>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-4 h-4 text-green-400' />
                <span>7/24 Destek</span>
              </div>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-4 h-4 text-blue-400' />
                <span>24 Saat İçinde Yanıt</span>
              </div>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='w-4 h-4 text-purple-400' />
                <span>Uzman Ekip</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              İletişim Yöntemleri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Size en uygun iletişim yöntemini seçin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {contactMethods.map((method, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>{method.title}</h3>
                <p className='text-gray-300 mb-2'>{method.description}</p>
                <p className='text-gray-400 text-sm mb-4'>{method.subtitle}</p>
                <Button
                  asChild
                  variant='outline'
                  className='w-full border-white/20 text-white hover:bg-white/10'
                >
                  <Link href={method.action}>
                    İletişime Geç
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Mesaj Gönder
            </h2>
            <p className='text-xl text-gray-300'>
              Formu doldurun, size en kısa sürede dönüş yapalım
            </p>
          </div>

          <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='firstName' className='block text-white text-sm font-medium mb-2'>
                    Ad
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    required
                    className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Adınız'
                  />
                </div>
                <div>
                  <label htmlFor='lastName' className='block text-white text-sm font-medium mb-2'>
                    Soyad
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    required
                    className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Soyadınız'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='email' className='block text-white text-sm font-medium mb-2'>
                  E-posta
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='ornek@email.com'
                />
              </div>

              <div>
                <label htmlFor='subject' className='block text-white text-sm font-medium mb-2'>
                  Konu
                </label>
                <select
                  id='subject'
                  name='subject'
                  required
                  className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                  <option value=''>Konu seçin</option>
                  <option value='general'>Genel Soru</option>
                  <option value='technical'>Teknik Destek</option>
                  <option value='sales'>Satış</option>
                  <option value='partnership'>İş Ortaklığı</option>
                  <option value='feedback'>Geri Bildirim</option>
                  <option value='press'>Basın</option>
                </select>
              </div>

              <div>
                <label htmlFor='message' className='block text-white text-sm font-medium mb-2'>
                  Mesaj
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={6}
                  required
                  className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
                  placeholder='Mesajınızı buraya yazın...'
                ></textarea>
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center'
              >
                <Send className='w-5 h-5 mr-2' />
                Mesaj Gönder
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Support Categories */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Destek Kategorileri
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Hangi konuda yardıma ihtiyacınız var?
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {supportCategories.map((category, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{category.title}</h3>
                <p className='text-gray-300 text-sm mb-4'>{category.description}</p>
                <Button
                  asChild
                  variant='outline'
                  className='w-full border-white/20 text-white hover:bg-white/10'
                >
                  <Link href={`/${params.locale}/contact`}>
                    İletişime Geç
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Sık Sorulan Sorular
            </h2>
            <p className='text-xl text-gray-300'>
              İletişim hakkında merak ettikleriniz
            </p>
          </div>

          <div className='space-y-6'>
            {faqItems.map((item, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <h3 className='text-xl font-bold text-white mb-3'>
                  {item.question}
                </h3>
                <p className='text-gray-300'>
                  {item.answer}
                </p>
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
              Hemen İletişime Geçin
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Sorularınız için 7/24 hizmetinizdeyiz. En kısa sürede yanıtlayalım!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='mailto:info@mysonai.com'
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Mail className='w-6 h-6 inline mr-2' />
                E-posta Gönder
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <MessageCircle className='w-6 h-6 inline mr-2' />
                Canlı Destek
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
