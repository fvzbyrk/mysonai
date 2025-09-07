'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
// import { LiveChat } from './live-chat';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';

interface AIDemoProps {
  locale: Locale;
}

export function AIDemo({ locale }: AIDemoProps) {
  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Canlı AI Asistanlarınızla Sohbet Edin
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Türkçe AI asistanlarımızla gerçek zamanlı olarak sohbet edin. Hemen deneyin!
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Live Chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <LiveChat />
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <div className='space-y-6'>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                AI Asistanlarınız
              </h3>

              <div className='space-y-4'>
                {[
                  { name: t(locale, 'agents.fevzi'), role: t(locale, 'agents.fevziRole'), desc: t(locale, 'agents.fevziDesc') },
                  {
                    name: t(locale, 'agents.elif'),
                    role: t(locale, 'agents.elifRole'),
                    desc: t(locale, 'agents.elifDesc'),
                  },
                  { name: t(locale, 'agents.burak'), role: t(locale, 'agents.burakRole'), desc: t(locale, 'agents.burakDesc') },
                  { name: t(locale, 'agents.ayse'), role: t(locale, 'agents.ayseRole'), desc: t(locale, 'agents.ayseDesc') },
                  { name: t(locale, 'agents.deniz'), role: t(locale, 'agents.denizRole'), desc: t(locale, 'agents.denizDesc') },
                ].map((agent, index) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'
                  >
                    <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-bold'>{agent.name[0]}</span>
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900 dark:text-white'>{agent.name}</h4>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>{agent.role}</p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>{agent.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white'>
              <h4 className='text-xl font-bold mb-2'>Daha Fazla Özellik</h4>
              <p className='text-purple-100 mb-4'>
                Tam özellikli demo için demo sayfasını ziyaret edin.
              </p>
              <Button variant='secondary' className='bg-white text-purple-600 hover:bg-gray-100'>
                <Link href='/demo' className='flex items-center'>
                  <Play className='mr-2 h-4 w-4' />
                  Tam Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
