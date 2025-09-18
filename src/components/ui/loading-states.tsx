'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner, LoadingDots, LoadingPulse } from './loading-spinner';
import { Skeleton } from './skeleton';

// Page Loading Component
export function PageLoading({ 
  message = "Yükleniyor...", 
  showProgress = false,
  progress = 0 
}: { 
  message?: string; 
  showProgress?: boolean;
  progress?: number;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">{message}</h2>
        <p className="text-gray-300 mb-4">MySonAI hazırlanıyor</p>
        {showProgress && (
          <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

// Button Loading State
export function ButtonLoading({ 
  loading, 
  children, 
  loadingText = "Yükleniyor...",
  ...props 
}: { 
  loading: boolean; 
  children: React.ReactNode;
  loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      {...props} 
      disabled={loading || props.disabled}
      className={`${props.className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" />
          <span className="ml-2">{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// Form Loading State
export function FormLoading({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Form yükleniyor..." />
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}

// Data Loading State
export function DataLoading({ 
  loading, 
  children, 
  skeleton,
  message = "Veriler yükleniyor..."
}: { 
  loading: boolean; 
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  message?: string;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {skeleton || (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" text={message} />
          </div>
        )}
      </div>
    );
  }
  
  return <>{children}</>;
}

// Async Loading Hook
export function useAsyncLoading<T>(
  asyncFunction: () => Promise<T>,
  deps: any[] = []
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, deps);

  return { loading, data, error, refetch: execute };
}

// Progressive Loading
export function ProgressiveLoading({ 
  steps, 
  currentStep, 
  onComplete 
}: { 
  steps: string[]; 
  currentStep: number; 
  onComplete: () => void;
}) {
  const progress = (currentStep / steps.length) * 100;

  useEffect(() => {
    if (currentStep >= steps.length) {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        
        <h2 className="text-xl font-semibold text-white mb-4">
          {steps[currentStep] || "Tamamlanıyor..."}
        </h2>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-gray-300 text-sm">
          {currentStep + 1} / {steps.length} adım
        </p>
      </div>
    </div>
  );
}

// Skeleton Loading for Lists
export function SkeletonList({ 
  count = 3, 
  itemHeight = "h-20" 
}: { 
  count?: number; 
  itemHeight?: string;
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-white/10 rounded-lg p-4 ${itemHeight}`}>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Infinite Scroll Loading
export function InfiniteScrollLoading() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center space-x-2">
        <LoadingDots />
        <span className="text-gray-400 text-sm">Daha fazla yükleniyor...</span>
      </div>
    </div>
  );
}

// Search Loading
export function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-2">
        <LoadingPulse />
        <span className="text-gray-400 text-sm">Aranıyor...</span>
      </div>
    </div>
  );
}
