import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Shield,
  Eye,
  Lock,
  Trash2,
  Download,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Lightbulb,
  Target,
  Zap,
  Globe,
  Code,
  Bot,
  Heart,
  Rocket,
  Calendar,
  FileText,
  Mail,
  Phone,
  AlertTriangle,
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
      ? 'GDPR - MySonAI Veri Koruma ve Gizlilik Politikası | KVKK Uyumlu'
      : 'GDPR - MySonAI Data Protection and Privacy Policy | GDPR Compliant',
    description: isTurkish
      ? 'MySonAI GDPR uyumluluk politikası. Veri koruma, gizlilik hakları ve kullanıcı verilerinin güvenliği hakkında bilgiler.'
      : 'MySonAI GDPR compliance policy. Data protection, privacy rights and user data security information.',
    keywords: isTurkish
      ? 'MySonAI GDPR, veri koruma, gizlilik politikası, KVKK uyumlu, kullanıcı hakları'
      : 'MySonAI GDPR, data protection, privacy policy, GDPR compliant, user rights',
  };
}

// GDPR principles
const gdprPrinciples = [
  {
    icon: Shield,
    title: 'Veri Minimizasyonu',
    description: 'Sadece gerekli olan verileri topluyoruz ve işliyoruz',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lock,
    title: 'Şifreleme',
    description: 'Tüm veriler end-to-end şifreleme ile korunuyor',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Eye,
    title: 'Şeffaflık',
    description: 'Veri işleme süreçlerimiz tamamen şeffaf',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Kullanıcı Kontrolü',
    description: 'Verileriniz üzerinde tam kontrol hakkınız var',
    color: 'from-orange-500 to-red-500',
  },
];

// User rights
const userRights = [
  {
    icon: Eye,
    title: 'Bilgi Alma Hakkı',
    description: 'Hangi verilerinizin işlendiğini öğrenebilirsiniz',
    details: [
      'Hangi veriler toplanıyor',
      'Veri işleme amaçları',
      'Veri saklama süreleri',
      'Veri paylaşımı durumu',
    ],
  },
  {
    icon: Download,
    title: 'Veri Taşınabilirliği',
    description: 'Verilerinizi başka platforma aktarabilirsiniz',
    details: [
      'JSON formatında veri indirme',
      'Makine okunabilir format',
      'Hızlı veri aktarımı',
      'Desteklenen formatlar',
    ],
  },
  {
    icon: Trash2,
    title: 'Silme Hakkı',
    description: 'Verilerinizin silinmesini talep edebilirsiniz',
    details: [
      'Tam veri silme',
      'Anonimleştirme seçeneği',
      'Yedek verilerin silinmesi',
      '30 gün içinde işlem',
    ],
  },
  {
    icon: Target,
    title: 'Düzeltme Hakkı',
    description: 'Yanlış verilerinizi düzeltebilirsiniz',
    details: [
      'Profil bilgilerini güncelleme',
      'Yanlış verileri düzeltme',
      'Eksik bilgileri tamamlama',
      'Anında güncelleme',
    ],
  },
];

// Data processing
const dataProcessing = [
  {
    category: 'Kimlik Bilgileri',
    data: ['Ad, soyad', 'E-posta adresi', 'Telefon numarası'],
    purpose: 'Hesap oluşturma ve kimlik doğrulama',
    legalBasis: 'Sözleşme performansı',
    retention: 'Hesap aktif olduğu sürece',
  },
  {
    category: 'Kullanım Verileri',
    data: ['Sohbet geçmişi', 'Mesaj sayısı', 'Kullanım süreleri'],
    purpose: 'Hizmet iyileştirme ve kişiselleştirme',
    legalBasis: 'Meşru menfaat',
    retention: '2 yıl',
  },
  {
    category: 'Teknik Veriler',
    data: ['IP adresi', 'Tarayıcı bilgisi', 'Cihaz bilgisi'],
    purpose: 'Güvenlik ve performans optimizasyonu',
    legalBasis: 'Meşru menfaat',
    retention: '1 yıl',
  },
  {
    category: 'Çerez Verileri',
    data: ['Oturum çerezleri', 'Tercih çerezleri', 'Analitik çerezleri'],
    purpose: 'Site işlevselliği ve analitik',
    legalBasis: 'Rıza',
    retention: 'Çerez politikasına göre',
  },
];

