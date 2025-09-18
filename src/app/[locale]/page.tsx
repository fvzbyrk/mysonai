import { Bot, Sparkles, ArrowRight, Code, Cloud, Shield, GraduationCap, Video, Music, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';

export default function HomePage({ params }: { params: { locale: Locale } }) {
  // JSON-LD Schema Markup
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MySonAI',
    description:
      params.locale === 'tr'
        ? 'AI çözümleri ve klasik bilişim hizmetleri sunan teknoloji firması - MySon Video, Firmatch, Avukat, Kids, Education, Music'
        : 'Technology company offering AI solutions and classic IT services - MySon Video, Firmatch, Avukat, Kids, Education, Music',
    url: 'https://mysonai.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
    author: {
      '@type': 'Organization',
      name: 'MySonAI Team',
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* JSON-LD Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-6'>MySonAI</h1>
            <p className='text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8'>
              AI çözümleri ve klasik bilişim hizmetleri sunan teknoloji firması. Geleceği bugün şekillendiriyoruz.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'
              >
                <Sparkles className='w-6 h-6' />
                <span>Demo İncele</span>
                <ArrowRight className='w-5 h-5' />
              </Link>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                İletişime Geç
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm'>
              <div className='flex items-center space-x-2'>
                <span className='text-green-400'>✓</span>
                <span>AI + Klasik Bilişim</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-blue-400'>✓</span>
                <span>Güvenilir Teknoloji</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-purple-400'>✓</span>
                <span>6 Alt Marka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt Markalar Bölümü */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>Alt Markalarımız</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Her biri kendi alanında uzmanlaşmış 6 alt markamızla hizmet veriyoruz
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* MySon Video */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Video className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Video</h3>
              <p className='text-gray-300 mb-6'>AI destekli animasyon & medya üretimi</p>
              <div className='text-sm text-red-400 font-semibold'>🎬 Animasyon & Medya</div>
            </div>

            {/* MySon Firmatch */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Briefcase className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Firmatch</h3>
              <p className='text-gray-300 mb-6'>Akıllı dış ticaret asistanı</p>
              <div className='text-sm text-blue-400 font-semibold'>🌍 Dış Ticaret</div>
            </div>

            {/* MySon Avukat */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Avukat</h3>
              <p className='text-gray-300 mb-6'>AI hukuk çözümleri</p>
              <div className='text-sm text-yellow-400 font-semibold'>⚖️ Hukuk</div>
            </div>

            {/* MySon Kids / Yumyumay */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Kids</h3>
              <p className='text-gray-300 mb-6'>Çocuk hikâyeleri, animasyon, sesli kitaplar</p>
              <div className='text-sm text-green-400 font-semibold'>👶 Çocuk İçerikleri</div>
            </div>

            {/* MySon Education */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <GraduationCap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Education</h3>
              <p className='text-gray-300 mb-6'>AI tabanlı eğitim çözümleri</p>
              <div className='text-sm text-purple-400 font-semibold'>🎓 Eğitim</div>
            </div>

            {/* MySon Music */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Music className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>MySon Music</h3>
              <p className='text-gray-300 mb-6'>AI tabanlı müzik düzenlemeleri</p>
              <div className='text-sm text-indigo-400 font-semibold'>🎵 Müzik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler Bölümü */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>Hizmetlerimiz</h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              AI çözümlerinden klasik bilişim hizmetlerine kadar geniş yelpazede hizmet veriyoruz
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* AI Çözümleri */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Bot className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>AI Çözümleri</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• Prompt mühendisliği</li>
                <li>• AI asistanlar</li>
                <li>• Veri analizi</li>
                <li>• Görüntü/ses işleme</li>
              </ul>
              <div className='text-sm text-purple-400 font-semibold'>🤖 Yapay Zeka</div>
            </div>

            {/* Klasik Bilişim */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Code className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Klasik Bilişim</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• Web & mobil geliştirme</li>
                <li>• API entegrasyon</li>
                <li>• Veritabanı</li>
                <li>• Bulut & altyapı</li>
                <li>• Siber güvenlik</li>
              </ul>
              <div className='text-sm text-blue-400 font-semibold'>💻 Yazılım</div>
            </div>

            {/* Dijital Medya */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Video className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Dijital Medya</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• Video/animasyon</li>
                <li>• Sesli kitaplar</li>
                <li>• Podcast</li>
                <li>• Sosyal medya içerikleri</li>
              </ul>
              <div className='text-sm text-red-400 font-semibold'>🎬 Medya</div>
            </div>

            {/* Danışmanlık & Eğitim */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <GraduationCap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Danışmanlık & Eğitim</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• AI eğitimleri</li>
                <li>• Dijital dönüşüm</li>
                <li>• Hukuk & ticaret AI</li>
                <li>• Strateji danışmanlığı</li>
              </ul>
              <div className='text-sm text-green-400 font-semibold'>🎓 Eğitim</div>
            </div>

            {/* Yazılım İhtiyaçları */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Cloud className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Yazılım İhtiyaçları</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• Özel yazılım</li>
                <li>• Mobil uygulama</li>
                <li>• E-ticaret</li>
                <li>• Entegrasyon/otomasyon</li>
                <li>• Bakım & destek</li>
              </ul>
              <div className='text-sm text-yellow-400 font-semibold'>☁️ Bulut</div>
            </div>

            {/* Güvenlik */}
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>Güvenlik</h3>
              <ul className='text-gray-300 space-y-2 mb-6'>
                <li>• Siber güvenlik</li>
                <li>• Veri koruma</li>
                <li>• Güvenlik denetimi</li>
                <li>• Risk yönetimi</li>
              </ul>
              <div className='text-sm text-indigo-400 font-semibold'>🔒 Güvenlik</div>
            </div>
          </div>

          {/* Hizmetler Sayfasına Git */}
          <div className='text-center mt-12'>
            <Link
              href={`/${params.locale}/services`}
              className='inline-flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors'
            >
              <Code className='w-5 h-5 mr-2' />
              Tüm Hizmetleri Gör
              <ArrowRight className='w-4 h-4 ml-2' />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Bölümü */}
      <section className='py-20 bg-black/20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
            <div className='w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Sparkles className='w-12 h-12 text-white' />
            </div>
            <h3 className='text-2xl font-bold text-white mb-4'>Demo Deneyimi</h3>
            <p className='text-gray-300 mb-8'>AI asistanlarımızı üyelik olmadan deneyimleyin. Herkese açık demo deneyimimizi keşfedin!</p>
            <Link
              href={`/${params.locale}/demo`}
              className='inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg'
            >
              <Sparkles className='w-6 h-6 mr-2' />
              Demo Başlat
              <ArrowRight className='w-5 h-5 ml-2' />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Projenizi Hayata Geçirin
          </h2>
          <p className='text-xl text-gray-300 mb-8'>AI çözümleri ve klasik bilişim hizmetlerimizle işinizi bir üst seviyeye taşıyın</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href={`/${params.locale}/contact`}
              className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg'
            >
              Teklif Al
            </Link>
            <Link
              href={`/${params.locale}/demo`}
              className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20'
            >
              Demo İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black/40 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-white mb-4'>MySonAI</h3>
            <p className='text-gray-300 mb-6'>AI çözümleri ve klasik bilişim hizmetleri sunan teknoloji firması</p>
            <div className='flex flex-wrap justify-center gap-6 mb-8'>
              <Link
                href={`/${params.locale}/about`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                Hakkımızda
              </Link>
              <Link
                href={`/${params.locale}/services`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                Hizmetler
              </Link>
              <Link
                href={`/${params.locale}/solutions`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                Çözümler
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                Demo
              </Link>
              <Link
                href={`/${params.locale}/references`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                Referanslar
              </Link>
              <Link
                href={`/${params.locale}/contact`}
                className='text-gray-300 hover:text-white transition-colors'
              >
                İletişim
              </Link>
            </div>
            <div className='mt-8 pt-8 border-t border-gray-700'>
              <p className='text-gray-400 text-sm'>© 2024 MySonAI. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
