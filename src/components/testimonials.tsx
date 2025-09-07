'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';

const testimonials = (locale: Locale) => [
  {
    name: 'Ahmet Yılmaz',
    role: t(locale, 'testimonials.ahmetRole'),
    company: t(locale, 'testimonials.ahmetCompany'),
    content:
      'MySonAI ile projelerimi 10 kat daha hızlı tamamlıyorum. AI asistanlar gerçekten harika çalışıyor!',
    rating: 5,
    avatar: 'AY',
  },
  {
    name: 'Zeynep Kaya',
    role: 'UX Tasarımcı',
    company: 'Design Studio',
    content:
      'Görsel üretim özelliği inanılmaz. Hayal ettiğim tasarımları dakikalar içinde gerçeğe dönüştürüyorum.',
    rating: 5,
    avatar: 'ZK',
  },
  {
    name: 'Mehmet Demir',
    role: t(locale, 'testimonials.mehmetRole'),
    company: t(locale, 'testimonials.mehmetCompany'),
    content:
      "Chatbot'umuzu MySonAI ile oluşturduk. Müşteri memnuniyeti %300 arttı. Kesinlikle tavsiye ederim.",
    rating: 5,
    avatar: 'MD',
  },
];

export function Testimonials({ locale }: { locale: Locale }) {
  return (
    <section className='py-20 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Binlerce kullanıcı MySonAI ile projelerini hayata geçiriyor. İşte onların deneyimleri.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials(locale).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700'
            >
              <div className='flex items-center mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                ))}
              </div>

              <Quote className='w-8 h-8 text-gray-400 mb-4' />

              <p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
                &quot;{testimonial.content}&quot;
              </p>

              <div className='flex items-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className='font-semibold text-gray-900 dark:text-white'>
                    {testimonial.name}
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{testimonial.role}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-500'>{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
