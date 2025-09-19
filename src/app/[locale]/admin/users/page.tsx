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
  User,
  Mail,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  ArrowLeft,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  lastLogin: string;
  postsCount: number;
  avatar?: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z',
      postsCount: 25,
      avatar: 'https://source.unsplash.com/100x100/?portrait',
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
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-10T00:00:00Z',
      lastLogin: '2024-01-13T09:20:00Z',
      postsCount: 3,
      avatar: 'https://source.unsplash.com/100x100/?man',
    },
    {
      id: '4',
      name: 'Fatma Özkan',
      email: 'fatma@example.com',
      role: 'user',
      status: 'inactive',
      joinDate: '2024-01-08T00:00:00Z',
      lastLogin: '2024-01-12T14:10:00Z',
      postsCount: 1,
      avatar: 'https://source.unsplash.com/100x100/?woman',
    },
    {
      id: '5',
      name: 'Ali Çelik',
      email: 'ali@example.com',
      role: 'user',
      status: 'banned',
      joinDate: '2024-01-03T00:00:00Z',
      lastLogin: '2024-01-11T16:30:00Z',
      postsCount: 0,
      avatar: 'https://source.unsplash.com/100x100/?man',
    },
  ];

  useEffect(() => {
    // Simulate loading users
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter users based on search and filters
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        user =>
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

  const roles = ['all', 'admin', 'editor', 'user'];
  const statuses = ['all', 'active', 'inactive', 'banned'];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Admin</Badge>;
      case 'editor':
        return <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>Editör</Badge>;
      case 'user':
        return (
          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Kullanıcı</Badge>
        );
      default:
        return (
          <Badge className='bg-gray-500/20 text-gray-400 border-gray-500/50'>Bilinmiyor</Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>Aktif</Badge>;
      case 'inactive':
        return (
          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>Pasif</Badge>
        );
      case 'banned':
        return <Badge className='bg-red-500/20 text-red-400 border-red-500/50'>Yasaklı</Badge>;
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

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action: ${action} for user: ${userId}`);
    // Implement user actions here
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Kullanıcılar yükleniyor...</p>
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
              <h1 className='text-3xl font-bold text-white'>Kullanıcı Yönetimi</h1>
              <p className='text-gray-300'>Kullanıcıları yönet ve yetkilendir</p>
            </div>
          </div>
          <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
            <Plus className='w-4 h-4 mr-2' />
            Yeni Kullanıcı
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Toplam Kullanıcı</p>
                  <p className='text-2xl font-bold text-white'>{users.length}</p>
                </div>
                <User className='w-8 h-8 text-blue-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Aktif Kullanıcı</p>
                  <p className='text-2xl font-bold text-white'>
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className='w-8 h-8 text-green-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Editörler</p>
                  <p className='text-2xl font-bold text-white'>
                    {users.filter(u => u.role === 'editor').length}
                  </p>
                </div>
                <Shield className='w-8 h-8 text-purple-400' />
              </div>
            </div>
          </Card>

          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-300 text-sm'>Yasaklı</p>
                  <p className='text-2xl font-bold text-white'>
                    {users.filter(u => u.status === 'banned').length}
                  </p>
                </div>
                <Ban className='w-8 h-8 text-red-400' />
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
                    placeholder='Kullanıcı ara...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10'
                  />
                </div>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Rol</label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {roles.map(role => (
                    <option key={role} value={role} className='bg-gray-800'>
                      {role === 'all' ? 'Tüm Roller' : role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='text-white text-sm font-medium mb-2 block'>Durum</label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className='w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className='bg-gray-800'>
                      {status === 'all' ? 'Tüm Durumlar' : status}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-end'>
                <Button
                  variant='outline'
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRole('all');
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

        {/* Users List */}
        <div className='grid grid-cols-1 gap-6'>
          {filteredUsers.map(user => (
            <Card
              key={user.id}
              className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
            >
              <div className='p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center'>
                      <User className='w-6 h-6 text-white' />
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <h3 className='text-lg font-semibold text-white'>{user.name}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>

                      <div className='flex items-center space-x-6 text-gray-400 text-sm'>
                        <div className='flex items-center'>
                          <Mail className='w-4 h-4 mr-1' />
                          {user.email}
                        </div>
                        <div className='flex items-center'>
                          <Calendar className='w-4 h-4 mr-1' />
                          {formatDate(user.joinDate)}
                        </div>
                        <div className='flex items-center'>
                          <User className='w-4 h-4 mr-1' />
                          {user.postsCount} makale
                        </div>
                      </div>

                      <p className='text-gray-300 text-sm mt-2'>
                        Son giriş: {formatDate(user.lastLogin)}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => handleUserAction(user.id, 'edit')}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => handleUserAction(user.id, 'view')}
                    >
                      <User className='w-4 h-4' />
                    </Button>
                    {user.status === 'banned' ? (
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                        onClick={() => handleUserAction(user.id, 'unban')}
                      >
                        <CheckCircle className='w-4 h-4' />
                      </Button>
                    ) : (
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                        onClick={() => handleUserAction(user.id, 'ban')}
                      >
                        <Ban className='w-4 h-4' />
                      </Button>
                    )}
                    <Button
                      size='sm'
                      variant='outline'
                      className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      onClick={() => handleUserAction(user.id, 'more')}
                    >
                      <MoreVertical className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-12 text-center'>
              <User className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>Kullanıcı bulunamadı</h3>
              <p className='text-gray-300 mb-6'>
                {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                  ? 'Arama kriterlerinize uygun kullanıcı bulunamadı.'
                  : 'Henüz hiç kullanıcı yok.'}
              </p>
              <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
                <Plus className='w-4 h-4 mr-2' />
                İlk Kullanıcıyı Ekle
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
