'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Bir Hata Oluştu
        </h1>
        
        <p className="text-gray-300 mb-6">
          Üzgünüz, bir hata oluştu. Lütfen tekrar deneyin veya sayfayı yenileyin.
        </p>
        
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Hata Kodu: {error.digest}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={reset}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tekrar Dene
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </div>
  )
}

