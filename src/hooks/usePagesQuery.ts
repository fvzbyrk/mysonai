import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, type CreatePageData, type UpdatePageData, type PageFilters } from '@/lib/services/admin-api';
import { toast } from 'sonner';

// Query keys
export const pagesQueryKeys = {
  all: ['pages'] as const,
  lists: () => [...pagesQueryKeys.all, 'list'] as const,
  list: (filters: PageFilters) => [...pagesQueryKeys.lists(), filters] as const,
  details: () => [...pagesQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...pagesQueryKeys.details(), id] as const,
  stats: () => [...pagesQueryKeys.all, 'stats'] as const,
};

// Hook for fetching pages list
export function usePagesQuery(filters: PageFilters = {}) {
  return useQuery({
    queryKey: pagesQueryKeys.list(filters),
    queryFn: () => adminApi.getPages(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching single page
export function usePageQuery(id: string) {
  return useQuery({
    queryKey: pagesQueryKeys.detail(id),
    queryFn: () => adminApi.getPage(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for page statistics
export function usePageStatsQuery() {
  return useQuery({
    queryKey: pagesQueryKeys.stats(),
    queryFn: () => adminApi.getAnalytics('month'),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for creating page
export function useCreatePageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePageData) => adminApi.createPage(data),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate and refetch pages list
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.stats() });
        
        toast.success('Sayfa başarıyla oluşturuldu');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Sayfa oluşturulamadı');
    },
  });
}

// Hook for updating page
export function useUpdatePageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePageData) => adminApi.updatePage(data),
    onSuccess: (result, variables) => {
      if (result.success) {
        // Update the specific page in cache
        queryClient.setQueryData(
          pagesQueryKeys.detail(variables.id),
          result.data
        );
        
        // Invalidate pages list to reflect changes
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.lists() });
        
        toast.success('Sayfa başarıyla güncellendi');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Sayfa güncellenemedi');
    },
  });
}

// Hook for deleting page
export function useDeletePageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.deletePage(id),
    onSuccess: (result, id) => {
      if (result.success) {
        // Remove the page from cache
        queryClient.removeQueries({ queryKey: pagesQueryKeys.detail(id) });
        
        // Invalidate pages list
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.stats() });
        
        toast.success('Sayfa başarıyla silindi');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Sayfa silinemedi');
    },
  });
}

// Hook for changing page status
export function useChangePageStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'published' | 'draft' | 'archived' }) =>
      adminApi.changePageStatus(id, status),
    onSuccess: (result, variables) => {
      if (result.success) {
        // Update the specific page in cache
        queryClient.setQueryData(
          pagesQueryKeys.detail(variables.id),
          (oldData: any) => ({
            ...oldData,
            data: { ...oldData?.data, status: variables.status }
          })
        );
        
        // Invalidate pages list
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.stats() });
        
        toast.success(`Sayfa durumu ${variables.status} olarak değiştirildi`);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Sayfa durumu değiştirilemedi');
    },
  });
}

// Hook for duplicating page
export function useDuplicatePageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.duplicatePage(id),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate pages list
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.stats() });
        
        toast.success('Sayfa başarıyla kopyalandı');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Sayfa kopyalanamadı');
    },
  });
}

// Hook for bulk operations
export function useBulkUpdatePagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageIds, updates }: { pageIds: string[]; updates: Partial<UpdatePageData> }) =>
      adminApi.bulkUpdatePages(pageIds, updates),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate all pages queries
        queryClient.invalidateQueries({ queryKey: pagesQueryKeys.all });
        
        toast.success(`${result.data.updated} sayfa güncellendi`);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Toplu güncelleme başarısız');
    },
  });
}

// Hook for prefetching page data
export function usePrefetchPage() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: pagesQueryKeys.detail(id),
      queryFn: () => adminApi.getPage(id),
      staleTime: 5 * 60 * 1000,
    });
  };
}
