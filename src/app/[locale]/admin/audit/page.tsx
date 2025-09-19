'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FileText,
  User,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  ArrowLeft,
  Calendar,
  Activity,
  Database,
  Settings,
  Shield,
  Key,
  Globe,
  Mail,
  MessageSquare,
  CreditCard,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  ExternalLink,
  Copy,
  Play,
  Pause,
  Square,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  category:
    | 'authentication'
    | 'authorization'
    | 'data_access'
    | 'data_modification'
    | 'system_change'
    | 'security'
    | 'api'
    | 'user_management';
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  sessionId: string;
  requestId: string;
  duration?: number;
  errorMessage?: string;
}

interface AuditFilter {
  dateRange: {
    start: string;
    end: string;
  };
  users: string[];
  actions: string[];
  categories: string[];
  severity: string[];
  status: string[];
}

export default function AuditTrailPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15T14:30:00Z',
      user: 'admin@mysonai.com',
      action: 'CREATE',
      resource: 'Blog Post',
      resourceId: 'post_123',
      details: 'Yeni blog post oluşturuldu: "AI Teknolojilerinde Son Gelişmeler"',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium',
      category: 'data_modification',
      changes: [
        { field: 'title', oldValue: '', newValue: 'AI Teknolojilerinde Son Gelişmeler' },
        { field: 'status', oldValue: '', newValue: 'published' },
      ],
      sessionId: 'sess_abc123',
      requestId: 'req_xyz789',
      duration: 1250,
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:25:00Z',
      user: 'user@example.com',
      action: 'LOGIN',
      resource: 'Authentication',
      resourceId: 'auth_456',
      details: 'Kullanıcı giriş yaptı',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'low',
      category: 'authentication',
      sessionId: 'sess_def456',
      requestId: 'req_abc123',
      duration: 850,
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:20:00Z',
      user: 'admin@mysonai.com',
      action: 'UPDATE',
      resource: 'User',
      resourceId: 'user_789',
      details: 'Kullanıcı bilgileri güncellendi',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium',
      category: 'user_management',
      changes: [
        { field: 'role', oldValue: 'user', newValue: 'editor' },
        { field: 'permissions', oldValue: 'read', newValue: 'read,write' },
      ],
      sessionId: 'sess_ghi789',
      requestId: 'req_def456',
      duration: 2100,
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:15:00Z',
      user: 'unknown@example.com',
      action: 'LOGIN',
      resource: 'Authentication',
      resourceId: 'auth_789',
      details: 'Başarısız giriş denemesi - yanlış şifre',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      severity: 'high',
      category: 'authentication',
      sessionId: 'sess_jkl012',
      requestId: 'req_ghi789',
      duration: 500,
      errorMessage: 'Invalid password',
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:10:00Z',
      user: 'admin@mysonai.com',
      action: 'DELETE',
      resource: 'Blog Post',
      resourceId: 'post_456',
      details: 'Blog post silindi: "Eski Makale"',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'high',
      category: 'data_modification',
      changes: [{ field: 'status', oldValue: 'published', newValue: 'deleted' }],
      sessionId: 'sess_mno345',
      requestId: 'req_jkl012',
      duration: 1800,
    },
    {
      id: '6',
      timestamp: '2024-01-15T14:05:00Z',
      user: 'admin@mysonai.com',
      action: 'API_CALL',
      resource: 'Gemini API',
      resourceId: 'api_123',
      details: 'Gemini API çağrısı yapıldı',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'low',
      category: 'api',
      sessionId: 'sess_pqr678',
      requestId: 'req_mno345',
      duration: 3200,
    },
    {
      id: '7',
      timestamp: '2024-01-15T14:00:00Z',
      user: 'admin@mysonai.com',
      action: 'SYSTEM_CONFIG',
      resource: 'System Settings',
      resourceId: 'config_789',
      details: 'Sistem ayarları güncellendi',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'critical',
      category: 'system_change',
      changes: [
        { field: 'session_timeout', oldValue: '30', newValue: '60' },
        { field: 'max_upload_size', oldValue: '10485760', newValue: '20971520' },
      ],
      sessionId: 'sess_stu901',
      requestId: 'req_pqr678',
      duration: 1500,
    },
  ];

  useEffect(() => {
    // Simulate loading audit logs
    setTimeout(() => {
      setAuditLogs(mockAuditLogs);
      setFilteredLogs(mockAuditLogs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter audit logs
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(
        log =>
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(log => log.category === selectedCategory);
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(log => log.status === selectedStatus);
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return logDate >= startDate && logDate <= endDate;
      });
    }

    setFilteredLogs(filtered);
  }, [auditLogs, searchTerm, selectedCategory, selectedSeverity, selectedStatus, dateRange]);

  const categories = [
    { value: 'all', label: 'Tümü', icon: Activity },
    { value: 'authentication', label: 'Kimlik Doğrulama', icon: Shield },
    { value: 'authorization', label: 'Yetkilendirme', icon: Key },
    { value: 'data_access', label: 'Veri Erişimi', icon: Database },
    { value: 'data_modification', label: 'Veri Değişikliği', icon: Edit },
    { value: 'system_change', label: 'Sistem Değişikliği', icon: Settings },
    { value: 'security', label: 'Güvenlik', icon: Shield },
    { value: 'api', label: 'API', icon: Globe },
    { value: 'user_management', label: 'Kullanıcı Yönetimi', icon: User },
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData ? categoryData.icon : Activity;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Başarılı</Badge>
        );
      case 'failed':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Başarısız</Badge>;
      case 'warning':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Uyarı</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
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

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATE':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Oluştur</Badge>
        );
      case 'READ':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Oku</Badge>;
      case 'UPDATE':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Güncelle</Badge>
        );
      case 'DELETE':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Sil</Badge>;
      case 'LOGIN':
        return (
          <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>Giriş</Badge>
        );
      case 'LOGOUT':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Çıkış</Badge>;
      case 'API_CALL':
        return (
          <Badge className='bg-cyan-500/20 text-cyan-400 border-cyan-500/50'>API Çağrısı</Badge>
        );
      case 'SYSTEM_CONFIG':
        return (
          <Badge className='bg-pink-500/20 text-pink-400 border-pink-500/50'>Sistem Ayarı</Badge>
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

  const formatDuration = (duration: number) => {
    if (duration < 1000) {
      return `${duration}ms`;
    }
    return `${(duration / 1000).toFixed(2)}s`;
  };

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
    // Implement export logic here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Audit logları yükleniyor...</p>
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
              <h1 className='text-3xl font-bold text-white'>Audit Trail</h1>
              <p className='text-gray-300'>Sistem aktiviteleri ve değişiklik kayıtları</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className='w-4 h-4 mr-2' />
              Filtreler
            </Button>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={handleExportLogs}
            >
              <Download className='w-4 h-4 mr-2' />
              Dışa Aktar
            </Button>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Yenile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Log</p>
                  <p className='text-2xl font-bold text-white'>{auditLogs.length}</p>
                </div>
                <FileText className='w-8 h-8 text-blue-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Başarılı</p>
                  <p className='text-2xl font-bold text-white'>
                    {auditLogs.filter(l => l.status === 'success').length}
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
                  <p className='text-gray-300 text-sm'>Başarısız</p>
                  <p className='text-2xl font-bold text-white'>
                    {auditLogs.filter(l => l.status === 'failed').length}
                  </p>
                </div>
                <XCircle className='w-8 h-8 text-red-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Kritik</p>
                  <p className='text-2xl font-bold text-white'>
                    {auditLogs.filter(l => l.severity === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className='w-8 h-8 text-red-400' />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Arama</label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <Input
                    placeholder='Log ara...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10'
                  />
                </div>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value} className='bg-gray-800'>
                      {category.label}
                    </option>
                  ))}
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
                  <option value='success' className='bg-gray-800'>
                    Başarılı
                  </option>
                  <option value='failed' className='bg-gray-800'>
                    Başarısız
                  </option>
                  <option value='warning' className='bg-gray-800'>
                    Uyarı
                  </option>
                </select>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Başlangıç</label>
                <Input
                  type='date'
                  value={dateRange.start}
                  onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className='bg-white/10 border-white/20 text-white'
                />
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Bitiş</label>
                <Input
                  type='date'
                  value={dateRange.end}
                  onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className='bg-white/10 border-white/20 text-white'
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Audit Logs List */}
        <div className='grid grid-cols-1 gap-6'>
          {filteredLogs.map(log => (
            <Card
              key={log.id}
              className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
            >
              <div className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center'>
                      {React.createElement(getCategoryIcon(log.category), {
                        className: 'w-6 h-6 text-purple-400',
                      })}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>
                          {log.action} - {log.resource}
                        </h3>
                        {getActionBadge(log.action)}
                        {getStatusBadge(log.status)}
                        {getSeverityBadge(log.severity)}
                      </div>

                      <p className='text-gray-300 text-sm mb-3'>{log.details}</p>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                        <div className='flex items-center'>
                          <User className='w-4 h-4 mr-1' />
                          {log.user}
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {formatDate(log.timestamp)}
                        </div>
                        <div className='flex items-center'>
                          <Globe className='w-4 h-4 mr-1' />
                          {log.ipAddress}
                        </div>
                        {log.duration && (
                          <div className='flex items-center'>
                            <Activity className='w-4 h-4 mr-1' />
                            {formatDuration(log.duration)}
                          </div>
                        )}
                      </div>

                      {log.changes && log.changes.length > 0 && (
                        <div className='bg-white/5 p-3 rounded-lg mb-3'>
                          <h4 className='text-white text-sm font-semibold mb-2'>Değişiklikler:</h4>
                          <div className='space-y-2'>
                            {log.changes.map((change, index) => (
                              <div key={index} className='flex items-center space-x-2 text-sm'>
                                <span className='text-gray-400'>{change.field}:</span>
                                <span className='text-red-400 line-through'>{change.oldValue}</span>
                                <span className='text-gray-400'>→</span>
                                <span className='text-green-400'>{change.newValue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {log.errorMessage && (
                        <div className='bg-red-500/10 border border-red-500/20 p-3 rounded-lg mb-3'>
                          <div className='flex items-center space-x-2'>
                            <XCircle className='w-4 h-4 text-red-400' />
                            <span className='text-red-400 text-sm font-semibold'>Hata:</span>
                          </div>
                          <p className='text-red-300 text-sm mt-1'>{log.errorMessage}</p>
                        </div>
                      )}

                      <div className='flex items-center space-x-4 text-gray-400 text-xs'>
                        <span>Session: {log.sessionId}</span>
                        <span>Request: {log.requestId}</span>
                        <span>Resource ID: {log.resourceId}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => setSelectedLog(log)}
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                    >
                      <Copy className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-12 text-center'>
              <FileText className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>
                {searchTerm ||
                selectedCategory !== 'all' ||
                selectedSeverity !== 'all' ||
                selectedStatus !== 'all'
                  ? 'Audit log bulunamadı'
                  : 'Henüz audit log yok'}
              </h3>
              <p className='text-gray-400 mb-6'>
                {searchTerm ||
                selectedCategory !== 'all' ||
                selectedSeverity !== 'all' ||
                selectedStatus !== 'all'
                  ? 'Arama kriterlerinize uygun audit log bulunamadı.'
                  : 'Henüz hiç audit log kaydedilmemiş.'}
              </p>
              <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
                <RefreshCw className='w-4 h-4 mr-2' />
                Logları Yenile
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
