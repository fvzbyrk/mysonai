'use client'

import { useAuth } from '@/contexts/auth-context'
import { useUsage } from '@/hooks/useUsage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UsageLimits } from '@/components/usage-limits'
import { Bot, User, Crown, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { usage, isGuest } = useUsage()

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

          {/* Quick Actions */}
          <div className="space-y-6">
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

