'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Bug, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';

// Error Types
export type ErrorType = 'network' | 'server' | 'client' | 'auth' | 'validation' | 'unknown';

// Error Severity
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

interface ErrorInfo {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  details?: string;
  code?: string;
  retryable: boolean;
}

// Error Detection
export function detectErrorType(error: Error): ErrorInfo {
  const message = error.message.toLowerCase();

  if (message.includes('network') || message.includes('fetch')) {
    return {
      type: 'network',
      severity: 'medium',
      message: 'Bağlantı hatası',
      details: 'İnternet bağlantınızı kontrol edin',
      retryable: true,
    };
  }

  if (message.includes('unauthorized') || message.includes('auth')) {
    return {
      type: 'auth',
      severity: 'high',
      message: 'Yetkilendirme hatası',
      details: 'Lütfen tekrar giriş yapın',
      retryable: false,
    };
  }

  if (message.includes('validation') || message.includes('invalid')) {
    return {
      type: 'validation',
      severity: 'low',
      message: 'Geçersiz veri',
      details: 'Lütfen girdiğiniz bilgileri kontrol edin',
      retryable: false,
    };
  }

  if (message.includes('server') || message.includes('500')) {
    return {
      type: 'server',
      severity: 'high',
      message: 'Sunucu hatası',
      details: 'Sunucumuzda bir sorun oluştu',
      retryable: true,
    };
  }

  return {
    type: 'unknown',
    severity: 'medium',
    message: 'Beklenmeyen hata',
    details: 'Bir sorun oluştu',
    retryable: true,
  };
}

// Enhanced Error Component
interface EnhancedErrorProps {
  error: Error;
  reset?: () => void;
  showDetails?: boolean;
  customActions?: React.ReactNode;
}

export function EnhancedError({
  error,
  reset,
  showDetails = false,
  customActions,
}: EnhancedErrorProps) {
  const [isOnline, setIsOnline] = useState(true);
  const errorInfo = detectErrorType(error);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getErrorIcon = () => {
    if (!isOnline) {
      return <WifiOff className='w-8 h-8 text-red-400' />;
    }
    if (errorInfo.type === 'network') {
      return <Wifi className='w-8 h-8 text-yellow-400' />;
    }
    if (errorInfo.type === 'auth') {
      return <AlertTriangle className='w-8 h-8 text-red-400' />;
    }
    return <Bug className='w-8 h-8 text-red-400' />;
  };

  const getErrorColor = () => {
    switch (errorInfo.severity) {
      case 'low':
        return 'border-yellow-500/20 bg-yellow-500/10';
      case 'medium':
        return 'border-orange-500/20 bg-orange-500/10';
      case 'high':
        return 'border-red-500/20 bg-red-500/10';
      case 'critical':
        return 'border-red-600/20 bg-red-600/10';
      default:
        return 'border-red-500/20 bg-red-500/10';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div
        className={`max-w-md w-full backdrop-blur-md rounded-2xl p-8 border ${getErrorColor()} text-center`}
      >
        <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
          {getErrorIcon()}
        </div>

        <h1 className='text-2xl font-bold text-white mb-4'>{errorInfo.message}</h1>

        <p className='text-gray-300 mb-6'>{errorInfo.details}</p>

        {!isOnline && (
          <div className='bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6'>
            <p className='text-yellow-200 text-sm'>
              İnternet bağlantınız kesilmiş görünüyor. Bağlantınızı kontrol edin.
            </p>
          </div>
        )}

        {showDetails && (
          <details className='text-left mb-6'>
            <summary className='text-gray-400 text-sm cursor-pointer hover:text-white'>
              Teknik Detaylar
            </summary>
            <div className='mt-2 p-3 bg-black/20 rounded text-xs text-gray-400 font-mono'>
              <p>
                <strong>Hata:</strong> {error.message}
              </p>
              <p>
                <strong>Tip:</strong> {errorInfo.type}
              </p>
              <p>
                <strong>Önem:</strong> {errorInfo.severity}
              </p>
              {error.stack && (
                <pre className='mt-2 text-xs overflow-auto max-h-32'>{error.stack}</pre>
              )}
            </div>
          </details>
        )}

        <div className='flex flex-col sm:flex-row gap-3'>
          {errorInfo.retryable && reset && (
            <Button onClick={reset} className='bg-purple-600 hover:bg-purple-700 text-white'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Tekrar Dene
            </Button>
          )}

          {customActions || (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Network Error Component
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-yellow-500/10 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/20 text-center'>
        <div className='w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
          <WifiOff className='w-8 h-8 text-yellow-400' />
        </div>

        <h1 className='text-2xl font-bold text-white mb-4'>Bağlantı Sorunu</h1>

        <p className='text-gray-300 mb-6'>İnternet bağlantınızı kontrol edin ve tekrar deneyin.</p>

        <div className='flex flex-col sm:flex-row gap-3'>
          {onRetry && (
            <Button onClick={onRetry} className='bg-yellow-600 hover:bg-yellow-700 text-white'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Tekrar Dene
            </Button>
          )}

          <Button
            onClick={() => window.location.reload()}
            variant='outline'
            className='border-white/20 text-white hover:bg-white/10'
          >
            Sayfayı Yenile
          </Button>
        </div>
      </div>
    </div>
  );
}

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || EnhancedError;
      return (
        <FallbackComponent
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

// Error Toast
export function ErrorToast({ error, onDismiss }: { error: Error; onDismiss: () => void }) {
  const errorInfo = detectErrorType(error);

  return (
    <div className='fixed top-4 right-4 z-50 max-w-sm'>
      <div className='bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <AlertTriangle className='w-5 h-5 text-red-400 mt-0.5' />
          <div className='flex-1'>
            <h4 className='text-white font-semibold text-sm'>{errorInfo.message}</h4>
            <p className='text-gray-300 text-xs mt-1'>{errorInfo.details}</p>
          </div>
          <button onClick={onDismiss} className='text-gray-400 hover:text-white'>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
