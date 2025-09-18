'use client';

import { useEffect } from 'react';
import { useAnalyticsContext } from './analytics-provider';

interface ErrorTrackerProps {
  children: React.ReactNode;
}

export function ErrorTracker({ children }: ErrorTrackerProps) {
  const { trackError } = useAnalyticsContext();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError('javascript_error', event.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError('unhandled_promise_rejection', event.reason?.toString() || 'Unknown error');
    };

    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName) {
        trackError('resource_error', `Failed to load ${target.tagName.toLowerCase()}`);
      }
    };

    // Track JavaScript errors
    window.addEventListener('error', handleError);
    
    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    // Track resource loading errors
    window.addEventListener('error', handleResourceError, true);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleResourceError, true);
    };
  }, [trackError]);

  return <>{children}</>;
}
