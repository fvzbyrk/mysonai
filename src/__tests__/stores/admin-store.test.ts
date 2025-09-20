import { act, renderHook } from '@testing-library/react';
import { useAdminStore, usePages, useSelectedPage, useIsEditing, useIsCreating, useIsLoading, useFilteredPages, useAdminStats, usePageActions, useFilterActions, useStatsActions } from '@/stores/admin-store';
import { createMockPage } from '../utils/test-utils';

describe('AdminStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useAdminStore.getState().setPages([]);
      useAdminStore.getState().setSelectedPage(null);
      useAdminStore.getState().setIsEditing(false);
      useAdminStore.getState().setIsCreating(false);
      useAdminStore.getState().setIsLoading(false);
      useAdminStore.getState().setSearchTerm('');
      useAdminStore.getState().setStatusFilter('all');
      useAdminStore.getState().setCategoryFilter('');
      useAdminStore.getState().setStats({
        totalPages: 0,
        publishedPages: 0,
        draftPages: 0,
        archivedPages: 0,
        totalViews: 0,
        totalUsers: 0,
        activeUsers: 0,
        todayViews: 0,
        aiGenerations: 0,
      });
    });
  });

  describe('Pages Management', () => {
    it('should set pages', () => {
      const { result } = renderHook(() => usePageActions());
      const mockPages = [createMockPage({ id: '1', title: 'Page 1' })];

      act(() => {
        result.current.setPages(mockPages);
      });

      const pages = useAdminStore.getState().pages;
      expect(pages).toEqual(mockPages);
    });

    it('should add page', () => {
      const { result } = renderHook(() => usePageActions());
      const mockPage = createMockPage({ id: '1', title: 'New Page' });

      act(() => {
        result.current.addPage(mockPage);
      });

      const pages = useAdminStore.getState().pages;
      expect(pages).toHaveLength(1);
      expect(pages[0]).toEqual(mockPage);
    });

    it('should update page', () => {
      const { result } = renderHook(() => usePageActions());
      const mockPage = createMockPage({ id: '1', title: 'Original Page' });

      act(() => {
        result.current.setPages([mockPage]);
        result.current.updatePage('1', { title: 'Updated Page' });
      });

      const pages = useAdminStore.getState().pages;
      expect(pages[0].title).toBe('Updated Page');
    });

    it('should delete page', () => {
      const { result } = renderHook(() => usePageActions());
      const mockPages = [
        createMockPage({ id: '1', title: 'Page 1' }),
        createMockPage({ id: '2', title: 'Page 2' }),
      ];

      act(() => {
        result.current.setPages(mockPages);
        result.current.deletePage('1');
      });

      const pages = useAdminStore.getState().pages;
      expect(pages).toHaveLength(1);
      expect(pages[0].id).toBe('2');
    });

    it('should set selected page', () => {
      const { result } = renderHook(() => usePageActions());
      const mockPage = createMockPage({ id: '1', title: 'Selected Page' });

      act(() => {
        result.current.setSelectedPage(mockPage);
      });

      const selectedPage = useAdminStore.getState().selectedPage;
      expect(selectedPage).toEqual(mockPage);
    });
  });

  describe('UI State Management', () => {
    it('should toggle editing state', () => {
      const { result } = renderHook(() => usePageActions());

      act(() => {
        result.current.setIsEditing(true);
      });

      expect(useAdminStore.getState().isEditing).toBe(true);

      act(() => {
        result.current.setIsEditing(false);
      });

      expect(useAdminStore.getState().isEditing).toBe(false);
    });

    it('should toggle creating state', () => {
      const { result } = renderHook(() => usePageActions());

      act(() => {
        result.current.setIsCreating(true);
      });

      expect(useAdminStore.getState().isCreating).toBe(true);
    });

    it('should toggle loading state', () => {
      const { result } = renderHook(() => usePageActions());

      act(() => {
        result.current.setIsLoading(true);
      });

      expect(useAdminStore.getState().isLoading).toBe(true);
    });
  });

  describe('Filtering', () => {
    it('should filter pages by status', () => {
      const { result: pageActions } = renderHook(() => usePageActions());
      const { result: filterActions } = renderHook(() => useFilterActions());
      
      const mockPages = [
        createMockPage({ id: '1', title: 'Published Page', status: 'published' }),
        createMockPage({ id: '2', title: 'Draft Page', status: 'draft' }),
        createMockPage({ id: '3', title: 'Archived Page', status: 'archived' }),
      ];

      act(() => {
        pageActions.current.setPages(mockPages);
        filterActions.current.setStatusFilter('published');
      });

      const filteredPages = useAdminStore.getState().filteredPages;
      expect(filteredPages).toHaveLength(1);
      expect(filteredPages[0].status).toBe('published');
    });

    it('should filter pages by search term', () => {
      const { result: pageActions } = renderHook(() => usePageActions());
      const { result: filterActions } = renderHook(() => useFilterActions());
      
      const mockPages = [
        createMockPage({ id: '1', title: 'React Tutorial', status: 'published' }),
        createMockPage({ id: '2', title: 'Vue Guide', status: 'published' }),
        createMockPage({ id: '3', title: 'Angular Basics', status: 'published' }),
      ];

      act(() => {
        pageActions.current.setPages(mockPages);
        filterActions.current.setSearchTerm('React');
      });

      const filteredPages = useAdminStore.getState().filteredPages;
      expect(filteredPages).toHaveLength(1);
      expect(filteredPages[0].title).toBe('React Tutorial');
    });

    it('should filter pages by category', () => {
      const { result: pageActions } = renderHook(() => usePageActions());
      const { result: filterActions } = renderHook(() => useFilterActions());
      
      const mockPages = [
        createMockPage({ id: '1', title: 'Blog Post 1', category: 'Blog' }),
        createMockPage({ id: '2', title: 'Tutorial 1', category: 'Tutorial' }),
        createMockPage({ id: '3', title: 'Blog Post 2', category: 'Blog' }),
      ];

      act(() => {
        pageActions.current.setPages(mockPages);
        filterActions.current.setCategoryFilter('Blog');
      });

      const filteredPages = useAdminStore.getState().filteredPages;
      expect(filteredPages).toHaveLength(2);
      expect(filteredPages.every(page => page.category === 'Blog')).toBe(true);
    });

    it('should combine multiple filters', () => {
      const { result: pageActions } = renderHook(() => usePageActions());
      const { result: filterActions } = renderHook(() => useFilterActions());
      
      const mockPages = [
        createMockPage({ id: '1', title: 'React Tutorial', status: 'published', category: 'Tutorial' }),
        createMockPage({ id: '2', title: 'Vue Guide', status: 'draft', category: 'Tutorial' }),
        createMockPage({ id: '3', title: 'React Basics', status: 'published', category: 'Blog' }),
      ];

      act(() => {
        pageActions.current.setPages(mockPages);
        filterActions.current.setStatusFilter('published');
        filterActions.current.setSearchTerm('React');
      });

      const filteredPages = useAdminStore.getState().filteredPages;
      expect(filteredPages).toHaveLength(1);
      expect(filteredPages[0].title).toBe('React Tutorial');
    });
  });

  describe('Statistics', () => {
    it('should set stats', () => {
      const { result } = renderHook(() => useStatsActions());
      const mockStats = {
        totalPages: 10,
        publishedPages: 8,
        draftPages: 2,
        archivedPages: 0,
        totalViews: 1000,
        totalUsers: 50,
        activeUsers: 25,
        todayViews: 100,
        aiGenerations: 5,
      };

      act(() => {
        result.current.setStats(mockStats);
      });

      const stats = useAdminStore.getState().stats;
      expect(stats).toEqual(mockStats);
    });

    it('should update stats', () => {
      const { result } = renderHook(() => useStatsActions());
      const initialStats = {
        totalPages: 5,
        publishedPages: 3,
        draftPages: 2,
        archivedPages: 0,
        totalViews: 500,
        totalUsers: 25,
        activeUsers: 10,
        todayViews: 50,
        aiGenerations: 2,
      };

      act(() => {
        result.current.setStats(initialStats);
        result.current.updateStats({ totalPages: 6, publishedPages: 4 });
      });

      const stats = useAdminStore.getState().stats;
      expect(stats.totalPages).toBe(6);
      expect(stats.publishedPages).toBe(4);
      expect(stats.draftPages).toBe(2); // Should remain unchanged
    });
  });

  describe('Selectors', () => {
    it('should return pages selector', () => {
      const { result } = renderHook(() => usePages());
      const mockPages = [createMockPage()];

      act(() => {
        useAdminStore.getState().setPages(mockPages);
      });

      expect(result.current).toEqual(mockPages);
    });

    it('should return selected page selector', () => {
      const { result } = renderHook(() => useSelectedPage());
      const mockPage = createMockPage();

      act(() => {
        useAdminStore.getState().setSelectedPage(mockPage);
      });

      expect(result.current).toEqual(mockPage);
    });

    it('should return editing state selector', () => {
      const { result } = renderHook(() => useIsEditing());

      act(() => {
        useAdminStore.getState().setIsEditing(true);
      });

      expect(result.current).toBe(true);
    });

    it('should return creating state selector', () => {
      const { result } = renderHook(() => useIsCreating());

      act(() => {
        useAdminStore.getState().setIsCreating(true);
      });

      expect(result.current).toBe(true);
    });

    it('should return loading state selector', () => {
      const { result } = renderHook(() => useIsLoading());

      act(() => {
        useAdminStore.getState().setIsLoading(true);
      });

      expect(result.current).toBe(true);
    });

    it('should return filtered pages selector', () => {
      const { result } = renderHook(() => useFilteredPages());
      const mockPages = [
        createMockPage({ id: '1', status: 'published' }),
        createMockPage({ id: '2', status: 'draft' }),
      ];

      act(() => {
        useAdminStore.getState().setPages(mockPages);
        useAdminStore.getState().setStatusFilter('published');
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].status).toBe('published');
    });

    it('should return stats selector', () => {
      const { result } = renderHook(() => useAdminStats());
      const mockStats = {
        totalPages: 5,
        publishedPages: 3,
        draftPages: 2,
        archivedPages: 0,
        totalViews: 500,
        totalUsers: 25,
        activeUsers: 10,
        todayViews: 50,
        aiGenerations: 2,
      };

      act(() => {
        useAdminStore.getState().setStats(mockStats);
      });

      expect(result.current).toEqual(mockStats);
    });
  });
});
