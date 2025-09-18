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
  User, 
  Mail,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  ArrowLeft,
  MoreVertical,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  Activity,
  Clock,
  AlertTriangle,
  Settings,
  UserPlus,
  UserMinus,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdvancedUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer';
  status: 'active' | 'inactive' | 'banned' | 'locked';
  joinDate: string;
  lastLogin: string;
  postsCount: number;
  avatar?: string;
  twoFactorEnabled: boolean;
  lastActivity: string;
  loginAttempts: number;
  ipAddress: string;
  permissions: string[];
  isOnline: boolean;
}

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export default function AdvancedUsersPage() {
  const [users, setUsers] = useState<AdvancedUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdvancedUser[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdvancedUser | null>(null);

  // Mock data
  const mockUsers: AdvancedUser[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'super_admin',
      status: 'active',
      joinDate: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z',
      postsCount: 25,
      avatar: 'https://source.unsplash.com/100x100/?portrait',
      twoFactorEnabled: true,
      lastActivity: '2024-01-15T10:30:00Z',
      loginAttempts: 0,
      ipAddress: '192.168.1.100',
      permissions: ['all'],
      isOnline: true
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'editor',
      status: 'active',
      joinDate: '2024-01-05T00:00:00Z',
      lastLogin: '2024-01-14T15:45:00Z',
      postsCount: 12,
      avatar: 'https://source.unsplash.com/100x100/?woman',
      twoFactorEnabled: false,
      lastActivity: '2024-01-14T15:45:00Z',
      loginAttempts: 0,
      ipAddress: '192.168.1.101',
      permissions: ['content_manage', 'user_view'],
      isOnline: false
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      role: 'author',
      status: 'active',
      joinDate: '2024-01-10T00:00:00Z',
      lastLogin: '2024-01-13T09:20:00Z',
      postsCount: 3,
      avatar: 'https://source.unsplash.com/100x100/?man',
      twoFactorEnabled: true,
      lastActivity: '2024-01-13T09:20:00Z',
      loginAttempts: 0,
      ipAddress: '192.168.1.102',
      permissions: ['content_create', 'content_edit_own'],
      isOnline: false
    },
    {
      id: '4',
      name: 'Fatma Özkan',
      email: 'fatma@example.com',
      role: 'viewer',
      status: 'locked',
      joinDate: '2024-01-08T00:00:00Z',
      lastLogin: '2024-01-12T14:10:00Z',
      postsCount: 0,
      avatar: 'https://source.unsplash.com/100x100/?woman',
      twoFactorEnabled: false,
      lastActivity: '2024-01-12T14:10:00Z',
      loginAttempts: 5,
      ipAddress: '192.168.1.103',
      permissions: ['content_view'],
      isOnline: false
    },
    {
      id: '5',
      name: 'Ali Çelik',
      email: 'ali@example.com',
      role: 'viewer',
      status: 'banned',
      joinDate: '2024-01-03T00:00:00Z',
      lastLogin: '2024-01-11T16:30:00Z',
      postsCount: 0,
      avatar: 'https://source.unsplash.com/100x100/?man',
      twoFactorEnabled: false,
      lastActivity: '2024-01-11T16:30:00Z',
      loginAttempts: 10,
      ipAddress: '192.168.1.104',
      permissions: [],
      isOnline: false
    }
  ];

  const mockActivities: UserActivity[] = [
    {
      id: '1',
      userId: '1',
      action: 'login',
      description: 'Sisteme giriş yaptı',
      timestamp: '2024-01-15T10:30:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '2',
      userId: '1',
      action: 'create_post',
      description: 'Yeni makale oluşturdu: "AI Teknolojileri"',
      timestamp: '2024-01-15T10:35:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '3',
      userId: '2',
      action: 'edit_post',
      description: 'Makale düzenledi: "React 18 Yenilikleri"',
      timestamp: '2024-01-14T15:45:00Z',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: '4',
      userId: '4',
      action: 'failed_login',
      description: 'Başarısız giriş denemesi',
      timestamp: '2024-01-12T14:10:00Z',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ];

  useEffect(() => {
    // Simulate loading users
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter users based on search and filters
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus]);

  const roles = ['all', 'super_admin', 'admin', 'editor', 'author', 'viewer'];
  const statuses = ['all', 'active', 'inactive', 'locked', 'banned'];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Süper Admin</Badge>;
      case 'admin':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">Admin</Badge>;
      case 'editor':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Editör</Badge>;
      case 'author':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Yazar</Badge>;
      case 'viewer':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Görüntüleyici</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Bilinmiyor</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktif</Badge>;
      case 'inactive':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Pasif</Badge>;
      case 'locked':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">Kilitli</Badge>;
      case 'banned':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Yasaklı</Badge>;
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

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action: ${action} for user: ${userId}`);
    // Implement user actions here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Gelişmiş kullanıcı yönetimi yükleniyor...</p>
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
            <Link href="/tr/admin/users">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Basit Görünüm
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Gelişmiş Kullanıcı Yönetimi</h1>
              <p className="text-gray-300">Detaylı kullanıcı kontrolü, roller ve güvenlik</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setShowAddUser(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Yeni Kullanıcı
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Toplam Kullanıcı</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <User className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Aktif Kullanıcı</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Çevrimiçi</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.isOnline).length}</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">2FA Aktif</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.twoFactorEnabled).length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
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
                    placeholder="Kullanıcı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Rol</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map(role => (
                    <option key={role} value={role} className="bg-gray-800">
                      {role === 'all' ? 'Tüm Roller' : role}
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
                    setSelectedRole('all');
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

        {/* Users List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                        {user.twoFactorEnabled && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                            <Shield className="w-3 h-3 mr-1" />
                            2FA
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-gray-400 text-sm mb-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {user.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(user.joinDate)}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {user.postsCount} makale
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          {user.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-400 text-xs">
                        <span>Son giriş: {formatDate(user.lastLogin)}</span>
                        <span>IP: {user.ipAddress}</span>
                        {user.loginAttempts > 0 && (
                          <span className="text-red-400">
                            {user.loginAttempts} başarısız deneme
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {user.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="bg-white/10 border-white/30 text-white text-xs">
                            {permission}
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
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleUserAction(user.id, 'edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user.status === 'locked' ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                        onClick={() => handleUserAction(user.id, 'unlock')}
                      >
                        <Unlock className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-orange-500/20 border-orange-500/50 text-orange-400 hover:bg-orange-500/30"
                        onClick={() => handleUserAction(user.id, 'lock')}
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                    )}
                    {user.status === 'banned' ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                        onClick={() => handleUserAction(user.id, 'unban')}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                        onClick={() => handleUserAction(user.id, 'ban')}
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleUserAction(user.id, 'more')}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Son Aktiviteler</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.description}</p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(activity.timestamp)} • IP: {activity.ipAddress}
                    </p>
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
