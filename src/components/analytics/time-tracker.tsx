'use client';

import { useEffect, useRef } from 'react';
import { useAnalyticsContext } from './analytics-provider';

interface TimeTrackerProps {
  children: React.ReactNode;
}

export function TimeTracker({ children }: TimeTrackerProps) {
  const { trackTimeOnPage } = useAnalyticsContext();
  const startTime = useRef<number>(Date.now());
  const hasTracked = useRef<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!hasTracked.current) {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        trackTimeOnPage(timeSpent);
        hasTracked.current = true;
      }
    };

    // Track time on page when user leaves
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Track time on page after 30 seconds
    const timer = setTimeout(() => {
      if (!hasTracked.current) {
        trackTimeOnPage(30);
        hasTracked.current = true;
      }
    }, 30000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timer);
    };
  }, [trackTimeOnPage]);

  return <>{children}</>;
}
