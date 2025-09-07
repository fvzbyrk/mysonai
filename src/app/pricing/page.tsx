import { Check, Star } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>Fiyatlandırma</h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Her ihtiyacınıza uygun esnek fiyatlandırma planları. Ücretsiz başlayın, ihtiyacınız
            arttıkça ölçeklendirin.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {/* Free Plan */}
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold text-white mb-2'>Ücretsiz</h3>
              <div className='text-4xl font-bold text-white mb-2'>₺0</div>
              <p className='text-gray-300'>Aylık</p>
            </div>

            <ul className='space-y-4 mb-8'>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Günlük 10 mesaj</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>5 AI asistan</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Temel özellikler</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>E-posta desteği</span>
              </li>
            </ul>

            <Link
              href='/signup'
              className='w-full bg-white/10 text-white py-3 rounded-lg font-semibold text-center block hover:bg-white/20 transition-colors'
            >
              Ücretsiz Başla
            </Link>
          </div>

          {/* Pro Plan */}
          <div className='bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 border border-purple-500 relative'>
            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
              <div className='bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center'>
                <Star className='w-4 h-4 mr-1' />
                En Popüler
              </div>
            </div>

            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold text-white mb-2'>Pro</h3>
              <div className='text-4xl font-bold text-white mb-2'>₺99</div>
              <p className='text-purple-200'>Aylık</p>
            </div>

            <ul className='space-y-4 mb-8'>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Günlük 100 mesaj</span>
              </li>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Tüm AI asistanlar</span>
              </li>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Gelişmiş özellikler</span>
              </li>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Öncelikli destek</span>
              </li>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>API erişimi</span>
              </li>
              <li className='flex items-center text-white'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Özel entegrasyonlar</span>
              </li>
            </ul>

            <Link
              href='/signup'
              className='w-full bg-white text-purple-600 py-3 rounded-lg font-semibold text-center block hover:bg-gray-100 transition-colors'
            >
              Pro&apos;ya Geç
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold text-white mb-2'>Kurumsal</h3>
              <div className='text-4xl font-bold text-white mb-2'>Özel</div>
              <p className='text-gray-300'>Fiyatlandırma</p>
            </div>

            <ul className='space-y-4 mb-8'>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Sınırsız mesaj</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Özel AI asistanlar</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Özel entegrasyonlar</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>7/24 destek</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>Özel eğitim</span>
              </li>
              <li className='flex items-center text-gray-300'>
                <Check className='w-5 h-5 text-green-400 mr-3' />
                <span>SLA garantisi</span>
              </li>
            </ul>

            <Link
              href='/contact'
              className='w-full bg-white/10 text-white py-3 rounded-lg font-semibold text-center block hover:bg-white/20 transition-colors'
            >
              İletişime Geç
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-white text-center mb-12'>Sık Sorulan Sorular</h2>

          <div className='space-y-6'>
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <h3 className='text-white font-semibold mb-3'>Fiyatlandırma nasıl çalışır?</h3>
              <p className='text-gray-300'>
                Ücretsiz plan ile başlayabilir, ihtiyacınız arttıkça Pro planına geçebilirsiniz.
                Kurumsal müşteriler için özel fiyatlandırma sunuyoruz.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <h3 className='text-white font-semibold mb-3'>Plan değişikliği yapabilir miyim?</h3>
              <p className='text-gray-300'>
                Evet, istediğiniz zaman planınızı değiştirebilirsiniz. Değişiklikler bir sonraki
                fatura döneminde geçerli olur.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <h3 className='text-white font-semibold mb-3'>İptal edebilir miyim?</h3>
              <p className='text-gray-300'>
                Evet, istediğiniz zaman aboneliğinizi iptal edebilirsiniz. İptal sonrası dönem
                sonuna kadar hizmetlerinizden yararlanmaya devam edersiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
