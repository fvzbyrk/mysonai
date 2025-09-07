'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center'>
        <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
          <Search className='w-8 h-8 text-purple-400' />
        </div>

        <h1 className='text-2xl font-bold text-white mb-4'>Sayfa Bulunamadı</h1>

        <p className='text-gray-300 mb-6'>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>

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
      </div>
    </div>
  );
}
