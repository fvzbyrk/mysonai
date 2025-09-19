'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ArrowLeft,
  RefreshCw,
  Download,
  Settings,
  Play,
  Pause,
  Square,
  Zap,
  Shield,
  Monitor,
  Smartphone,
  Cloud,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Eye,
  EyeOff,
  Filter,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
  lastUpdated: string;
  description: string;
}

interface ServerHealth {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: number;
  lastCheck: string;
  location: string;
  version: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  details?: string;
  tags: string[];
}

interface APIMetric {
  endpoint: string;
  method: string;
  requests: number;
  avgResponseTime: number;
  errorRate: number;
  successRate: number;
  lastHour: number;
}

export default function PerformanceMonitoringPage() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [servers, setServers] = useState<ServerHealth[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [apiMetrics, setApiMetrics] = useState<APIMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [selectedLogLevel, setSelectedLogLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRealTime, setIsRealTime] = useState(true);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  // Mock data
  const mockMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'CPU Kullanımı',
      value: 45.2,
      unit: '%',
      status: 'healthy',
      trend: 'up',
      threshold: { warning: 70, critical: 90 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'İşlemci kullanım oranı',
    },
    {
      id: '2',
      name: 'Bellek Kullanımı',
      value: 67.8,
      unit: '%',
      status: 'warning',
      trend: 'up',
      threshold: { warning: 80, critical: 95 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'RAM kullanım oranı',
    },
    {
      id: '3',
      name: 'Disk Kullanımı',
      value: 34.5,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      threshold: { warning: 85, critical: 95 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'Disk alanı kullanım oranı',
    },
    {
      id: '4',
      name: 'Ağ Trafiği',
      value: 12.3,
      unit: 'Mbps',
      status: 'healthy',
      trend: 'down',
      threshold: { warning: 100, critical: 150 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'Ağ bant genişliği kullanımı',
    },
    {
      id: '5',
      name: 'Veritabanı Bağlantıları',
      value: 23,
      unit: 'connections',
      status: 'healthy',
      trend: 'stable',
      threshold: { warning: 80, critical: 100 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'Aktif veritabanı bağlantı sayısı',
    },
    {
      id: '6',
      name: 'API Yanıt Süresi',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      trend: 'down',
      threshold: { warning: 1000, critical: 2000 },
      lastUpdated: '2024-01-15T14:30:00Z',
      description: 'Ortalama API yanıt süresi',
    },
  ];

  const mockServers: ServerHealth[] = [
    {
      id: '1',
      name: 'Web Server 1',
      status: 'online',
      cpu: 45.2,
      memory: 67.8,
      disk: 34.5,
      network: 12.3,
      uptime: 99.9,
      lastCheck: '2024-01-15T14:30:00Z',
      location: 'Istanbul, Turkey',
      version: '2.1.0',
    },
    {
      id: '2',
      name: 'Database Server',
      status: 'online',
      cpu: 23.1,
      memory: 45.6,
      disk: 67.8,
      network: 8.9,
      uptime: 99.8,
      lastCheck: '2024-01-15T14:30:00Z',
      location: 'Istanbul, Turkey',
      version: '1.5.2',
    },
    {
      id: '3',
      name: 'Cache Server',
      status: 'online',
      cpu: 12.4,
      memory: 23.7,
      disk: 45.2,
      network: 5.6,
      uptime: 99.9,
      lastCheck: '2024-01-15T14:30:00Z',
      location: 'Istanbul, Turkey',
      version: '3.0.1',
    },
    {
      id: '4',
      name: 'Backup Server',
      status: 'maintenance',
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0,
      uptime: 0,
      lastCheck: '2024-01-15T14:00:00Z',
      location: 'Istanbul, Turkey',
      version: '1.0.0',
    },
  ];

  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15T14:30:00Z',
      level: 'info',
      source: 'Web Server',
      message: 'Request processed successfully',
      details: 'GET /api/blog - 200 OK - 245ms',
      tags: ['api', 'success'],
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:29:45Z',
      level: 'warning',
      source: 'Database',
      message: 'High memory usage detected',
      details: 'Memory usage: 85% - Consider optimization',
      tags: ['database', 'memory', 'warning'],
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:29:30Z',
      level: 'error',
      source: 'API Gateway',
      message: 'Failed to connect to external service',
      details: 'Connection timeout to Gemini API - 5000ms',
      tags: ['api', 'external', 'timeout'],
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:29:15Z',
      level: 'info',
      source: 'Cache Server',
      message: 'Cache hit rate improved',
      details: 'Hit rate: 95% - Performance optimized',
      tags: ['cache', 'performance'],
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:29:00Z',
      level: 'critical',
      source: 'Database',
      message: 'Connection pool exhausted',
      details: 'No available connections - Service degraded',
      tags: ['database', 'critical', 'connections'],
    },
  ];

  const mockAPIMetrics: APIMetric[] = [
    {
      endpoint: '/api/blog',
      method: 'GET',
      requests: 1234,
      avgResponseTime: 245,
      errorRate: 0.5,
      successRate: 99.5,
      lastHour: 156,
    },
    {
      endpoint: '/api/chat',
      method: 'POST',
      requests: 567,
      avgResponseTime: 1200,
      errorRate: 2.1,
      successRate: 97.9,
      lastHour: 78,
    },
    {
      endpoint: '/api/admin/auth',
      method: 'POST',
      requests: 89,
      avgResponseTime: 180,
      errorRate: 0,
      successRate: 100,
      lastHour: 12,
    },
    {
      endpoint: '/api/auto-blog',
      method: 'POST',
      requests: 45,
      avgResponseTime: 5000,
      errorRate: 8.9,
      successRate: 91.1,
      lastHour: 6,
    },
  ];

  useEffect(() => {
    // Simulate loading performance data
    setTimeout(() => {
      setMetrics(mockMetrics);
      setServers(mockServers);
      setLogs(mockLogs);
      setApiMetrics(mockAPIMetrics);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!isRealTime) {
      return;
    }

    const interval = setInterval(() => {
      setMetrics(prev =>
        prev.map(metric => ({
          ...metric,
          value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 5)),
          lastUpdated: new Date().toISOString(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className='w-4 h-4 text-green-400' />;
      case 'warning':
        return <AlertTriangle className='w-4 h-4 text-yellow-400' />;
      case 'critical':
        return <XCircle className='w-4 h-4 text-red-400' />;
      default:
        return <Info className='w-4 h-4 text-gray-400' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Sağlıklı</Badge>
        );
      case 'warning':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Uyarı</Badge>
        );
      case 'critical':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Kritik</Badge>;
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className='w-4 h-4 text-red-400' />;
      case 'down':
        return <TrendingDown className='w-4 h-4 text-green-400' />;
      case 'stable':
        return <Minus className='w-4 h-4 text-gray-400' />;
      default:
        return <Minus className='w-4 h-4 text-gray-400' />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Info</Badge>;
      case 'warning':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Warning</Badge>
        );
      case 'error':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Error</Badge>;
      case 'critical':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Critical</Badge>;
      default:
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Unknown</Badge>;
    }
  };

  const getServerStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Çevrimiçi</Badge>
        );
      case 'offline':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Çevrimdışı</Badge>;
      case 'maintenance':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Bakım</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatUptime = (uptime: number) => {
    return `${uptime}%`;
  };

  const filteredLogs = logs.filter(log => {
    if (selectedLogLevel !== 'all' && log.level !== selectedLogLevel) {
      return false;
    }
    if (searchTerm && !log.message.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Performans verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/tr/admin'>
              <Button
                variant='outline'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className='text-3xl font-bold text-white'>Performans İzleme</h1>
              <p className='text-gray-300'>
                Sistem sağlığı, kaynak kullanımı ve gerçek zamanlı loglar
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className={cn(
                isRealTime
                  ? 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              )}
              onClick={() => setIsRealTime(!isRealTime)}
            >
              {isRealTime ? <Pause className='w-4 h-4 mr-2' /> : <Play className='w-4 h-4 mr-2' />}
              {isRealTime ? 'Duraklat' : 'Başlat'}
            </Button>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
            >
              <Download className='w-4 h-4 mr-2' />
              Rapor İndir
            </Button>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Yenile
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {metrics.map(metric => (
            <Card key={metric.id} className='bg-white/10 backdrop-blur-md border-white/20'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    {getStatusIcon(metric.status)}
                    <h3 className='text-lg font-semibold text-white'>{metric.name}</h3>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {getStatusBadge(metric.status)}
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>

                <div className='text-3xl font-bold text-white mb-2'>
                  {metric.value}
                  {metric.unit}
                </div>

                <div className='w-full bg-gray-700 rounded-full h-2 mb-3'>
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      metric.status === 'healthy'
                        ? 'bg-green-500'
                        : metric.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    )}
                    style={{ width: `${Math.min(100, metric.value)}%` }}
                  ></div>
                </div>

                <div className='flex items-center justify-between text-gray-400 text-sm'>
                  <span>{metric.description}</span>
                  <span>Son güncelleme: {formatDate(metric.lastUpdated)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Server Health */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-white mb-6'>Sunucu Sağlığı</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {servers.map(server => (
                <div key={server.id} className='bg-white/5 p-4 rounded-lg'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-lg font-semibold text-white'>{server.name}</h3>
                    {getServerStatusBadge(server.status)}
                  </div>

                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>CPU:</span>
                      <span className='text-white'>{server.cpu}%</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Bellek:</span>
                      <span className='text-white'>{server.memory}%</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Disk:</span>
                      <span className='text-white'>{server.disk}%</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Ağ:</span>
                      <span className='text-white'>{server.network} Mbps</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Uptime:</span>
                      <span className='text-white'>{formatUptime(server.uptime)}</span>
                    </div>
                  </div>

                  <div className='mt-3 pt-3 border-t border-white/10'>
                    <div className='flex items-center justify-between text-xs text-gray-400'>
                      <span>{server.location}</span>
                      <span>v{server.version}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* API Metrics */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-white mb-6'>API Metrikleri</h2>
            <div className='space-y-4'>
              {apiMetrics.map((api, index) => (
                <div key={index} className='bg-white/5 p-4 rounded-lg'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center space-x-3'>
                      <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>
                        {api.method}
                      </Badge>
                      <span className='text-white font-semibold'>{api.endpoint}</span>
                    </div>
                    <div className='flex items-center space-x-4 text-sm'>
                      <span className='text-gray-400'>
                        İstekler: <span className='text-white'>{api.requests}</span>
                      </span>
                      <span className='text-gray-400'>
                        Son saat: <span className='text-white'>{api.lastHour}</span>
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Ortalama Yanıt:</span>
                      <span className='text-white'>{api.avgResponseTime}ms</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Başarı Oranı:</span>
                      <span className='text-green-400'>{api.successRate}%</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Hata Oranı:</span>
                      <span className='text-red-400'>{api.errorRate}%</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400'>Durum:</span>
                      <span
                        className={cn(
                          api.successRate > 95
                            ? 'text-green-400'
                            : api.successRate > 90
                              ? 'text-yellow-400'
                              : 'text-red-400'
                        )}
                      >
                        {api.successRate > 95
                          ? 'Sağlıklı'
                          : api.successRate > 90
                            ? 'Uyarı'
                            : 'Kritik'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Real-time Logs */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-white'>Gerçek Zamanlı Loglar</h2>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <Input
                    placeholder='Log ara...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10 w-64'
                  />
                </div>
                <select
                  value={selectedLogLevel}
                  onChange={e => setSelectedLogLevel(e.target.value)}
                  className='bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all' className='bg-gray-800'>
                    Tüm Seviyeler
                  </option>
                  <option value='info' className='bg-gray-800'>
                    Info
                  </option>
                  <option value='warning' className='bg-gray-800'>
                    Warning
                  </option>
                  <option value='error' className='bg-gray-800'>
                    Error
                  </option>
                  <option value='critical' className='bg-gray-800'>
                    Critical
                  </option>
                </select>
              </div>
            </div>

            <div className='space-y-3 max-h-96 overflow-y-auto'>
              {filteredLogs.map(log => (
                <div key={log.id} className='bg-white/5 p-4 rounded-lg flex items-start space-x-4'>
                  <div className='flex-shrink-0'>{getLogLevelBadge(log.level)}</div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center space-x-3 mb-2'>
                      <span className='text-white font-semibold'>{log.source}</span>
                      <span className='text-gray-400 text-sm'>{formatDate(log.timestamp)}</span>
                    </div>

                    <p className='text-gray-300 text-sm mb-2'>{log.message}</p>

                    {log.details && <p className='text-gray-400 text-xs mb-2'>{log.details}</p>}

                    <div className='flex flex-wrap gap-2'>
                      {log.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='bg-white/10 border-white/30 text-white text-xs'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
