'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useConversion } from '@/hooks/useConversion';
import { ConversionOptimizer } from './conversion-optimizer';

interface ConversionContextType {
  conversions: any[];
  conversionRate: number;
  funnelSteps: any[];
  abTests: any[];
  ctaPerformance: any[];
  formAbandonment: any[];
  cartAbandonment: any[];
  exitIntent: any[];
  scrollDepth: number;
  timeOnPage: number;
  bounceRate: number;
  goalCompletions: any[];
  revenue: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  trackConversion: (conversion: any) => void;
  trackGoalCompletion: (
    goalName: string,
    value: number,
    source: string,
    medium: string,
    campaign: string
  ) => void;
  trackCTAClick: (ctaId: string, text: string, type: string, location: string) => void;
  trackFormAbandonment: (
    formName: string,
    step: number,
    totalSteps: number,
    fields: string[],
    completedFields: string[]
  ) => void;
  trackCartAbandonment: (items: any[], totalValue: number, reason?: string) => void;
  trackExitIntent: (
    page: string,
    timeOnPage: number,
    scrollDepth: number,
    actions: string[]
  ) => void;
  updateConversionRate: () => void;
  updateFunnelSteps: () => void;
  getConversionInsights: () => string[];
  getConversionRecommendations: () => string[];
  getConversionReport: () => any;
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export function ConversionProvider({ children }: { children: ReactNode }) {
  const conversion = useConversion();

  return <ConversionContext.Provider value={conversion}>{children}</ConversionContext.Provider>;
}

export function useConversionContext() {
  const context = useContext(ConversionContext);
  if (context === undefined) {
    throw new Error('useConversionContext must be used within a ConversionProvider');
  }
  return context;
}

interface ConversionWrapperProps {
  children: React.ReactNode;
  enableOptimization?: boolean;
  enableABTesting?: boolean;
  enableRecommendations?: boolean;
}

export function ConversionWrapper({
  children,
  enableOptimization = true,
  enableABTesting = true,
  enableRecommendations = true,
}: ConversionWrapperProps) {
  return (
    <ConversionProvider>
      {children}
      {enableOptimization && (
        <ConversionOptimizer
          enableABTesting={enableABTesting}
          enableRecommendations={enableRecommendations}
        />
      )}
    </ConversionProvider>
  );
}
