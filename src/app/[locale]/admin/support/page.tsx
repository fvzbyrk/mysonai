'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  HelpCircle,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Send,
  Reply,
  Archive,
  Star,
  Flag,
  Tag,
  User,
  Mail,
  Phone,
  Globe,
  Settings,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Key,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Monitor,
  Smartphone,
  Cloud,
  Zap,
  Bell,
  Calendar,
  FileText,
  Image,
  Video,
  File,
  Link as LinkIcon,
  ExternalLink,
  Copy,
  Move,
  Folder,
  FolderPlus,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  viewCount: number;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'bug' | 'feature_request';
  assignee?: string;
  requester: string;
  requesterEmail: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  messages: TicketMessage[];
  attachments: TicketAttachment[];
  tags: string[];
}

interface TicketMessage {
  id: string;
  ticketId: string;
  author: string;
  authorEmail: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
  attachments: TicketAttachment[];
}

interface TicketAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface LiveChat {
  id: string;
  visitor: string;
  visitorEmail?: string;
  status: 'waiting' | 'active' | 'ended';
  agent?: string;
  startedAt: string;
  endedAt?: string;
  messages: ChatMessage[];
  rating?: number;
  feedback?: string;
}

interface ChatMessage {
  id: string;
  chatId: string;
  author: string;
  content: string;
  isVisitor: boolean;
  timestamp: string;
}

