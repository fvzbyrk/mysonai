'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getStripe } from '@/lib/stripe';

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  period_start: number;
  period_end: number;
  invoice_pdf?: string;
}

interface Subscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: string;
}

export default function BillingPage() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubscription();
      fetchInvoices();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/subscription?userId=${user?.id}`);
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const response = await fetch(`/api/billing/invoices?userId=${user?.id}`);
      const data = await response.json();
      setInvoices(data.invoices || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan: string) => {
    if (!user) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          userId: user.id,
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Ödendi</Badge>;
      case 'open':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Beklemede</Badge>
        );
      case 'void':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>İptal</Badge>;
      case 'uncollectible':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Ödenmedi</Badge>;
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
        <div className='max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center'>
          <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
            <User className='w-8 h-8 text-purple-400' />
          </div>
          <h1 className='text-2xl font-bold text-white mb-4'>Giriş Yapın</h1>
          <p className='text-gray-300 mb-6'>
            Fatura yönetimine erişmek için giriş yapmanız gerekiyor.
          </p>
          <Link href='/signin'>
            <Button className='bg-gradient-to-r from-purple-600 to-pink-600 text-white'>
              Giriş Yap
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Header */}
      <header className='bg-black/20 backdrop-blur-md border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/dashboard' className='text-purple-400 hover:text-purple-300'>
                <ArrowLeft className='w-6 h-6' />
              </Link>
              <div>
                <h1 className='text-xl font-bold text-white'>Fatura Yönetimi</h1>
                <p className='text-sm text-gray-300'>Abonelik ve ödeme bilgileriniz</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Subscription Info */}
          <div className='lg:col-span-2 space-y-6'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20'>
              <CardHeader>
                <CardTitle className='text-white flex items-center'>
                  <CreditCard className='w-5 h-5 mr-2 text-purple-400' />
                  Mevcut Abonelik
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {subscription ? (
                  <>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-white font-medium capitalize'>
                          {subscription.plan} Plan
                        </p>
                        <p className='text-gray-400 text-sm'>
                          {subscription.plan === 'free'
                            ? 'Ücretsiz'
                            : subscription.plan === 'pro'
                              ? '99₺/ay'
                              : '299₺/ay'}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        {subscription.status === 'active' ? (
                          <CheckCircle className='w-6 h-6 text-green-400' />
                        ) : (
                          <AlertCircle className='w-6 h-6 text-yellow-400' />
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <p className='text-gray-400'>Durum</p>
                        <p className='text-white capitalize'>{subscription.status}</p>
                      </div>
                      <div>
                        <p className='text-gray-400'>Sonraki Ödeme</p>
                        <p className='text-white'>{formatDate(subscription.current_period_end)}</p>
                      </div>
                    </div>

                    {subscription.cancel_at_period_end && (
                      <div className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3'>
                        <p className='text-yellow-400 text-sm flex items-center'>
                          <Clock className='w-4 h-4 mr-2' />
                          Aboneliğiniz dönem sonunda iptal edilecek
                        </p>
                      </div>
                    )}

                    <div className='flex space-x-2'>
                      <Button
                        onClick={handleManageSubscription}
                        disabled={loading}
                        className='flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      >
                        {loading ? 'Yükleniyor...' : 'Aboneliği Yönet'}
                      </Button>

                      {user.plan === 'free' && (
                        <Button
                          onClick={() => handleUpgrade('pro')}
                          disabled={loading}
                          variant='outline'
                          className='border-white/20 text-white'
                        >
                          Pro'ya Geç
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-gray-400'>Abonelik bilgileri yükleniyor...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20'>
              <CardHeader>
                <CardTitle className='text-white flex items-center'>
                  <DollarSign className='w-5 h-5 mr-2 text-purple-400' />
                  Fatura Geçmişi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingInvoices ? (
                  <div className='text-center py-8'>
                    <p className='text-gray-400'>Faturalar yükleniyor...</p>
                  </div>
                ) : invoices.length > 0 ? (
                  <div className='space-y-3'>
                    {invoices.map(invoice => (
                      <div
                        key={invoice.id}
                        className='flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10'
                      >
                        <div className='flex items-center space-x-3'>
                          <div className='w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center'>
                            <Calendar className='w-5 h-5 text-purple-400' />
                          </div>
                          <div>
                            <p className='text-white font-medium'>
                              {formatAmount(invoice.amount, invoice.currency)}
                            </p>
                            <p className='text-gray-400 text-sm'>{formatDate(invoice.created)}</p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                          {getStatusBadge(invoice.status)}
                          {invoice.invoice_pdf && (
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-white/20 text-white'
                              onClick={() => window.open(invoice.invoice_pdf, '_blank')}
                            >
                              <Download className='w-4 h-4 mr-1' />
                              PDF
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-gray-400'>Henüz fatura bulunmuyor</p>
                    <p className='text-gray-500 text-sm mt-1'>Ücretsiz plan kullanıyorsunuz</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className='space-y-6'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20'>
              <CardHeader>
                <CardTitle className='text-white'>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                >
                  <CreditCard className='w-4 h-4 mr-2' />
                  Ödeme Yöntemi Değiştir
                </Button>

                <Link href='/pricing' className='block'>
                  <Button variant='outline' className='w-full border-white/20 text-white'>
                    Planları Karşılaştır
                  </Button>
                </Link>

                <Link href='/dashboard' className='block'>
                  <Button variant='outline' className='w-full border-white/20 text-white'>
                    Dashboard'a Dön
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20'>
              <CardHeader>
                <CardTitle className='text-white'>Destek</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <p className='text-gray-300 text-sm'>
                  Fatura veya ödeme ile ilgili sorularınız için bizimle iletişime geçin.
                </p>
                <Link href='/contact' className='block'>
                  <Button variant='outline' className='w-full border-white/20 text-white'>
                    İletişime Geç
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
