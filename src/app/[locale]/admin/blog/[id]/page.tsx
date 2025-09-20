'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  User,
  Clock,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
  imageAlt?: string;
}

export default function BlogPostDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadPost();
  }, [postId, loadPost]);

  const loadPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blog?id=${postId}`);
      const data = await response.json();

      if (data.success && data.data.post) {
        setPost(data.data.post);
      } else {
        // console.error('Failed to load post:', data.message);
      }
    } catch (error) {
      // console.error('Error loading post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post) {
      return;
    }

    if (!confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          postData: { id: post.id },
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to blog management
        window.location.href = '/tr/admin/blog';
      } else {
        alert('Makale silinirken hata oluştu: ' + data.message);
      }
    } catch (error) {
      // console.error('Error deleting post:', error);
      alert('Makale silinirken hata oluştu');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: {
        label: 'Yayınlandı',
        className: 'bg-green-500/20 text-green-400 border-green-500/50',
      },
      draft: {
        label: 'Taslak',
        className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      },
      scheduled: {
        label: 'Zamanlanmış',
        className: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: 'Yüksek', className: 'bg-red-500/20 text-red-400 border-red-500/50' },
      medium: { label: 'Orta', className: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
      low: { label: 'Düşük', className: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
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

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-8 bg-white/20 rounded mb-4'></div>
            <div className='h-4 bg-white/20 rounded mb-2'></div>
            <div className='h-4 bg-white/20 rounded mb-2'></div>
            <div className='h-4 bg-white/20 rounded mb-2'></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-2xl font-bold text-white mb-4'>Makale bulunamadı</h1>
          <Link href='/tr/admin/blog'>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Blog Yönetimine Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/tr/admin/blog'>
              <Button
                variant='outline'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Blog Yönetimi
              </Button>
            </Link>
            <div>
              <h1 className='text-3xl font-bold text-white'>Makale Detayı</h1>
              <p className='text-gray-300'>Makale bilgilerini görüntüle ve yönet</p>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Link href={`/tr/admin/blog/${post.id}/edit`}>
              <Button
                variant='outline'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20'
              >
                <Edit className='w-4 h-4 mr-2' />
                Düzenle
              </Button>
            </Link>
            <Button
              variant='outline'
              className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className='w-4 h-4 mr-2' />
              {isDeleting ? 'Siliniyor...' : 'Sil'}
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            {/* Status and Priority */}
            <div className='flex items-center space-x-3 mb-4'>
              {getStatusBadge(post.status)}
              {getPriorityBadge(post.priority)}
              <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>
                {post.category}
              </Badge>
            </div>

            {/* Title */}
            <h2 className='text-3xl font-bold text-white mb-4'>{post.title}</h2>

            {/* Meta Information */}
            <div className='flex items-center space-x-6 text-gray-400 text-sm mb-6'>
              <div className='flex items-center'>
                <User className='w-4 h-4 mr-1' />
                {post.author}
              </div>
              <div className='flex items-center'>
                <Clock className='w-4 h-4 mr-1' />
                {post.readTime} dk
              </div>
              <div className='flex items-center'>
                <Eye className='w-4 h-4 mr-1' />
                {post.views} görüntüleme
              </div>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                {formatDate(post.publishedAt)}
              </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-6'>
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='bg-white/10 border-white/30 text-white'
                >
                  <Tag className='w-3 h-3 mr-1' />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Image */}
            {post.imageUrl && (
              <div className='mb-6'>
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  width={800}
                  height={256}
                  className='w-full h-64 object-cover rounded-lg'
                />
              </div>
            )}

            {/* Content */}
            <div className='prose prose-invert max-w-none'>
              <div
                className='text-gray-300 leading-relaxed'
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Actions */}
            <div className='flex items-center justify-between mt-8 pt-6 border-t border-white/20'>
              <div className='text-sm text-gray-400'>Kaynak: {post.source}</div>

              <div className='flex items-center space-x-2'>
                <Link href={`/tr/blog/${post.id}`} target='_blank'>
                  <Button
                    variant='outline'
                    className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                  >
                    <ExternalLink className='w-4 h-4 mr-2' />
                    Canlı Görüntüle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
