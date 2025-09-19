import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap, Crown, Lock } from 'lucide-react';
import Link from 'next/link';
import { getStripe } from '@/lib/stripe';

interface UsageEnforcementProps {
  usage: any;
  plan: string;
  onUpgrade?: () => void;
}

export function UsageEnforcement({ usage, plan, onUpgrade }: UsageEnforcementProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isNearLimit = (used: number, limit: number) => {
    if (limit === -1) {
      return false;
    } // unlimited
    return used >= limit * 0.8; // 80% of limit
  };

  const isOverLimit = (used: number, limit: number) => {
    if (limit === -1) {
      return false;
    } // unlimited
    return used >= limit;
  };

  const handleUpgrade = async (targetPlan: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: targetPlan,
          userId: usage.userId,
        }),
      });

      const { sessionId } = await response.json();

      if (sessionId) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if any limits are exceeded
  const messagesOverLimit = isOverLimit(usage.totalMessages, usage.monthlyLimit.messages);
  const tokensOverLimit = isOverLimit(usage.totalTokens, usage.monthlyLimit.tokens);
  const imagesOverLimit = isOverLimit(usage.imagesGenerated, usage.monthlyLimit.images);

  const messagesNearLimit = isNearLimit(usage.totalMessages, usage.monthlyLimit.messages);
  const tokensNearLimit = isNearLimit(usage.totalTokens, usage.monthlyLimit.tokens);
  const imagesNearLimit = isNearLimit(usage.imagesGenerated, usage.monthlyLimit.images);

  const hasAnyOverLimit = messagesOverLimit || tokensOverLimit || imagesOverLimit;
  const hasAnyNearLimit = messagesNearLimit || tokensNearLimit || imagesNearLimit;

  if (plan === 'enterprise') {
    return null; // No limits for enterprise
  }

  return (
    <div className='space-y-4'>
      {/* Over Limit Warning */}
      {hasAnyOverLimit && (
        <Card className='bg-red-500/10 backdrop-blur-md border-red-500/20'>
          <CardHeader>
            <CardTitle className='text-red-400 flex items-center'>
              <Lock className='w-5 h-5 mr-2' />
              Limit Aşıldı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2 text-red-300'>
              {messagesOverLimit && (
                <p>
                  • Mesaj limitiniz aşıldı ({usage.totalMessages}/{usage.monthlyLimit.messages})
                </p>
              )}
              {tokensOverLimit && (
                <p>
                  • Token limitiniz aşıldı ({usage.totalTokens}/{usage.monthlyLimit.tokens})
                </p>
              )}
              {imagesOverLimit && (
                <p>
                  • Görsel limitiniz aşıldı ({usage.imagesGenerated}/{usage.monthlyLimit.images})
                </p>
              )}
            </div>
            <div className='mt-4 space-y-2'>
              <Button
                onClick={() => handleUpgrade(plan === 'free' ? 'pro' : 'enterprise')}
                disabled={loading}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              >
                <Crown className='w-4 h-4 mr-2' />
                {loading ? 'Yükleniyor...' : 'Planı Yükselt'}
              </Button>
              <p className='text-xs text-red-400 text-center'>
                Limit aşıldığında yeni özellikler kullanılamaz
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Near Limit Warning */}
      {!hasAnyOverLimit && hasAnyNearLimit && (
        <Card className='bg-yellow-500/10 backdrop-blur-md border-yellow-500/20'>
          <CardHeader>
            <CardTitle className='text-yellow-400 flex items-center'>
              <AlertTriangle className='w-5 h-5 mr-2' />
              Limit Yaklaşıyor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2 text-yellow-300'>
              {messagesNearLimit && (
                <p>
                  • Mesaj limitinizin %80'i doldu ({usage.totalMessages}/
                  {usage.monthlyLimit.messages})
                </p>
              )}
              {tokensNearLimit && (
                <p>
                  • Token limitinizin %80'i doldu ({usage.totalTokens}/{usage.monthlyLimit.tokens})
                </p>
              )}
              {imagesNearLimit && (
                <p>
                  • Görsel limitinizin %80'i doldu ({usage.imagesGenerated}/
                  {usage.monthlyLimit.images})
                </p>
              )}
            </div>
            <div className='mt-4 space-y-2'>
              <Button
                onClick={() => handleUpgrade(plan === 'free' ? 'pro' : 'enterprise')}
                disabled={loading}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              >
                <Zap className='w-4 h-4 mr-2' />
                {loading ? 'Yükleniyor...' : 'Planı Yükselt'}
              </Button>
              <Link href='/pricing' className='block'>
                <Button variant='outline' className='w-full border-yellow-500/50 text-yellow-400'>
                  Tüm Planları Gör
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upgrade Suggestion for Free Users */}
      {plan === 'free' && !hasAnyNearLimit && !hasAnyOverLimit && (
        <Card className='bg-purple-500/10 backdrop-blur-md border-purple-500/20'>
          <CardHeader>
            <CardTitle className='text-purple-400 flex items-center'>
              <Crown className='w-5 h-5 mr-2' />
              Daha Fazla Güç İster misiniz?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <p className='text-purple-300 text-sm'>
                Pro plan ile sınırsız AI asistan erişimi ve 10x daha fazla kullanım hakkı kazanın!
              </p>
              <div className='space-y-2'>
                <Button
                  onClick={() => handleUpgrade('pro')}
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                >
                  <Zap className='w-4 h-4 mr-2' />
                  {loading ? 'Yükleniyor...' : "Pro'ya Geç - 99₺/ay"}
                </Button>
                <Link href='/pricing' className='block'>
                  <Button variant='outline' className='w-full border-purple-500/50 text-purple-400'>
                    Tüm Planları Karşılaştır
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
