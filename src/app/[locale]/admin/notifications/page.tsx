'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Settings,
  Users,
  Calendar,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Filter,
  Search,
  Clock,
  User,
  Globe,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  targetAudience: 'all' | 'admins' | 'users' | 'specific';
  targetUsers?: string[];
  channels: ('in-app' | 'email' | 'sms' | 'push')[];
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
  readCount: number;
  clickCount: number;
  deliveryRate: number;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  channels: string[];
  isActive: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Mock data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Yeni Makale Yayınlandı',
      message: 'AI Teknolojilerinde Son Gelişmeler başlıklı makale yayınlandı.',
      type: 'info',
      priority: 'medium',
      status: 'sent',
      targetAudience: 'all',
      channels: ['in-app', 'email'],
      sentAt: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'MySonAI',
      readCount: 45,
      clickCount: 12,
      deliveryRate: 98.5,
    },
    {
      id: '2',
      title: 'Sistem Bakımı',
      message: 'Sistem bakımı 20 Ocak 2024 tarihinde 02:00-04:00 saatleri arasında yapılacaktır.',
      type: 'warning',
      priority: 'high',
      status: 'scheduled',
      targetAudience: 'all',
      channels: ['in-app', 'email', 'push'],
      scheduledAt: '2024-01-20T02:00:00Z',
      createdAt: '2024-01-15T09:00:00Z',
      createdBy: 'Admin',
      readCount: 0,
      clickCount: 0,
      deliveryRate: 0,
    },
    {
      id: '3',
      title: 'Hoş Geldiniz',
      message: 'MySonAI platformuna hoş geldiniz! İlk makalenizi oluşturmaya başlayabilirsiniz.',
      type: 'success',
      priority: 'low',
      status: 'sent',
      targetAudience: 'users',
      channels: ['in-app', 'email'],
      sentAt: '2024-01-14T15:30:00Z',
      createdAt: '2024-01-14T15:00:00Z',
      createdBy: 'System',
      readCount: 23,
      clickCount: 8,
      deliveryRate: 95.2,
    },
    {
      id: '4',
      title: 'Güvenlik Uyarısı',
      message: 'Hesabınızda şüpheli aktivite tespit edildi. Lütfen şifrenizi değiştirin.',
      type: 'error',
      priority: 'urgent',
      status: 'sent',
      targetAudience: 'specific',
      targetUsers: ['user123'],
      channels: ['in-app', 'email', 'sms'],
      sentAt: '2024-01-13T14:20:00Z',
      createdAt: '2024-01-13T14:00:00Z',
      createdBy: 'Security System',
      readCount: 1,
      clickCount: 1,
      deliveryRate: 100,
    },
  ];

  const mockTemplates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'Makale Yayın Bildirimi',
      title: 'Yeni Makale: {{title}}',
      message: '{{author}} tarafından {{category}} kategorisinde yeni bir makale yayınlandı.',
      type: 'info',
      channels: ['in-app', 'email'],
      isActive: true,
      createdAt: '2024-01-10T00:00:00Z',
    },
    {
      id: '2',
      name: 'Sistem Bakım Bildirimi',
      title: 'Sistem Bakımı: {{date}}',
      message: 'Sistem bakımı {{date}} tarihinde {{time}} saatleri arasında yapılacaktır.',
      type: 'warning',
      channels: ['in-app', 'email', 'push'],
      isActive: true,
      createdAt: '2024-01-08T00:00:00Z',
    },
    {
      id: '3',
      name: 'Hoş Geldin Mesajı',
      title: 'Hoş Geldiniz!',
      message: '{{userName}} kullanıcısı, MySonAI platformuna hoş geldiniz!',
      type: 'success',
      channels: ['in-app', 'email'],
      isActive: true,
      createdAt: '2024-01-05T00:00:00Z',
    },
  ];

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setTemplates(mockTemplates);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter notifications
    let filtered = notifications;

    if (searchTerm) {
      filtered = filtered.filter(
        notification =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(notification => notification.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(notification => notification.status === selectedStatus);
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, selectedType, selectedStatus]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className='w-4 h-4 text-blue-400' />;
      case 'success':
        return <CheckCircle className='w-4 h-4 text-green-400' />;
      case 'warning':
        return <AlertTriangle className='w-4 h-4 text-yellow-400' />;
      case 'error':
        return <X className='w-4 h-4 text-red-400' />;
      default:
        return <Bell className='w-4 h-4 text-gray-400' />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'info':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Bilgi</Badge>;
      case 'success':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Başarı</Badge>;
      case 'warning':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Uyarı</Badge>
        );
      case 'error':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Hata</Badge>;
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Gönderildi</Badge>
        );
      case 'scheduled':
        return (
          <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Zamanlanmış</Badge>
        );
      case 'draft':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Taslak</Badge>;
      case 'failed':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Başarısız</Badge>;
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Acil</Badge>;
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'in-app':
        return <Monitor className='w-4 h-4 text-blue-400' />;
      case 'email':
        return <Mail className='w-4 h-4 text-green-400' />;
      case 'sms':
        return <Smartphone className='w-4 h-4 text-purple-400' />;
      case 'push':
        return <Bell className='w-4 h-4 text-orange-400' />;
      default:
        return <Globe className='w-4 h-4 text-gray-400' />;
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

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log(`Action: ${action} for notification: ${notificationId}`);
    // Implement notification actions here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Bildirim sistemi yükleniyor...</p>
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
              <h1 className='text-3xl font-bold text-white'>Bildirim Sistemi</h1>
              <p className='text-gray-300'>Kullanıcılara bildirim gönderin ve yönetin</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <Settings className='w-4 h-4 mr-2' />
              Şablonlar
            </Button>
            <Button
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className='w-4 h-4 mr-2' />
              Yeni Bildirim
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Bildirim</p>
                  <p className='text-2xl font-bold text-white'>{notifications.length}</p>
                </div>
                <Bell className='w-8 h-8 text-blue-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Gönderilen</p>
                  <p className='text-2xl font-bold text-white'>
                    {notifications.filter(n => n.status === 'sent').length}
                  </p>
                </div>
                <Send className='w-8 h-8 text-green-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Zamanlanmış</p>
                  <p className='text-2xl font-bold text-white'>
                    {notifications.filter(n => n.status === 'scheduled').length}
                  </p>
                </div>
                <Calendar className='w-8 h-8 text-yellow-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Ortalama Okuma</p>
                  <p className='text-2xl font-bold text-white'>
                    {notifications.length > 0
                      ? Math.round(
                          notifications.reduce((sum, n) => sum + n.readCount, 0) /
                            notifications.length
                        )
                      : 0}
                    %
                  </p>
                </div>
                <Eye className='w-8 h-8 text-purple-400' />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Arama</label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <Input
                    placeholder='Bildirim ara...'
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
                  <option value='info' className='bg-gray-800'>
                    Bilgi
                  </option>
                  <option value='success' className='bg-gray-800'>
                    Başarı
                  </option>
                  <option value='warning' className='bg-gray-800'>
                    Uyarı
                  </option>
                  <option value='error' className='bg-gray-800'>
                    Hata
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
                  <option value='sent' className='bg-gray-800'>
                    Gönderildi
                  </option>
                  <option value='scheduled' className='bg-gray-800'>
                    Zamanlanmış
                  </option>
                  <option value='draft' className='bg-gray-800'>
                    Taslak
                  </option>
                  <option value='failed' className='bg-gray-800'>
                    Başarısız
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

        {/* Notifications List */}
        <div className='grid grid-cols-1 gap-6'>
          {filteredNotifications.map(notification => (
            <Card
              key={notification.id}
              className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
            >
              <div className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center'>
                      {getTypeIcon(notification.type)}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>{notification.title}</h3>
                        {getTypeBadge(notification.type)}
                        {getStatusBadge(notification.status)}
                        {getPriorityBadge(notification.priority)}
                      </div>

                      <p className='text-gray-300 text-sm mb-3 line-clamp-2'>
                        {notification.message}
                      </p>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                        <div className='flex items-center'>
                          <User className='w-4 h-4 mr-1' />
                          {notification.createdBy}
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {formatDate(notification.createdAt)}
                        </div>
                        <div className='flex items-center'>
                          <Eye className='w-4 h-4 mr-1' />
                          {notification.readCount} okundu
                        </div>
                        <div className='flex items-center'>
                          <Send className='w-4 h-4 mr-1' />
                          {notification.clickCount} tıklandı
                        </div>
                        <div className='flex items-center'>
                          <CheckCircle className='w-4 h-4 mr-1' />%{notification.deliveryRate}{' '}
                          teslimat
                        </div>
                      </div>

                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-400 text-sm'>Kanal:</span>
                          {notification.channels.map((channel, index) => (
                            <div key={index} className='flex items-center space-x-1'>
                              {getChannelIcon(channel)}
                              <span className='text-white text-sm'>{channel}</span>
                            </div>
                          ))}
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-400 text-sm'>Hedef:</span>
                          <Badge
                            variant='outline'
                            className='bg-white/10 border-white/30 text-white'
                          >
                            {notification.targetAudience === 'all'
                              ? 'Tümü'
                              : notification.targetAudience === 'admins'
                                ? 'Adminler'
                                : notification.targetAudience === 'users'
                                  ? 'Kullanıcılar'
                                  : 'Belirli'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => setSelectedNotification(notification)}
                    >
                      <Eye className='w-4 h-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => handleNotificationAction(notification.id, 'edit')}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                      onClick={() => handleNotificationAction(notification.id, 'delete')}
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-12 text-center'>
              <Bell className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                  ? 'Bildirim bulunamadı'
                  : 'Henüz bildirim yok'}
              </h3>
              <p className='text-gray-400 mb-6'>
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                  ? 'Arama kriterlerinize uygun bildirim bulunamadı.'
                  : 'Henüz hiç bildirim gönderilmemiş.'}
              </p>
              <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
                <Plus className='w-4 h-4 mr-2' />
                İlk Bildirimi Oluştur
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
