'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  BarChart3,
  FileText,
  Globe,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoBlogStatus {
  isRunning: boolean;
  lastGenerated: string | null;
  totalPosts: number;
  todayPosts: number;
  scheduledJobs: { [key: string]: string };
  nextRun: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  priority: 'high' | 'medium' | 'low';
}

export default function AutoBlogAdminPage() {
  const [status, setStatus] = useState<AutoBlogStatus>({
    isRunning: false,
    lastGenerated: null,
    totalPosts: 0,
    todayPosts: 0,
    scheduledJobs: {},
    nextRun: null
  });
  
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for demonstration
  const mockStatus: AutoBlogStatus = {
    isRunning: true,
    lastGenerated: '2024-01-15T09:00:00Z',
    totalPosts: 45,
    todayPosts: 3,
    scheduledJobs: {
      'daily-tech-news': 'scheduled',
      'trending-topics': 'scheduled',
      'weekly-summary': 'scheduled'
    },
    nextRun: '2024-01-16T09:00:00Z'
  };

  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Günün Tech Gelişmeleri - 15 Ocak 2024',
      status: 'published',
      publishedAt: '2024-01-15T09:00:00Z',
      category: 'Genel',
      tags: ['tech', 'günlük', 'gelişmeler'],
      source: 'Grok AI',
      priority: 'high'
    },
    {
      id: '2',
      title: 'AI ve Machine Learning Trendleri',
      status: 'published',
      publishedAt: '2024-01-15T14:00:00Z',
      category: 'Yapay Zeka',
      tags: ['ai', 'machine-learning', 'trend'],
      source: 'Grok AI',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Startup Ekosistemi Güncellemeleri',
      status: 'draft',
      publishedAt: '2024-01-15T16:00:00Z',
      category: 'Startup',
      tags: ['startup', 'ekosistem', 'güncelleme'],
      source: 'Grok AI',
      priority: 'low'
    }
  ];

  useEffect(() => {
    // Load status and posts
    setStatus(mockStatus);
    setRecentPosts(mockPosts);
  }, []);

  // Generate hybrid news (GPT + Gemini)
  const handleGenerateHybrid = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gpt-gemini-hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-hybrid' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh posts
        setRecentPosts(prev => [...result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + result.total,
          totalPosts: prev.totalPosts + result.total
        }));
      }
    } catch (error) {
      console.error('Error generating hybrid news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate GPT-only news
  const handleGenerateGPT = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gpt-gemini-hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-gpt-only' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setRecentPosts(prev => [...result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + result.total,
          totalPosts: prev.totalPosts + result.total
        }));
      }
    } catch (error) {
      console.error('Error generating GPT news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Gemini-only news
  const handleGenerateGemini = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gpt-gemini-hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-gemini-only' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setRecentPosts(prev => [...result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + result.total,
          totalPosts: prev.totalPosts + result.total
        }));
      }
    } catch (error) {
      console.error('Error generating Gemini news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Test Gemini API
  const handleTestGemini = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-gemini', {
        method: 'GET'
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Gemini API test successful:', result.data);
        alert(`✅ Gemini API çalışıyor!\n\nYanıt: ${result.data.response}\n\nKullanım: ${result.data.usage?.totalTokens || 0} token`);
      } else {
        console.error('Gemini API test failed:', result.error);
        alert(`❌ Gemini API test başarısız: ${result.error}`);
      }
    } catch (error) {
      console.error('Error testing Gemini:', error);
      alert(`❌ Gemini API test hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Compare sources
  const handleCompareSources = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gpt-gemini-hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'compare-sources' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Source comparison:', result.data);
        // You can display this in a modal or alert
        alert(`GPT: ${result.data.gpt.count} haber, Kalite: ${result.data.gpt.quality.toFixed(2)}\nGemini: ${result.data.gemini.count} haber, Kalite: ${result.data.gemini.quality.toFixed(2)}\nHibrit: ${result.data.hybrid.count} haber, Kalite: ${result.data.hybrid.quality.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error comparing sources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate daily tech post
  const handleGenerateDaily = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auto-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-daily' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh posts
        setRecentPosts(prev => [result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + 1,
          totalPosts: prev.totalPosts + 1
        }));
      }
    } catch (error) {
      console.error('Error generating daily post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate category post
  const handleGenerateCategory = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auto-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'generate-category',
          config: { category }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setRecentPosts(prev => [result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + 1,
          totalPosts: prev.totalPosts + 1
        }));
      }
    } catch (error) {
      console.error('Error generating category post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle scheduler
  const handleToggleScheduler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auto-blog/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: status.isRunning ? 'stop' : 'start'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus(prev => ({
          ...prev,
          isRunning: !prev.isRunning
        }));
      }
    } catch (error) {
      console.error('Error toggling scheduler:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate category content
  const handleGenerateCategoryContent = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'generate-category',
          postData: { category }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Add new post to the list
        setRecentPosts(prev => [result.data, ...prev]);
        setStatus(prev => ({
          ...prev,
          todayPosts: prev.todayPosts + 1,
          totalPosts: prev.totalPosts + 1
        }));
        alert(`✅ ${category} kategorisi için yeni makale üretildi!`);
      } else {
        alert(`❌ Hata: ${result.message}`);
      }
    } catch (error) {
      console.error('Error generating category content:', error);
      alert(`❌ İçerik üretme hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Yayınlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500">Taslak</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Zamanlanmış</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Orta</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Düşük</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Otomatik Blog Yönetimi</h1>
            <p className="text-gray-300">Grok AI ile otomatik tech haber yayınlama sistemi</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleToggleScheduler}
              variant={status.isRunning ? "destructive" : "default"}
              className={cn(
                status.isRunning 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-green-500 hover:bg-green-600"
              )}
              disabled={isLoading}
            >
              {status.isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Durdur
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Başlat
                </>
              )}
            </Button>
            
            <Button
              onClick={handleGenerateDaily}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
              Günlük Post Oluştur
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <Badge className={cn(
                  status.isRunning ? "bg-green-500" : "bg-red-500"
                )}>
                  {status.isRunning ? "Aktif" : "Pasif"}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {status.isRunning ? "Çalışıyor" : "Durduruldu"}
              </h3>
              <p className="text-gray-300 text-sm">Scheduler Durumu</p>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <Badge className="bg-green-500">+{status.todayPosts}</Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {status.totalPosts}
              </h3>
              <p className="text-gray-300 text-sm">Toplam Post</p>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <Badge className="bg-purple-500">Son</Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {status.lastGenerated ? 
                  new Date(status.lastGenerated).toLocaleDateString('tr-TR') : 
                  'Yok'
                }
              </h3>
              <p className="text-gray-300 text-sm">Son Üretim</p>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <Badge className="bg-orange-500">Sonraki</Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {status.nextRun ? 
                  new Date(status.nextRun).toLocaleTimeString('tr-TR') : 
                  'Yok'
                }
              </h3>
              <p className="text-gray-300 text-sm">Sonraki Çalışma</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Button
                onClick={() => handleGenerateHybrid()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                disabled={isLoading}
              >
                <Bot className="w-4 h-4 mr-2" />
                GPT + Gemini
              </Button>
              
              <Button
                onClick={() => handleGenerateGPT()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                disabled={isLoading}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                GPT-4
              </Button>
              
              <Button
                onClick={() => handleGenerateGemini()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                disabled={isLoading}
              >
                <Zap className="w-4 h-4 mr-2" />
                Gemini AI
              </Button>
              
              <Button
                onClick={() => handleTestGemini()}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                disabled={isLoading}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Test Gemini
              </Button>
              
              <Button
                onClick={() => handleCompareSources()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                disabled={isLoading}
              >
                <Settings className="w-4 h-4 mr-2" />
                Karşılaştır
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Content Generation */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Kategori Bazlı İçerik Üretimi</h3>
            <p className="text-gray-300 mb-4">Her kategori için AI ile özel makaleler üretin</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Button
                onClick={() => handleGenerateCategoryContent('AI Teknolojisi')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                disabled={isLoading}
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Teknolojisi
              </Button>
              
              <Button
                onClick={() => handleGenerateCategoryContent('İş Dünyası')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                disabled={isLoading}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                İş Dünyası
              </Button>
              
              <Button
                onClick={() => handleGenerateCategoryContent('Eğitimler')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                disabled={isLoading}
              >
                <FileText className="w-4 h-4 mr-2" />
                Eğitimler
              </Button>
              
              <Button
                onClick={() => handleGenerateCategoryContent('Vaka Çalışmaları')}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                disabled={isLoading}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Vaka Çalışmaları
              </Button>
              
              <Button
                onClick={() => handleGenerateCategoryContent('Haberler')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                disabled={isLoading}
              >
                <Globe className="w-4 h-4 mr-2" />
                Haberler
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Posts */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Son Oluşturulan Postlar</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{post.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-gray-400 text-sm">{post.category}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{post.source}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(post.status)}
                    {getPriorityBadge(post.priority)}
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
