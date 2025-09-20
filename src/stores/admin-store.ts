import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
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

interface AdminStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  archivedPages: number;
  totalViews: number;
  totalUsers: number;
  activeUsers: number;
  todayViews: number;
  aiGenerations: number;
}

interface AdminState {
  // Pages state
  pages: Page[];
  selectedPage: Page | null;
  isEditing: boolean;
  isCreating: boolean;
  isLoading: boolean;
  
  // Filters and search
  searchTerm: string;
  statusFilter: 'all' | 'published' | 'draft' | 'archived';
  categoryFilter: string;
  
  // Stats
  stats: AdminStats;
  
  // UI state
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  
  // Actions
  setPages: (pages: Page[]) => void;
  addPage: (page: Page) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setSelectedPage: (page: Page | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setIsCreating: (isCreating: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  
  // Filters
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: 'all' | 'published' | 'draft' | 'archived') => void;
  setCategoryFilter: (category: string) => void;
  
  // Stats
  setStats: (stats: AdminStats) => void;
  updateStats: (updates: Partial<AdminStats>) => void;
  
  // UI
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Computed values
  filteredPages: Page[];
  getPageById: (id: string) => Page | undefined;
  getPagesByStatus: (status: string) => Page[];
  getPagesByCategory: (category: string) => Page[];
}

// Initial state
const initialState = {
  pages: [],
  selectedPage: null,
  isEditing: false,
  isCreating: false,
  isLoading: false,
  searchTerm: '',
  statusFilter: 'all' as const,
  categoryFilter: '',
  stats: {
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    archivedPages: 0,
    totalViews: 0,
    totalUsers: 0,
    activeUsers: 0,
    todayViews: 0,
    aiGenerations: 0,
  },
  sidebarCollapsed: false,
  theme: 'system' as const,
  notifications: [],
};

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Pages actions
        setPages: (pages) => set({ pages }, false, 'setPages'),
        
        addPage: (page) => set(
          (state) => ({ pages: [...state.pages, page] }),
          false,
          'addPage'
        ),
        
        updatePage: (id, updates) => set(
          (state) => ({
            pages: state.pages.map(page => 
              page.id === id ? { ...page, ...updates } : page
            ),
            selectedPage: state.selectedPage?.id === id 
              ? { ...state.selectedPage, ...updates }
              : state.selectedPage,
          }),
          false,
          'updatePage'
        ),
        
        deletePage: (id) => set(
          (state) => ({
            pages: state.pages.filter(page => page.id !== id),
            selectedPage: state.selectedPage?.id === id ? null : state.selectedPage,
          }),
          false,
          'deletePage'
        ),
        
        setSelectedPage: (page) => set({ selectedPage: page }, false, 'setSelectedPage'),
        setIsEditing: (isEditing) => set({ isEditing }, false, 'setIsEditing'),
        setIsCreating: (isCreating) => set({ isCreating }, false, 'setIsCreating'),
        setIsLoading: (isLoading) => set({ isLoading }, false, 'setIsLoading'),

        // Filter actions
        setSearchTerm: (term) => set({ searchTerm: term }, false, 'setSearchTerm'),
        setStatusFilter: (filter) => set({ statusFilter: filter }, false, 'setStatusFilter'),
        setCategoryFilter: (category) => set({ categoryFilter: category }, false, 'setCategoryFilter'),

        // Stats actions
        setStats: (stats) => set({ stats }, false, 'setStats'),
        updateStats: (updates) => set(
          (state) => ({ stats: { ...state.stats, ...updates } }),
          false,
          'updateStats'
        ),

        // UI actions
        toggleSidebar: () => set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'toggleSidebar'
        ),
        
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        
        addNotification: (notification) => set(
          (state) => ({
            notifications: [
              ...state.notifications,
              { ...notification, id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }
            ],
          }),
          false,
          'addNotification'
        ),
        
        removeNotification: (id) => set(
          (state) => ({
            notifications: state.notifications.filter(notif => notif.id !== id),
          }),
          false,
          'removeNotification'
        ),
        
        clearNotifications: () => set({ notifications: [] }, false, 'clearNotifications'),

        // Computed values
        get filteredPages() {
          const { pages, searchTerm, statusFilter, categoryFilter } = get();
          
          let filtered = pages;

          // Status filter
          if (statusFilter !== 'all') {
            filtered = filtered.filter(page => page.status === statusFilter);
          }

          // Category filter
          if (categoryFilter) {
            filtered = filtered.filter(page => page.category === categoryFilter);
          }

          // Search filter
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(page =>
              page.title.toLowerCase().includes(searchLower) ||
              page.slug.toLowerCase().includes(searchLower) ||
              page.category.toLowerCase().includes(searchLower) ||
              page.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
          }

          return filtered;
        },

        getPageById: (id) => {
          const { pages } = get();
          return pages.find(page => page.id === id);
        },

        getPagesByStatus: (status) => {
          const { pages } = get();
          return pages.filter(page => page.status === status);
        },

        getPagesByCategory: (category) => {
          const { pages } = get();
          return pages.filter(page => page.category === category);
        },
      }),
      {
        name: 'admin-store',
        partialize: (state) => ({
          sidebarCollapsed: state.sidebarCollapsed,
          theme: state.theme,
          searchTerm: state.searchTerm,
          statusFilter: state.statusFilter,
          categoryFilter: state.categoryFilter,
        }),
      }
    ),
    {
      name: 'admin-store',
    }
  )
);

// Selectors for better performance
export const usePages = () => useAdminStore((state) => state.pages);
export const useSelectedPage = () => useAdminStore((state) => state.selectedPage);
export const useIsEditing = () => useAdminStore((state) => state.isEditing);
export const useIsCreating = () => useAdminStore((state) => state.isCreating);
export const useIsLoading = () => useAdminStore((state) => state.isLoading);
export const useFilteredPages = () => useAdminStore((state) => state.filteredPages);
export const useAdminStats = () => useAdminStore((state) => state.stats);
export const useNotifications = () => useAdminStore((state) => state.notifications);
export const useSidebarCollapsed = () => useAdminStore((state) => state.sidebarCollapsed);
export const useTheme = () => useAdminStore((state) => state.theme);

// Action selectors
export const usePageActions = () => useAdminStore((state) => ({
  setPages: state.setPages,
  addPage: state.addPage,
  updatePage: state.updatePage,
  deletePage: state.deletePage,
  setSelectedPage: state.setSelectedPage,
  setIsEditing: state.setIsEditing,
  setIsCreating: state.setIsCreating,
  setIsLoading: state.setIsLoading,
}));

export const useFilterActions = () => useAdminStore((state) => ({
  setSearchTerm: state.setSearchTerm,
  setStatusFilter: state.setStatusFilter,
  setCategoryFilter: state.setCategoryFilter,
}));

export const useStatsActions = () => useAdminStore((state) => ({
  setStats: state.setStats,
  updateStats: state.updateStats,
}));

export const useUIActions = () => useAdminStore((state) => ({
  toggleSidebar: state.toggleSidebar,
  setTheme: state.setTheme,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
}));
