'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMobile } from '@/hooks/useMobile';

interface MobileContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
  isOnline: boolean;
  preventZoom: () => void;
  allowZoom: () => void;
  hideAddressBar: () => void;
  showAddressBar: () => void;
  addTouchClass: () => void;
  removeTouchClass: () => void;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  getResponsiveValue: <T>(mobile: T, tablet: T, desktop: T) => T;
  getResponsiveClass: (mobile: string, tablet: string, desktop: string) => string;
  getMobileClasses: () => string;
  isBreakpoint: (breakpoint: 'mobile' | 'tablet' | 'desktop') => boolean;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export function MobileProvider({ children }: { children: ReactNode }) {
  const mobile = useMobile();

  return (
    <MobileContext.Provider value={mobile}>
      {children}
    </MobileContext.Provider>
  );
}

export function useMobileContext() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobileContext must be used within a MobileProvider');
  }
  return context;
}
