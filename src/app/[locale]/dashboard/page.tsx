import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const supabase = createServerSupabaseClient();

  // Kullanıcı oturumunu kontrol et
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(`/${params.locale}/signin`);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Hoş Geldiniz, {user.email}!</h1>
              <p className='text-gray-600 mt-2'>MySonAI Dashboard'ınıza hoş geldiniz</p>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='text-right'>
                <p className='text-sm text-gray-500'>Kullanıcı ID</p>
                <p className='text-sm font-mono text-gray-700'>{user.id.slice(0, 8)}...</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-lg'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Toplam Sohbet</p>
                <p className='text-2xl font-bold text-gray-900'>0</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-green-100 rounded-lg'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Başarılı İşlem</p>
                <p className='text-2xl font-bold text-gray-900'>0</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-purple-100 rounded-lg'>
                <svg
                  className='w-6 h-6 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Kullanılan Token</p>
                <p className='text-2xl font-bold text-gray-900'>0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Hızlı İşlemler</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <a
              href={`/${params.locale}/demo`}
              className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='p-2 bg-blue-100 rounded-lg mr-3'>
                <svg
                  className='w-5 h-5 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>Demo Sohbet</p>
                <p className='text-sm text-gray-600'>AI asistanlarla sohbet et</p>
              </div>
            </a>

            <a
              href={`/${params.locale}/assistants`}
              className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='p-2 bg-green-100 rounded-lg mr-3'>
                <svg
                  className='w-5 h-5 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>Asistanlar</p>
                <p className='text-sm text-gray-600'>18 uzman AI asistan</p>
              </div>
            </a>

            <a
              href={`/${params.locale}/pricing`}
              className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='p-2 bg-purple-100 rounded-lg mr-3'>
                <svg
                  className='w-5 h-5 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>Fiyatlandırma</p>
                <p className='text-sm text-gray-600'>Plan seçenekleri</p>
              </div>
            </a>

            <a
              href={`/${params.locale}/contact`}
              className='flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='p-2 bg-orange-100 rounded-lg mr-3'>
                <svg
                  className='w-5 h-5 text-orange-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>İletişim</p>
                <p className='text-sm text-gray-600'>Destek ve yardım</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Son Aktiviteler</h2>
          <div className='text-center py-8'>
            <svg
              className='w-12 h-12 text-gray-400 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
            <p className='text-gray-500'>Henüz aktivite yok</p>
            <p className='text-sm text-gray-400 mt-1'>AI asistanlarla sohbet etmeye başlayın</p>
          </div>
        </div>
      </div>
    </div>
  );
}
