import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Users,
  Lightbulb
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
      ? 'Sık Sorulan Sorular - MySonAI FAQ | AI Asistanları Hakkında Her Şey'
      : 'Frequently Asked Questions - MySonAI FAQ | Everything About AI Assistants',
    description: isTurkish
      ? 'MySonAI hakkında sık sorulan sorular ve cevapları. AI asistanları, fiyatlandırma, teknik destek ve daha fazlası.'
      : 'Frequently asked questions and answers about MySonAI. AI assistants, pricing, technical support and more.',
    keywords: isTurkish
      ? 'MySonAI SSS, sık sorulan sorular, AI asistanları FAQ, teknik destek, fiyatlandırma'
      : 'MySonAI FAQ, frequently asked questions, AI assistants FAQ, technical support, pricing',
  };
}

// FAQ categories
const faqCategories = [
  {
    id: 'general',
    title: 'Genel Sorular',
    icon: HelpCircle,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'pricing',
    title: 'Fiyatlandırma',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'technical',
    title: 'Teknik Destek',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'security',
    title: 'Güvenlik',
    icon: Shield,
    color: 'from-orange-500 to-red-500',
  },
];

// FAQ items
const faqItems = [
  // General Questions
  {
    category: 'general',
    question: 'MySonAI nedir?',
    answer: 'MySonAI, Türkçe konuşan AI asistanları sunan bir platformdur. 18 farklı uzman AI asistanı ile günlük görevlerinizi kolaylaştırır, sorularınızı yanıtlar ve size yardımcı olur.',
  },
  {
    category: 'general',
    question: 'MySonAI ile Pi arasındaki fark nedir?',
    answer: 'MySonAI, Pi\'den 10x daha hızlı yanıt verir, tamamen Türkçe konuşur ve Türk kültürüne uygun yanıtlar sunar. Ayrıca daha güvenli ve özelleştirilebilir bir deneyim sağlar.',
  },
  {
    category: 'general',
    question: 'Kaç tane AI asistanı var?',
    answer: 'MySonAI\'da 18 farklı uzman AI asistanı bulunmaktadır. Her biri kendi alanında uzmanlaşmıştır: Fevzi (Takım Lideri), Elif (Ürün Müdürü), Burak (Mimar), Ayşe (Geliştirici) ve daha fazlası.',
  },
  {
    category: 'general',
    question: 'AI asistanları nasıl çalışır?',
    answer: 'AI asistanlarımız, gelişmiş doğal dil işleme teknolojisi kullanarak sizinle Türkçe konuşur. Her asistan kendi uzmanlık alanında eğitilmiştir ve size en iyi yardımı sunar.',
  },
  
  // Pricing Questions
  {
    category: 'pricing',
    question: 'Ücretsiz plan gerçekten ücretsiz mi?',
    answer: 'Evet! Ücretsiz plan tamamen ücretsizdir. Kredi kartı bilgisi istemiyoruz. 5 AI asistanı ve 100 mesaj ile MySonAI\'ı deneyebilirsiniz.',
  },
  {
    category: 'pricing',
    question: 'Plan değişikliği yapabilir miyim?',
    answer: 'Tabii ki! İstediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler anında geçerli olur ve fark ücreti alınmaz.',
  },
  {
    category: 'pricing',
    question: 'İptal ettiğimde para iadesi alabilir miyim?',
    answer: 'İlk 7 gün içinde iptal ederseniz tam para iadesi alırsınız. Sonrasında kullanmadığınız süre için orantılı iade yapılır.',
  },
  {
    category: 'pricing',
    question: 'Kurumsal plan için özel fiyat var mı?',
    answer: 'Kurumsal planlar için özel fiyatlandırma yapıyoruz. İhtiyaçlarınıza göre özel çözümler sunuyoruz. İletişime geçin!',
  },
  
  // Technical Questions
  {
    category: 'technical',
    question: 'API erişimi var mı?',
    answer: 'Evet! Pro ve Kurumsal planlarda API erişimi mevcut. Kendi uygulamalarınızda MySonAI asistanlarını kullanabilirsiniz.',
  },
  {
    category: 'technical',
    question: 'Hangi platformlarda çalışır?',
    answer: 'MySonAI web tarayıcısında çalışır. Chrome, Firefox, Safari ve Edge tarayıcılarında sorunsuz çalışır. Mobil uygulama yakında gelecek.',
  },
  {
    category: 'technical',
    question: 'İnternet bağlantısı gerekli mi?',
    answer: 'Evet, MySonAI bulut tabanlı bir hizmettir. İnternet bağlantısı gereklidir. Offline mod yakında gelecek.',
  },
  {
    category: 'technical',
    question: 'Teknik destek alabilir miyim?',
    answer: 'Evet! Teknik destek ekibimiz 7/24 hizmetinizde. E-posta, telefon veya canlı chat ile ulaşabilirsiniz.',
  },
  
  // Security Questions
  {
    category: 'security',
    question: 'Verilerim güvenli mi?',
    answer: 'Evet! Verileriniz en yüksek güvenlik standartları ile korunur. End-to-end şifreleme kullanıyoruz ve verilerinizi asla üçüncü taraflarla paylaşmayız.',
  },
  {
    category: 'security',
    question: 'Sohbet geçmişim saklanıyor mu?',
    answer: 'Sohbet geçmişiniz sadece sizin hesabınızda saklanır. İstediğiniz zaman silebilirsiniz. Verileriniz asla dışarıya çıkmaz.',
  },
  {
    category: 'security',
    question: 'KVKK uyumlu mu?',
    answer: 'Evet! MySonAI tamamen KVKK uyumludur. Kişisel verilerinizin korunması için gerekli tüm önlemleri alıyoruz.',
  },
  {
    category: 'security',
    question: 'Hesabımı nasıl güvende tutabilirim?',
    answer: 'Güçlü bir şifre kullanın, 2FA\'yı aktif edin ve şüpheli aktiviteleri hemen bildirin. Güvenlik ekibimiz 7/24 izleme yapar.',
  },
];

