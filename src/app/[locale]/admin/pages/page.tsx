'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Edit,
  Eye,
  EyeOff,
  Search,
  Plus,
  Save,
  X,
  Globe,
  Lock,
  Calendar,
  User,
  Settings,
  Trash2,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageForm } from '@/hooks/usePageForm';
import { toast } from 'sonner';
import { PagesErrorBoundary } from '@/components/admin-error-boundary';
import { usePagesManagement } from '@/hooks/usePagesManagement';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { VirtualScroll } from '@/components/performance/virtual-scroll';
import { LazyImage } from '@/components/performance/lazy-image';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  visibility: 'public' | 'private' | 'password';
  seoTitle?: string;
  seoDescription?: string;
  lastModified: string;
  author: string;
  views: number;
  category: string;
  tags: string[];
}

export default function PagesManagement() {
  // Custom hooks
  const {
    pages,
    selectedPage,
    isEditing,
    isCreating,
    isLoading,
    filteredPages,
    stats,
    createPage,
    updatePage,
    deletePage,
    startEditing,
    startCreating,
    cancelEditing,
    setSearchTerm,
    setStatusFilter,
  } = usePagesManagement({ autoLoad: true, showNotifications: true });

  const { handleError, handleAsyncError } = useErrorHandler();
  
  // Local state
  const [newTag, setNewTag] = useState('');

  // Form validation hook
  const pageForm = usePageForm({
    defaultValues: selectedPage ? {
      title: selectedPage.title,
      slug: selectedPage.slug,
      content: selectedPage.content,
      status: selectedPage.status,
      visibility: selectedPage.visibility,
      seoTitle: selectedPage.seoTitle,
      seoDescription: selectedPage.seoDescription,
      category: selectedPage.category,
      tags: selectedPage.tags,
    } : undefined,
    onSubmit: async (data) => {
      if (isCreating) {
        await handleAsyncError(() => createPage(data), {
          component: 'PagesManagement',
          action: 'CREATE_PAGE',
        });
      } else if (isEditing && selectedPage) {
        await handleAsyncError(() => updatePage(selectedPage.id, data), {
          component: 'PagesManagement',
          action: 'UPDATE_PAGE',
        });
      }
    },
    onSuccess: () => {
      cancelEditing();
    },
    onError: (error) => {
      handleError(error, {
        component: 'PagesManagement',
        action: 'FORM_SUBMIT',
      });
    },
  });

  // Handler functions using custom hooks
  const handleEditPage = (page: Page) => {
    startEditing(page);
  };

  const handleStartCreate = () => {
    startCreating();
    pageForm.resetForm();
  };

  const handleSavePage = () => {
    pageForm.handleSubmit();
  };

  const handleCancelEdit = () => {
    cancelEditing();
    pageForm.resetForm();
  };

  const handleStatusChange = (pageId: string, newStatus: Page['status']) => {
    // Status change will be handled by the hook
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) {
      return;
    }

    await handleAsyncError(() => deletePage(pageId), {
      component: 'PagesManagement',
      action: 'DELETE_PAGE',
    });
  };

  const getStatusColor = (status: Page['status']) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusText = (status: Page['status']) => {
    switch (status) {
      case 'published': return 'Yayınlandı';
      case 'draft': return 'Taslak';
      case 'archived': return 'Arşivlendi';
      default: return 'Bilinmiyor';
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Sayfalar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <PagesErrorBoundary>
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Sayfa Yönetimi</h1>
            <p className='text-gray-300'>Tüm sayfaları yönetin ve düzenleyin</p>
          </div>
          <Button 
            onClick={handleStartCreate}
            className='bg-blue-600 hover:bg-blue-700 text-white'
          >
            <Plus className='w-4 h-4 mr-2' />
            Yeni Sayfa
          </Button>
        </div>

        {/* Filtreler ve Arama */}
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-6'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <Input
                    placeholder='Sayfa ara...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <Button
                  onClick={() => setStatusFilter('all')}
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  Tümü
                </Button>
                <Button
                  onClick={() => setStatusFilter('published')}
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  Yayınlandı
                </Button>
                <Button
                  onClick={() => setStatusFilter('draft')}
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  Taslak
                </Button>
                <Button
                  onClick={() => setStatusFilter('archived')}
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  Arşivlendi
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Sayfa Listesi */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Sayfa Kartları - Virtual Scrolling */}
          <div className='h-[600px]'>
            {filteredPages.length === 0 && !isLoading ? (
              <Card className='bg-white/10 backdrop-blur-md border-white/20'>
                <div className='p-6 text-center text-gray-300'>
                  Gösterilecek sayfa bulunamadı.
                </div>
              </Card>
            ) : (
              <VirtualScroll
                items={filteredPages}
                height={600}
                itemHeight={180}
                renderItem={({ item: page, style }) => (
                  <div style={style} className="px-2">
                    <Card className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 mb-4'>
                      <div className='p-6'>
                        <div className='flex items-start justify-between mb-4'>
                          <div className='flex-1'>
                            <h3 className='text-lg font-semibold text-white mb-2'>{page.title}</h3>
                            <p className='text-gray-300 text-sm mb-2'>{page.slug}</p>
                            <div className='flex items-center space-x-2 mb-2'>
                              <Badge className={getStatusColor(page.status)}>
                                {getStatusText(page.status)}
                              </Badge>
                              <Badge className='bg-blue-500/20 text-blue-400 border-blue-500/50'>
                                {page.category}
                              </Badge>
                            </div>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleEditPage(page)}
                              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                            >
                              <Edit className='w-3 h-3' />
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleDeletePage(page.id)}
                              className='bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                            >
                              <Trash2 className='w-3 h-3' />
                            </Button>
                          </div>
                        </div>
                        
                        <div className='flex items-center justify-between text-sm text-gray-400'>
                          <div className='flex items-center space-x-4'>
                            <span className='flex items-center'>
                              <Eye className='w-3 h-3 mr-1' />
                              {page.views.toLocaleString()}
                            </span>
                            <span className='flex items-center'>
                              <Calendar className='w-3 h-3 mr-1' />
                              {page.lastModified}
                            </span>
                            <span className='flex items-center'>
                              <User className='w-3 h-3 mr-1' />
                              {page.author}
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => window.open(page.slug, '_blank')}
                              className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                            >
                              <ExternalLink className='w-3 h-3' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              />
            )}
          </div>

          {/* Sayfa Düzenleme Paneli */}
          <div className='lg:sticky lg:top-6'>
            {selectedPage && (isEditing || isCreating) ? (
              <Card className='bg-white/10 backdrop-blur-md border-white/20'>
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-lg font-semibold text-white'>
                      {isCreating ? 'Yeni Sayfa Oluştur' : 'Sayfa Düzenle'}
                    </h3>
                    <div className='flex space-x-2'>
                      <Button
                        size='sm'
                        onClick={handleSavePage}
                        className='bg-green-600 hover:bg-green-700 text-white'
                      >
                        <Save className='w-3 h-3 mr-1' />
                        Kaydet
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleCancelEdit}
                        className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                      >
                        <X className='w-3 h-3' />
                      </Button>
                    </div>
                  </div>

                  <form onSubmit={pageForm.handleSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Sayfa Başlığı *
                      </label>
                      <Input
                        {...pageForm.form.register('title')}
                        onChange={(e) => {
                          pageForm.form.setValue('title', e.target.value);
                          pageForm.handleTitleChange(e.target.value);
                        }}
                        onBlur={pageForm.handleTitleBlur}
                        className={cn(
                          'bg-white/10 border-white/20 text-white',
                          pageForm.errors.title && 'border-red-500'
                        )}
                        placeholder='Sayfa başlığını girin...'
                      />
                      {pageForm.errors.title && (
                        <p className='text-red-400 text-sm mt-1 flex items-center'>
                          <AlertCircle className='w-3 h-3 mr-1' />
                          {pageForm.errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        URL Slug *
                      </label>
                      <Input
                        {...pageForm.form.register('slug')}
                        className={cn(
                          'bg-white/10 border-white/20 text-white',
                          pageForm.errors.slug && 'border-red-500'
                        )}
                        placeholder='url-slug'
                      />
                      {pageForm.errors.slug && (
                        <p className='text-red-400 text-sm mt-1 flex items-center'>
                          <AlertCircle className='w-3 h-3 mr-1' />
                          {pageForm.errors.slug.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        SEO Başlığı
                      </label>
                      <Input
                        {...pageForm.form.register('seoTitle')}
                        className='bg-white/10 border-white/20 text-white'
                        placeholder='SEO başlığı (otomatik oluşturulur)'
                      />
                      <p className='text-gray-400 text-xs mt-1'>
                        {pageForm.form.watch('seoTitle')?.length || 0}/60 karakter
                      </p>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        SEO Açıklaması
                      </label>
                      <Textarea
                        {...pageForm.form.register('seoDescription')}
                        className='bg-white/10 border-white/20 text-white'
                        rows={3}
                        placeholder='SEO açıklaması (otomatik oluşturulur)'
                      />
                      <p className='text-gray-400 text-xs mt-1'>
                        {pageForm.form.watch('seoDescription')?.length || 0}/160 karakter
                      </p>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Durum
                      </label>
                      <select
                        {...pageForm.form.register('status')}
                        className='w-full p-2 bg-white/10 border border-white/20 text-white rounded-md'
                      >
                        <option value='published'>Yayınlandı</option>
                        <option value='draft'>Taslak</option>
                        <option value='archived'>Arşivlendi</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Görünürlük
                      </label>
                      <select
                        {...pageForm.form.register('visibility')}
                        className='w-full p-2 bg-white/10 border border-white/20 text-white rounded-md'
                      >
                        <option value='public'>Herkese Açık</option>
                        <option value='private'>Özel</option>
                        <option value='password'>Şifreli</option>
                      </select>
                    </div>

                    {pageForm.form.watch('visibility') === 'password' && (
                      <div>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                          Şifre *
                        </label>
                        <Input
                          {...pageForm.form.register('password')}
                          type='password'
                          className={cn(
                            'bg-white/10 border-white/20 text-white',
                            pageForm.errors.password && 'border-red-500'
                          )}
                          placeholder='Sayfa şifresi'
                        />
                        {pageForm.errors.password && (
                          <p className='text-red-400 text-sm mt-1 flex items-center'>
                            <AlertCircle className='w-3 h-3 mr-1' />
                            {pageForm.errors.password.message}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Kategori *
                      </label>
                      <Input
                        {...pageForm.form.register('category')}
                        className={cn(
                          'bg-white/10 border-white/20 text-white',
                          pageForm.errors.category && 'border-red-500'
                        )}
                        placeholder='Kategori'
                      />
                      {pageForm.errors.category && (
                        <p className='text-red-400 text-sm mt-1 flex items-center'>
                          <AlertCircle className='w-3 h-3 mr-1' />
                          {pageForm.errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Etiketler
                      </label>
                      <div className='space-y-2'>
                        <div className='flex gap-2'>
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className='bg-white/10 border-white/20 text-white'
                            placeholder='Yeni etiket ekle...'
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                pageForm.addTag(newTag);
                                setNewTag('');
                              }
                            }}
                          />
                          <Button
                            type='button'
                            onClick={() => {
                              pageForm.addTag(newTag);
                              setNewTag('');
                            }}
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                          >
                            Ekle
                          </Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {pageForm.form.watch('tags')?.map((tag, index) => (
                            <Badge
                              key={index}
                              className='bg-blue-500/20 text-blue-400 border-blue-500/50'
                            >
                              {tag}
                              <button
                                type='button'
                                onClick={() => pageForm.removeTag(tag)}
                                className='ml-1 hover:text-red-400'
                              >
                                <X className='w-3 h-3' />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Sayfa İçeriği *
                      </label>
                      <Textarea
                        {...pageForm.form.register('content')}
                        onChange={(e) => {
                          pageForm.form.setValue('content', e.target.value);
                          pageForm.handleContentBlur();
                        }}
                        className={cn(
                          'bg-white/10 border-white/20 text-white',
                          pageForm.errors.content && 'border-red-500'
                        )}
                        rows={8}
                        placeholder='Sayfa içeriğini buraya yazın...'
                      />
                      {pageForm.errors.content && (
                        <p className='text-red-400 text-sm mt-1 flex items-center'>
                          <AlertCircle className='w-3 h-3 mr-1' />
                          {pageForm.errors.content.message}
                        </p>
                      )}
                    </div>

                    <div className='flex items-center justify-between pt-4'>
                      <div className='flex items-center space-x-2'>
                        {pageForm.isDirty && (
                          <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/50'>
                            Kaydedilmemiş değişiklikler
                          </Badge>
                        )}
                        {pageForm.isValid && (
                          <Badge className='bg-green-500/20 text-green-400 border-green-500/50'>
                            <CheckCircle className='w-3 h-3 mr-1' />
                            Form geçerli
                          </Badge>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className='bg-white/10 backdrop-blur-md border-white/20'>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-white mb-4'>Sayfa İstatistikleri</h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Toplam Sayfa</span>
                      <span className='text-white font-semibold'>{stats.totalPages}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Yayınlandı</span>
                      <span className='text-green-400 font-semibold'>
                        {stats.publishedPages}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Taslak</span>
                      <span className='text-yellow-400 font-semibold'>
                        {stats.draftPages}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Arşivlendi</span>
                      <span className='text-gray-400 font-semibold'>
                        {stats.archivedPages}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Toplam Görüntüleme</span>
                      <span className='text-blue-400 font-semibold'>
                        {stats.totalViews.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
    </PagesErrorBoundary>
  );
}
