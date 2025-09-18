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
  RefreshCw,
  Download,
  Filter,
  Settings,
  Activity,
  Zap,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdvancedAnalytics {
  overview: {
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
    pageViews: number;
    newUsers: number;
    returningUsers: number;
    conversionRate: number;
  };
  traffic: {
    bySource: Array<{ source: string; visitors: number; percentage: number }>;
    byCountry: Array<{ country: string; visitors: number; percentage: number }>;
    byDevice: Array<{ device: string; visitors: number; percentage: number }>;
    byBrowser: Array<{ browser: string; visitors: number; percentage: number }>;
  };
  content: {
    topPages: Array<{ page: string; views: number; uniqueViews: number; avgTime: number }>;
    topPosts: Array<{ post: string; views: number; likes: number; comments: number }>;
    categories: Array<{ category: string; posts: number; views: number; engagement: number }>;
  };
  users: {
    demographics: {
      ageGroups: Array<{ age: string; count: number; percentage: number }>;
      genders: Array<{ gender: string; count: number; percentage: number }>;
    };
    behavior: {
      sessionDuration: Array<{ duration: string; count: number; percentage: number }>;
      pagesPerSession: Array<{ pages: string; count: number; percentage: number }>;
    };
  };
  performance: {
    serverHealth: {
      uptime: number;
      responseTime: number;
      cpuUsage: number;
      memoryUsage: number;
      diskUsage: number;
    };
    apiMetrics: {
      totalRequests: number;
      successRate: number;
      errorRate: number;
      avgResponseTime: number;
    };
  };
  realTime: {
    activeUsers: number;
    currentPageViews: number;
    topPages: Array<{ page: string; views: number }>;
    recentActivity: Array<{ user: string; action: string; time: string }>;
  };
}

