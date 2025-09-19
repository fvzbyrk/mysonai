'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Settings,
  User,
  Globe,
  Clock,
  Activity,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Ban,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SecurityEvent {
  id: string;
  type:
    | 'login'
    | 'logout'
    | 'failed_login'
    | 'password_change'
    | 'permission_change'
    | 'suspicious_activity'
    | 'data_access'
    | 'system_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'resolved' | 'investigating' | 'ignored' | 'pending';
  details?: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  type: 'password' | 'session' | 'access' | 'data' | 'network';
  isActive: boolean;
  rules: string[];
  createdAt: string;
  updatedAt: string;
}

interface SecurityReport {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  period: string;
  generatedAt: string;
  summary: {
    totalEvents: number;
    criticalEvents: number;
    resolvedEvents: number;
    pendingEvents: number;
  };
  topThreats: Array<{ threat: string; count: number }>;
  recommendations: string[];
}

export default function SecurityPage() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [reports, setReports] = useState<SecurityReport[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  // Mock data
  const mockEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'failed_login',
      severity: 'medium',
      description: 'Başarısız giriş denemesi - 5 kez yanlış şifre',
      user: 'unknown@example.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'investigating',
      details: 'IP adresi 5 farklı hesap için başarısız giriş denemesi yaptı',
    },
    {
      id: '2',
      type: 'suspicious_activity',
      severity: 'high',
      description: 'Şüpheli veri erişimi - Normal saatlerin dışında',
      user: 'admin@mysonai.com',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2024-01-15T02:15:00Z',
      status: 'pending',
      details: "Gece 02:15'te kullanıcı verilerine erişim",
    },
    {
      id: '3',
      type: 'password_change',
      severity: 'low',
      description: 'Şifre değiştirildi',
      user: 'user@example.com',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2024-01-15T10:20:00Z',
      status: 'resolved',
    },
    {
      id: '4',
      type: 'data_access',
      severity: 'medium',
      description: 'Toplu veri indirme işlemi',
      user: 'admin@mysonai.com',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'resolved',
      details: '1000+ kullanıcı verisi indirildi',
    },
    {
      id: '5',
      type: 'system_change',
      severity: 'high',
      description: 'Sistem ayarları değiştirildi',
      user: 'admin@mysonai.com',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2024-01-14T14:30:00Z',
      status: 'resolved',
      details: 'Güvenlik duvarı ayarları güncellendi',
    },
  ];

  const mockPolicies: SecurityPolicy[] = [
    {
      id: '1',
      name: 'Şifre Politikası',
      description: 'Güçlü şifre gereksinimleri ve değiştirme sıklığı',
      type: 'password',
      isActive: true,
      rules: [
        'Minimum 8 karakter',
        'Büyük ve küçük harf içermeli',
        'En az 1 rakam',
        'En az 1 özel karakter',
        '90 günde bir değiştirilmeli',
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z',
    },
    {
      id: '2',
      name: 'Oturum Yönetimi',
      description: 'Oturum süresi ve güvenlik ayarları',
      type: 'session',
      isActive: true,
      rules: [
        '30 dakika inaktivite sonrası oturum kapanır',
        'Maksimum 24 saat oturum süresi',
        'IP adresi değişikliğinde yeniden giriş gerekli',
        'Çoklu oturum kontrolü',
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z',
    },
    {
      id: '3',
      name: 'Veri Erişim Kontrolü',
      description: 'Veri erişimi ve yetkilendirme kuralları',
      type: 'data',
      isActive: true,
      rules: [
        'Sadece yetkili kullanıcılar veri erişebilir',
        'Tüm veri erişimi loglanır',
        'Toplu veri indirme onay gerektirir',
        'Kişisel veriler şifrelenir',
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z',
    },
  ];

  const mockReports: SecurityReport[] = [
    {
      id: '1',
      title: 'Günlük Güvenlik Raporu',
      type: 'daily',
      period: '2024-01-15',
      generatedAt: '2024-01-15T23:59:00Z',
      summary: {
        totalEvents: 15,
        criticalEvents: 2,
        resolvedEvents: 12,
        pendingEvents: 3,
      },
      topThreats: [
        { threat: 'Başarısız giriş denemeleri', count: 8 },
        { threat: 'Şüpheli IP aktivitesi', count: 3 },
        { threat: 'Veri erişim anomalileri', count: 2 },
      ],
      recommendations: [
        'IP kısıtlamaları güçlendirilmeli',
        'İki faktörlü kimlik doğrulama yaygınlaştırılmalı',
        'Anomali tespit algoritmaları güncellenmeli',
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading security data
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setPolicies(mockPolicies);
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter events
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        event =>
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(event => event.severity === selectedSeverity);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedType, selectedSeverity, selectedStatus]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <User className='w-4 h-4 text-green-400' />;
      case 'logout':
        return <User className='w-4 h-4 text-blue-400' />;
      case 'failed_login':
        return <XCircle className='w-4 h-4 text-red-400' />;
      case 'password_change':
        return <Key className='w-4 h-4 text-yellow-400' />;
      case 'permission_change':
        return <Shield className='w-4 h-4 text-purple-400' />;
      case 'suspicious_activity':
        return <AlertTriangle className='w-4 h-4 text-orange-400' />;
      case 'data_access':
        return <Database className='w-4 h-4 text-cyan-400' />;
      case 'system_change':
        return <Settings className='w-4 h-4 text-pink-400' />;
      default:
        return <Activity className='w-4 h-4 text-gray-400' />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Kritik</Badge>;
      case 'high':
        return (
          <Badge className='bg-orange-500/20 text-orange-400 border-orange-500/50'>Yüksek</Badge>
        );
      case 'medium':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Orta</Badge>
        );
      case 'low':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Düşük</Badge>;
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Çözüldü</Badge>
        );
      case 'investigating':
        return (
          <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>İnceleniyor</Badge>
        );
      case 'pending':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Beklemede</Badge>
        );
      case 'ignored':
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Yok Sayıldı</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'login':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Giriş</Badge>;
      case 'logout':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Çıkış</Badge>;
      case 'failed_login':
        return (
          <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Başarısız Giriş</Badge>
        );
      case 'password_change':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>
            Şifre Değişikliği
          </Badge>
        );
      case 'permission_change':
        return (
          <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>
            Yetki Değişikliği
          </Badge>
        );
      case 'suspicious_activity':
        return (
          <Badge className='bg-orange-500/20 text-orange-400 border-orange-500/50'>
            Şüpheli Aktivite
          </Badge>
        );
      case 'data_access':
        return (
          <Badge className='bg-cyan-500/20 text-cyan-400 border-cyan-500/50'>Veri Erişimi</Badge>
        );
      case 'system_change':
        return (
          <Badge className='bg-pink-500/20 text-pink-400 border-pink-500/50'>
            Sistem Değişikliği
          </Badge>
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
    });
  };

  const handleEventAction = (eventId: string, action: string) => {
    console.log(`Action: ${action} for event: ${eventId}`);
    // Implement event actions here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Güvenlik sistemi yükleniyor...</p>
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
              <h1 className='text-3xl font-bold text-white'>Güvenlik Yönetimi</h1>
              <p className='text-gray-300'>Güvenlik olayları, politikalar ve raporlar</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowReports(!showReports)}
            >
              <Download className='w-4 h-4 mr-2' />
              Raporlar
            </Button>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowCreatePolicy(true)}
            >
              <Plus className='w-4 h-4 mr-2' />
              Yeni Politika
            </Button>
            <Button className='bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 hover:from-red-700 hover:to-orange-700'>
              <Shield className='w-4 h-4 mr-2' />
              Güvenlik Taraması
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Olay</p>
                  <p className='text-2xl font-bold text-white'>{events.length}</p>
                </div>
                <Activity className='w-8 h-8 text-blue-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Kritik Olaylar</p>
                  <p className='text-2xl font-bold text-white'>
                    {events.filter(e => e.severity === 'critical' || e.severity === 'high').length}
                  </p>
                </div>
                <AlertTriangle className='w-8 h-8 text-red-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Çözülen</p>
                  <p className='text-2xl font-bold text-white'>
                    {events.filter(e => e.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className='w-8 h-8 text-green-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Aktif Politikalar</p>
                  <p className='text-2xl font-bold text-white'>
                    {policies.filter(p => p.isActive).length}
                  </p>
                </div>
                <Shield className='w-8 h-8 text-purple-400' />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Arama</label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <Input
                    placeholder='Güvenlik olayı ara...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10'
                  />
                </div>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Tip</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all' className='bg-gray-800'>
                    Tüm Tipler
                  </option>
                  <option value='login' className='bg-gray-800'>
                    Giriş
                  </option>
                  <option value='logout' className='bg-gray-800'>
                    Çıkış
                  </option>
                  <option value='failed_login' className='bg-gray-800'>
                    Başarısız Giriş
                  </option>
                  <option value='password_change' className='bg-gray-800'>
                    Şifre Değişikliği
                  </option>
                  <option value='suspicious_activity' className='bg-gray-800'>
                    Şüpheli Aktivite
                  </option>
                  <option value='data_access' className='bg-gray-800'>
                    Veri Erişimi
                  </option>
                  <option value='system_change' className='bg-gray-800'>
                    Sistem Değişikliği
                  </option>
                </select>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Önem</label>
                <select
                  value={selectedSeverity}
                  onChange={e => setSelectedSeverity(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all' className='bg-gray-800'>
                    Tüm Önemler
                  </option>
                  <option value='critical' className='bg-gray-800'>
                    Kritik
                  </option>
                  <option value='high' className='bg-gray-800'>
                    Yüksek
                  </option>
                  <option value='medium' className='bg-gray-800'>
                    Orta
                  </option>
                  <option value='low' className='bg-gray-800'>
                    Düşük
                  </option>
                </select>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Durum</label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all' className='bg-gray-800'>
                    Tüm Durumlar
                  </option>
                  <option value='resolved' className='bg-gray-800'>
                    Çözüldü
                  </option>
                  <option value='investigating' className='bg-gray-800'>
                    İnceleniyor
                  </option>
                  <option value='pending' className='bg-gray-800'>
                    Beklemede
                  </option>
                  <option value='ignored' className='bg-gray-800'>
                    Yok Sayıldı
                  </option>
                </select>
              </div>

              <div className='flex items-end'>
                <Button
                  variant='outline'
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedSeverity('all');
                    setSelectedStatus('all');
                  }}
                >
                  <Filter className='w-4 h-4 mr-2' />
                  Temizle
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Events List */}
        <div className='grid grid-cols-1 gap-6'>
          {filteredEvents.map(event => (
            <Card
              key={event.id}
              className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
            >
              <div className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center'>
                      {getTypeIcon(event.type)}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>{event.description}</h3>
                        {getTypeBadge(event.type)}
                        {getSeverityBadge(event.severity)}
                        {getStatusBadge(event.status)}
                      </div>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                        <div className='flex items-center'>
                          <User className='w-4 h-4 mr-1' />
                          {event.user}
                        </div>
                        <div className='flex items-center'>
                          <Globe className='w-4 h-4 mr-1' />
                          {event.ipAddress}
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {formatDate(event.timestamp)}
                        </div>
                      </div>

                      {event.details && (
                        <p className='text-gray-300 text-sm mb-3 bg-white/5 p-3 rounded-lg'>
                          <Info className='w-4 h-4 inline mr-2' />
                          {event.details}
                        </p>
                      )}

                      <div className='flex items-center space-x-4 text-gray-400 text-xs'>
                        <span>User Agent: {event.userAgent.substring(0, 50)}...</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => setSelectedEvent(event)}
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                    {event.status === 'pending' && (
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                        onClick={() => handleEventAction(event.id, 'resolve')}
                      >
                        <CheckCircle className='w-4 h-4' />
                      </Button>
                    )}
                    {event.status === 'investigating' && (
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-yellow-500/20 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/30'
                        onClick={() => handleEventAction(event.id, 'ignore')}
                      >
                        <XCircle className='w-4 h-4' />
                      </Button>
                    )}
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => handleEventAction(event.id, 'more')}
                    >
                      <Settings className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-12 text-center'>
              <Shield className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>
                {searchTerm ||
                selectedType !== 'all' ||
                selectedSeverity !== 'all' ||
                selectedStatus !== 'all'
                  ? 'Güvenlik olayı bulunamadı'
                  : 'Henüz güvenlik olayı yok'}
              </h3>
              <p className='text-gray-400 mb-6'>
                {searchTerm ||
                selectedType !== 'all' ||
                selectedSeverity !== 'all' ||
                selectedStatus !== 'all'
                  ? 'Arama kriterlerinize uygun güvenlik olayı bulunamadı.'
                  : 'Henüz hiç güvenlik olayı kaydedilmemiş.'}
              </p>
              <Button className='bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 hover:from-red-700 hover:to-orange-700'>
                <Shield className='w-4 h-4 mr-2' />
                Güvenlik Taraması Başlat
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
