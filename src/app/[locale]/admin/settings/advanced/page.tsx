'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Settings,
  Database,
  Server,
  Key,
  Globe,
  Mail,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Save,
  Trash2,
  Plus,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  User,
  Bell,
  Zap,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SystemSetting {
  id: string;
  category: 'general' | 'api' | 'security' | 'performance' | 'backup' | 'integration';
  name: string;
  value: string;
  type: 'text' | 'password' | 'number' | 'boolean' | 'select' | 'textarea';
  description: string;
  isRequired: boolean;
  options?: string[];
  isEncrypted: boolean;
  lastModified: string;
  modifiedBy: string;
}

interface Backup {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  createdAt: string;
  status: 'completed' | 'failed' | 'in_progress';
  description: string;
  downloadUrl?: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  type: 'public' | 'private' | 'webhook';
  permissions: string[];
  isActive: boolean;
  lastUsed?: string;
  createdAt: string;
  expiresAt?: string;
}

export default function AdvancedSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [showCreateBackup, setShowCreateBackup] = useState(false);
  const [showCreateAPIKey, setShowCreateAPIKey] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  // Mock data
  const mockSettings: SystemSetting[] = [
    {
      id: '1',
      category: 'general',
      name: 'Site Adı',
      value: 'MySonAI',
      type: 'text',
      description: 'Web sitesinin genel adı',
      isRequired: true,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '2',
      category: 'general',
      name: 'Site URL',
      value: 'https://www.mysonai.com',
      type: 'text',
      description: "Web sitesinin ana URL'i",
      isRequired: true,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '3',
      category: 'general',
      name: 'Site Açıklaması',
      value: 'AI destekli blog platformu',
      type: 'textarea',
      description: 'Web sitesinin meta açıklaması',
      isRequired: false,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '4',
      category: 'api',
      name: 'Gemini API Key',
      value: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
      type: 'password',
      description: 'Google Gemini API anahtarı',
      isRequired: true,
      isEncrypted: true,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '5',
      category: 'api',
      name: 'OpenAI API Key',
      value: 'sk-...',
      type: 'password',
      description: 'OpenAI API anahtarı',
      isRequired: false,
      isEncrypted: true,
      lastModified: '2024-01-14T15:30:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '6',
      category: 'security',
      name: 'JWT Secret',
      value: 'your-secret-key',
      type: 'password',
      description: 'JWT token imzalama anahtarı',
      isRequired: true,
      isEncrypted: true,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '7',
      category: 'security',
      name: 'Session Timeout',
      value: '30',
      type: 'number',
      description: 'Oturum zaman aşımı (dakika)',
      isRequired: true,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '8',
      category: 'performance',
      name: 'Cache Duration',
      value: '3600',
      type: 'number',
      description: 'Önbellek süresi (saniye)',
      isRequired: true,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
    {
      id: '9',
      category: 'performance',
      name: 'Max Upload Size',
      value: '10485760',
      type: 'number',
      description: 'Maksimum dosya yükleme boyutu (byte)',
      isRequired: true,
      isEncrypted: false,
      lastModified: '2024-01-15T10:00:00Z',
      modifiedBy: 'Admin',
    },
  ];

  const mockBackups: Backup[] = [
    {
      id: '1',
      name: 'Full Backup - 2024-01-15',
      type: 'full',
      size: 2048576000,
      createdAt: '2024-01-15T02:00:00Z',
      status: 'completed',
      description: 'Tam sistem yedeği',
      downloadUrl: '/backups/full-2024-01-15.zip',
    },
    {
      id: '2',
      name: 'Incremental Backup - 2024-01-14',
      type: 'incremental',
      size: 512000,
      createdAt: '2024-01-14T02:00:00Z',
      status: 'completed',
      description: 'Artımlı yedek',
      downloadUrl: '/backups/incremental-2024-01-14.zip',
    },
    {
      id: '3',
      name: 'Database Backup - 2024-01-13',
      type: 'differential',
      size: 1024000000,
      createdAt: '2024-01-13T02:00:00Z',
      status: 'completed',
      description: 'Veritabanı yedeği',
      downloadUrl: '/backups/database-2024-01-13.sql',
    },
  ];

  const mockAPIKeys: APIKey[] = [
    {
      id: '1',
      name: 'Blog API Key',
      key: 'blog_sk_1234567890abcdef',
      type: 'public',
      permissions: ['read:posts', 'create:posts', 'update:posts'],
      isActive: true,
      lastUsed: '2024-01-15T14:30:00Z',
      createdAt: '2024-01-10T00:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
    },
    {
      id: '2',
      name: 'Admin API Key',
      key: 'admin_sk_abcdef1234567890',
      type: 'private',
      permissions: ['*'],
      isActive: true,
      lastUsed: '2024-01-15T10:15:00Z',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '3',
      name: 'Webhook Key',
      key: 'webhook_wh_9876543210fedcba',
      type: 'webhook',
      permissions: ['webhook:notifications'],
      isActive: true,
      createdAt: '2024-01-05T00:00:00Z',
      expiresAt: '2024-06-30T23:59:59Z',
    },
  ];

  useEffect(() => {
    // Simulate loading settings
    setTimeout(() => {
      setSettings(mockSettings);
      setBackups(mockBackups);
      setApiKeys(mockAPIKeys);
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { value: 'general', label: 'Genel', icon: Settings },
    { value: 'api', label: 'API', icon: Key },
    { value: 'security', label: 'Güvenlik', icon: Shield },
    { value: 'performance', label: 'Performans', icon: Zap },
    { value: 'backup', label: 'Yedekleme', icon: Database },
    { value: 'integration', label: 'Entegrasyonlar', icon: Globe },
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData ? categoryData.icon : Settings;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Tamamlandı</Badge>
        );
      case 'failed':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Başarısız</Badge>;
      case 'in_progress':
        return (
          <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Devam Ediyor</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'full':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Tam</Badge>;
      case 'incremental':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Artımlı</Badge>
        );
      case 'differential':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>
            Diferansiyel
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getAPIKeyTypeBadge = (type: string) => {
    switch (type) {
      case 'public':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Public</Badge>;
      case 'private':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Private</Badge>;
      case 'webhook':
        return (
          <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>Webhook</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const togglePasswordVisibility = (settingId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  const handleSettingChange = (settingId: string, newValue: string) => {
    setSettings(prev =>
      prev.map(setting => (setting.id === settingId ? { ...setting, value: newValue } : setting))
    );
  };

  const handleSaveSettings = () => {
    console.log('Settings saved');
    // Implement save logic here
  };

  const handleCreateBackup = () => {
    console.log('Creating backup...');
    // Implement backup creation logic here
  };

  const handleCreateAPIKey = () => {
    console.log('Creating API key...');
    // Implement API key creation logic here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Sistem ayarları yükleniyor...</p>
        </div>
      </div>
    );
  }

  const filteredSettings = settings.filter(setting => setting.category === selectedCategory);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/tr/admin/settings'>
              <Button
                variant='outline'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Basit Ayarlar
              </Button>
            </Link>
            <div>
              <h1 className='text-3xl font-bold text-white'>Gelişmiş Sistem Ayarları</h1>
              <p className='text-gray-300'>API yönetimi, yedekleme ve sistem konfigürasyonu</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowCreateAPIKey(true)}
            >
              <Plus className='w-4 h-4 mr-2' />
              API Key Oluştur
            </Button>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowCreateBackup(true)}
            >
              <Database className='w-4 h-4 mr-2' />
              Yedek Oluştur
            </Button>
            <Button
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'
              onClick={handleSaveSettings}
            >
              <Save className='w-4 h-4 mr-2' />
              Ayarları Kaydet
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className='flex space-x-2'>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  selectedCategory === category.value
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                )}
              >
                <Icon className='w-4 h-4 mr-2' />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Settings Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {filteredSettings.map(setting => (
            <Card key={setting.id} className='bg-white/10 backdrop-blur-md border-white/20'>
              <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-white'>{setting.name}</h3>
                    <p className='text-gray-400 text-sm'>{setting.description}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {setting.isRequired && (
                      <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>
                        Gerekli
                      </Badge>
                    )}
                    {setting.isEncrypted && (
                      <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>
                        Şifreli
                      </Badge>
                    )}
                  </div>
                </div>

                <div className='space-y-4'>
                  {setting.type === 'text' && (
                    <Input
                      value={setting.value}
                      onChange={e => handleSettingChange(setting.id, e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder-gray-400'
                    />
                  )}

                  {setting.type === 'password' && (
                    <div className='relative'>
                      <Input
                        type={showPasswords[setting.id] ? 'text' : 'password'}
                        value={setting.value}
                        onChange={e => handleSettingChange(setting.id, e.target.value)}
                        className='bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10'
                      />
                      <Button
                        size='sm'
                        variant='ghost'
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                        onClick={() => togglePasswordVisibility(setting.id)}
                      >
                        {showPasswords[setting.id] ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </Button>
                    </div>
                  )}

                  {setting.type === 'number' && (
                    <Input
                      type='number'
                      value={setting.value}
                      onChange={e => handleSettingChange(setting.id, e.target.value)}
                      className='bg-white/10 border-white/20 text-white placeholder-gray-400'
                    />
                  )}

                  {setting.type === 'boolean' && (
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        checked={setting.value === 'true'}
                        onChange={e => handleSettingChange(setting.id, e.target.checked.toString())}
                        className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500'
                      />
                      <span className='text-white text-sm'>Aktif</span>
                    </div>
                  )}

                  {setting.type === 'textarea' && (
                    <textarea
                      value={setting.value}
                      onChange={e => handleSettingChange(setting.id, e.target.value)}
                      rows={3}
                      className='w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  )}

                  {setting.type === 'select' && setting.options && (
                    <select
                      value={setting.value}
                      onChange={e => handleSettingChange(setting.id, e.target.value)}
                      className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      {setting.options.map(option => (
                        <option key={option} value={option} className='bg-gray-800'>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className='flex items-center justify-between mt-4 text-gray-400 text-xs'>
                  <span>Son değişiklik: {formatDate(setting.lastModified)}</span>
                  <span>{setting.modifiedBy}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Backups Section */}
        {selectedCategory === 'backup' && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-white'>Yedekler</h2>
                <Button
                  className='bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 hover:from-green-700 hover:to-blue-700'
                  onClick={handleCreateBackup}
                >
                  <Plus className='w-4 h-4 mr-2' />
                  Yeni Yedek
                </Button>
              </div>

              <div className='space-y-4'>
                {backups.map(backup => (
                  <div
                    key={backup.id}
                    className='bg-white/5 p-4 rounded-lg flex items-center justify-between'
                  >
                    <div className='flex items-center space-x-4'>
                      <Database className='w-8 h-8 text-blue-400' />
                      <div>
                        <h3 className='text-white font-semibold'>{backup.name}</h3>
                        <p className='text-gray-400 text-sm'>{backup.description}</p>
                        <div className='flex items-center space-x-4 mt-2'>
                          <span className='text-gray-400 text-xs'>
                            {formatFileSize(backup.size)}
                          </span>
                          <span className='text-gray-400 text-xs'>
                            {formatDate(backup.createdAt)}
                          </span>
                          {getTypeBadge(backup.type)}
                          {getStatusBadge(backup.status)}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center space-x-2'>
                      {backup.downloadUrl && (
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                        >
                          <Download className='w-4 h-4 mr-2' />
                          İndir
                        </Button>
                      )}
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* API Keys Section */}
        {selectedCategory === 'api' && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-white'>API Anahtarları</h2>
                <Button
                  className='bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700'
                  onClick={handleCreateAPIKey}
                >
                  <Plus className='w-4 h-4 mr-2' />
                  Yeni API Key
                </Button>
              </div>

              <div className='space-y-4'>
                {apiKeys.map(apiKey => (
                  <div key={apiKey.id} className='bg-white/5 p-4 rounded-lg'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center space-x-3'>
                        <Key className='w-6 h-6 text-purple-400' />
                        <div>
                          <h3 className='text-white font-semibold'>{apiKey.name}</h3>
                          <p className='text-gray-400 text-sm'>
                            {apiKey.key.substring(0, 8)}...
                            {apiKey.key.substring(apiKey.key.length - 8)}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        {getAPIKeyTypeBadge(apiKey.type)}
                        <Badge
                          className={cn(
                            apiKey.isActive
                              ? 'bg-green-500/20 text-green-400 border-green-500/50'
                              : 'bg-red-500/20 text-red-400 border-red-500/50'
                          )}
                        >
                          {apiKey.isActive ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex flex-wrap gap-2'>
                        {apiKey.permissions.map((permission, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='bg-white/10 border-white/30 text-white text-xs'
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>

                      <div className='flex items-center space-x-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                        >
                          <Copy className='w-4 h-4 mr-2' />
                          Kopyala
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>

                    <div className='flex items-center justify-between mt-3 text-gray-400 text-xs'>
                      <span>Oluşturulma: {formatDate(apiKey.createdAt)}</span>
                      {apiKey.lastUsed && <span>Son kullanım: {formatDate(apiKey.lastUsed)}</span>}
                      {apiKey.expiresAt && (
                        <span>Son kullanma: {formatDate(apiKey.expiresAt)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
