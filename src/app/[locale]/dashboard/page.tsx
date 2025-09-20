'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  MessageCircle,
  BarChart3,
  Settings,
  CreditCard,
  Calendar,
  Zap,
  Globe,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

interface DashboardStats {
  totalMessages: number;
  monthlyLimit: number;
  tokensUsed: number;
  tokensLimit: number;
  imagesGenerated: number;
  imagesLimit: number;
  lastLogin: string;
  plan: string;
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    monthlyLimit: 50,
    tokensUsed: 0,
    tokensLimit: 10000,
    imagesGenerated: 0,
    imagesLimit: 10,
    lastLogin: new Date().toLocaleDateString('tr-TR'),
    plan: 'free',
  });

  useEffect(() => {
    if (user) {
      setStats(prev => ({
        ...prev,
        totalMessages: user.usage?.totalMessages || 0,
        tokensUsed: user.usage?.totalTokens || 0,
        imagesGenerated: user.usage?.imagesGenerated || 0,
        plan: user.plan || 'free',
        monthlyLimit: user.usage?.monthlyLimit?.messages || 50,
        tokensLimit: user.usage?.monthlyLimit?.tokens || 10000,
        imagesLimit: user.usage?.monthlyLimit?.images || 10,
      }));
    }
  }, [user]);

  const quickActions = [
    {
      title: 'AI Asistanları',
      description: '18 uzman AI asistanımızla sohbet edin',
      icon: Bot,
      href: '/tr/assistants',
      color: 'from-purple-600 to-purple-700',
    },
    {
      title: 'Sohbet Geçmişi',
      description: 'Önceki konuşmalarınızı görüntüleyin',
      icon: MessageCircle,
      href: '/tr/chat',
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'Kullanım İstatistikleri',
      description: 'Detaylı kullanım raporlarınız',
      icon: BarChart3,
      href: '/tr/analytics',
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'Hesap Ayarları',
      description: 'Profil ve tercihlerinizi düzenleyin',
      icon: Settings,
      href: '/tr/settings',
      color: 'from-gray-600 to-gray-700',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'chat',
      title: 'Fevzi ile proje yönetimi hakkında konuştunuz',
      time: '2 saat önce',
      status: 'success',
    },
    {
      id: 2,
      type: 'generation',
      title: 'AI ile kod üretimi yaptınız',
      time: '4 saat önce',
      status: 'info',
    },
    {
      id: 3,
      type: 'login',
      title: 'Hesabınıza giriş yaptınız',
      time: '1 gün önce',
      status: 'success',
    },
  ];

  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-md w-full mx-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-white mb-4'>Giriş Gerekli</h2>
            <p className='text-gray-300 mb-6'>
              Dashboard&apos;a erişmek için giriş yapmanız gerekiyor.
            </p>
            <div className='space-y-3'>
              <Link href='/tr/signin'>
                <Button className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700'>
                  Giriş Yap
                </Button>
              </Link>
              <Link href='/tr/signup'>
                <Button
                  variant='outline'
                  className='w-full bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  Kayıt Ol
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
            <p className='text-gray-300'>Hoş geldiniz, {user.name || user.email}</p>
          </div>
          <div className='flex items-center space-x-4'>
            <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>
              {stats.plan === 'free'
                ? 'Ücretsiz Plan'
                : stats.plan === 'pro'
                  ? 'Pro Plan'
                  : 'Enterprise Plan'}
            </Badge>
            <Button
              variant='outline'
              onClick={() => signOut()}
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
            >
              Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Bu Ay Mesaj</p>
                  <p className='text-2xl font-bold text-white'>{stats.totalMessages}</p>
                </div>
                <MessageCircle className='w-8 h-8 text-blue-400' />
              </div>
              <div className='mt-4'>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-blue-400 h-2 rounded-full'
                    style={{ width: `${(stats.totalMessages / stats.monthlyLimit) * 100}%` }}
                  ></div>
                </div>
                <p className='text-gray-400 text-xs mt-1'>
                  {stats.monthlyLimit - stats.totalMessages} mesaj kaldı
                </p>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Token Kullanımı</p>
                  <p className='text-2xl font-bold text-white'>
                    {stats.tokensUsed.toLocaleString()}
                  </p>
                </div>
                <Zap className='w-8 h-8 text-yellow-400' />
              </div>
              <div className='mt-4'>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-yellow-400 h-2 rounded-full'
                    style={{ width: `${(stats.tokensUsed / stats.tokensLimit) * 100}%` }}
                  ></div>
                </div>
                <p className='text-gray-400 text-xs mt-1'>
                  {stats.tokensLimit - stats.tokensUsed} token kaldı
                </p>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Görsel Üretimi</p>
                  <p className='text-2xl font-bold text-white'>{stats.imagesGenerated}</p>
                </div>
                <Globe className='w-8 h-8 text-green-400' />
              </div>
              <div className='mt-4'>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-green-400 h-2 rounded-full'
                    style={{ width: `${(stats.imagesGenerated / stats.imagesLimit) * 100}%` }}
                  ></div>
                </div>
                <p className='text-gray-400 text-xs mt-1'>
                  {stats.imagesLimit - stats.imagesGenerated} görsel kaldı
                </p>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Son Giriş</p>
                  <p className='text-2xl font-bold text-white'>{stats.lastLogin}</p>
                </div>
                <Calendar className='w-8 h-8 text-purple-400' />
              </div>
              <div className='mt-4'>
                <p className='text-gray-400 text-xs'>Hesabınız aktif</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group'>
                <div className='p-6'>
                  <div className='flex items-center space-x-4'>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${action.color}`}
                    >
                      <action.icon className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-white group-hover:text-purple-300 transition-colors'>
                        {action.title}
                      </h3>
                      <p className='text-gray-300 text-sm'>{action.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activities */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>Son Aktiviteler</h3>
              <div className='space-y-4'>
                {recentActivities.map(activity => (
                  <div key={activity.id} className='flex items-center space-x-3'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === 'success'
                          ? 'bg-green-400'
                          : activity.status === 'warning'
                            ? 'bg-yellow-400'
                            : 'bg-blue-400'
                      }`}
                    />
                    <div className='flex-1'>
                      <p className='text-white text-sm'>{activity.title}</p>
                      <p className='text-gray-400 text-xs'>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>Hızlı İşlemler</h3>
              <div className='space-y-3'>
                <Link href='/tr/billing'>
                  <Button className='w-full bg-gradient-to-r from-green-600 to-green-700 text-white border-0 hover:from-green-700 hover:to-green-800'>
                    <CreditCard className='w-4 h-4 mr-2' />
                    Plan Yükselt
                  </Button>
                </Link>
                <Link href='/tr/settings'>
                  <Button
                    variant='outline'
                    className='w-full bg-white/10 border-white/20 text-white hover:bg-white/20'
                  >
                    <Settings className='w-4 h-4 mr-2' />
                    Ayarlar
                  </Button>
                </Link>
                <Link href='/tr/contact'>
                  <Button
                    variant='outline'
                    className='w-full bg-white/10 border-white/20 text-white hover:bg-white/20'
                  >
                    <Bell className='w-4 h-4 mr-2' />
                    Destek
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
