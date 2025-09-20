import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock data factories
export const createMockPage = (overrides = {}) => ({
  id: '1',
  title: 'Test Page',
  slug: 'test-page',
  content: 'This is test content',
  status: 'published' as const,
  visibility: 'public' as const,
  seoTitle: 'Test SEO Title',
  seoDescription: 'Test SEO Description',
  lastModified: '2024-01-01',
  author: 'Test Author',
  views: 100,
  category: 'Test Category',
  tags: ['test', 'page'],
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  avatar: null,
  plan: 'free' as const,
  role: 'user' as const,
  permissions: [],
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: '2024-01-01T00:00:00Z',
  isActive: true,
  ...overrides,
});

export const createMockAdminUser = (overrides = {}) => ({
  ...createMockUser(),
  role: 'admin' as const,
  permissions: ['pages:read', 'pages:write', 'pages:delete'],
  ...overrides,
});

// Mock API responses
export const createMockApiResponse = <T>(data: T, success = true) => ({
  success,
  data,
  error: success ? undefined : 'Test error',
  message: success ? 'Success' : 'Error',
});

// Mock fetch responses
export const mockFetch = (response: any, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: jest.fn().mockResolvedValue(response),
  });
};

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

// Test helpers
export const waitFor = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const createEvent = (type: string, properties = {}) => ({
  type,
  ...properties,
});

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
