'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUX } from '@/hooks/useUX';

interface UXContextType {
  isFirstVisit: boolean;
  userPreferences: {
    theme: string;
    language: string;
    notifications: boolean;
    animations: boolean;
    reducedMotion: boolean;
  };
  userJourney: string[];
  sessionStart: number;
  pageViews: number;
  interactions: number;
  scrollDepth: number;
  timeOnPage: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  isOnline: boolean;
  isVisible: boolean;
  mousePosition: { x: number; y: number };
  touchDevice: boolean;
  screenSize: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  batteryLevel: number | null;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  saveUserPreferences: (preferences: any) => void;
  trackInteraction: (type: string, data?: any) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  clearMessages: () => void;
  addToJourney: (path: string) => void;
  getUXScore: () => number;
  getEngagementLevel: () => 'high' | 'medium' | 'low';
  getBehaviorInsights: () => string[];
  getRecommendations: () => string[];
  getSessionSummary: () => any;
}

const UXContext = createContext<UXContextType | undefined>(undefined);

export function UXProvider({ children }: { children: ReactNode }) {
  const ux = useUX();

  return (
    <UXContext.Provider value={ux}>
      {children}
    </UXContext.Provider>
  );
}

export function useUXContext() {
  const context = useContext(UXContext);
  if (context === undefined) {
    throw new Error('useUXContext must be used within a UXProvider');
  }
  return context;
}
