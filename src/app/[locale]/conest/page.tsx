'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  Star,
  Target,
  Bell,
  MapPin,
  Shield,
  Smartphone,
  Globe,
  BarChart3,
  Heart,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
  Settings,
  Zap,
} from 'lucide-react';

export default function CoNestPage() {
  const features = [
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Kullanıcı Yönetimi',
      items: [
        'Güvenli Kayıt/Giriş - E-posta, Google, Apple',
        'Çoklu Profil - Anne-baba ve çocuk profilleri',
        'Detaylı Profil Bilgileri - İş saatleri, acil durum',
        'Çoklu Çocuk Desteği - Birden fazla çocuk takibi',
        'Güvenli Şifre - Güçlü şifre politikası',
      ],
    },
    {
      icon: <Calendar className='w-6 h-6' />,
      title: 'Akıllı Takvim Sistemi',
      items: [
        'Dinamik Program Oluşturma - İş, okul, antrenman',
        'Esnek Antrenman Saatleri - Değişken saatler',
        'Tekrarlayan Görevler - Günlük, haftalık, aylık',
        'Akıllı Hatırlatmalar - Zaman ve konum bazlı',
        'Çakışma Kontrolü - Hiçbir zaman dilimi boş kalmaz',
      ],
    },
    {
      icon: <Star className='w-6 h-6' />,
      title: 'Çocuk Gelişimi & Motivasyon',
      items: [
        'Yaş Grupları - Okul öncesi, ilkokul, ortaokul, lise',
        'Gamification Sistemi - Yıldız, Rozet, Seviye',
        'Yaşa Uygun Görevler - Her yaş grubu için özel',
        'İlerleme Takibi - Detaylı gelişim raporları',
        'Motivasyon Mesajları - Başarıya göre övgü',
      ],
    },
    {
      icon: <Target className='w-6 h-6' />,
      title: 'Görev Yönetimi',
      items: [
        'Günlük Görev Listesi - Yatak, diş, kahvaltı, ödev',
        'Görsel Kontroller - Boş / Tamamlandı işaretleme',
        'Öncelik Sistemi - 1-5 arası önem derecesi',
        'Zorluk Seviyeleri - Çocuk yaşına uygun',
        'Ödül Puanları - Görev tamamlama karşılığı',
      ],
    },
    {
      icon: <MessageCircle className='w-6 h-6' />,
      title: 'Sosyal Topluluk',
      items: [
        'Yaş Grupları - İlkokul Ebeveynleri, Sporcu Çocuklar',
        'İlgi Alanları - Hobi ve aktivite bazlı gruplar',
        'Konum Bazlı - Yakındaki ebeveynler',
        'Destek Grupları - Nöbetçi Ebeveynler, Tek Ebeveyn',
        'Forum Sistemi - Soru-cevap, deneyim paylaşımı',
      ],
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: 'Raporlama & İstatistikler',
      items: [
        'Günlük İlerleme - Tamamlanan görev oranı',
        'Haftalık Raporlar - Detaylı gelişim özeti',
        'Aylık İstatistikler - Uzun vadeli trend analizi',
        'Başarı Grafikleri - Görsel ilerleme takibi',
        'Gelişim Önerileri - Kişiselleştirilmiş tavsiyeler',
      ],
    },
    {
      icon: <Bell className='w-6 h-6' />,
      title: 'Bildirim Sistemi',
      items: [
        'Zaman Bazlı - Görev hatırlatmaları',
        'Konum Bazlı - Okul çıkışı, eve varış',
        'Akıllı Bildirimler - Okuldan çıkışa 10 dk kaldı',
        'Push Notifications - Mobil bildirimler',
        'E-posta Bildirimleri - Önemli güncellemeler',
      ],
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Konum & Güvenlik',
      items: [
        'Kayıtlı Konumlar - Ev, okul, iş, spor salonu',
        'Geofencing - Konum bazlı otomatik bildirimler',
        'Güvenlik Kontrolü - Çocuk okuldan çıkış bildirimi',
        'Acil Durum İletişim - Hızlı erişim bilgileri',
        'Konum Paylaşımı - İsteğe bağlı yakınlık',
      ],
    },
  ];

  const technicalFeatures = [
    {
      icon: <Shield className='w-5 h-5' />,
      title: 'Güvenlik & Gizlilik',
      items: ['JWT Authentication', 'Rate Limiting', 'Veri Şifreleme', 'GDPR Uyumlu', 'HTTPS'],
    },
    {
      icon: <Smartphone className='w-5 h-5' />,
      title: 'Platform Desteği',
      items: ['Web Uygulaması', 'Mobil Uygulama', 'Offline Mod', 'Sync', 'Backup'],
    },
    {
      icon: <Globe className='w-5 h-5' />,
      title: 'Çok Dilli Destek',
      items: ['Türkçe', 'İngilizce', 'Otomatik Çeviri', 'Yerelleştirme'],
    },
    {
      icon: <Zap className='w-5 h-5' />,
      title: 'Teknik Özellikler',
      items: ['RESTful API', 'Real-time Updates', 'Scalable Architecture', 'Performance Optimized'],
    },
  ];

  const roadmap = [
    {
      version: 'V2 Özellikleri',
      features: [
        { icon: <Zap className='w-4 h-4' />, text: 'AI Asistan - Kişiselleştirilmiş öneriler' },
        {
          icon: <MessageCircle className='w-4 h-4' />,
          text: 'Video Call - Ebeveyn-çocuk iletişimi',
        },
        { icon: <Award className='w-4 h-4' />, text: 'Eğitim İçerikleri - Yaşa uygun materyaller' },
        {
          icon: <Heart className='w-4 h-4' />,
          text: 'Profesyonel Destek - Psikolog/pedagog danışmanlığı',
        },
      ],
    },
    {
      version: 'V3 Özellikleri',
      features: [
        { icon: <Settings className='w-4 h-4' />, text: 'IoT Entegrasyonu - Akıllı ev cihazları' },
        { icon: <Globe className='w-4 h-4' />, text: 'AR/VR - Eğitim deneyimleri' },
        { icon: <Shield className='w-4 h-4' />, text: 'Blockchain - Gelişim sertifikaları' },
        { icon: <Globe className='w-4 h-4' />, text: 'Global - Çok dilli, çok kültürlü destek' },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🏠 MySonAI Alt Markası
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              CoNest
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Anne-Baba Günlük Planlayıcı
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Aile organizasyonu ve çocuk gelişimi takibi için kapsamlı platform. Gamification, sosyal
            topluluk ve akıllı bildirimler ile aile yaşamınızı kolaylaştırın.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
            >
              <Calendar className='w-5 h-5 mr-2' />
              Demo İncele
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
            >
              <MessageCircle className='w-5 h-5 mr-2' />
              Bilgi Al
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Kapsamlı Özellikler
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Aile yaşamınızı kolaylaştıran 50+ özellik ile donatılmış platform
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {feature.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>{feature.title}</h3>
                </div>
                <ul className='space-y-2'>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                      <span className='text-sm'>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Teknik Altyapı</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Güvenli, ölçeklenebilir ve performanslı teknoloji altyapısı
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className='p-6 text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg w-fit mx-auto mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>{feature.title}</h3>
                <ul className='space-y-1'>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-sm text-gray-600'>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Gelecek Planları</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Sürekli gelişen platform ile gelecekteki özellikler
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {roadmap.map((version, index) => (
              <Card key={index} className='p-8'>
                <div className='flex items-center mb-6'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg mr-4'>
                    <Clock className='w-5 h-5' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>{version.version}</h3>
                </div>
                <div className='space-y-4'>
                  {version.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-start'>
                      <div className='bg-blue-100 text-blue-600 p-2 rounded-lg mr-3'>
                        {feature.icon}
                      </div>
                      <span className='text-gray-700'>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            CoNest ile Aile Yaşamınızı Kolaylaştırın
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Gamification, sosyal topluluk ve akıllı bildirimler ile çocuklarınızın gelişimini takip
            edin
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
            >
              <Calendar className='w-5 h-5 mr-2' />
              Hemen Başla
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
            >
              <MessageCircle className='w-5 h-5 mr-2' />
              Demo İncele
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