// Security measures
const securityMeasures = [
  {
    icon: Lock,
    title: 'Şifreleme',
    description: 'Tüm veriler AES-256 şifreleme ile korunuyor',
  },
  {
    icon: Shield,
    title: 'Güvenli Altyapı',
    description: 'ISO 27001 sertifikalı veri merkezleri',
  },
  {
    icon: Users,
    title: 'Erişim Kontrolü',
    description: 'Sadece yetkili personel verilere erişebilir',
  },
  {
    icon: AlertTriangle,
    title: 'İzleme',
    description: '7/24 güvenlik izleme ve tehdit tespiti',
  },
];

// Contact information
const contactInfo = [
  {
    icon: Mail,
    title: 'Veri Koruma Sorumlusu',
    contact: 'dpo@mysonai.com',
    description: 'GDPR soruları ve veri koruma talepleri',
  },
  {
    icon: Phone,
    title: 'Acil İletişim',
    contact: '+90 (212) 555 0123',
    description: 'Veri ihlali durumları için acil hat',
  },
  {
    icon: Globe,
    title: 'Web Sitesi',
    contact: 'mysonai.com/gdpr',
    description: 'Güncel GDPR politikaları ve bilgiler',
  },
];

function GDPRContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>GDPR Uyumluluğu</h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI olarak veri koruma ve gizlilik haklarınıza saygı gösteriyoruz. GDPR uyumlu
              veri işleme politikalarımızı öğrenin.
            </p>

            {/* Quick Actions */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Mail className='w-6 h-6 inline mr-2' />
                Veri Talebi
              </Link>
              <Link
                href={`/${params.locale}/privacy`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Shield className='w-6 h-6 inline mr-2' />
                Gizlilik Politikası
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GDPR Principles */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>GDPR İlkelerimiz</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Veri koruma konusundaki temel yaklaşımımız
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {gdprPrinciples.map((principle, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${principle.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <principle.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{principle.title}</h3>
                <p className='text-gray-300 text-sm'>{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Kullanıcı Haklarınız</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              GDPR kapsamında sahip olduğunuz haklar
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {userRights.map((right, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300'
              >
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0'>
                    <right.icon className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-white mb-2'>{right.title}</h3>
                    <p className='text-gray-300 mb-4'>{right.description}</p>
                    <ul className='space-y-2'>
                      {right.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className='flex items-center text-gray-300 text-sm'>
                          <CheckCircle className='w-4 h-4 text-green-400 mr-2 flex-shrink-0' />
                          <span>{detail}</span>
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

      {/* Data Processing */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Veri İşleme</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Hangi verilerinizi nasıl işliyoruz?
            </p>
          </div>

          <div className='space-y-6'>
            {dataProcessing.map((processing, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                <h3 className='text-xl font-bold text-white mb-4'>{processing.category}</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-300 mb-2'>Veri Türleri</h4>
                    <ul className='space-y-1'>
                      {processing.data.map((item, itemIndex) => (
                        <li key={itemIndex} className='text-gray-300 text-sm'>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-300 mb-2'>Amaç</h4>
                    <p className='text-gray-300 text-sm'>{processing.purpose}</p>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-300 mb-2'>Hukuki Dayanak</h4>
                    <p className='text-gray-300 text-sm'>{processing.legalBasis}</p>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-300 mb-2'>Saklama Süresi</h4>
                    <p className='text-gray-300 text-sm'>{processing.retention}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Güvenlik Önlemleri</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Verilerinizi korumak için aldığımız önlemler
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {securityMeasures.map((measure, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'
              >
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <measure.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{measure.title}</h3>
                <p className='text-gray-300 text-sm'>{measure.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>İletişim Bilgileri</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              GDPR soruları ve veri koruma talepleri için iletişim
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {contactInfo.map((contact, index) => (
              <Card
                key={index}
                className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'
              >
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
            <h2 className='text-4xl font-bold text-white mb-6'>Veri Haklarınızı Kullanın</h2>
            <p className='text-xl text-gray-300 mb-8'>
              GDPR kapsamında sahip olduğunuz hakları kullanmak için bizimle iletişime geçin. 30 gün
              içinde yanıtlayacağız.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Mail className='w-6 h-6 inline mr-2' />
                Veri Talebi
              </Link>
              <Link
                href={`/${params.locale}/privacy`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Shield className='w-6 h-6 inline mr-2' />
                Gizlilik Politikası
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GDPRPage({ params }: { params: { locale: Locale } }) {
  return <GDPRContent params={params} />;
}