export default function AdvancedAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AdvancedAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data
  const mockAnalytics: AdvancedAnalytics = {
    overview: {
      totalViews: 45678,
      uniqueVisitors: 12345,
      bounceRate: 42.5,
      avgSessionDuration: 3.2,
      pageViews: 67890,
      newUsers: 8901,
      returningUsers: 3444,
      conversionRate: 12.8
    },
    traffic: {
      bySource: [
        { source: 'Google', visitors: 4567, percentage: 45.2 },
        { source: 'Direct', visitors: 2345, percentage: 23.1 },
        { source: 'Social Media', visitors: 1234, percentage: 12.2 },
        { source: 'Email', visitors: 890, percentage: 8.8 },
        { source: 'Referral', visitors: 567, percentage: 5.6 },
        { source: 'Other', visitors: 456, percentage: 4.5 }
      ],
      byCountry: [
        { country: 'Turkey', visitors: 6789, percentage: 67.1 },
        { country: 'Germany', visitors: 1234, percentage: 12.2 },
        { country: 'USA', visitors: 890, percentage: 8.8 },
        { country: 'UK', visitors: 456, percentage: 4.5 },
        { country: 'France', visitors: 234, percentage: 2.3 },
        { country: 'Other', visitors: 456, percentage: 4.5 }
      ],
      byDevice: [
        { device: 'Desktop', visitors: 4567, percentage: 45.2 },
        { device: 'Mobile', visitors: 3456, percentage: 34.2 },
        { device: 'Tablet', visitors: 1234, percentage: 12.2 },
        { device: 'Other', visitors: 890, percentage: 8.8 }
      ],
      byBrowser: [
        { browser: 'Chrome', visitors: 5678, percentage: 56.2 },
        { browser: 'Safari', visitors: 2345, percentage: 23.2 },
        { browser: 'Firefox', visitors: 1234, percentage: 12.2 },
        { browser: 'Edge', visitors: 567, percentage: 5.6 },
        { browser: 'Other', visitors: 456, percentage: 4.5 }
      ]
    },
    content: {
      topPages: [
        { page: '/', views: 12345, uniqueViews: 8901, avgTime: 2.5 },
        { page: '/blog', views: 8901, uniqueViews: 5678, avgTime: 3.2 },
        { page: '/blog/ai-teknolojileri', views: 4567, uniqueViews: 3456, avgTime: 4.1 },
        { page: '/about', views: 2345, uniqueViews: 1234, avgTime: 1.8 },
        { page: '/contact', views: 1234, uniqueViews: 890, avgTime: 2.1 }
      ],
      topPosts: [
        { post: 'Yapay Zeka ve Makine Öğrenmesi', views: 4567, likes: 234, comments: 45 },
        { post: 'React 18 Yenilikleri', views: 3456, likes: 189, comments: 32 },
        { post: 'Startup Ekosistemi', views: 2345, likes: 123, comments: 28 },
        { post: 'Cybersecurity Tehditleri', views: 1890, likes: 98, comments: 19 },
        { post: 'Cloud Computing', views: 1234, likes: 67, comments: 15 }
      ],
      categories: [
        { category: 'AI Teknolojisi', posts: 45, views: 15678, engagement: 8.5 },
        { category: 'İş Dünyası', posts: 32, views: 12345, engagement: 7.2 },
        { category: 'Eğitimler', posts: 28, views: 9876, engagement: 6.8 },
        { category: 'Vaka Çalışmaları', posts: 18, views: 5432, engagement: 9.1 },
        { category: 'Haberler', posts: 33, views: 2347, engagement: 5.4 }
      ]
    },
    users: {
      demographics: {
        ageGroups: [
          { age: '18-24', count: 2345, percentage: 23.1 },
          { age: '25-34', count: 3456, percentage: 34.2 },
          { age: '35-44', count: 2345, percentage: 23.1 },
          { age: '45-54', count: 1234, percentage: 12.2 },
          { age: '55+', count: 890, percentage: 8.8 }
        ],
        genders: [
          { gender: 'Male', count: 5678, percentage: 56.2 },
          { gender: 'Female', count: 3456, percentage: 34.2 },
          { gender: 'Other', count: 890, percentage: 8.8 }
        ]
      },
      behavior: {
        sessionDuration: [
          { duration: '0-30s', count: 2345, percentage: 23.1 },
          { duration: '30s-2m', count: 3456, percentage: 34.2 },
          { duration: '2m-5m', count: 2345, percentage: 23.1 },
          { duration: '5m-10m', count: 1234, percentage: 12.2 },
          { duration: '10m+', count: 890, percentage: 8.8 }
        ],
        pagesPerSession: [
          { pages: '1', count: 3456, percentage: 34.2 },
          { pages: '2-3', count: 4567, percentage: 45.2 },
          { pages: '4-5', count: 1234, percentage: 12.2 },
          { pages: '6+', count: 890, percentage: 8.8 }
        ]
      }
    },
    performance: {
      serverHealth: {
        uptime: 99.9,
        responseTime: 245,
        cpuUsage: 45.2,
        memoryUsage: 67.8,
        diskUsage: 34.5
      },
      apiMetrics: {
        totalRequests: 123456,
        successRate: 98.5,
        errorRate: 1.5,
        avgResponseTime: 156
      }
    },
    realTime: {
      activeUsers: 23,
      currentPageViews: 45,
      topPages: [
        { page: '/blog/ai-teknolojileri', views: 12 },
        { page: '/', views: 8 },
        { page: '/blog', views: 6 },
        { page: '/about', views: 4 },
        { page: '/contact', views: 3 }
      ],
      recentActivity: [
        { user: 'Ahmet Yılmaz', action: 'Yeni makale oluşturdu', time: '2 dakika önce' },
        { user: 'Ayşe Demir', action: 'Makale düzenledi', time: '5 dakika önce' },
        { user: 'Mehmet Kaya', action: 'Yorum yaptı', time: '8 dakika önce' },
        { user: 'Fatma Özkan', action: 'Sisteme giriş yaptı', time: '12 dakika önce' }
      ]
    }
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
    { value: '90d', label: 'Son 3 Ay' },
    { value: '1y', label: 'Son 1 Yıl' }
  ];

  const metrics = [
    { value: 'overview', label: 'Genel Bakış' },
    { value: 'traffic', label: 'Trafik Analizi' },
    { value: 'content', label: 'İçerik Analizi' },
    { value: 'users', label: 'Kullanıcı Analizi' },
    { value: 'performance', label: 'Performans' },
    { value: 'realtime', label: 'Gerçek Zamanlı' }
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
          <p className="text-white">Gelişmiş analitik veriler yükleniyor...</p>
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
            <Link href="/tr/admin/analytics">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Basit Analitik
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Gelişmiş Analitik</h1>
              <p className="text-gray-300">Detaylı performans analizi ve gerçek zamanlı veriler</p>
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
              <Download className="w-4 h-4 mr-2" />
              Rapor İndir
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
          </div>
        </div>

        {/* Metric Tabs */}
        <div className="flex space-x-2">
          {metrics.map((metric) => (
            <Button
              key={metric.value}
              variant={selectedMetric === metric.value ? "default" : "outline"}
              onClick={() => setSelectedMetric(metric.value)}
              className={cn(
                selectedMetric === metric.value 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              )}
            >
              {metric.label}
            </Button>
          ))}
        </div>

        {/* Overview Metrics */}
        {selectedMetric === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Toplam Görüntüleme</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(analytics.overview.totalViews)}</p>
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
                    <p className="text-gray-300 text-sm">Benzersiz Ziyaretçi</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(analytics.overview.uniqueVisitors)}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+8.3%</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Ortalama Oturum</p>
                    <p className="text-2xl font-bold text-white">{analytics.overview.avgSessionDuration} dk</p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+0.3 dk</span>
                    </div>
                  </div>
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Dönüşüm Oranı</p>
                    <p className="text-2xl font-bold text-white">{analytics.overview.conversionRate}%</p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+2.1%</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Traffic Analysis */}
        {selectedMetric === 'traffic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Trafik Kaynakları</h3>
                <div className="space-y-4">
                  {analytics.traffic.bySource.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{source.source}</span>
                        <span className="text-gray-400 text-sm">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {formatNumber(source.visitors)} ziyaretçi
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ülke Dağılımı</h3>
                <div className="space-y-4">
                  {analytics.traffic.byCountry.map((country, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{country.country}</span>
                        <span className="text-gray-400 text-sm">{country.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {formatNumber(country.visitors)} ziyaretçi
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Performance Monitoring */}
        {selectedMetric === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Sunucu Sağlığı</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Uptime</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      {analytics.performance.serverHealth.uptime}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Yanıt Süresi</span>
                    <span className="text-gray-400">{analytics.performance.serverHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">CPU Kullanımı</span>
                    <span className="text-gray-400">{analytics.performance.serverHealth.cpuUsage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Bellek Kullanımı</span>
                    <span className="text-gray-400">{analytics.performance.serverHealth.memoryUsage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Disk Kullanımı</span>
                    <span className="text-gray-400">{analytics.performance.serverHealth.diskUsage}%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">API Metrikleri</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Toplam İstek</span>
                    <span className="text-gray-400">{formatNumber(analytics.performance.apiMetrics.totalRequests)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Başarı Oranı</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      {analytics.performance.apiMetrics.successRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Hata Oranı</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      {analytics.performance.apiMetrics.errorRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Ortalama Yanıt</span>
                    <span className="text-gray-400">{analytics.performance.apiMetrics.avgResponseTime}ms</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Real-time Data */}
        {selectedMetric === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Gerçek Zamanlı Aktivite</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Aktif Kullanıcı</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      {analytics.realTime.activeUsers}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Şu Anki Görüntüleme</span>
                    <span className="text-gray-400">{analytics.realTime.currentPageViews}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Son Aktiviteler</h3>
                <div className="space-y-3">
                  {analytics.realTime.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.user} - {activity.action}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
