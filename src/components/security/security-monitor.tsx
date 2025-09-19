'use client';

import { useState } from 'react';
import { useSecurity } from '@/hooks/useSecurity';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Activity,
  Zap,
  Bot,
  Info,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityMonitorProps {
  showDetails?: boolean;
  enableAlerts?: boolean;
  enableBlocking?: boolean;
  className?: string;
}

export function SecurityMonitor({
  showDetails = false,
  enableAlerts = true,
  enableBlocking = true,
  className,
}: SecurityMonitorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    securityScore,
    threats,
    isSecure,
    securityEvents,
    rateLimitStatus,
    suspiciousActivity,
    botDetection,
    clearSecurityEvents,
    getSecurityReport,
  } = useSecurity();

  // Get security status
  const getSecurityStatus = () => {
    if (securityScore >= 90) {
      return { status: 'excellent', color: 'text-green-500', icon: CheckCircle };
    }
    if (securityScore >= 70) {
      return { status: 'good', color: 'text-yellow-500', icon: AlertTriangle };
    }
    if (securityScore >= 50) {
      return { status: 'fair', color: 'text-orange-500', icon: AlertTriangle };
    }
    return { status: 'poor', color: 'text-red-500', icon: XCircle };
  };

  const securityStatus = getSecurityStatus();

  return (
    <div className={cn('space-y-4', className)}>
      <Card className='bg-white/10 backdrop-blur-md border-white/20'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mr-4',
                  securityStatus.status === 'excellent'
                    ? 'bg-green-500/20'
                    : securityStatus.status === 'good'
                      ? 'bg-yellow-500/20'
                      : securityStatus.status === 'fair'
                        ? 'bg-orange-500/20'
                        : 'bg-red-500/20'
                )}
              >
                <securityStatus.icon className={cn('w-6 h-6', securityStatus.color)} />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white'>Güvenlik Durumu</h3>
                <p className='text-gray-300'>Skor: {securityScore}/100</p>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Badge
                className={cn(
                  securityStatus.status === 'excellent'
                    ? 'bg-green-500'
                    : securityStatus.status === 'good'
                      ? 'bg-yellow-500'
                      : securityStatus.status === 'fair'
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                )}
              >
                {securityStatus.status === 'excellent'
                  ? 'Mükemmel'
                  : securityStatus.status === 'good'
                    ? 'İyi'
                    : securityStatus.status === 'fair'
                      ? 'Orta'
                      : 'Kötü'}
              </Badge>

              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant='ghost'
                size='sm'
                className='text-white hover:bg-white/10'
              >
                {isExpanded ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </Button>
            </div>
          </div>

          {/* Security Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-white'>{threats.length}</div>
              <div className='text-sm text-gray-300'>Tehdit</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-white'>{securityEvents.length}</div>
              <div className='text-sm text-gray-300'>Olay</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-white'>{suspiciousActivity.length}</div>
              <div className='text-sm text-gray-300'>Şüpheli</div>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-white'>{rateLimitStatus.requests}</div>
              <div className='text-sm text-gray-300'>İstek</div>
            </div>
          </div>

          {/* Bot Detection */}
          {botDetection.isBot && (
            <div className='mb-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30'>
              <div className='flex items-center'>
                <Bot className='w-5 h-5 text-yellow-400 mr-2' />
                <span className='text-yellow-300 font-semibold'>Bot Tespit Edildi</span>
              </div>
              <p className='text-yellow-200 text-sm mt-1'>
                Güven: %{Math.round(botDetection.confidence * 100)}
              </p>
            </div>
          )}

          {/* Rate Limit Status */}
          {rateLimitStatus.blocked && (
            <div className='mb-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30'>
              <div className='flex items-center'>
                <Zap className='w-5 h-5 text-red-400 mr-2' />
                <span className='text-red-300 font-semibold'>Rate Limit Aşıldı</span>
              </div>
              <p className='text-red-200 text-sm mt-1'>
                {rateLimitStatus.requests}/{rateLimitStatus.limit} istek
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex space-x-2'>
            <Button
              onClick={clearSecurityEvents}
              variant='outline'
              size='sm'
              className='border-white/20 text-white hover:bg-white/10'
            >
              <X className='w-4 h-4 mr-2' />
              Temizle
            </Button>

            <Button
              onClick={() => console.log(getSecurityReport())}
              variant='outline'
              size='sm'
              className='border-white/20 text-white hover:bg-white/10'
            >
              <Activity className='w-4 h-4 mr-2' />
              Rapor
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