// Popular questions
const popularQuestions = [
  {
    question: 'MySonAI ile Pi arasındaki fark nedir?',
    answer: 'MySonAI, Pi\'den 10x daha hızlı yanıt verir, tamamen Türkçe konuşur ve Türk kültürüne uygun yanıtlar sunar.',
  },
  {
    question: 'Ücretsiz plan gerçekten ücretsiz mi?',
    answer: 'Evet! Ücretsiz plan tamamen ücretsizdir. Kredi kartı bilgisi istemiyoruz.',
  },
  {
    question: 'Kaç tane AI asistanı var?',
    answer: 'MySonAI\'da 18 farklı uzman AI asistanı bulunmaktadır.',
  },
  {
    question: 'Verilerim güvenli mi?',
    answer: 'Evet! Verileriniz en yüksek güvenlik standartları ile korunur.',
  },
];

function FAQContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Sık Sorulan Sorular
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI hakkında merak ettiklerinizin cevapları burada. 
              Bulamadığınız sorular için bizimle iletişime geçin.
            </p>
            
            {/* Search Bar */}
            <div className='max-w-md mx-auto mb-8'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Sorularınızda arayın...'
                  className='w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Popüler Sorular
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              En çok sorulan sorular ve cevapları
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {popularQuestions.map((item, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
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

      {/* FAQ Categories */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Kategorilere Göre Sorular
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Sorularınızı kategorilere göre filtreleyin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
            {faqCategories.map((category) => (
              <Card key={category.id} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{category.title}</h3>
                <p className='text-gray-300 text-sm'>
                  {faqItems.filter(item => item.category === category.id).length} soru
                </p>
              </Card>
            ))}
          </div>

          {/* FAQ Items by Category */}
          {faqCategories.map((category) => (
            <div key={category.id} className='mb-16'>
              <h3 className='text-3xl font-bold text-white mb-8 text-center'>
                {category.title}
              </h3>
              <div className='space-y-6'>
                {faqItems
                  .filter(item => item.category === category.id)
                  .map((item, index) => (
                    <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {item.question}
                      </h4>
                      <p className='text-gray-300'>
                        {item.answer}
                      </p>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Hala Sorularınız Var mı?
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              FAQ'da bulamadığınız sorular için bizimle iletişime geçin. 
              Uzman ekibimiz size yardımcı olacaktır.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <MessageCircle className='w-6 h-6 inline mr-2' />
                İletişime Geç
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Lightbulb className='w-6 h-6 inline mr-2' />
                Demo Dene
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FAQPage({ params }: { params: { locale: Locale } }) {
  return <FAQContent params={params} />;
}
