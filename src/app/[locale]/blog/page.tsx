'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Tag, 
  User, 
  Clock,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  priority: 'high' | 'medium' | 'low';
  author?: string;
  readTime?: number;
  imageUrl?: string;
  imageAlt?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Mock data - in real app, this would come from API
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Günün Tech Gelişmeleri - 18.09.2025',
      content: `
        <h2>Yapay Zeka ve Gelecek</h2>
        <p>Bugün yapay zeka alanında önemli gelişmeler yaşandı. OpenAI'nin yeni GPT-5 modeli duyuruldu ve performans testleri başladı.</p>
        
        <h3>Öne Çıkan Gelişmeler:</h3>
        <ul>
          <li>OpenAI GPT-5 duyurusu</li>
          <li>Google Gemini 2.0 beta sürümü</li>
          <li>Microsoft Copilot güncellemeleri</li>
          <li>AI güvenlik standartları</li>
        </ul>
        
        <p>Bu gelişmeler, yapay zeka teknolojisinin geleceğini şekillendirecek önemli adımlar olarak değerlendiriliyor.</p>
      `,
      status: 'published',
      publishedAt: '2024-09-18T09:00:00Z',
      category: 'Genel',
      tags: ['tech', 'günlük', 'gelişmeler', 'ai'],
      source: 'Gemini AI',
      priority: 'high',
      author: 'MySonAI',
      readTime: 5
    },
    {
      id: '2',
      title: 'AI ve Machine Learning Trendleri',
      content: `
        <h2>Machine Learning'de Yeni Trendler</h2>
        <p>2024 yılında machine learning alanında önemli trendler ortaya çıktı. Bu trendler, gelecekteki teknoloji gelişmelerini etkileyecek.</p>
        
        <h3>Önemli Trendler:</h3>
        <ul>
          <li>Federated Learning</li>
          <li>AutoML platformları</li>
          <li>Edge AI uygulamaları</li>
          <li>Explainable AI</li>
        </ul>
      `,
      status: 'published',
      publishedAt: '2024-09-18T14:00:00Z',
      category: 'Yapay Zeka',
      tags: ['ai', 'machine-learning', 'trend'],
      source: 'Gemini AI',
      priority: 'medium',
      author: 'MySonAI',
      readTime: 7
    },
    {
      id: '3',
      title: 'Startup Ekosistemi Güncellemeleri',
      content: `
        <h2>Startup Dünyasından Haberler</h2>
        <p>Bu hafta startup ekosisteminde önemli gelişmeler yaşandı. Yeni yatırımlar ve başarı hikayeleri dikkat çekiyor.</p>
        
        <h3>Öne Çıkan Startuplar:</h3>
        <ul>
          <li>TechCorp - 50M$ yatırım aldı</li>
          <li>AIStart - Yeni AI çözümü duyurdu</li>
          <li>GreenTech - Sürdürülebilir teknoloji</li>
        </ul>
      `,
      status: 'published',
      publishedAt: '2024-09-18T16:00:00Z',
      category: 'Startup',
      tags: ['startup', 'ekosistem', 'güncelleme'],
      source: 'Gemini AI',
      priority: 'low',
      author: 'MySonAI',
      readTime: 4
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts.filter(post => post.status === 'published'));
      setIsLoading(false);
    }, 1000);
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];


  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setSelectedPost(null)}
            variant="outline"
            className="mb-6 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {selectedPost.author}
            </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedPost.publishedAt)}
            </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedPost.readTime} dk okuma
            </div>
          </div>
        </div>
        
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-blue-500">{selectedPost.category}</Badge>
                  {getPriorityBadge(selectedPost.priority)}
                  <Badge className="bg-purple-500">{selectedPost.source}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-white/20 text-white">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
                </div>
        </div>
        
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </Card>
        </div>
      </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tech Blog</h1>
          <p className="text-gray-300 text-xl">Güncel teknoloji haberleri ve gelişmeler</p>
        </div>

        {/* Category Filter */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Kategoriler</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={cn(
                    selectedCategory === category 
                      ? "bg-blue-600 text-white" 
                      : "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  {category === 'all' ? 'Tümü' : category}
                </Button>
              ))}
            </div>
            
          </div>
        </Card>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                {/* Post Image */}
                {post.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500">Yayınlandı</Badge>
                      {getPriorityBadge(post.priority)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} dk
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-500">{post.category}</Badge>
                      <Badge className="bg-purple-500">{post.source}</Badge>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !isLoading && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Henüz post yok</h3>
              <p className="text-gray-400">Bu kategoride henüz yayınlanmış post bulunmuyor.</p>
            </div>
          </Card>
        )}
        </div>
    </div>
  );
}