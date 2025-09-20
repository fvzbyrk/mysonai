'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Mail,
  Copy,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  level?: 'page' | 'component' | 'critical';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  isReporting: boolean;
  isReported: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      isReporting: false,
      isReported: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Error logging
    this.logError(error, errorInfo);
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  private logError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      const errorData = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        level: this.props.level || 'component',
      };

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('ErrorBoundary caught an error:', errorData);
      }

      // Send to error reporting service (Sentry, LogRocket, etc.)
      if (process.env.NODE_ENV === 'production') {
        await this.reportError(errorData);
      }
    } catch (reportingError) {
      console.error('Failed to log error:', reportingError);
    }
  };

  private reportError = async (errorData: any) => {
    try {
      // Replace with your error reporting service
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });

      if (response.ok) {
        this.setState({ isReported: true });
      }
    } catch (error) {
      console.error('Failed to report error:', error);
    }
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      isReported: false,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private copyErrorDetails = () => {
    const errorDetails = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
  };

  private getErrorLevelColor = () => {
    switch (this.props.level) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'page':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'component':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  private getErrorLevelText = () => {
    switch (this.props.level) {
      case 'critical':
        return 'Kritik Hata';
      case 'page':
        return 'Sayfa Hatası';
      case 'component':
        return 'Bileşen Hatası';
      default:
        return 'Hata';
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={cn(
          'min-h-screen flex items-center justify-center p-6',
          this.props.level === 'critical' 
            ? 'bg-gradient-to-br from-red-900 via-red-800 to-red-900'
            : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
        )}>
          <Card className='bg-white/10 backdrop-blur-md border-white/20 max-w-2xl w-full'>
            <div className='p-8 text-center space-y-6'>
              {/* Error Icon */}
              <div className='flex justify-center'>
                <div className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center',
                  this.props.level === 'critical' 
                    ? 'bg-red-500/20 border-2 border-red-500/50'
                    : 'bg-yellow-500/20 border-2 border-yellow-500/50'
                )}>
                  <AlertTriangle className={cn(
                    'w-8 h-8',
                    this.props.level === 'critical' ? 'text-red-400' : 'text-yellow-400'
                  )} />
                </div>
              </div>

              {/* Error Level Badge */}
              <Badge className={this.getErrorLevelColor()}>
                {this.getErrorLevelText()}
              </Badge>

              {/* Error Message */}
              <div>
                <h1 className='text-2xl font-bold text-white mb-2'>
                  {this.props.level === 'critical' 
                    ? 'Kritik Bir Hata Oluştu'
                    : 'Bir Hata Oluştu'
                  }
                </h1>
                <p className='text-gray-300'>
                  {this.props.level === 'critical'
                    ? 'Sistemde kritik bir hata meydana geldi. Lütfen sayfayı yenileyin veya ana sayfaya dönün.'
                    : 'Beklenmeyen bir hata oluştu. Sorunu çözmek için aşağıdaki seçenekleri deneyebilirsiniz.'
                  }
                </p>
              </div>

              {/* Error ID */}
              <div className='bg-white/5 rounded-lg p-4'>
                <p className='text-gray-400 text-sm mb-2'>Hata ID:</p>
                <code className='text-blue-400 font-mono text-sm'>
                  {this.state.errorId}
                </code>
              </div>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.props.showDetails && (
                <div className='bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left'>
                  <h3 className='text-red-400 font-semibold mb-2'>Hata Detayları:</h3>
                  <pre className='text-red-300 text-xs overflow-auto max-h-40'>
                    {this.state.error?.stack}
                  </pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                <Button
                  onClick={this.handleRetry}
                  className='bg-blue-600 hover:bg-blue-700 text-white'
                >
                  <RefreshCw className='w-4 h-4 mr-2' />
                  Tekrar Dene
                </Button>
                
                <Button
                  onClick={this.handleReload}
                  variant='outline'
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  <RefreshCw className='w-4 h-4 mr-2' />
                  Sayfayı Yenile
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant='outline'
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  <Home className='w-4 h-4 mr-2' />
                  Ana Sayfa
                </Button>
              </div>

              {/* Error Reporting */}
              <div className='pt-4 border-t border-white/20'>
                <div className='flex items-center justify-center space-x-4 text-sm text-gray-400'>
                  {this.state.isReported ? (
                    <div className='flex items-center text-green-400'>
                      <CheckCircle className='w-4 h-4 mr-1' />
                      Hata raporlandı
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <Bug className='w-4 h-4 mr-1' />
                      Hata otomatik raporlandı
                    </div>
                  )}
                  
                  <button
                    onClick={this.copyErrorDetails}
                    className='flex items-center hover:text-white transition-colors'
                  >
                    <Copy className='w-4 h-4 mr-1' />
                    Detayları Kopyala
                  </button>
                </div>
              </div>

              {/* Contact Support */}
              <div className='pt-2'>
                <p className='text-gray-400 text-sm'>
                  Sorun devam ederse{' '}
                  <a 
                    href='mailto:support@mysonai.com'
                    className='text-blue-400 hover:text-blue-300 flex items-center justify-center'
                  >
                    <Mail className='w-4 h-4 mr-1' />
                    destek ekibimizle iletişime geçin
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    // Log error
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // Report error
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          url: window.location.href,
        }),
      }).catch(console.error);
    }
  };
}
