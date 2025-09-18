'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Globe, 
  Zap, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  ArrowLeft, 
  RefreshCw, 
  ExternalLink, 
  Key, 
  Database, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  Cloud, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Shield, 
  Activity, 
  Clock, 
  User, 
  Bell, 
  Download, 
  Upload, 
  Copy, 
  Play, 
  Pause, 
  Square
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Integration {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'oauth' | 'sdk' | 'plugin';
  category: 'social' | 'payment' | 'analytics' | 'communication' | 'storage' | 'ai' | 'marketing' | 'development';
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'error' | 'testing';
  isConnected: boolean;
  apiKey?: string;
  webhookUrl?: string;
  permissions: string[];
  lastSync?: string;
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'manual';
  healthStatus: 'healthy' | 'warning' | 'error' | 'unknown';
  errorCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
  version: string;
  documentation?: string;
  supportUrl?: string;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret: string;
  lastTriggered?: string;
  successCount: number;
  failureCount: number;
  createdAt: string;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateIntegration, setShowCreateIntegration] = useState(false);
  const [showWebhooks, setShowWebhooks] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // Mock data
  const mockIntegrations: Integration[] = [
    {
      id: '1',
      name: 'Google Analytics',
      type: 'api',
      category: 'analytics',
      description: 'Web sitesi trafik analizi ve kullanıcı davranışları',
      status: 'active',
      isConnected: true,
      apiKey: 'GA_123456789',
      permissions: ['read:analytics', 'read:reports'],
      lastSync: '2024-01-15T14:30:00Z',
      syncFrequency: 'daily',
      healthStatus: 'healthy',
      errorCount: 0,
      successRate: 99.8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      version: '4.0.1',
      documentation: 'https://developers.google.com/analytics',
      supportUrl: 'https://support.google.com/analytics'
    },
    {
      id: '2',
      name: 'Stripe Payment',
      type: 'api',
      category: 'payment',
      description: 'Online ödeme işlemleri ve abonelik yönetimi',
      status: 'active',
      isConnected: true,
      apiKey: 'sk_test_...',
      permissions: ['read:payments', 'write:payments', 'read:customers'],
      lastSync: '2024-01-15T14:25:00Z',
      syncFrequency: 'realtime',
      healthStatus: 'healthy',
      errorCount: 2,
      successRate: 98.5,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-14T15:30:00Z',
      version: '2.1.0',
      documentation: 'https://stripe.com/docs',
      supportUrl: 'https://support.stripe.com'
    },
    {
      id: '3',
      name: 'OpenAI API',
      type: 'api',
      category: 'ai',
      description: 'Yapay zeka modeli entegrasyonu ve içerik üretimi',
      status: 'active',
      isConnected: true,
      apiKey: 'sk-...',
      permissions: ['read:models', 'write:completions', 'read:usage'],
      lastSync: '2024-01-15T14:20:00Z',
      syncFrequency: 'realtime',
      healthStatus: 'healthy',
      errorCount: 0,
      successRate: 100,
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      version: '1.0.0',
      documentation: 'https://platform.openai.com/docs',
      supportUrl: 'https://help.openai.com'
    },
    {
      id: '4',
      name: 'Mailchimp',
      type: 'oauth',
      category: 'marketing',
      description: 'E-posta pazarlama ve abone yönetimi',
      status: 'pending',
      isConnected: false,
      permissions: ['read:lists', 'write:campaigns', 'read:reports'],
      syncFrequency: 'daily',
      healthStatus: 'unknown',
      errorCount: 0,
      successRate: 0,
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z',
      version: '3.0.0',
      documentation: 'https://mailchimp.com/developer',
      supportUrl: 'https://mailchimp.com/help'
    },
    {
      id: '5',
      name: 'AWS S3',
      type: 'api',
      category: 'storage',
      description: 'Dosya depolama ve CDN hizmetleri',
      status: 'active',
      isConnected: true,
      apiKey: 'AKIA...',
      permissions: ['read:objects', 'write:objects', 'delete:objects'],
      lastSync: '2024-01-15T14:15:00Z',
      syncFrequency: 'realtime',
      healthStatus: 'warning',
      errorCount: 5,
      successRate: 95.2,
      createdAt: '2024-01-08T00:00:00Z',
      updatedAt: '2024-01-13T12:00:00Z',
      version: '2.0.0',
      documentation: 'https://docs.aws.amazon.com/s3',
      supportUrl: 'https://aws.amazon.com/support'
    },
    {
      id: '6',
      name: 'Slack Webhook',
      type: 'webhook',
      category: 'communication',
      description: 'Slack kanallarına bildirim gönderimi',
      status: 'active',
      isConnected: true,
      webhookUrl: 'https://hooks.slack.com/services/...',
      permissions: ['write:messages'],
      lastSync: '2024-01-15T14:10:00Z',
      syncFrequency: 'realtime',
      healthStatus: 'healthy',
      errorCount: 1,
      successRate: 99.1,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-15T08:00:00Z',
      version: '1.2.0',
      documentation: 'https://api.slack.com/messaging/webhooks',
      supportUrl: 'https://slack.com/help'
    }
  ];

  const mockWebhooks: Webhook[] = [
    {
      id: '1',
      name: 'Blog Post Created',
      url: 'https://api.mysonai.com/webhooks/blog-created',
      events: ['post.created', 'post.published'],
      isActive: true,
      secret: 'whsec_1234567890abcdef',
      lastTriggered: '2024-01-15T14:30:00Z',
      successCount: 45,
      failureCount: 2,
      createdAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '2',
      name: 'User Registration',
      url: 'https://api.mysonai.com/webhooks/user-registered',
      events: ['user.created', 'user.verified'],
      isActive: true,
      secret: 'whsec_abcdef1234567890',
      lastTriggered: '2024-01-15T13:45:00Z',
      successCount: 23,
      failureCount: 0,
      createdAt: '2024-01-08T00:00:00Z'
    },
    {
      id: '3',
      name: 'Payment Notification',
      url: 'https://api.mysonai.com/webhooks/payment',
      events: ['payment.completed', 'payment.failed'],
      isActive: false,
      secret: 'whsec_9876543210fedcba',
      lastTriggered: '2024-01-14T16:20:00Z',
      successCount: 12,
      failureCount: 1,
      createdAt: '2024-01-05T00:00:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading integrations
    setTimeout(() => {
      setIntegrations(mockIntegrations);
      setFilteredIntegrations(mockIntegrations);
      setWebhooks(mockWebhooks);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter integrations
    let filtered = integrations;

    if (searchTerm) {
      filtered = filtered.filter(integration => 
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(integration => integration.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(integration => integration.status === selectedStatus);
    }

    setFilteredIntegrations(filtered);
  }, [integrations, searchTerm, selectedCategory, selectedStatus]);

  const categories = [
    { value: 'all', label: 'Tümü', icon: Globe },
    { value: 'social', label: 'Sosyal Medya', icon: MessageSquare },
    { value: 'payment', label: 'Ödeme', icon: CreditCard },
    { value: 'analytics', icon: Activity },
    { value: 'communication', label: 'İletişim', icon: Bell },
    { value: 'storage', label: 'Depolama', icon: Database },
    { value: 'ai', label: 'AI', icon: Zap },
    { value: 'marketing', label: 'Pazarlama', icon: Mail },
    { value: 'development', label: 'Geliştirme', icon: Settings }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData ? categoryData.icon : Globe;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Pasif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Beklemede</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Hata</Badge>;
      case 'testing':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Test</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'healthy':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Sağlıklı</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Uyarı</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Hata</Badge>;
      case 'unknown':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'api':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">API</Badge>;
      case 'webhook':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Webhook</Badge>;
      case 'oauth':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">OAuth</Badge>;
      case 'sdk':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">SDK</Badge>;
      case 'plugin':
        return <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50">Plugin</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleIntegrationAction = (integrationId: string, action: string) => {
    console.log(`Action: ${action} for integration: ${integrationId}`);
    // Implement integration actions here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Entegrasyonlar yükleniyor...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-white">Entegrasyonlar</h1>
              <p className="text-gray-300">Üçüncü parti servisler ve API bağlantıları</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setShowWebhooks(!showWebhooks)}
            >
              <Zap className="w-4 h-4 mr-2" />
              Webhooks
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setShowCreateIntegration(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Entegrasyon
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam Entegrasyon</p>
                  <p className="text-2xl font-bold text-white">{integrations.length}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Aktif</p>
                  <p className="text-2xl font-bold text-white">{integrations.filter(i => i.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Sağlıklı</p>
                  <p className="text-2xl font-bold text-white">{integrations.filter(i => i.healthStatus === 'healthy').length}</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Ortalama Başarı</p>
                  <p className="text-2xl font-bold text-white">
                    {integrations.length > 0 
                      ? Math.round(integrations.reduce((sum, i) => sum + i.successRate, 0) / integrations.length)
                      : 0
                    }%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Entegrasyon ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value} className="bg-gray-800">
                      {category.label || category.value}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Durum</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="bg-gray-800">Tüm Durumlar</option>
                  <option value="active" className="bg-gray-800">Aktif</option>
                  <option value="inactive" className="bg-gray-800">Pasif</option>
                  <option value="pending" className="bg-gray-800">Beklemede</option>
                  <option value="error" className="bg-gray-800">Hata</option>
                  <option value="testing" className="bg-gray-800">Test</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Temizle
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Integrations List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      {React.createElement(getCategoryIcon(integration.category), { className: "w-6 h-6 text-purple-400" })}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                        {getTypeBadge(integration.type)}
                        {getStatusBadge(integration.status)}
                        {getHealthBadge(integration.healthStatus)}
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{integration.description}</p>
                      
                      <div className="flex items-center space-x-6 text-gray-400 text-sm mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          v{integration.version}
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          %{integration.successRate} başarı
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {integration.errorCount} hata
                        </div>
                        {integration.lastSync && (
                          <div className="flex items-center">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            {formatDate(integration.lastSync)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">İzinler:</span>
                          {integration.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {integration.permissions.length > 3 && (
                            <span className="text-gray-400 text-xs">+{integration.permissions.length - 3} daha</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Senkronizasyon:</span>
                          <Badge variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                            {integration.syncFrequency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleIntegrationAction(integration.id, 'test')}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleIntegrationAction(integration.id, 'edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {integration.documentation && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => window.open(integration.documentation, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      onClick={() => handleIntegrationAction(integration.id, 'delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-12 text-center">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' ? 'Entegrasyon bulunamadı' : 'Henüz entegrasyon yok'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Arama kriterlerinize uygun entegrasyon bulunamadı.' 
                  : 'Henüz hiç entegrasyon eklenmemiş.'}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                İlk Entegrasyonu Ekle
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
