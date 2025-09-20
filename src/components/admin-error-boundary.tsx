'use client';

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  RefreshCw, 
  Settings, 
  Database,
  AlertTriangle
} from 'lucide-react';

interface AdminErrorBoundaryProps {
  children: React.ReactNode;
  section?: string;
}

export function AdminErrorBoundary({ children, section = 'Admin Panel' }: AdminErrorBoundaryProps) {
  const customFallback = (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6'>
      <Card className='bg-white/10 backdrop-blur-md border-white/20 max-w-xl w-full'>
        <div className='p-8 text-center space-y-6'>
          {/* Admin Icon */}
          <div className='flex justify-center'>
            <div className='w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center'>
              <Shield className='w-8 h-8 text-red-400' />
            </div>
          </div>

          {/* Error Badge */}
          <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>
            Admin Panel Hatası
          </Badge>

          {/* Error Message */}
          <div>
            <h1 className='text-2xl font-bold text-white mb-2'>
              Admin Panel Hatası
            </h1>
            <p className='text-gray-300'>
              {section} bölümünde beklenmeyen bir hata oluştu. 
              Bu hata admin yetkilerinizi etkilemez ve sistem güvenliği korunmaktadır.
            </p>
          </div>

          {/* Admin Actions */}
          <div className='bg-white/5 rounded-lg p-4 space-y-3'>
            <h3 className='text-white font-semibold'>Admin Eylemleri:</h3>
            <div className='flex flex-col sm:flex-row gap-2 justify-center'>
              <Button
                onClick={() => window.location.reload()}
                className='bg-blue-600 hover:bg-blue-700 text-white'
                size='sm'
              >
                <RefreshCw className='w-4 h-4 mr-2' />
                Sayfayı Yenile
              </Button>
              
              <Button
                onClick={() => window.location.href = '/tr/admin'}
                variant='outline'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                size='sm'
              >
                <Settings className='w-4 h-4 mr-2' />
                Dashboard'a Dön
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className='bg-green-900/20 border border-green-500/30 rounded-lg p-4'>
            <div className='flex items-center justify-center text-green-400 mb-2'>
              <Database className='w-4 h-4 mr-2' />
              Sistem Durumu
            </div>
            <div className='space-y-1 text-sm text-gray-300'>
              <div className='flex justify-between'>
                <span>Veritabanı:</span>
                <span className='text-green-400'>Bağlı</span>
              </div>
              <div className='flex justify-between'>
                <span>API Servisleri:</span>
                <span className='text-green-400'>Aktif</span>
              </div>
              <div className='flex justify-between'>
                <span>Admin Yetkileri:</span>
                <span className='text-green-400'>Korunuyor</span>
              </div>
            </div>
          </div>

          {/* Error Reporting */}
          <div className='pt-4 border-t border-white/20'>
            <p className='text-gray-400 text-sm'>
              Bu hata otomatik olarak sistem yöneticilerine raporlandı. 
              Sorun devam ederse{' '}
              <a 
                href='mailto:admin@mysonai.com'
                className='text-blue-400 hover:text-blue-300'
              >
                admin@mysonai.com
              </a>{' '}
              adresine bildirin.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <ErrorBoundary
      level='page'
      fallback={customFallback}
      onError={(error, errorInfo) => {
        // Admin-specific error logging
        console.error(`Admin Panel Error in ${section}:`, error, errorInfo);
        
        // Send to admin error reporting
        if (process.env.NODE_ENV === 'production') {
          fetch('/api/admin/errors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              section,
              message: error.message,
              stack: error.stack,
              componentStack: errorInfo.componentStack,
              timestamp: new Date().toISOString(),
              url: window.location.href,
              userAgent: navigator.userAgent,
            }),
          }).catch(console.error);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Specific error boundaries for different admin sections
export function PagesErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <AdminErrorBoundary section='Sayfa Yönetimi'>
      {children}
    </AdminErrorBoundary>
  );
}

export function UsersErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <AdminErrorBoundary section='Kullanıcı Yönetimi'>
      {children}
    </AdminErrorBoundary>
  );
}

export function AnalyticsErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <AdminErrorBoundary section='Analitik'>
      {children}
    </AdminErrorBoundary>
  );
}

export function SettingsErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <AdminErrorBoundary section='Ayarlar'>
      {children}
    </AdminErrorBoundary>
  );
}
