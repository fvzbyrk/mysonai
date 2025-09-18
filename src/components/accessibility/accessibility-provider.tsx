'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';

interface AccessibilityContextType {
  isReducedMotion: boolean;
  isHighContrast: boolean;
  isScreenReader: boolean;
  fontSize: number;
  focusVisible: boolean;
  announcements: string[];
  focusElement: (element: HTMLElement | null) => void;
  trapFocus: (container: HTMLElement) => () => void;
  announce: (message: string) => void;
  skipToContent: () => void;
  handleKeyboardNavigation: (e: KeyboardEvent) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  getContrastRatio: (color1: string, color2: string) => number;
  setAriaExpanded: (element: HTMLElement, expanded: boolean) => void;
  setAriaSelected: (element: HTMLElement, selected: boolean) => void;
  setAriaHidden: (element: HTMLElement, hidden: boolean) => void;
  hideFromScreenReader: (element: HTMLElement) => void;
  showToScreenReader: (element: HTMLElement) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const accessibility = useAccessibility();

  return (
    <AccessibilityContext.Provider value={accessibility}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
}
