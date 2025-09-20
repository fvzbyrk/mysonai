import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager<T> {
  private cache = new Map<string, CacheItem<T>>();
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 5 * 60 * 1000, // 5 minutes default
      maxSize: options.maxSize || 100,
      storage: options.storage || 'memory',
    };
  }

  set(key: string, data: T, customTtl?: number): void {
    const ttl = customTtl || this.options.ttl;
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    this.cache.set(key, item);

    // Enforce max size
    if (this.cache.size > this.options.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Persist to storage if needed
    if (this.options.storage !== 'memory') {
      this.persistToStorage();
    }
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
    if (this.options.storage !== 'memory') {
      this.persistToStorage();
    }
  }

  clear(): void {
    this.cache.clear();
    if (this.options.storage !== 'memory') {
      this.persistToStorage();
    }
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  private persistToStorage(): void {
    if (typeof window === 'undefined') return;

    const data = Array.from(this.cache.entries());
    const storage = this.options.storage === 'localStorage' 
      ? localStorage 
      : sessionStorage;
    
    try {
      storage.setItem('cache_data', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist cache to storage:', error);
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    const storage = this.options.storage === 'localStorage' 
      ? localStorage 
      : sessionStorage;
    
    try {
      const data = storage.getItem('cache_data');
      if (data) {
        const entries = JSON.parse(data);
        this.cache = new Map(entries);
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }
}

// Hook for using cache
export function useCache<T>(options: CacheOptions = {}) {
  const cacheRef = useRef<CacheManager<T>>();
  
  if (!cacheRef.current) {
    cacheRef.current = new CacheManager<T>(options);
  }

  const cache = cacheRef.current;

  const set = useCallback((key: string, data: T, customTtl?: number) => {
    cache.set(key, data, customTtl);
  }, [cache]);

  const get = useCallback((key: string) => {
    return cache.get(key);
  }, [cache]);

  const has = useCallback((key: string) => {
    return cache.has(key);
  }, [cache]);

  const remove = useCallback((key: string) => {
    cache.delete(key);
  }, [cache]);

  const clear = useCallback(() => {
    cache.clear();
  }, [cache]);

  return {
    set,
    get,
    has,
    remove,
    clear,
    size: cache.size(),
    keys: cache.keys(),
  };
}

// Hook for cached API calls
export function useCachedApi<T>(
  key: string,
  apiCall: () => Promise<T>,
  options: CacheOptions & { 
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  } = {}
) {
  const { enabled = true, refetchOnWindowFocus = false, ...cacheOptions } = options;
  const cache = useCache<T>(cacheOptions);
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    // Check cache first
    if (!force) {
      const cachedData = cache.get(key);
      if (cachedData) {
        setData(cachedData);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      cache.set(key, result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, apiCall, enabled, cache]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      fetchData(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchData, refetchOnWindowFocus]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cache.remove(key);
    fetchData(true);
  }, [cache, key, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidate,
  };
}

// Hook for paginated data with caching
export function useCachedPagination<T>(
  baseKey: string,
  fetchPage: (page: number, limit: number) => Promise<{ data: T[]; total: number; hasMore: boolean }>,
  options: CacheOptions & { 
    pageSize?: number;
    enabled?: boolean;
  } = {}
) {
  const { pageSize = 20, enabled = true, ...cacheOptions } = options;
  const cache = useCache<{ data: T[]; total: number; hasMore: boolean }>(cacheOptions);
  
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadPage = useCallback(async (page: number, force = false) => {
    if (!enabled) return;

    const pageKey = `${baseKey}_page_${page}`;
    
    // Check cache first
    if (!force) {
      const cachedPage = cache.get(pageKey);
      if (cachedPage) {
        if (page === 1) {
          setData(cachedPage.data);
          setTotal(cachedPage.total);
        } else {
          setData(prev => [...prev, ...cachedPage.data]);
        }
        setHasMore(cachedPage.hasMore);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchPage(page, pageSize);
      
      if (page === 1) {
        setData(result.data);
        setTotal(result.total);
      } else {
        setData(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.hasMore);
      cache.set(pageKey, result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [baseKey, fetchPage, pageSize, enabled, cache]);

  const loadNextPage = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPage(nextPage);
    }
  }, [hasMore, isLoading, currentPage, loadPage]);

  const refresh = useCallback(() => {
    setCurrentPage(1);
    setData([]);
    setTotal(0);
    setHasMore(true);
    loadPage(1, true);
  }, [loadPage]);

  const invalidate = useCallback(() => {
    cache.clear();
    refresh();
  }, [cache, refresh]);

  // Initial load
  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  return {
    data,
    total,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    refresh,
    invalidate,
  };
}
