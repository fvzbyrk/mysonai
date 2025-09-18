'use client';

import { useState, useEffect } from 'react';
import { useAnalyticsContext } from './analytics-provider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Star,
  Zap,
  Target,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsDashboardProps {
  showDetails?: boolean;
  enableRealTime?: boolean;
  enableExport?: boolean;
  className?: string;
}

export function AnalyticsDashboard({
  showDetails = false,
  enableRealTime = true,
  enableExport = true,
  className
}: AnalyticsDashboardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const { 
    pageViews, 
    uniqueVisitors, 
    bounceRate, 
    avgSessionDuration, 
    conversionRate,
    topPages,
    trafficSources,
    deviceTypes,
    userEngagement,
    scrollDepth,
    timeOnPage,
    clickEvents,
    formSubmissions,
    downloads,
    socialShares,
    searchQueries,
    errorRate,
    performanceScore
  } = useAnalyticsContext();

  // Mock data for demonstration
  const mockData = {
    pageViews: 12543,
    uniqueVisitors: 8932,
    bounceRate: 34.2,
    avgSessionDuration: 245,
    conversionRate: 12.8,
    topPages: [
      { page: '/', views: 3245, unique: 2891, bounce: 28.5 },
      { page: '/blog', views: 2156, unique: 1923, bounce: 32.1 },
      { page: '/demo', views: 1892, unique: 1654, bounce: 25.8 },
      { page: '/pricing', views: 1456, unique: 1234, bounce: 41.2 },
      { page: '/contact', views: 892, unique: 756, bounce: 38.7 }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 4567, percentage: 51.2 },
      { source: 'Direct', visitors: 2345, percentage: 26.3 },
      { source: 'Social Media', visitors: 1234, percentage: 13.8 },
      { source: 'Referral', visitors: 567, percentage: 6.4 },
      { source: 'Email', visitors: 219, percentage: 2.5 }
    ],
    deviceTypes: [
      { type: 'Desktop', visitors: 4567, percentage: 51.2 },
      { type: 'Mobile', visitors: 3456, percentage: 38.7 },
      { type: 'Tablet', visitors: 909, percentage: 10.1 }
    ],
    userEngagement: {
      high: 45.2,
      medium: 32.8,
      low: 22.0
    },
    scrollDepth: 68.5,
    timeOnPage: 187,
    clickEvents: 8934,
    formSubmissions: 234,
    downloads: 156,
    socialShares: 89,
    searchQueries: [
      { query: 'AI asistanları', searches: 234, position: 1 },
      { query: 'MySonAI demo', searches: 189, position: 2 },
      { query: 'yapay zeka', searches: 156, position: 3 },
      { query: 'AI chatbot', searches: 123, position: 4 },
      { query: 'AI çözümleri', searches: 98, position: 5 }
    ],
    errorRate: 2.3,
    performanceScore: 87.5
  };

  // Get trend indicator
  const getTrendIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    if (change > 5) return { icon: ArrowUp, color: 'text-green-500', text: `+${change.toFixed(1)}%` };
    if (change < -5) return { icon: ArrowDown, color: 'text-red-500', text: `${change.toFixed(1)}%` };
    return { icon: Minus, color: 'text-gray-500', text: `${change.toFixed(1)}%` };
  };

  // Get engagement level
  const getEngagementLevel = (score: number) => {
    if (score >= 70) return { level: 'Yüksek', color: 'text-green-500', bg: 'bg-green-500/20' };
    if (score >= 40) return { level: 'Orta', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    return { level: 'Düşük', color: 'text-red-500', bg: 'bg-red-500/20' };
  };

  // Get performance level
  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Mükemmel', color: 'text-green-500', bg: 'bg-green-500/20' };
    if (score >= 70) return { level: 'İyi', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    if (score >= 50) return { level: 'Orta', color: 'text-orange-500', bg: 'bg-orange-500/20' };
    return { level: 'Kötü', color: 'text-red-500', bg: 'bg-red-500/20' };
  };

  const engagementLevel = getEngagementLevel(mockData.userEngagement.high);
  const performanceLevel = getPerformanceLevel(mockData.performanceScore);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-300">Web sitesi performans ve kullanıcı davranış analizi</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg"
          >
            <option value="1d">Son 1 Gün</option>
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 90 Gün</option>
          </select>
          
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isExpanded ? 'Daralt' : 'Genişlet'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <Badge className="bg-green-500">+12.5%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {mockData.pageViews.toLocaleString()}
            </h3>
            <p className="text-gray-300 text-sm">Sayfa Görüntüleme</p>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <Badge className="bg-green-500">+8.3%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {mockData.uniqueVisitors.toLocaleString()}
            </h3>
            <p className="text-gray-300 text-sm">Benzersiz Ziyaretçi</p>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <Badge className="bg-red-500">-2.1%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {mockData.bounceRate}%
            </h3>
            <p className="text-gray-300 text-sm">Bounce Rate</p>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-green-500">+5.7%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {mockData.conversionRate}%
            </h3>
            <p className="text-gray-300 text-sm">Dönüşüm Oranı</p>
          </div>
        </Card>
      </div>

      {/* Performance & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performans Skoru</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-white">
                {mockData.performanceScore}
              </div>
              <Badge className={cn(performanceLevel.bg, performanceLevel.color)}>
                {performanceLevel.level}
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${mockData.performanceScore}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Kullanıcı Katılımı</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Yüksek</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${mockData.userEngagement.high}%` }} />
                  </div>
                  <span className="text-white font-semibold">{mockData.userEngagement.high}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Orta</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${mockData.userEngagement.medium}%` }} />
                  </div>
                  <span className="text-white font-semibold">{mockData.userEngagement.medium}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Düşük</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${mockData.userEngagement.low}%` }} />
                  </div>
                  <span className="text-white font-semibold">{mockData.userEngagement.low}%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">En Popüler Sayfalar</h3>
              <div className="space-y-3">
                {mockData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-400 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{page.page}</div>
                        <div className="text-gray-400 text-sm">{page.unique} benzersiz</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{page.views}</div>
                      <div className="text-gray-400 text-sm">{page.bounce}% bounce</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Traffic Sources */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Trafik Kaynakları</h3>
              <div className="space-y-3">
                {mockData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                        <Globe className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{source.source}</div>
                        <div className="text-gray-400 text-sm">{source.percentage}%</div>
                      </div>
                    </div>
                    <div className="text-white font-semibold">{source.visitors}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Device Types */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cihaz Türleri</h3>
              <div className="space-y-3">
                {mockData.deviceTypes.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        {device.type === 'Desktop' ? <Monitor className="w-4 h-4 text-green-400" /> :
                         device.type === 'Mobile' ? <Smartphone className="w-4 h-4 text-green-400" /> :
                         <Tablet className="w-4 h-4 text-green-400" />}
                      </div>
                      <div>
                        <div className="text-white font-medium">{device.type}</div>
                        <div className="text-gray-400 text-sm">{device.percentage}%</div>
                      </div>
                    </div>
                    <div className="text-white font-semibold">{device.visitors}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Search Queries */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popüler Arama Terimleri</h3>
              <div className="space-y-3">
                {mockData.searchQueries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-orange-400 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{query.query}</div>
                        <div className="text-gray-400 text-sm">Pozisyon: {query.position}</div>
                      </div>
                    </div>
                    <div className="text-white font-semibold">{query.searches}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