export default function SupportSystemPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [liveChats, setLiveChats] = useState<LiveChat[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showCreateFAQ, setShowCreateFAQ] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Mock data
  const mockFAQs: FAQ[] = [
    {
      id: '1',
      question: 'Nasıl yeni blog post oluşturabilirim?',
      answer:
        'Admin paneline giriş yapın, "Blog Yönetimi" bölümüne gidin ve "Yeni Makale" butonuna tıklayın. Formu doldurup yayınlayabilirsiniz.',
      category: 'Blog',
      tags: ['blog', 'post', 'yeni'],
      isPublished: true,
      viewCount: 45,
      helpfulCount: 12,
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      createdBy: 'Admin',
    },
    {
      id: '2',
      question: 'API anahtarı nasıl alınır?',
      answer:
        'Sistem ayarları bölümünden "API Yönetimi" sekmesine gidin ve "Yeni API Key" butonuna tıklayın. İzinleri belirleyip oluşturabilirsiniz.',
      category: 'API',
      tags: ['api', 'anahtar', 'yönetim'],
      isPublished: true,
      viewCount: 23,
      helpfulCount: 8,
      createdAt: '2024-01-08T00:00:00Z',
      updatedAt: '2024-01-12T15:30:00Z',
      createdBy: 'Admin',
    },
    {
      id: '3',
      question: 'Şifremi nasıl sıfırlayabilirim?',
      answer:
        'Giriş sayfasında "Şifremi Unuttum" linkine tıklayın ve e-posta adresinizi girin. Size şifre sıfırlama linki gönderilecektir.',
      category: 'Hesap',
      tags: ['şifre', 'sıfırlama', 'hesap'],
      isPublished: true,
      viewCount: 67,
      helpfulCount: 15,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      createdBy: 'Admin',
    },
  ];

  const mockTickets: Ticket[] = [
    {
      id: '1',
      title: 'Blog post yayınlanmıyor',
      description:
        'Oluşturduğum blog post yayınlanmıyor. Durumu "Yayınlandı" olarak görünüyor ama blog sayfasında görünmüyor.',
      status: 'in_progress',
      priority: 'high',
      category: 'bug',
      assignee: 'Admin',
      requester: 'Ahmet Yılmaz',
      requesterEmail: 'ahmet@example.com',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      lastActivity: '2024-01-15T14:30:00Z',
      messages: [
        {
          id: '1',
          ticketId: '1',
          author: 'Ahmet Yılmaz',
          authorEmail: 'ahmet@example.com',
          content: 'Blog post oluşturdum ama yayınlanmıyor. Yardım edebilir misiniz?',
          isInternal: false,
          createdAt: '2024-01-15T10:00:00Z',
          attachments: [],
        },
        {
          id: '2',
          ticketId: '1',
          author: 'Admin',
          authorEmail: 'admin@mysonai.com',
          content: "Sorununuzu inceliyorum. Blog post'unuzun durumunu kontrol ediyorum.",
          isInternal: false,
          createdAt: '2024-01-15T11:00:00Z',
          attachments: [],
        },
      ],
      attachments: [],
      tags: ['blog', 'yayınlama', 'bug'],
    },
    {
      id: '2',
      title: 'API entegrasyonu sorunu',
      description:
        'Gemini API entegrasyonunda hata alıyorum. API anahtarı doğru görünüyor ama çağrılar başarısız oluyor.',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      requester: 'Mehmet Kaya',
      requesterEmail: 'mehmet@example.com',
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      lastActivity: '2024-01-15T09:00:00Z',
      messages: [
        {
          id: '3',
          ticketId: '2',
          author: 'Mehmet Kaya',
          authorEmail: 'mehmet@example.com',
          content: 'API çağrılarım başarısız oluyor. Hata mesajı: "API key not configured"',
          isInternal: false,
          createdAt: '2024-01-15T09:00:00Z',
          attachments: [],
        },
      ],
      attachments: [],
      tags: ['api', 'gemini', 'entegrasyon'],
    },
    {
      id: '3',
      title: 'Yeni özellik önerisi',
      description:
        'Blog yazılarına yorum sistemi eklenebilir mi? Kullanıcıların makalelere yorum yapabilmesi güzel olur.',
      status: 'resolved',
      priority: 'low',
      category: 'feature_request',
      assignee: 'Admin',
      requester: 'Ayşe Demir',
      requesterEmail: 'ayse@example.com',
      createdAt: '2024-01-14T15:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
      lastActivity: '2024-01-15T12:00:00Z',
      messages: [
        {
          id: '4',
          ticketId: '3',
          author: 'Ayşe Demir',
          authorEmail: 'ayse@example.com',
          content: 'Blog yazılarına yorum sistemi eklenebilir mi?',
          isInternal: false,
          createdAt: '2024-01-14T15:00:00Z',
          attachments: [],
        },
        {
          id: '5',
          ticketId: '3',
          author: 'Admin',
          authorEmail: 'admin@mysonai.com',
          content:
            'Harika bir öneri! Yorum sistemi geliştirme planlarımızda var. Yakında eklenecek.',
          isInternal: false,
          createdAt: '2024-01-15T12:00:00Z',
          attachments: [],
        },
      ],
      attachments: [],
      tags: ['yorum', 'özellik', 'blog'],
    },
  ];

  const mockLiveChats: LiveChat[] = [
    {
      id: '1',
      visitor: 'Ziyaretçi 1',
      visitorEmail: 'visitor1@example.com',
      status: 'active',
      agent: 'Admin',
      startedAt: '2024-01-15T14:00:00Z',
      messages: [
        {
          id: '1',
          chatId: '1',
          author: 'Ziyaretçi 1',
          content: 'Merhaba, blog post oluşturma konusunda yardım alabilir miyim?',
          isVisitor: true,
          timestamp: '2024-01-15T14:00:00Z',
        },
        {
          id: '2',
          chatId: '1',
          author: 'Admin',
          content: 'Tabii ki! Size nasıl yardımcı olabilirim?',
          isVisitor: false,
          timestamp: '2024-01-15T14:01:00Z',
        },
      ],
    },
    {
      id: '2',
      visitor: 'Ziyaretçi 2',
      status: 'waiting',
      startedAt: '2024-01-15T14:15:00Z',
      messages: [
        {
          id: '3',
          chatId: '2',
          author: 'Ziyaretçi 2',
          content: 'API entegrasyonu hakkında soru sormak istiyorum',
          isVisitor: true,
          timestamp: '2024-01-15T14:15:00Z',
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading support data
    setTimeout(() => {
      setFaqs(mockFAQs);
      setTickets(mockTickets);
      setLiveChats(mockLiveChats);
      setFilteredTickets(mockTickets);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter tickets
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(
        ticket =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.requester.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === selectedPriority);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === selectedCategory);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, selectedStatus, selectedPriority, selectedCategory]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Açık</Badge>;
      case 'in_progress':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>İşlemde</Badge>
        );
      case 'resolved':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Çözüldü</Badge>
        );
      case 'closed':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Kapalı</Badge>;
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'technical':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Teknik</Badge>;
      case 'billing':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Faturalama</Badge>
        );
      case 'general':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Genel</Badge>;
      case 'bug':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Hata</Badge>;
      case 'feature_request':
        return (
          <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50'>Özellik</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getChatStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Bekliyor</Badge>
        );
      case 'active':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Aktif</Badge>;
      case 'ended':
        return <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Sonlandı</Badge>;
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

  const handleTicketAction = (ticketId: string, action: string) => {
    console.log(`Action: ${action} for ticket: ${ticketId}`);
    // Implement ticket actions here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Destek sistemi yükleniyor...</p>
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
              <h1 className='text-3xl font-bold text-white'>Destek Sistemi</h1>
              <p className='text-gray-300'>Ticket yönetimi, FAQ ve canlı destek</p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              onClick={() => setShowCreateFAQ(true)}
            >
              <Plus className='w-4 h-4 mr-2' />
              FAQ Ekle
            </Button>
            <Button
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'
              onClick={() => setShowCreateTicket(true)}
            >
              <Plus className='w-4 h-4 mr-2' />
              Yeni Ticket
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Ticket</p>
                  <p className='text-2xl font-bold text-white'>{tickets.length}</p>
                </div>
                <MessageSquare className='w-8 h-8 text-blue-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Açık Ticket</p>
                  <p className='text-2xl font-bold text-white'>
                    {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                  </p>
                </div>
                <AlertTriangle className='w-8 h-8 text-yellow-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Canlı Chat</p>
                  <p className='text-2xl font-bold text-white'>
                    {liveChats.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Users className='w-8 h-8 text-green-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>FAQ Makaleleri</p>
                  <p className='text-2xl font-bold text-white'>{faqs.length}</p>
                </div>
                <HelpCircle className='w-8 h-8 text-purple-400' />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className='flex space-x-2'>
          {[
            { value: 'tickets', label: 'Ticketlar', icon: MessageSquare },
            { value: 'faqs', label: 'FAQ', icon: HelpCircle },
            { value: 'chats', label: 'Canlı Chat', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  activeTab === tab.value
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                )}
              >
                <Icon className='w-4 h-4 mr-2' />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className='space-y-6'>
            {/* Filters */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20'>
              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                  <div>
                    <label className='text-white text-sm font-medium mb-2 block'>Arama</label>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                      <Input
                        placeholder='Ticket ara...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10'
                      />
                    </div>
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
                      <option value='open' className='bg-gray-800'>
                        Açık
                      </option>
                      <option value='in_progress' className='bg-gray-800'>
                        İşlemde
                      </option>
                      <option value='resolved' className='bg-gray-800'>
                        Çözüldü
                      </option>
                      <option value='closed' className='bg-gray-800'>
                        Kapalı
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className='text-white text-sm font-medium mb-2 block'>Öncelik</label>
                    <select
                      value={selectedPriority}
                      onChange={e => setSelectedPriority(e.target.value)}
                      className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value='all' className='bg-gray-800'>
                        Tüm Öncelikler
                      </option>
                      <option value='urgent' className='bg-gray-800'>
                        Acil
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
                    <label className='text-white text-sm font-medium mb-2 block'>Kategori</label>
                    <select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value='all' className='bg-gray-800'>
                        Tüm Kategoriler
                      </option>
                      <option value='technical' className='bg-gray-800'>
                        Teknik
                      </option>
                      <option value='billing' className='bg-gray-800'>
                        Faturalama
                      </option>
                      <option value='general' className='bg-gray-800'>
                        Genel
                      </option>
                      <option value='bug' className='bg-gray-800'>
                        Hata
                      </option>
                      <option value='feature_request' className='bg-gray-800'>
                        Özellik
                      </option>
                    </select>
                  </div>

                  <div className='flex items-end'>
                    <Button
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedStatus('all');
                        setSelectedPriority('all');
                        setSelectedCategory('all');
                      }}
                    >
                      <Filter className='w-4 h-4 mr-2' />
                      Temizle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tickets List */}
            <div className='grid grid-cols-1 gap-6'>
              {filteredTickets.map(ticket => (
                <Card
                  key={ticket.id}
                  className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
                >
                  <div className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-3 mb-2'>
                          <h3 className='text-lg font-semibold text-white'>{ticket.title}</h3>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                          {getCategoryBadge(ticket.category)}
                        </div>

                        <p className='text-gray-300 text-sm mb-3 line-clamp-2'>
                          {ticket.description}
                        </p>

                        <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                          <div className='flex items-center'>
                            <User className='w-4 h-4 mr-1' />
                            {ticket.requester}
                          </div>
                          <div className='flex items-center'>
                            <Mail className='w-4 h-4 mr-1' />
                            {ticket.requesterEmail}
                          </div>
                          <div className='flex items-center'>
                            <Clock className='w-4 h-4 mr-1' />
                            {formatDate(ticket.createdAt)}
                          </div>
                          {ticket.assignee && (
                            <div className='flex items-center'>
                              <Users className='w-4 h-4 mr-1' />
                              {ticket.assignee}
                            </div>
                          )}
                        </div>

                        <div className='flex flex-wrap gap-2'>
                          {ticket.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant='outline'
                              className='bg-white/10 border-white/30 text-white text-xs'
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className='flex items-center space-x-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                          onClick={() => handleTicketAction(ticket.id, 'reply')}
                        >
                          <Reply className='w-4 h-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                          onClick={() => handleTicketAction(ticket.id, 'assign')}
                        >
                          <User className='w-4 h-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                          onClick={() => handleTicketAction(ticket.id, 'close')}
                        >
                          <XCircle className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faqs' && (
          <div className='grid grid-cols-1 gap-6'>
            {faqs.map(faq => (
              <Card key={faq.id} className='bg-white/10 backdrop-blur-md border-white/20'>
                <div className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>{faq.question}</h3>
                        <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>
                          {faq.category}
                        </Badge>
                        {faq.isPublished ? (
                          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                            Yayınlandı
                          </Badge>
                        ) : (
                          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>
                            Taslak
                          </Badge>
                        )}
                      </div>

                      <p className='text-gray-300 text-sm mb-3'>{faq.answer}</p>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                        <div className='flex items-center'>
                          <Eye className='w-4 h-4 mr-1' />
                          {faq.viewCount} görüntüleme
                        </div>
                        <div className='flex items-center'>
                          <CheckCircle className='w-4 h-4 mr-1' />
                          {faq.helpfulCount} faydalı
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {formatDate(faq.updatedAt)}
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {faq.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='bg-white/10 border-white/30 text-white text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      >
                        <Eye className='w-4 h-4' />
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
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Live Chat Tab */}
        {activeTab === 'chats' && (
          <div className='grid grid-cols-1 gap-6'>
            {liveChats.map(chat => (
              <Card key={chat.id} className='bg-white/10 backdrop-blur-md border-white/20'>
                <div className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>{chat.visitor}</h3>
                        {getChatStatusBadge(chat.status)}
                        {chat.agent && (
                          <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>
                            {chat.agent}
                          </Badge>
                        )}
                      </div>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm mb-3'>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {formatDate(chat.startedAt)}
                        </div>
                        <div className='flex items-center'>
                          <MessageSquare className='w-4 h-4 mr-1' />
                          {chat.messages.length} mesaj
                        </div>
                        {chat.rating && (
                          <div className='flex items-center'>
                            <Star className='w-4 h-4 mr-1' />
                            {chat.rating}/5
                          </div>
                        )}
                      </div>

                      {chat.messages.length > 0 && (
                        <div className='bg-white/5 p-3 rounded-lg mb-3'>
                          <p className='text-gray-300 text-sm'>
                            <strong>{chat.messages[chat.messages.length - 1].author}:</strong>{' '}
                            {chat.messages[chat.messages.length - 1].content}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      >
                        <Eye className='w-4 h-4' />
                      </Button>
                      {chat.status === 'waiting' && (
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                        >
                          <Users className='w-4 h-4' />
                        </Button>
                      )}
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                      >
                        <XCircle className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredTickets.length === 0 && activeTab === 'tickets' && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-12 text-center'>
              <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>
                {searchTerm ||
                selectedStatus !== 'all' ||
                selectedPriority !== 'all' ||
                selectedCategory !== 'all'
                  ? 'Ticket bulunamadı'
                  : 'Henüz ticket yok'}
              </h3>
              <p className='text-gray-400 mb-6'>
                {searchTerm ||
                selectedStatus !== 'all' ||
                selectedPriority !== 'all' ||
                selectedCategory !== 'all'
                  ? 'Arama kriterlerinize uygun ticket bulunamadı.'
                  : 'Henüz hiç ticket oluşturulmamış.'}
              </p>
              <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
                <Plus className='w-4 h-4 mr-2' />
                İlk Ticket Oluştur
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
