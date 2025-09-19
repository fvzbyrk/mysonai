'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft, MapPin, Clock } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center'>
        <div className='w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
          <Search className='w-10 h-10 text-purple-400' />
        </div>

        <h1 className='text-3xl font-bold text-white mb-4'>404 - Sayfa Bulunamadı</h1>

        <p className='text-gray-300 mb-6'>
          Aradığınız sayfa mevcut değil, taşınmış veya geçici olarak erişilemez durumda olabilir.
        </p>

        {/* Helpful suggestions */}
        <div className='bg-white/5 rounded-lg p-4 mb-6 text-left'>
          <h3 className='text-white font-semibold mb-3 flex items-center'>
            <MapPin className='w-4 h-4 mr-2' />
            Ne yapabilirsiniz?
          </h3>
          <ul className='text-gray-300 text-sm space-y-2'>
            <li>• URL'yi kontrol edin ve yazım hatası olup olmadığını kontrol edin</li>
            <li>• Ana sayfaya dönüp aradığınız içeriği bulun</li>
            <li>• Arama özelliğini kullanarak içerik arayın</li>
            <li>• Geri dönüp önceki sayfaya gidin</li>
          </ul>
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Link href='/'>
            <Button className='bg-purple-600 hover:bg-purple-700 text-white'>
              <Home className='w-4 h-4 mr-2' />
              Ana Sayfa
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant='outline'
            className='border-white/20 text-white hover:bg-white/10'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Geri Dön
          </Button>
        </div>

        {/* Additional help */}
        <div className='mt-6 pt-6 border-t border-white/10'>
          <p className='text-gray-400 text-sm mb-2'>Sorun devam ederse bizimle iletişime geçin</p>
          <Link href='/contact' className='text-purple-400 hover:text-purple-300 text-sm underline'>
            İletişim Sayfası
          </Link>
        </div>
      </div>
    </div>
  );
}
