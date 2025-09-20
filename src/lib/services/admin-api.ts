import { apiClient, ApiResponse } from '../api-client';

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

interface PageStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

interface PageFilters {
  search?: string;
  status?: 'all' | 'published' | 'draft' | 'archived';
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

interface CreatePageData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status?: 'published' | 'draft' | 'archived';
  visibility?: 'public' | 'private' | 'password';
  password?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  featuredImage?: string;
  category: string;
  tags: string[];
}

interface UpdatePageData extends Partial<CreatePageData> {
  id: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin' | 'super-admin';
  permissions: string[];
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
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

class AdminApiService {
  // Pages API
  async getPages(filters: PageFilters = {}): Promise<ApiResponse<{ pages: Page[]; stats: PageStats; total: number }>> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/api/admin/pages${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint, { showErrorToast: false });
  }

  async getPage(id: string): Promise<ApiResponse<Page>> {
    return apiClient.get(`/api/admin/pages/${id}`, { showErrorToast: false });
  }

  async createPage(data: CreatePageData): Promise<ApiResponse<Page>> {
    return apiClient.post('/api/admin/pages', data, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async updatePage(data: UpdatePageData): Promise<ApiResponse<Page>> {
    return apiClient.put('/api/admin/pages', data, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async deletePage(id: string): Promise<ApiResponse<Page>> {
    return apiClient.delete(`/api/admin/pages?id=${id}`, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async changePageStatus(id: string, status: 'published' | 'draft' | 'archived'): Promise<ApiResponse<Page>> {
    return apiClient.patch(`/api/admin/pages/${id}/status`, { status }, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async bulkUpdatePages(pageIds: string[], updates: Partial<Page>): Promise<ApiResponse<{ updated: number }>> {
    return apiClient.patch('/api/admin/pages/bulk', { pageIds, updates }, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async duplicatePage(id: string): Promise<ApiResponse<Page>> {
    return apiClient.post(`/api/admin/pages/${id}/duplicate`, {}, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  // Users API
  async getUsers(filters: { search?: string; role?: string; plan?: string; page?: number; limit?: number } = {}): Promise<ApiResponse<{ users: User[]; total: number }>> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.role) params.append('role', filters.role);
    if (filters.plan) params.append('plan', filters.plan);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/api/admin/users${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint, { showErrorToast: false });
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.get(`/api/admin/users/${id}`, { showErrorToast: false });
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put(`/api/admin/users/${id}`, data, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.delete(`/api/admin/users/${id}`, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async suspendUser(id: string, reason: string): Promise<ApiResponse<User>> {
    return apiClient.patch(`/api/admin/users/${id}/suspend`, { reason }, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async activateUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.patch(`/api/admin/users/${id}/activate`, {}, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  // Analytics API
  async getAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<ApiResponse<AdminStats>> {
    return apiClient.get(`/api/admin/analytics?period=${period}`, { showErrorToast: false });
  }

  async getPageAnalytics(pageId: string, period: 'day' | 'week' | 'month' = 'month'): Promise<ApiResponse<any>> {
    return apiClient.get(`/api/admin/analytics/pages/${pageId}?period=${period}`, { showErrorToast: false });
  }

  async getUserAnalytics(period: 'day' | 'week' | 'month' = 'month'): Promise<ApiResponse<any>> {
    return apiClient.get(`/api/admin/analytics/users?period=${period}`, { showErrorToast: false });
  }

  // Settings API
  async getSettings(): Promise<ApiResponse<any>> {
    return apiClient.get('/api/admin/settings', { showErrorToast: false });
  }

  async updateSettings(data: any): Promise<ApiResponse<any>> {
    return apiClient.put('/api/admin/settings', data, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  // System API
  async getSystemStatus(): Promise<ApiResponse<{ status: string; services: any[] }>> {
    return apiClient.get('/api/admin/system/status', { showErrorToast: false });
  }

  async getSystemLogs(level?: string, limit?: number): Promise<ApiResponse<{ logs: any[]; total: number }>> {
    const params = new URLSearchParams();
    if (level) params.append('level', level);
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/api/admin/system/logs${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint, { showErrorToast: false });
  }

  async clearCache(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/api/admin/system/cache/clear', {}, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  // Backup API
  async createBackup(): Promise<ApiResponse<{ backupId: string; message: string }>> {
    return apiClient.post('/api/admin/backup/create', {}, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  async getBackups(): Promise<ApiResponse<{ backups: any[] }>> {
    return apiClient.get('/api/admin/backup/list', { showErrorToast: false });
  }

  async restoreBackup(backupId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(`/api/admin/backup/restore/${backupId}`, {}, { 
      showSuccessToast: true,
      showErrorToast: true 
    });
  }

  // File upload
  async uploadImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string; filename: string }>> {
    return apiClient.uploadFile('/api/admin/upload/image', file, onProgress);
  }

  async uploadDocument(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string; filename: string }>> {
    return apiClient.uploadFile('/api/admin/upload/document', file, onProgress);
  }
}

// Create singleton instance
export const adminApi = new AdminApiService();

// Export types
export type { 
  Page, 
  PageStats, 
  PageFilters, 
  CreatePageData, 
  UpdatePageData, 
  User, 
  AdminStats 
};
