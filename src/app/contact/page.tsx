import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>İletişim</h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Sorularınız mı var? Bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
            <h2 className='text-2xl font-bold text-white mb-6'>Mesaj Gönder</h2>

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
                  className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                  <option value=''>Konu seçin</option>
                  <option value='general'>Genel Soru</option>
                  <option value='technical'>Teknik Destek</option>
                  <option value='sales'>Satış</option>
                  <option value='partnership'>İş Ortaklığı</option>
                  <option value='feedback'>Geri Bildirim</option>
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
                  className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
                  placeholder='Mesajınızı buraya yazın...'
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center'
              >
                <Send className='w-5 h-5 mr-2' />
                Mesaj Gönder
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            {/* Contact Methods */}
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
              <h2 className='text-2xl font-bold text-white mb-6'>İletişim Bilgileri</h2>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-white font-semibold mb-1'>E-posta</h3>
                    <p className='text-gray-300'>info@mysonai.com</p>
                    <p className='text-gray-300 text-sm'>24 saat içinde yanıt</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4'>
                    <Phone className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-white font-semibold mb-1'>Telefon</h3>
                    <p className='text-gray-300'>+90 (212) 555 0123</p>
                    <p className='text-gray-300 text-sm'>Pazartesi - Cuma, 09:00 - 18:00</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-white font-semibold mb-1'>Adres</h3>
                    <p className='text-gray-300'>Levent Mahallesi</p>
                    <p className='text-gray-300'>Beşiktaş, İstanbul</p>
                    <p className='text-gray-300 text-sm'>Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
              <h2 className='text-2xl font-bold text-white mb-6'>Sık Sorulan Sorular</h2>

              <div className='space-y-4'>
                <Link
                  href='/pricing'
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Fiyatlandırma hakkında bilgi alabilir miyim?
                </Link>
                <Link
                  href='/demo'
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Demo nasıl çalışır?
                </Link>
                <Link
                  href='/signup'
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Hesap oluşturma süreci nasıl?
                </Link>
                <Link
                  href='/pricing'
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Plan değişikliği yapabilir miyim?
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
              <h2 className='text-2xl font-bold text-white mb-6'>Sosyal Medya</h2>

              <div className='flex space-x-4'>
                <a
                  href='https://twitter.com/mysonai'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform'
                >
                  <span className='text-white font-bold'>X</span>
                </a>
                <a
                  href='https://linkedin.com/company/mysonai'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-105 transition-transform'
                >
                  <span className='text-white font-bold'>in</span>
                </a>
                <a
                  href='https://github.com/mysonai'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center hover:scale-105 transition-transform'
                >
                  <span className='text-white font-bold'>Git</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
