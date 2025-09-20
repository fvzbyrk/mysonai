import { useCallback, useEffect } from 'react';
import { 
  usePages, 
  useSelectedPage, 
  useIsEditing, 
  useIsCreating, 
  useIsLoading,
  useFilteredPages,
  useAdminStats,
  usePageActions,
  useFilterActions,
  useStatsActions
} from '@/stores/admin-store';
import { useNotificationActions } from '@/stores/ui-store';
import { adminApi, type CreatePageData, type UpdatePageData } from '@/lib/services/admin-api';

interface UsePagesManagementOptions {
  autoLoad?: boolean;
  showNotifications?: boolean;
}

export function usePagesManagement(options: UsePagesManagementOptions = {}) {
  const { autoLoad = true, showNotifications = true } = options;

  // Zustand state
  const pages = usePages();
  const selectedPage = useSelectedPage();
  const isEditing = useIsEditing();
  const isCreating = useIsCreating();
  const isLoading = useIsLoading();
  const filteredPages = useFilteredPages();
  const stats = useAdminStats();

  // Zustand actions
  const pageActions = usePageActions();
  const filterActions = useFilterActions();
  const statsActions = useStatsActions();
  const notificationActions = useNotificationActions();

  // Load pages from API
  const loadPages = useCallback(async () => {
    pageActions.setIsLoading(true);
    
    try {
      const result = await adminApi.getPages();
      
      if (result.success && result.data) {
        pageActions.setPages(result.data.pages);
        statsActions.setStats({
          totalPages: result.data.stats.total,
          publishedPages: result.data.stats.published,
          draftPages: result.data.stats.draft,
          archivedPages: result.data.stats.archived,
          totalViews: result.data.stats.totalViews,
          totalUsers: 0,
          activeUsers: 0,
          todayViews: 0,
          aiGenerations: 0,
        });
        
        if (showNotifications) {
          notificationActions.showSuccess('Sayfalar Yüklendi', `${result.data.pages.length} sayfa başarıyla yüklendi`);
        }
      } else {
        if (showNotifications) {
          notificationActions.showError('Yükleme Hatası', result.error || 'Sayfalar yüklenirken bir hata oluştu');
        }
      }
    } catch (error) {
      console.error('API hatası:', error);
      if (showNotifications) {
        notificationActions.showError('API Hatası', 'Sayfalar yüklenirken bir hata oluştu');
      }
    } finally {
      pageActions.setIsLoading(false);
    }
  }, [pageActions, statsActions, notificationActions, showNotifications]);

  // Create new page
  const createPage = useCallback(async (data: CreatePageData) => {
    try {
      const result = await adminApi.createPage(data);
      
      if (result.success && result.data) {
        pageActions.addPage(result.data);
        statsActions.updateStats({ totalPages: stats.totalPages + 1 });
        
        if (showNotifications) {
          notificationActions.showSuccess('Sayfa Oluşturuldu', 'Sayfa başarıyla oluşturuldu');
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Sayfa oluşturulamadı');
      }
    } catch (error) {
      console.error('Sayfa oluşturma hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Oluşturma Hatası', error instanceof Error ? error.message : 'Sayfa oluşturulamadı');
      }
      throw error;
    }
  }, [pageActions, statsActions, stats.totalPages, notificationActions, showNotifications]);

  // Update existing page
  const updatePage = useCallback(async (pageId: string, data: Partial<UpdatePageData>) => {
    try {
      const result = await adminApi.updatePage({ id: pageId, ...data });
      
      if (result.success && result.data) {
        pageActions.updatePage(pageId, result.data);
        
        if (showNotifications) {
          notificationActions.showSuccess('Sayfa Güncellendi', 'Sayfa başarıyla güncellendi');
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Sayfa güncellenemedi');
      }
    } catch (error) {
      console.error('Sayfa güncelleme hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Güncelleme Hatası', error instanceof Error ? error.message : 'Sayfa güncellenemedi');
      }
      throw error;
    }
  }, [pageActions, notificationActions, showNotifications]);

  // Delete page
  const deletePage = useCallback(async (pageId: string) => {
    try {
      const result = await adminApi.deletePage(pageId);
      
      if (result.success && result.data) {
        pageActions.deletePage(pageId);
        statsActions.updateStats({ totalPages: stats.totalPages - 1 });
        
        if (showNotifications) {
          notificationActions.showSuccess('Sayfa Silindi', 'Sayfa başarıyla silindi');
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Sayfa silinemedi');
      }
    } catch (error) {
      console.error('Sayfa silme hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Silme Hatası', error instanceof Error ? error.message : 'Sayfa silinemedi');
      }
      throw error;
    }
  }, [pageActions, statsActions, stats.totalPages, notificationActions, showNotifications]);

  // Change page status
  const changePageStatus = useCallback(async (pageId: string, status: 'published' | 'draft' | 'archived') => {
    try {
      const result = await adminApi.changePageStatus(pageId, status);
      
      if (result.success && result.data) {
        pageActions.updatePage(pageId, { status });
        
        if (showNotifications) {
          notificationActions.showSuccess('Durum Değiştirildi', `Sayfa durumu ${status} olarak değiştirildi`);
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Sayfa durumu değiştirilemedi');
      }
    } catch (error) {
      console.error('Durum değiştirme hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Durum Hatası', error instanceof Error ? error.message : 'Sayfa durumu değiştirilemedi');
      }
      throw error;
    }
  }, [pageActions, notificationActions, showNotifications]);

  // Duplicate page
  const duplicatePage = useCallback(async (pageId: string) => {
    try {
      const result = await adminApi.duplicatePage(pageId);
      
      if (result.success && result.data) {
        pageActions.addPage(result.data);
        statsActions.updateStats({ totalPages: stats.totalPages + 1 });
        
        if (showNotifications) {
          notificationActions.showSuccess('Sayfa Kopyalandı', 'Sayfa başarıyla kopyalandı');
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Sayfa kopyalanamadı');
      }
    } catch (error) {
      console.error('Sayfa kopyalama hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Kopyalama Hatası', error instanceof Error ? error.message : 'Sayfa kopyalanamadı');
      }
      throw error;
    }
  }, [pageActions, statsActions, stats.totalPages, notificationActions, showNotifications]);

  // Bulk operations
  const bulkUpdatePages = useCallback(async (pageIds: string[], updates: Partial<UpdatePageData>) => {
    try {
      const result = await adminApi.bulkUpdatePages(pageIds, updates);
      
      if (result.success && result.data) {
        // Update local state for each page
        pageIds.forEach(pageId => {
          pageActions.updatePage(pageId, updates);
        });
        
        if (showNotifications) {
          notificationActions.showSuccess('Toplu Güncelleme', `${result.data.updated} sayfa güncellendi`);
        }
        
        return result.data;
      } else {
        throw new Error(result.error || 'Toplu güncelleme başarısız');
      }
    } catch (error) {
      console.error('Toplu güncelleme hatası:', error);
      if (showNotifications) {
        notificationActions.showError('Toplu Güncelleme Hatası', error instanceof Error ? error.message : 'Toplu güncelleme başarısız');
      }
      throw error;
    }
  }, [pageActions, notificationActions, showNotifications]);

  // UI actions
  const startEditing = useCallback((page: any) => {
    pageActions.setSelectedPage(page);
    pageActions.setIsEditing(true);
    pageActions.setIsCreating(false);
  }, [pageActions]);

  const startCreating = useCallback(() => {
    pageActions.setSelectedPage(null);
    pageActions.setIsCreating(true);
    pageActions.setIsEditing(false);
  }, [pageActions]);

  const cancelEditing = useCallback(() => {
    pageActions.setIsEditing(false);
    pageActions.setIsCreating(false);
    pageActions.setSelectedPage(null);
  }, [pageActions]);

  // Filter actions
  const setSearchTerm = useCallback((term: string) => {
    filterActions.setSearchTerm(term);
  }, [filterActions]);

  const setStatusFilter = useCallback((filter: 'all' | 'published' | 'draft' | 'archived') => {
    filterActions.setStatusFilter(filter);
  }, [filterActions]);

  const setCategoryFilter = useCallback((category: string) => {
    filterActions.setCategoryFilter(category);
  }, [filterActions]);

  // Computed values
  const getPageById = useCallback((id: string) => {
    return pages.find(page => page.id === id);
  }, [pages]);

  const getPagesByStatus = useCallback((status: string) => {
    return pages.filter(page => page.status === status);
  }, [pages]);

  const getPagesByCategory = useCallback((category: string) => {
    return pages.filter(page => page.category === category);
  }, [pages]);

  // Auto-load pages on mount
  useEffect(() => {
    if (autoLoad) {
      loadPages();
    }
  }, [autoLoad, loadPages]);

  return {
    // State
    pages,
    selectedPage,
    isEditing,
    isCreating,
    isLoading,
    filteredPages,
    stats,
    
    // Actions
    loadPages,
    createPage,
    updatePage,
    deletePage,
    changePageStatus,
    duplicatePage,
    bulkUpdatePages,
    
    // UI actions
    startEditing,
    startCreating,
    cancelEditing,
    
    // Filter actions
    setSearchTerm,
    setStatusFilter,
    setCategoryFilter,
    
    // Computed values
    getPageById,
    getPagesByStatus,
    getPagesByCategory,
  };
}
