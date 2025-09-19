'use client';

import { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface DynamicImportProps {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: 'skeleton' | 'spinner' | 'custom';
  delay?: number;
}

// Default fallback components
const DefaultSkeletonFallback = () => (
  <div className='space-y-4'>
    <Skeleton className='h-4 w-3/4' />
    <Skeleton className='h-4 w-1/2' />
    <Skeleton className='h-4 w-5/6' />
  </div>
);

const DefaultSpinnerFallback = () => (
  <div className='flex items-center justify-center py-8'>
    <LoadingSpinner size='lg' text='Yükleniyor...' />
  </div>
);

// Dynamic import wrapper with fallback
export function DynamicImport({
  children,
  fallback,
  loading = 'skeleton',
  delay = 0,
}: DynamicImportProps) {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowFallback(false);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowFallback(false);
    }
  }, [delay]);

  const getFallbackComponent = () => {
    if (fallback) {
      return fallback;
    }

    switch (loading) {
      case 'skeleton':
        return <DefaultSkeletonFallback />;
      case 'spinner':
        return <DefaultSpinnerFallback />;
      default:
        return <DefaultSkeletonFallback />;
    }
  };

  return <Suspense fallback={showFallback ? getFallbackComponent() : null}>{children}</Suspense>;
}

// Lazy load component with retry mechanism
export function LazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function WrappedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <DefaultSkeletonFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Preload component for better performance
export function PreloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  // Preload the component
  const preloadPromise = importFunc();

  return {
    preload: () => preloadPromise,
    component: LazyComponent(importFunc),
  };
}

// Dynamic route component
export function DynamicRoute({ children, fallback, loading = 'skeleton' }: DynamicImportProps) {
  return (
    <DynamicImport fallback={fallback} loading={loading}>
      {children}
    </DynamicImport>
  );
}

// Conditional loading component
export function ConditionalLoad({
  condition,
  children,
  fallback,
  loading = 'skeleton',
}: {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  loading?: 'skeleton' | 'spinner' | 'custom';
}) {
  if (!condition) {
    return fallback || <DefaultSkeletonFallback />;
  }

  return (
    <DynamicImport fallback={fallback} loading={loading}>
      {children}
    </DynamicImport>
  );
}

// Intersection observer based lazy loading
export function IntersectionLazyLoad({
  children,
  fallback,
  loading = 'skeleton',
  threshold = 0.1,
  rootMargin = '50px',
}: DynamicImportProps & {
  threshold?: number;
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref}>
      {isVisible ? (
        <DynamicImport fallback={fallback} loading={loading}>
          {children}
        </DynamicImport>
      ) : (
        fallback || <DefaultSkeletonFallback />
      )}
    </div>
  );
}

// Error boundary for dynamic imports
export function DynamicImportErrorBoundary({
  children,
  fallback,
  onError,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      onError?.(error.error, {
        componentStack: error.filename || '',
        errorBoundary: 'DynamicImportErrorBoundary',
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

  if (hasError) {
    return (
      fallback || (
        <div className='flex items-center justify-center py-8'>
          <div className='text-center'>
            <div className='text-2xl mb-2'>⚠️</div>
            <div className='text-sm text-gray-500'>Bileşen yüklenemedi</div>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
