import { toast } from 'sonner';

// Types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};

class ApiClient {
  private config: ApiConfig;
  private authToken: string | null = null;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.loadAuthToken();
  }

  // Auth token management
  private loadAuthToken() {
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('admin_token');
    }
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('admin_token', token);
      } else {
        localStorage.removeItem('admin_token');
      }
    }
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  // Request method
  async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.config.timeout,
      retries = this.config.retries,
      showErrorToast = true,
      showSuccessToast = false,
    } = options;

    const url = `${this.config.baseURL}${endpoint}`;
    
    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add auth token if available
    if (this.authToken) {
      requestHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    // Prepare request config
    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };

    // Retry logic
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...requestConfig,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const result: ApiResponse<T> = await response.json();

        // Handle HTTP errors
        if (!response.ok) {
          if (response.status === 401) {
            this.handleUnauthorized();
            return { success: false, error: 'Yetkisiz erişim' };
          }

          if (response.status === 403) {
            return { success: false, error: 'Erişim reddedildi' };
          }

          if (response.status >= 500) {
            throw new Error(`Sunucu hatası: ${response.status}`);
          }

          return { success: false, error: result.error || 'Bir hata oluştu' };
        }

        // Show success toast if requested
        if (showSuccessToast && result.message) {
          toast.success(result.message);
        }

        return result;

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            return { success: false, error: 'İstek zaman aşımına uğradı' };
          }
          
          if (error.message.includes('401') || error.message.includes('403')) {
            this.handleUnauthorized();
            return { success: false, error: 'Yetkisiz erişim' };
          }
        }

        // Wait before retry
        if (attempt < retries) {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    // Show error toast if requested
    if (showErrorToast && lastError) {
      toast.error(lastError.message || 'Bir hata oluştu');
    }

    return { 
      success: false, 
      error: lastError?.message || 'Bilinmeyen bir hata oluştu' 
    };
  }

  // HTTP methods
  async get<T = any>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = any>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T = any>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async patch<T = any>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  async delete<T = any>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleUnauthorized() {
    this.setAuthToken(null);
    if (typeof window !== 'undefined') {
      // Redirect to login or show login modal
      window.location.href = '/tr/admin/login';
    }
  }

  // File upload
  async uploadFile(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ url: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.config.baseURL}${endpoint}`;
    
    const requestHeaders: Record<string, string> = {};
    if (this.authToken) {
      requestHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const xhr = new XMLHttpRequest();

      return new Promise((resolve) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          try {
            const result = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
              resolve({ success: true, data: result.data });
            } else {
              resolve({ success: false, error: result.error || 'Upload failed' });
            }
          } catch {
            resolve({ success: false, error: 'Invalid response format' });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({ success: false, error: 'Upload failed' });
        });

        xhr.open('POST', url);
        
        Object.entries(requestHeaders).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });

        xhr.send(formData);
      });
    } catch (error) {
      return { success: false, error: 'Upload failed' };
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, RequestOptions, ApiConfig };
