import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

interface Modal {
  id: string;
  component: React.ComponentType<any>;
  props?: any;
  onClose?: () => void;
}

interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Sidebar
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  
  // Modals
  modals: Modal[];
  
  // Notifications
  notifications: Notification[];
  
  // Loading states
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Modal actions
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Loading actions
  setGlobalLoading: (loading: boolean) => void;
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;
  
  // Utility actions
  showSuccess: (title: string, message: string) => string;
  showError: (title: string, message: string) => string;
  showWarning: (title: string, message: string) => string;
  showInfo: (title: string, message: string) => string;
}

// Initial state
const initialState = {
  theme: 'system' as const,
  sidebarCollapsed: false,
  sidebarOpen: true,
  modals: [],
  notifications: [],
  globalLoading: false,
  loadingStates: {},
};

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Theme actions
        setTheme: (theme) => set({ theme }, false, 'setTheme'),

        // Sidebar actions
        toggleSidebar: () => set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'toggleSidebar'
        ),

        setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),

        // Modal actions
        openModal: (modal) => {
          const id = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          set(
            (state) => ({ modals: [...state.modals, { ...modal, id }] }),
            false,
            'openModal'
          );
          return id;
        },

        closeModal: (id) => set(
          (state) => {
            const modal = state.modals.find(m => m.id === id);
            modal?.onClose?.();
            return { modals: state.modals.filter(m => m.id !== id) };
          },
          false,
          'closeModal'
        ),

        closeAllModals: () => set(
          (state) => {
            state.modals.forEach(modal => modal.onClose?.());
            return { modals: [] };
          },
          false,
          'closeAllModals'
        ),

        // Notification actions
        addNotification: (notification) => {
          const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const newNotification = { ...notification, id };
          
          set(
            (state) => ({ notifications: [...state.notifications, newNotification] }),
            false,
            'addNotification'
          );

          // Auto remove notification after duration
          if (notification.duration !== 0) {
            const duration = notification.duration || 5000;
            setTimeout(() => {
              get().removeNotification(id);
            }, duration);
          }

          return id;
        },

        removeNotification: (id) => set(
          (state) => ({ notifications: state.notifications.filter(n => n.id !== id) }),
          false,
          'removeNotification'
        ),

        clearNotifications: () => set({ notifications: [] }, false, 'clearNotifications'),

        // Loading actions
        setGlobalLoading: (loading) => set({ globalLoading: loading }, false, 'setGlobalLoading'),

        setLoading: (key, loading) => set(
          (state) => ({
            loadingStates: {
              ...state.loadingStates,
              [key]: loading,
            },
          }),
          false,
          'setLoading'
        ),

        isLoading: (key) => {
          const { loadingStates } = get();
          return loadingStates[key] || false;
        },

        // Utility actions
        showSuccess: (title, message) => {
          return get().addNotification({
            type: 'success',
            title,
            message,
            duration: 5000,
          });
        },

        showError: (title, message) => {
          return get().addNotification({
            type: 'error',
            title,
            message,
            duration: 0, // Don't auto-remove errors
          });
        },

        showWarning: (title, message) => {
          return get().addNotification({
            type: 'warning',
            title,
            message,
            duration: 7000,
          });
        },

        showInfo: (title, message) => {
          return get().addNotification({
            type: 'info',
            title,
            message,
            duration: 5000,
          });
        },
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);

// Selectors
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebarCollapsed = () => useUIStore((state) => state.sidebarCollapsed);
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useModals = () => useUIStore((state) => state.modals);
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading);

// Action selectors
export const useThemeActions = () => useUIStore((state) => ({
  setTheme: state.setTheme,
}));

export const useSidebarActions = () => useUIStore((state) => ({
  toggleSidebar: state.toggleSidebar,
  setSidebarOpen: state.setSidebarOpen,
  setSidebarCollapsed: state.setSidebarCollapsed,
}));

export const useModalActions = () => useUIStore((state) => ({
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
}));

export const useNotificationActions = () => useUIStore((state) => ({
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
  showSuccess: state.showSuccess,
  showError: state.showError,
  showWarning: state.showWarning,
  showInfo: state.showInfo,
}));

export const useLoadingActions = () => useUIStore((state) => ({
  setGlobalLoading: state.setGlobalLoading,
  setLoading: state.setLoading,
  isLoading: state.isLoading,
}));
