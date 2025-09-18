'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Image,
  Video,
  File,
  Calendar,
  Tag,
  User,
  Clock,
  ArrowLeft,
  MoreVertical,
  Upload,
  Download,
  Eye,
  EyeOff,
  Save,
  Send,
  Schedule,
  Archive,
  Star,
  Share,
  Copy,
  Move,
  Folder,
  FolderPlus,
  Settings,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  Link as LinkIcon,
  Code,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'page' | 'media' | 'template';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  thumbnail?: string;
  content: string;
  wordCount: number;
  readTime: number;
}

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  alt?: string;
  caption?: string;
}

export default function ContentManagementPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  // Mock data
  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'Yapay Zeka ve Makine Öğrenmesi Trendleri 2024',
      type: 'post',
      status: 'published',
      category: 'AI Teknolojisi',
      tags: ['ai', 'machine-learning', 'trends'],
      author: 'MySonAI',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      publishedAt: '2024-01-15T10:00:00Z',
      views: 1234,
      likes: 56,
      comments: 12,
      featured: true,
      seoTitle: 'AI ve ML Trendleri 2024',
      seoDescription: 'Yapay zeka ve makine öğrenmesi alanındaki son gelişmeler',
      thumbnail: 'https://source.unsplash.com/800x600/?artificial-intelligence',
      content: '<h2>Yapay Zeka ve Gelecek</h2><p>Yapay zeka teknolojileri...</p>',
      wordCount: 1500,
      readTime: 8
    },
    {
      id: '2',
      title: 'React 18 ve Next.js 14 Yenilikleri',
      type: 'post',
      status: 'draft',
      category: 'Eğitimler',
      tags: ['react', 'nextjs', 'web-development'],
      author: 'Admin',
      createdAt: '2024-01-14T14:30:00Z',
      updatedAt: '2024-01-14T14:30:00Z',
      views: 0,
      likes: 0,
      comments: 0,
      featured: false,
      content: '<h2>React 18 Yenilikleri</h2><p>React 18 ile gelen yeni özellikler...</p>',
      wordCount: 1200,
      readTime: 6
    },
    {
      id: '3',
      title: 'Ana Sayfa',
      type: 'page',
      status: 'published',
      category: 'Sayfalar',
      tags: ['ana-sayfa', 'statik'],
      author: 'Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z',
      views: 5678,
      likes: 0,
      comments: 0,
      featured: false,
      content: '<h1>MySonAI\'a Hoş Geldiniz</h1><p>Yapay zeka destekli blog platformu...</p>',
      wordCount: 500,
      readTime: 3
    },
    {
      id: '4',
      title: 'Blog Post Template',
      type: 'template',
      status: 'published',
      category: 'Şablonlar',
      tags: ['template', 'blog', 'şablon'],
      author: 'Admin',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z',
      publishedAt: '2024-01-05T00:00:00Z',
      views: 234,
      likes: 0,
      comments: 0,
      featured: false,
      content: '<h2>{{title}}</h2><p>{{content}}</p>',
      wordCount: 100,
      readTime: 1
    }
  ];

  const mockMedia: MediaFile[] = [
    {
      id: '1',
      name: 'ai-technology.jpg',
      type: 'image',
      size: 2048000,
      url: 'https://source.unsplash.com/800x600/?artificial-intelligence',
      uploadedAt: '2024-01-15T10:00:00Z',
      uploadedBy: 'MySonAI',
      alt: 'Yapay zeka teknolojisi',
      caption: 'AI ve makine öğrenmesi'
    },
    {
      id: '2',
      name: 'react-tutorial.mp4',
      type: 'video',
      size: 15728640,
      url: '/media/videos/react-tutorial.mp4',
      uploadedAt: '2024-01-14T15:30:00Z',
      uploadedBy: 'Admin',
      alt: 'React eğitim videosu',
      caption: 'React 18 yenilikleri'
    },
    {
      id: '3',
      name: 'documentation.pdf',
      type: 'document',
      size: 1024000,
      url: '/media/documents/documentation.pdf',
      uploadedAt: '2024-01-13T09:15:00Z',
      uploadedBy: 'Admin'
    }
  ];

  useEffect(() => {
    // Simulate loading content
    setTimeout(() => {
      setContent(mockContent);
      setFilteredContent(mockContent);
      setMedia(mockMedia);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter content based on search and filters
    let filtered = content;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredContent(filtered);
  }, [content, searchTerm, selectedType, selectedStatus, selectedCategory]);

  const types = ['all', 'post', 'page', 'media', 'template'];
  const statuses = ['all', 'draft', 'published', 'scheduled', 'archived'];
  const categories = ['all', ...Array.from(new Set(content.map(item => item.category)))];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'post':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Makale</Badge>;
      case 'page':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Sayfa</Badge>;
      case 'media':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Medya</Badge>;
      case 'template':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">Şablon</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Yayınlandı</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Taslak</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Zamanlanmış</Badge>;
      case 'archived':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Arşivlendi</Badge>;
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleContentAction = (itemId: string, action: string) => {
    console.log(`Action: ${action} for content: ${itemId}`);
    // Implement content actions here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">İçerik yönetimi yükleniyor...</p>
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
              <h1 className="text-3xl font-bold text-white">İçerik Yönetimi</h1>
              <p className="text-gray-300">Makaleler, sayfalar, medya ve şablonları yönetin</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setShowMediaManager(true)}
            >
              <Folder className="w-4 h-4 mr-2" />
              Medya Yöneticisi
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setShowEditor(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni İçerik
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam İçerik</p>
                  <p className="text-2xl font-bold text-white">{content.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Yayınlanan</p>
                  <p className="text-2xl font-bold text-white">{content.filter(c => c.status === 'published').length}</p>
                </div>
                <Eye className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Taslaklar</p>
                  <p className="text-2xl font-bold text-white">{content.filter(c => c.status === 'draft').length}</p>
                </div>
                <Edit className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Medya Dosyaları</p>
                  <p className="text-2xl font-bold text-white">{media.length}</p>
                </div>
                <Image className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="İçerik ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Tip</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map(type => (
                    <option key={type} value={type} className="bg-gray-800">
                      {type === 'all' ? 'Tüm Tipler' : type}
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
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedStatus('all');
                    setSelectedCategory('all');
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Temizle
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Content List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {item.thumbnail && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        {getTypeBadge(item.type)}
                        {getStatusBadge(item.status)}
                        {item.featured && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                            <Star className="w-3 h-3 mr-1" />
                            Öne Çıkan
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                      
                      <div className="flex items-center space-x-6 text-gray-400 text-sm mb-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {item.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(item.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views} görüntüleme
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.readTime} dk okuma
                        </div>
                        <div className="flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          {item.wordCount} kelime
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-white/10 border-white/30 text-white">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleContentAction(item.id, 'edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleContentAction(item.id, 'duplicate')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleContentAction(item.id, 'move')}
                    >
                      <Move className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      onClick={() => handleContentAction(item.id, 'delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleContentAction(item.id, 'more')}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">İçerik bulunamadı</h3>
              <p className="text-gray-300 mb-6">
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || selectedCategory !== 'all'
                  ? 'Arama kriterlerinize uygun içerik bulunamadı.' 
                  : 'Henüz hiç içerik yok.'}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                İlk İçeriği Oluştur
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
