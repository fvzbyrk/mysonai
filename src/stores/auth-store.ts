import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin' | 'super-admin';
  permissions: string[];
}

interface AuthState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Admin specific
  isAdmin: boolean;
  adminPermissions: string[];
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Admin actions
  checkAdminAccess: () => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  isAdmin: false,
  adminPermissions: [],
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Auth actions
        login: (user, token) => set(
          {
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.role === 'admin' || user.role === 'super-admin',
            adminPermissions: user.permissions || [],
          },
          false,
          'login'
        ),

        logout: () => set(
          {
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false,
            adminPermissions: [],
          },
          false,
          'logout'
        ),

        setUser: (user) => set(
          {
            user,
            isAuthenticated: !!user,
            isAdmin: user ? (user.role === 'admin' || user.role === 'super-admin') : false,
            adminPermissions: user?.permissions || [],
          },
          false,
          'setUser'
        ),

        setToken: (token) => set({ token }, false, 'setToken'),
        setIsLoading: (isLoading) => set({ isLoading }, false, 'setIsLoading'),

        updateUser: (updates) => set(
          (state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
            isAdmin: state.user ? 
              (updates.role === 'admin' || updates.role === 'super-admin' || 
               (state.user.role === 'admin' || state.user.role === 'super-admin')) : false,
            adminPermissions: updates.permissions || state.adminPermissions,
          }),
          false,
          'updateUser'
        ),

        // Admin permission checks
        checkAdminAccess: () => {
          const { user, isAdmin } = get();
          return !!(user && isAdmin);
        },

        hasPermission: (permission) => {
          const { adminPermissions } = get();
          return adminPermissions.includes(permission);
        },

        hasAnyPermission: (permissions) => {
          const { adminPermissions } = get();
          return permissions.some(permission => adminPermissions.includes(permission));
        },

        hasAllPermissions: (permissions) => {
          const { adminPermissions } = get();
          return permissions.every(permission => adminPermissions.includes(permission));
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          isAdmin: state.isAdmin,
          adminPermissions: state.adminPermissions,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// Selectors
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useToken = () => useAuthStore((state) => state.token);
export const useIsAdmin = () => useAuthStore((state) => state.isAdmin);
export const useAdminPermissions = () => useAuthStore((state) => state.adminPermissions);

// Action selectors
export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  logout: state.logout,
  setUser: state.setUser,
  setToken: state.setToken,
  setIsLoading: state.setIsLoading,
  updateUser: state.updateUser,
}));

export const usePermissionChecks = () => useAuthStore((state) => ({
  checkAdminAccess: state.checkAdminAccess,
  hasPermission: state.hasPermission,
  hasAnyPermission: state.hasAnyPermission,
  hasAllPermissions: state.hasAllPermissions,
}));
