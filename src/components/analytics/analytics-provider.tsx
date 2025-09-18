'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsContextType {
  trackEvent: (event: any) => void;
  trackConversion: (conversion: any) => void;
  trackEngagement: (action: string, element?: string) => void;
  trackFormSubmission: (formName: string, success?: boolean) => void;
  trackButtonClick: (buttonName: string, location?: string) => void;
  trackDownload: (fileName: string, fileType: string) => void;
  trackVideoInteraction: (action: string, videoTitle: string) => void;
  trackSearch: (searchTerm: string, resultsCount?: number) => void;
  trackScrollDepth: (depth: number) => void;
  trackTimeOnPage: (timeInSeconds: number) => void;
  trackError: (errorType: string, errorMessage: string) => void;
  trackPurchase: (transactionId: string, value: number, currency?: string) => void;
  trackAddToCart: (itemId: string, itemName: string, value: number) => void;
  trackNewsletterSignup: (email: string, source: string) => void;
  trackDemoRequest: (demoType: string, contactMethod: string) => void;
  trackContactForm: (formType: string, success: boolean) => void;
  isInitialized: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const analytics = useAnalytics();

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}
