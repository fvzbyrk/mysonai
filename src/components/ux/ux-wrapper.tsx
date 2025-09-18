'use client';

import { UXProvider } from './ux-provider';
import { UXFeedback } from './ux-feedback';

interface UXWrapperProps {
  children: React.ReactNode;
  enableFeedback?: boolean;
  enableAnalytics?: boolean;
  enableOptimization?: boolean;
}

export function UXWrapper({ 
  children,
  enableFeedback = true,
  enableAnalytics = true,
  enableOptimization = true
}: UXWrapperProps) {
  return (
    <UXProvider>
      {children}
      {enableFeedback && <UXFeedback />}
    </UXProvider>
  );
}
