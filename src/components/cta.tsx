'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, getLocaleFromPathname } from '@/lib/i18n';
import { t } from '@/lib/translations';

export function CTA() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) || 'tr';
  return (
    <section className='py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-purple-900/50'></div>
        <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow'></div>
        <div className='absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow delay-1000'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            {t(locale as Locale, 'cta.futureTitle')}
            <span className='block gradient-text'>{t(locale as Locale, 'cta.futureSubtitle')}</span>
          </h2>

          <p className='text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto'>
            {t(locale as Locale, 'cta.futureDesc')}
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <Button
              asChild
              size='lg'
              className='bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold'
            >
              <Link href='/demo' className='flex items-center'>
                <Sparkles className='mr-2 h-5 w-5' />
                {t(locale as Locale, 'cta.freeTrial')}
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>

            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold'
            >
              <Link href='/contact'>{t(locale as Locale, 'cta.requestDemo')}</Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-2'>5 Dakika</div>
              <div className='text-purple-200'>Kurulum Süresi</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-2'>0₺</div>
              <div className='text-purple-200'>Başlangıç Maliyeti</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-2'>∞</div>
              <div className='text-purple-200'>Olasılık</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
