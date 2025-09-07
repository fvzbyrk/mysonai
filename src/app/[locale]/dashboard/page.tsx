'use client'

import { useAuth } from '@/contexts/auth-context'
import { useUsage } from '@/hooks/useUsage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UsageLimits } from '@/components/usage-limits'
import { Bot, User, Crown, Settings, LogOut, CreditCard, Zap, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getStripe } from '@/lib/stripe'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { usage, isGuest } = useUsage()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchSubscription()
    }
  }, [user])

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/subscription?userId=${user?.id}`)
      const data = await response.json()
      setSubscription(data.subscription)
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  const handleUpgrade = async (plan: string) => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          userId: user.id
        }),
      })

      const { sessionId } = await response.json()

      if (sessionId) {
        const stripe = await getStripe()
        await stripe?.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cancel',
          userId: user.id
        }),
      })

      if (response.ok) {
        await fetchSubscription()
      }
    } catch (error) {
      console.error('Error canceling subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Giriş Yapın
          </h1>
          <p className="text-gray-300 mb-6">
            Dashboard&apos;a erişmek için giriş yapmanız gerekiyor.
          </p>
          <Link href="/signin">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Giriş Yap
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">MySonAI Dashboard</h1>
                <p className="text-sm text-gray-300">Hoş geldiniz, {user.name || user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-white/20 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Ayarlar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 text-white"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Usage Stats */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-purple-400" />
                  Kullanım İstatistikleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UsageLimits usage={usage} isGuest={isGuest} />
              </CardContent>
            </Card>
          </div>

          {/* Plan Management */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                  Plan Yönetimi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium capitalize">{user.plan} Plan</p>
                    <p className="text-gray-400 text-sm">
                      {user.plan === 'free' ? 'Ücretsiz' : 
                       user.plan === 'pro' ? '99₺/ay' : '299₺/ay'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {user.plan === 'free' ? (
                      <span className="text-gray-400">🆓</span>
                    ) : (
                      <span className="text-yellow-400">⭐</span>
                    )}
                  </div>
                </div>

                {subscription && (
                  <div className="text-sm text-gray-300">
                    <p>Durum: <span className="text-green-400 capitalize">{subscription.status}</span></p>
                    {subscription.current_period_end && (
                      <p>Sonraki ödeme: {new Date(subscription.current_period_end * 1000).toLocaleDateString('tr-TR')}</p>
                    )}
                    {subscription.cancel_at_period_end && (
                      <p className="text-yellow-400">Dönem sonunda iptal edilecek</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {user.plan === 'free' && (
                    <>
                      <Button 
                        onClick={() => handleUpgrade('pro')}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {loading ? 'Yükleniyor...' : 'Pro\'ya Geç'}
                      </Button>
                      <Button 
                        onClick={() => handleUpgrade('enterprise')}
                        disabled={loading}
                        variant="outline"
                        className="w-full border-white/20 text-white"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Enterprise
                      </Button>
                    </>
                  )}

                  {user.plan === 'pro' && (
                    <>
                      <Button 
                        onClick={() => handleUpgrade('enterprise')}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        {loading ? 'Yükleniyor...' : 'Enterprise\'a Geç'}
                      </Button>
                      <Button 
                        onClick={handleCancelSubscription}
                        disabled={loading}
                        variant="outline"
                        className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        {loading ? 'Yükleniyor...' : 'Aboneliği İptal Et'}
                      </Button>
                    </>
                  )}

                  {user.plan === 'enterprise' && (
                    <Button 
                      onClick={handleCancelSubscription}
                      disabled={loading}
                      variant="outline"
                      className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      {loading ? 'Yükleniyor...' : 'Aboneliği İptal Et'}
                    </Button>
                  )}
                </div>

                <Link href="/pricing" className="block">
                  <Button variant="outline" className="w-full border-white/20 text-white">
                    Tüm Planları Gör
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/demo">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Bot className="w-4 h-4 mr-2" />
                    AI Asistanlarla Sohbet
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full border-white/20 text-white">
                    Ana Sayfa
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* User Info */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Hesap Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name || 'Kullanıcı'}</p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-gray-300 text-sm">
                    Üyelik: <span className="text-purple-400 font-medium">Ücretsiz</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

