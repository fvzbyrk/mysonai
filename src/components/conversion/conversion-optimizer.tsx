'use client';

import { useState, useEffect } from 'react';
import { useConversion } from '@/hooks/useConversion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Target,
  Users,
  DollarSign,
  MousePointer,
  FormInput,
  ShoppingCart,
  Exit,
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionOptimizerProps {
  showDetails?: boolean;
  enableABTesting?: boolean;
  enableRecommendations?: boolean;
  className?: string;
}

export function ConversionOptimizer({
  showDetails = false,
  enableABTesting = true,
  enableRecommendations = true,
  className,
}: ConversionOptimizerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const {
    conversions,
    conversionRate,
    funnelSteps,
    ctaPerformance,
    formAbandonment,
    cartAbandonment,
    exitIntent,
    revenue,
    averageOrderValue,
    customerLifetimeValue,
    getConversionReport,
  } = useConversion();

  // Mock data for demonstration
  const mockData = {
    conversions: 234,
    conversionRate: 12.8,
    revenue: 45678,
    averageOrderValue: 195.2,
    customerLifetimeValue: 487.5,
    funnelSteps: [
      { name: 'Ana Sayfa', visitors: 1000, conversions: 800, conversionRate: 80, dropOffRate: 20 },
      {
        name: 'Demo Sayfası',
        visitors: 800,
        conversions: 400,
        conversionRate: 50,
        dropOffRate: 50,
      },
      { name: 'Kayıt Formu', visitors: 400, conversions: 200, conversionRate: 50, dropOffRate: 50 },
      { name: 'Ödeme', visitors: 200, conversions: 100, conversionRate: 50, dropOffRate: 50 },
    ],
    ctaPerformance: [
      {
        text: 'Ücretsiz Deneyin',
        clicks: 1234,
        conversions: 156,
        conversionRate: 12.6,
        revenue: 30420,
      },
      {
        text: 'Hemen Başlayın',
        clicks: 892,
        conversions: 98,
        conversionRate: 11.0,
        revenue: 19110,
      },
      { text: 'Demo İzleyin', clicks: 567, conversions: 45, conversionRate: 7.9, revenue: 8775 },
      { text: 'İletişime Geçin', clicks: 234, conversions: 23, conversionRate: 9.8, revenue: 4485 },
    ],
    formAbandonment: 45,
    cartAbandonment: 23,
    exitIntent: 67,
    insights: [
      'Dönüşüm oranınız sektör ortalamasının üzerinde',
      'Form terk oranı yüksek - form alanlarını azaltın',
      "Exit-intent popup'ları ekleyin",
      'CTA metinlerini A/B test edin',
    ],
    recommendations: [
      "Form alanlarını 3'e düşürün",
      'Güven işaretleri ekleyin',
      'Sosyal kanıt ekleyin',
      "Exit-intent popup'ları ekleyin",
      'CTA renklerini test edin',
      'Progress bar ekleyin',
    ],
  };

  // Get trend indicator
  const getTrendIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    if (change > 5) {
      return { icon: ArrowUp, color: 'text-green-500', text: `+${change.toFixed(1)}%` };
    }
    if (change < -5) {
      return { icon: ArrowDown, color: 'text-red-500', text: `${change.toFixed(1)}%` };
    }
    return { icon: Minus, color: 'text-gray-500', text: `${change.toFixed(1)}%` };
  };

  // Get conversion level
  const getConversionLevel = (rate: number) => {
    if (rate >= 10) {
      return { level: 'Mükemmel', color: 'text-green-500', bg: 'bg-green-500/20' };
    }
    if (rate >= 5) {
      return { level: 'İyi', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    }
    if (rate >= 2) {
      return { level: 'Orta', color: 'text-orange-500', bg: 'bg-orange-500/20' };
    }
    return { level: 'Düşük', color: 'text-red-500', bg: 'bg-red-500/20' };
  };

  const conversionLevel = getConversionLevel(mockData.conversionRate);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-white'>Dönüşüm Optimizasyonu</h2>
          <p className='text-gray-300'>Dönüşüm oranınızı artırmak için öneriler ve analizler</p>
        </div>

        <div className='flex items-center space-x-2'>
          <select
            value={selectedMetric}
            onChange={e => setSelectedMetric(e.target.value)}
            className='px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg'
          >
            <option value='overview'>Genel Bakış</option>
            <option value='funnel'>Funnel Analizi</option>
            <option value='cta'>CTA Performansı</option>
            <option value='forms'>Form Analizi</option>
            <option value='ab'>A/B Testler</option>
          </select>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant='outline'
            className='border-white/20 text-white hover:bg-white/10'
          >
            {isExpanded ? 'Daralt' : 'Genişlet'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-2 bg-green-500/20 rounded-lg'>
                <TrendingUp className='w-6 h-6 text-green-400' />
              </div>
              <Badge className='bg-green-500'>+8.3%</Badge>
            </div>
            <h3 className='text-2xl font-bold text-white mb-1'>{mockData.conversionRate}%</h3>
            <p className='text-gray-300 text-sm'>Dönüşüm Oranı</p>
          </div>
        </Card>

        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-2 bg-blue-500/20 rounded-lg'>
                <Users className='w-6 h-6 text-blue-400' />
              </div>
              <Badge className='bg-green-500'>+12.5%</Badge>
            </div>
            <h3 className='text-2xl font-bold text-white mb-1'>
              {mockData.conversions.toLocaleString()}
            </h3>
            <p className='text-gray-300 text-sm'>Toplam Dönüşüm</p>
          </div>
        </Card>

        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-2 bg-purple-500/20 rounded-lg'>
                <DollarSign className='w-6 h-6 text-purple-400' />
              </div>
              <Badge className='bg-green-500'>+15.2%</Badge>
            </div>
            <h3 className='text-2xl font-bold text-white mb-1'>
              ${mockData.revenue.toLocaleString()}
            </h3>
            <p className='text-gray-300 text-sm'>Toplam Gelir</p>
          </div>
        </Card>

        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-2 bg-orange-500/20 rounded-lg'>
                <Target className='w-6 h-6 text-orange-400' />
              </div>
              <Badge className='bg-green-500'>+5.7%</Badge>
            </div>
            <h3 className='text-2xl font-bold text-white mb-1'>${mockData.averageOrderValue}</h3>
            <p className='text-gray-300 text-sm'>Ortalama Sipariş Değeri</p>
          </div>
        </Card>
      </div>

      {/* Conversion Level */}
      <Card className='bg-white/10 backdrop-blur-md border-white/20'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-white'>Dönüşüm Durumu</h3>
            <Badge className={cn(conversionLevel.bg, conversionLevel.color)}>
              {conversionLevel.level}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-3xl font-bold text-white'>{mockData.conversionRate}%</div>
            <div className='w-full max-w-xs bg-gray-700 rounded-full h-2 ml-4'>
              <div
                className='bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full'
                style={{ width: `${Math.min(mockData.conversionRate * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Funnel Analysis */}
      <Card className='bg-white/10 backdrop-blur-md border-white/20'>
        <div className='p-6'>
          <h3 className='text-lg font-semibold text-white mb-4'>Funnel Analizi</h3>
          <div className='space-y-4'>
            {mockData.funnelSteps.map((step, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-white/5 rounded-lg'
              >
                <div className='flex items-center'>
                  <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-4'>
                    <span className='text-purple-400 font-semibold text-sm'>{index + 1}</span>
                  </div>
                  <div>
                    <div className='text-white font-medium'>{step.name}</div>
                    <div className='text-gray-400 text-sm'>{step.visitors} ziyaretçi</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-white font-semibold'>{step.conversionRate}%</div>
                  <div className='text-gray-400 text-sm'>{step.dropOffRate}% terk</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* CTA Performance */}
      <Card className='bg-white/10 backdrop-blur-md border-white/20'>
        <div className='p-6'>
          <h3 className='text-lg font-semibold text-white mb-4'>CTA Performansı</h3>
          <div className='space-y-3'>
            {mockData.ctaPerformance.map((cta, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
              >
                <div className='flex items-center'>
                  <div className='w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3'>
                    <MousePointer className='w-4 h-4 text-blue-400' />
                  </div>
                  <div>
                    <div className='text-white font-medium'>{cta.text}</div>
                    <div className='text-gray-400 text-sm'>{cta.clicks} tıklama</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-white font-semibold'>{cta.conversionRate}%</div>
                  <div className='text-gray-400 text-sm'>${cta.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Insights & Recommendations */}
      {isExpanded && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>İçgörüler</h3>
              <div className='space-y-3'>
                {mockData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className='flex items-start p-3 bg-blue-500/10 rounded-lg border border-blue-500/20'
                  >
                    <Lightbulb className='w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0' />
                    <span className='text-blue-300 text-sm'>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>Öneriler</h3>
              <div className='space-y-3'>
                {mockData.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className='flex items-start p-3 bg-green-500/10 rounded-lg border border-green-500/20'
                  >
                    <CheckCircle className='w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0' />
                    <span className='text-green-300 text-sm'>{recommendation}</span>
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
