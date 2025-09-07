'use client';

import { useState } from 'react';
import { usePayment } from '@/hooks/usePayment';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Crown,
  Zap,
  Star,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { PlanType, PLANS } from '@/lib/stripe';

interface PaymentManagerProps {
  className?: string;
}

export function PaymentManager({ className }: PaymentManagerProps) {
  const { enabled: billingEnabled } = useFeatureFlag('billing');
  const {
    loading,
    error,
    subscription,
    redirectToCheckout,
    cancelSubscription,
    resumeSubscription,
    redirectToBillingPortal,
    getPlanInfo,
    canUpgrade,
    canDowngrade,
  } = usePayment();

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  if (!billingEnabled) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <CreditCard className='w-5 h-5 mr-2' />
            Ödeme Sistemi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-gray-500'>Ödeme sistemi şu anda devre dışı.</p>
        </CardContent>
      </Card>
    );
  }

  const handleUpgrade = async (plan: PlanType) => {
    setActionLoading(`upgrade-${plan}`);
    await redirectToCheckout(plan);
    setActionLoading(null);
  };

  const handleCancel = async () => {
    setActionLoading('cancel');
    await cancelSubscription();
    setActionLoading(null);
  };

  const handleResume = async () => {
    setActionLoading('resume');
    await resumeSubscription();
    setActionLoading(null);
  };

  const handleBillingPortal = async () => {
    setActionLoading('billing');
    await redirectToBillingPortal();
    setActionLoading(null);
  };

  const getPlanIcon = (plan: PlanType) => {
    switch (plan) {
      case 'free':
        return <Crown className='w-4 h-4' />;
      case 'pro':
        return <Zap className='w-4 h-4' />;
      case 'enterprise':
        return <Star className='w-4 h-4' />;
    }
  };

  const getPlanColor = (plan: PlanType) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
      case 'pro':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className={className}>
      {/* Current Plan Status */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span className='flex items-center'>
              <CreditCard className='w-5 h-5 mr-2' />
              Mevcut Plan
            </span>
            {subscription && (
              <Badge
                variant={subscription.status === 'active' ? 'default' : 'secondary'}
                className={
                  subscription.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              >
                {subscription.status === 'active' ? (
                  <>
                    <CheckCircle className='w-3 h-3 mr-1' /> Aktif
                  </>
                ) : (
                  <>
                    <AlertCircle className='w-3 h-3 mr-1' /> Beklemede
                  </>
                )}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='w-6 h-6 animate-spin' />
            </div>
          ) : error ? (
            <div className='flex items-center text-red-600'>
              <XCircle className='w-4 h-4 mr-2' />
              {error}
            </div>
          ) : (
            <div className='space-y-4'>
              {/* Plan Info */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className={`p-2 rounded-full ${getPlanColor(subscription?.plan || 'free')}`}>
                    {getPlanIcon(subscription?.plan || 'free')}
                  </div>
                  <div>
                    <h3 className='font-semibold'>
                      {getPlanInfo(subscription?.plan || 'free').name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {subscription?.plan === 'free'
                        ? 'Ücretsiz'
                        : `${getPlanInfo(subscription?.plan || 'free').price / 100}₺/ay`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              {subscription && subscription.plan !== 'free' && (
                <div className='space-y-2 pt-4 border-t'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='flex items-center'>
                      <Calendar className='w-4 h-4 mr-2' />
                      Sonraki ödeme
                    </span>
                    <span>
                      {new Date(subscription.current_period_end * 1000).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  {subscription.cancel_at_period_end && (
                    <div className='flex items-center text-yellow-600 text-sm'>
                      <AlertCircle className='w-4 h-4 mr-2' />
                      Dönem sonunda iptal edilecek
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Yönetimi</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Upgrade Options */}
          <div className='space-y-3'>
            <h4 className='font-medium'>Plan Yükseltme</h4>

            {canUpgrade('pro') && (
              <div className='flex items-center justify-between p-3 border rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <Zap className='w-4 h-4 text-blue-600' />
                  <div>
                    <p className='font-medium'>Pro Plan</p>
                    <p className='text-sm text-gray-500'>99₺/ay - Profesyonel özellikler</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleUpgrade('pro')}
                  disabled={actionLoading === 'upgrade-pro'}
                  size='sm'
                >
                  {actionLoading === 'upgrade-pro' ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    'Yükselt'
                  )}
                </Button>
              </div>
            )}

            {canUpgrade('enterprise') && (
              <div className='flex items-center justify-between p-3 border rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <Star className='w-4 h-4 text-purple-600' />
                  <div>
                    <p className='font-medium'>Enterprise Plan</p>
                    <p className='text-sm text-gray-500'>299₺/ay - Sınırsız özellikler</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleUpgrade('enterprise')}
                  disabled={actionLoading === 'upgrade-enterprise'}
                  size='sm'
                >
                  {actionLoading === 'upgrade-enterprise' ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    'Yükselt'
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Subscription Management */}
          {subscription && subscription.plan !== 'free' && (
            <div className='space-y-3 pt-4 border-t'>
              <h4 className='font-medium'>Abonelik Yönetimi</h4>

              <div className='flex space-x-2'>
                {subscription.cancel_at_period_end ? (
                  <Button
                    onClick={handleResume}
                    disabled={actionLoading === 'resume'}
                    variant='outline'
                    size='sm'
                  >
                    {actionLoading === 'resume' ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      'Aboneliği Devam Ettir'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCancel}
                    disabled={actionLoading === 'cancel'}
                    variant='outline'
                    size='sm'
                    className='border-red-200 text-red-600 hover:bg-red-50'
                  >
                    {actionLoading === 'cancel' ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      'Aboneliği İptal Et'
                    )}
                  </Button>
                )}

                <Button
                  onClick={handleBillingPortal}
                  disabled={actionLoading === 'billing'}
                  variant='outline'
                  size='sm'
                >
                  {actionLoading === 'billing' ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <>
                      <DollarSign className='w-4 h-4 mr-2' />
                      Fatura Yönetimi
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
