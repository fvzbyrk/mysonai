import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Giriş Hatası
        </h1>
        
        <p className="text-gray-600 mb-6">
          Google ile giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/tr/signin"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors inline-block"
          >
            Tekrar Dene
          </Link>
          
          <Link
            href="/tr"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Sorun devam ederse lütfen{' '}
            <Link href="/tr/contact" className="text-blue-600 hover:underline">
              destek ekibimizle
            </Link>{' '}
            iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}
