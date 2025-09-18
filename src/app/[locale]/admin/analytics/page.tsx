'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  ArrowUp,
  ArrowDown,
  Calendar,
  Globe,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  publishedPosts: number;
  avgReadTime: number;
  topPosts: Array<{
    id: string;
    title: string;
    views: number;
    category: string;
  }>;
  viewsByDay: Array<{
    date: string;
    views: number;
  }>;
  categoryStats: Array<{
    category: string;
    posts: number;
    views: number;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Mock data
  const mockAnalytics: AnalyticsData = {
    totalViews: 45678,
    todayViews: 2341,
    totalUsers: 1247,
    activeUsers: 89,
    totalPosts: 156,
    publishedPosts: 142,
    avgReadTime: 4.2,
    topPosts: [
      { id: '1', title: 'Yapay Zeka ve Makine Öğrenmesi Trendleri 2024', views: 1234, category: 'AI Teknolojisi' },
      { id: '2', title: 'React 18 ve Next.js 14 Yenilikleri', views: 856, category: 'Eğitimler' },
      { id: '3', title: 'Startup Ekosistemi ve Yatırım Trendleri', views: 743, category: 'İş Dünyası' },
      { id: '4', title: 'Cybersecurity Tehditleri ve Çözümler', views: 692, category: 'Haberler' },
      { id: '5', title: 'Cloud Computing Pazar Gelişmeleri', views: 567, category: 'AI Teknolojisi' }
    ],
    viewsByDay: [
      { date: '2024-01-09', views: 1234 },
      { date: '2024-01-10', views: 1456 },
      { date: '2024-01-11', views: 1678 },
      { date: '2024-01-12', views: 1890 },
      { date: '2024-01-13', views: 2102 },
      { date: '2024-01-14', views: 2324 },
      { date: '2024-01-15', views: 2341 }
    ],
    categoryStats: [
      { category: 'AI Teknolojisi', posts: 45, views: 15678 },
      { category: 'İş Dünyası', posts: 32, views: 12345 },
      { category: 'Eğitimler', posts: 28, views: 9876 },
      { category: 'Vaka Çalışmaları', posts: 18, views: 5432 },
      { category: 'Haberler', posts: 33, views: 2347 }
    ]
  };

  useEffect(() => {
    // Simulate loading analytics
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const periods = [
    { value: '1d', label: 'Son 1 Gün' },
    { value: '7d', label: 'Son 7 Gün' },
    { value: '30d', label: 'Son 30 Gün' },
    { value: '90d', label: 'Son 3 Ay' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Analitik veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/tr/admin">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Analitik</h1>
              <p className="text-gray-300">Site istatistikleri ve performans raporları</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value} className="bg-gray-800">
                  {period.label}
                </option>
              ))}
            </select>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam Görüntüleme</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(analytics.totalViews)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+12.5%</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Bugünkü Görüntüleme</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(analytics.todayViews)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+8.3%</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam Kullanıcı</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(analytics.totalUsers)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+5.2%</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Ortalama Okuma Süresi</p>
                  <p className="text-2xl font-bold text-white">{analytics.avgReadTime} dk</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+0.3 dk</span>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts and Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Posts */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">En Popüler Makaleler</h3>
              <div className="space-y-4">
                {analytics.topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{post.title}</p>
                        <p className="text-gray-400 text-xs">{post.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatNumber(post.views)}</p>
                      <p className="text-gray-400 text-xs">görüntüleme</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Category Stats */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Kategori İstatistikleri</h3>
              <div className="space-y-4">
                {analytics.categoryStats.map((category, index) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{category.category}</span>
                      <span className="text-gray-400 text-sm">{category.posts} makale</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(category.views / Math.max(...analytics.categoryStats.map(c => c.views))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{formatNumber(category.views)} görüntüleme</span>
                      <span className="text-gray-400">{((category.views / analytics.totalViews) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Views Over Time */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Görüntüleme Trendi</h3>
            <div className="space-y-4">
              {analytics.viewsByDay.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 text-gray-400 text-sm">
                      {new Date(day.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.views / Math.max(...analytics.viewsByDay.map(d => d.views))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <p className="text-white font-semibold">{formatNumber(day.views)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Aktif Kullanıcı</p>
                  <p className="text-2xl font-bold text-white">{analytics.activeUsers}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Yayınlanan Makale</p>
                  <p className="text-2xl font-bold text-white">{analytics.publishedPosts}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam Makale</p>
                  <p className="text-2xl font-bold text-white">{analytics.totalPosts}</p>
                </div>
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
