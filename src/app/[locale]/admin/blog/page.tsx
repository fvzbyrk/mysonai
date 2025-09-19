'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  Tag,
  User,
  Clock,
  ArrowLeft,
  FileText
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
  author: string;
  readTime: number;
  views: number;
  imageUrl?: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Yapay Zeka ve Makine Öğrenmesi Trendleri 2024',
      content: 'Yapay zeka teknolojilerinin 2024 yılındaki en önemli gelişmeleri...',
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z',
      category: 'AI Teknolojisi',
      tags: ['ai', 'machine-learning', 'trends'],
      source: 'Gemini AI',
      priority: 'high',
      author: 'MySonAI',
      readTime: 8,
      views: 1234,
      imageUrl: 'https://source.unsplash.com/800x600/?artificial-intelligence'
    },
    {
      id: '2',
      title: 'React 18 ve Next.js 14 Yenilikleri',
      content: 'React 18 ve Next.js 14 ile gelen yeni özellikler ve geliştirmeler...',
      status: 'published',
      publishedAt: '2024-01-14T14:30:00Z',
      category: 'Eğitimler',
      tags: ['react', 'nextjs', 'web-development'],
      source: 'Manuel',
      priority: 'medium',
      author: 'Admin',
      readTime: 12,
      views: 856,
      imageUrl: 'https://source.unsplash.com/800x600/?programming'
    },
    {
      id: '3',
      title: 'Startup Ekosistemi ve Yatırım Trendleri',
      content: '2024 yılında startup dünyasındaki gelişmeler ve yatırım trendleri...',
      status: 'draft',
      publishedAt: '2024-01-16T09:00:00Z',
      category: 'İş Dünyası',
      tags: ['startup', 'investment', 'business'],
      source: 'Gemini AI',
      priority: 'medium',
      author: 'MySonAI',
      readTime: 6,
      views: 0,
      imageUrl: 'https://source.unsplash.com/800x600/?business'
    }
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data.posts);
        setFilteredPosts(data.data.posts);
      } else {
        console.error('Failed to load posts:', data.message);
        // Fallback to mock data
        setPosts(mockPosts);
        setFilteredPosts(mockPosts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to mock data
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'delete',
          postData: { id: postId }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Reload posts
        await loadPosts();
        alert('Makale başarıyla silindi!');
      } else {
        alert('Makale silinirken hata oluştu: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Makale silinirken hata oluştu');
    }
  };

  useEffect(() => {
    // Filter posts based on search and filters
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(post => post.status === selectedStatus);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedStatus]);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];
  const statuses = ['all', 'draft', 'published', 'scheduled'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Yayınlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Taslak</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Zamanlanmış</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Orta</Badge>;
      case 'low':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Düşük</Badge>;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Makaleler yükleniyor...</p>
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
              <h1 className="text-3xl font-bold text-white">Blog Yönetimi</h1>
              <p className="text-gray-300">Makaleleri yönet, düzenle ve yayınla</p>
            </div>
          </div>
          <Link href="/tr/admin/blog/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Makale
            </Button>
          </Link>
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
                    placeholder="Makale ara..."
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
                    <option key={category} value={category} className="bg-gray-800">
                      {category === 'all' ? 'Tüm Kategoriler' : category}
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
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-gray-800">
                      {status === 'all' ? 'Tüm Durumlar' : status}
                    </option>
                  ))}
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

        {/* Posts List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getStatusBadge(post.status)}
                      {getPriorityBadge(post.priority)}
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                        {post.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} dk
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views} görüntüleme
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-white/10 border-white/30 text-white">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link href={`/tr/admin/blog/${post.id}`}>
                      <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/tr/admin/blog/${post.id}/edit`}>
                      <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Makale bulunamadı</h3>
              <p className="text-gray-300 mb-6">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                  ? 'Arama kriterlerinize uygun makale bulunamadı.' 
                  : 'Henüz hiç makale yok.'}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                İlk Makaleyi Oluştur
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
