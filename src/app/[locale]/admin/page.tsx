'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  FileText,
  Users,
  Settings,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  Database,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalUsers: number;
  activeUsers: number;
  todayViews: number;
  totalViews: number;
  aiGenerations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalUsers: 0,
    activeUsers: 0,
    todayViews: 0,
    totalViews: 0,
    aiGenerations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);

      // Mock data - in real app, this would come from API
      setTimeout(() => {
        setStats({
          totalPosts: 156,
          publishedPosts: 142,
          draftPosts: 14,
          totalUsers: 1247,
          activeUsers: 89,
          todayViews: 2341,
          totalViews: 45678,
          aiGenerations: 89,
        });
        setIsLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Blog Yönetimi',
      description: 'Makaleleri yönet, düzenle ve yayınla',
      icon: FileText,
      href: '/tr/admin/blog',
      color: 'from-blue-600 to-blue-700',
      stats: `${stats.publishedPosts} yayınlandı`,
    },
    {
      title: 'AI Blog Üretimi',
      description: 'Otomatik makale üretimi ve yönetimi',
      icon: Bot,
      href: '/tr/admin/auto-blog',
      color: 'from-purple-600 to-purple-700',
      stats: `${stats.aiGenerations} AI üretimi`,
    },
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları yönet ve yetkilendir',
      icon: Users,
      href: '/tr/admin/users',
      color: 'from-green-600 to-green-700',
      stats: `${stats.activeUsers} aktif kullanıcı`,
    },
    {
      title: 'Analitik',
      description: 'Site istatistikleri ve raporlar',
      icon: BarChart3,
      href: '/tr/admin/analytics',
      color: 'from-orange-600 to-orange-700',
      stats: `${stats.todayViews} bugünkü görüntüleme`,
    },
    {
      title: 'Ayarlar',
      description: 'Sistem ayarları ve konfigürasyon',
      icon: Settings,
      href: '/tr/admin/settings',
      color: 'from-gray-600 to-gray-700',
      stats: 'Sistem yapılandırması',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'ai_generation',
      title: 'AI ile 5 makale üretildi',
      time: '2 saat önce',
      status: 'success',
    },
    {
      id: 2,
      type: 'user_registration',
      title: 'Yeni kullanıcı kaydı',
      time: '4 saat önce',
      status: 'info',
    },
    {
      id: 3,
      type: 'post_published',
      title: 'Makale yayınlandı',
      time: '6 saat önce',
      status: 'success',
    },
    {
      id: 4,
      type: 'system_alert',
      title: 'Yüksek trafik uyarısı',
      time: '8 saat önce',
      status: 'warning',
    },
  ];

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Admin Dashboard</h1>
            <p className='text-gray-300'>MySonAI yönetim paneline hoş geldiniz</p>
          </div>
          <div className='flex items-center space-x-4'>
            <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
              <CheckCircle className='w-3 h-3 mr-1' />
              Sistem Aktif
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Makale</p>
                  <p className='text-2xl font-bold text-white'>{stats.totalPosts}</p>
                </div>
                <FileText className='w-8 h-8 text-blue-400' />
              </div>
              <div className='mt-4 flex items-center space-x-2'>
                <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                  {stats.publishedPosts} yayınlandı
                </Badge>
                <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>
                  {stats.draftPosts} taslak
                </Badge>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Kullanıcılar</p>
                  <p className='text-2xl font-bold text-white'>{stats.totalUsers}</p>
                </div>
                <Users className='w-8 h-8 text-green-400' />
              </div>
              <div className='mt-4'>
                <p className='text-gray-300 text-sm'>{stats.activeUsers} aktif kullanıcı</p>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Bugünkü Görüntüleme</p>
                  <p className='text-2xl font-bold text-white'>
                    {stats.todayViews.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className='w-8 h-8 text-orange-400' />
              </div>
              <div className='mt-4'>
                <p className='text-gray-300 text-sm'>Toplam: {stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>AI Üretimi</p>
                  <p className='text-2xl font-bold text-white'>{stats.aiGenerations}</p>
                </div>
                <Bot className='w-8 h-8 text-purple-400' />
              </div>
              <div className='mt-4'>
                <p className='text-gray-300 text-sm'>Bu ay üretilen makale</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group'>
                <div className='p-6'>
                  <div className='flex items-center space-x-4'>
                    <div
                      className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center',
                        `bg-gradient-to-r ${action.color}`
                      )}
                    >
                      <action.icon className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-white group-hover:text-blue-300 transition-colors'>
                        {action.title}
                      </h3>
                      <p className='text-gray-300 text-sm'>{action.description}</p>
                      <p className='text-blue-400 text-sm mt-1'>{action.stats}</p>
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
                      className={cn(
                        'w-2 h-2 rounded-full',
                        activity.status === 'success' && 'bg-green-400',
                        activity.status === 'warning' && 'bg-yellow-400',
                        activity.status === 'info' && 'bg-blue-400'
                      )}
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
              <h3 className='text-lg font-semibold text-white mb-4'>Sistem Durumu</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>API Durumu</span>
                  <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                    <CheckCircle className='w-3 h-3 mr-1' />
                    Aktif
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>Veritabanı</span>
                  <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                    <Database className='w-3 h-3 mr-1' />
                    Bağlı
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>AI Servisleri</span>
                  <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                    <Zap className='w-3 h-3 mr-1' />
                    Çalışıyor
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>CDN</span>
                  <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                    <Globe className='w-3 h-3 mr-1' />
                    Hızlı
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
