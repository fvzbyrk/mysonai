'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Settings,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Globe,
  Database,
  Bot,
  Shield,
  Mail,
  Bell,
  Key,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  aiApiKey: string;
  databaseUrl: string;
  maxPostsPerDay: number;
  autoPublish: boolean;
  emailNotifications: boolean;
  maintenanceMode: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'MySonAI',
    siteDescription: 'AI Destekli Blog Platformu',
    siteUrl: 'https://mysonai.com',
    adminEmail: 'admin@mysonai.com',
    aiApiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
    databaseUrl: 'postgresql://localhost:5432/mysonai',
    maxPostsPerDay: 60,
    autoPublish: true,
    emailNotifications: true,
    maintenanceMode: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
      setSettings({
        siteName: 'MySonAI',
        siteDescription: 'AI Destekli Blog Platformu',
        siteUrl: 'https://mysonai.com',
        adminEmail: 'admin@mysonai.com',
        aiApiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
        databaseUrl: 'postgresql://localhost:5432/mysonai',
        maxPostsPerDay: 60,
        autoPublish: true,
        emailNotifications: true,
        maintenanceMode: false,
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-4xl mx-auto space-y-6'>
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
              <h1 className='text-3xl font-bold text-white'>Sistem Ayarları</h1>
              <p className='text-gray-300'>Platform konfigürasyonu ve yönetimi</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
              onClick={handleReset}
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Sıfırla
            </Button>
            <Button
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className='w-4 h-4 mr-2' />
                  Kaydet
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Save Status */}
        {saveStatus === 'success' && (
          <Card className='bg-green-500/20 border-green-500/50'>
            <div className='p-4 flex items-center'>
              <CheckCircle className='w-5 h-5 text-green-400 mr-3' />
              <p className='text-green-400'>Ayarlar başarıyla kaydedildi!</p>
            </div>
          </Card>
        )}

        {saveStatus === 'error' && (
          <Card className='bg-red-500/20 border-red-500/50'>
            <div className='p-4 flex items-center'>
              <AlertCircle className='w-5 h-5 text-red-400 mr-3' />
              <p className='text-red-400'>Ayarlar kaydedilirken hata oluştu!</p>
            </div>
          </Card>
        )}

        {/* General Settings */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center mb-6'>
              <Globe className='w-6 h-6 text-blue-400 mr-3' />
              <h3 className='text-lg font-semibold text-white'>Genel Ayarlar</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label htmlFor='siteName' className='text-white text-sm font-medium'>
                  Site Adı
                </Label>
                <Input
                  id='siteName'
                  value={settings.siteName}
                  onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
              </div>

              <div>
                <Label htmlFor='siteUrl' className='text-white text-sm font-medium'>
                  Site URL
                </Label>
                <Input
                  id='siteUrl'
                  value={settings.siteUrl}
                  onChange={e => setSettings({ ...settings, siteUrl: e.target.value })}
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
              </div>

              <div className='md:col-span-2'>
                <Label htmlFor='siteDescription' className='text-white text-sm font-medium'>
                  Site Açıklaması
                </Label>
                <Input
                  id='siteDescription'
                  value={settings.siteDescription}
                  onChange={e => setSettings({ ...settings, siteDescription: e.target.value })}
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
              </div>

              <div>
                <Label htmlFor='adminEmail' className='text-white text-sm font-medium'>
                  Admin E-posta
                </Label>
                <Input
                  id='adminEmail'
                  type='email'
                  value={settings.adminEmail}
                  onChange={e => setSettings({ ...settings, adminEmail: e.target.value })}
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
              </div>

              <div>
                <Label htmlFor='maxPostsPerDay' className='text-white text-sm font-medium'>
                  Günlük Maksimum Makale
                </Label>
                <Input
                  id='maxPostsPerDay'
                  type='number'
                  value={settings.maxPostsPerDay}
                  onChange={e =>
                    setSettings({ ...settings, maxPostsPerDay: parseInt(e.target.value) })
                  }
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
              </div>
            </div>
          </div>
        </Card>

        {/* AI Settings */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center mb-6'>
              <Bot className='w-6 h-6 text-purple-400 mr-3' />
              <h3 className='text-lg font-semibold text-white'>AI Ayarları</h3>
            </div>

            <div className='space-y-6'>
              <div>
                <Label htmlFor='aiApiKey' className='text-white text-sm font-medium'>
                  Gemini API Key
                </Label>
                <Input
                  id='aiApiKey'
                  type='password'
                  value={settings.aiApiKey}
                  onChange={e => setSettings({ ...settings, aiApiKey: e.target.value })}
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                />
                <p className='text-gray-400 text-xs mt-1'>AI içerik üretimi için gerekli</p>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <Label className='text-white text-sm font-medium'>Otomatik Yayınlama</Label>
                  <p className='text-gray-400 text-xs'>
                    AI üretilen makaleler otomatik yayınlansın
                  </p>
                </div>
                <Button
                  variant={settings.autoPublish ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSettings({ ...settings, autoPublish: !settings.autoPublish })}
                  className={cn(
                    settings.autoPublish
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  )}
                >
                  {settings.autoPublish ? 'Açık' : 'Kapalı'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Database Settings */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center mb-6'>
              <Database className='w-6 h-6 text-green-400 mr-3' />
              <h3 className='text-lg font-semibold text-white'>Veritabanı Ayarları</h3>
            </div>

            <div>
              <Label htmlFor='databaseUrl' className='text-white text-sm font-medium'>
                Veritabanı URL
              </Label>
              <Input
                id='databaseUrl'
                type='password'
                value={settings.databaseUrl}
                onChange={e => setSettings({ ...settings, databaseUrl: e.target.value })}
                className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
              />
              <p className='text-gray-400 text-xs mt-1'>Veritabanı bağlantı bilgileri</p>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center mb-6'>
              <Bell className='w-6 h-6 text-orange-400 mr-3' />
              <h3 className='text-lg font-semibold text-white'>Bildirim Ayarları</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <Label className='text-white text-sm font-medium'>E-posta Bildirimleri</Label>
                  <p className='text-gray-400 text-xs'>Sistem olayları için e-posta bildirimleri</p>
                </div>
                <Button
                  variant={settings.emailNotifications ? 'default' : 'outline'}
                  size='sm'
                  onClick={() =>
                    setSettings({ ...settings, emailNotifications: !settings.emailNotifications })
                  }
                  className={cn(
                    settings.emailNotifications
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  )}
                >
                  {settings.emailNotifications ? 'Açık' : 'Kapalı'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex items-center mb-6'>
              <Shield className='w-6 h-6 text-red-400 mr-3' />
              <h3 className='text-lg font-semibold text-white'>Sistem Durumu</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <Label className='text-white text-sm font-medium'>Bakım Modu</Label>
                  <p className='text-gray-400 text-xs'>Siteyi geçici olarak kapat</p>
                </div>
                <Button
                  variant={settings.maintenanceMode ? 'default' : 'outline'}
                  size='sm'
                  onClick={() =>
                    setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })
                  }
                  className={cn(
                    settings.maintenanceMode
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  )}
                >
                  {settings.maintenanceMode ? 'Açık' : 'Kapalı'}
                </Button>
              </div>

              {settings.maintenanceMode && (
                <div className='bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <AlertCircle className='w-5 h-5 text-yellow-400 mr-3' />
                    <p className='text-yellow-400 text-sm'>
                      Bakım modu aktif! Site ziyaretçilere kapalı.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
