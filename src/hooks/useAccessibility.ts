'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Accessibility utilities
export function useAccessibility() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isScreenReader, setIsScreenReader] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [focusVisible, setFocusVisible] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for high contrast preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect screen reader
  useEffect(() => {
    const isScreenReaderActive = () => {
      // Check for common screen reader indicators
      const hasScreenReader =
        window.speechSynthesis ||
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[role="application"]') ||
        document.querySelector('[aria-live]');

      return !!hasScreenReader;
    };

    setIsScreenReader(isScreenReaderActive());
  }, []);

  // Focus management
  const focusElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
      setFocusVisible(true);
    }
  }, []);

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Announcements for screen readers
  const announce = useCallback((message: string) => {
    setAnnouncements(prev => [...prev, message]);

    // Create live region for announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;

    document.body.appendChild(liveRegion);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }, []);

  // Skip to content functionality
  const skipToContent = useCallback(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      focusElement(mainContent as HTMLElement);
      announce('Ana içeriğe atlandı');
    }
  }, [focusElement, announce]);

  // Keyboard navigation
  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        // Close modals, dropdowns, etc.
        const activeModal = document.querySelector('[role="dialog"]');
        if (activeModal) {
          (activeModal as HTMLElement).focus();
        }
        break;
      case 'Enter':
      case ' ':
        // Handle button activation
        if (document.activeElement?.tagName === 'BUTTON') {
          (document.activeElement as HTMLButtonElement).click();
        }
        break;
    }
  }, []);

  // Font size management
  const increaseFontSize = useCallback(() => {
    setFontSize(prev => Math.min(prev + 2, 24));
    document.documentElement.style.fontSize = `${fontSize + 2}px`;
  }, [fontSize]);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => Math.max(prev - 2, 12));
    document.documentElement.style.fontSize = `${fontSize - 2}px`;
  }, [fontSize]);

  const resetFontSize = useCallback(() => {
    setFontSize(16);
    document.documentElement.style.fontSize = '16px';
  }, []);

  // Color contrast utilities
  const getContrastRatio = useCallback((color1: string, color2: string) => {
    // Simplified contrast ratio calculation
    const getLuminance = (color: string) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) {
        return 0;
      }

      const [r, g, b] = rgb.map(c => {
        const val = parseInt(c) / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }, []);

  // ARIA utilities
  const setAriaExpanded = useCallback((element: HTMLElement, expanded: boolean) => {
    element.setAttribute('aria-expanded', expanded.toString());
  }, []);

  const setAriaSelected = useCallback((element: HTMLElement, selected: boolean) => {
    element.setAttribute('aria-selected', selected.toString());
  }, []);

  const setAriaHidden = useCallback((element: HTMLElement, hidden: boolean) => {
    element.setAttribute('aria-hidden', hidden.toString());
  }, []);

  // Screen reader utilities
  const hideFromScreenReader = useCallback((element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  }, []);

  const showToScreenReader = useCallback((element: HTMLElement) => {
    element.removeAttribute('aria-hidden');
  }, []);

  // Focus indicators
  useEffect(() => {
    const handleFocusIn = () => setFocusVisible(true);
    const handleFocusOut = () => setFocusVisible(false);

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return {
    // State
    isReducedMotion,
    isHighContrast,
    isScreenReader,
    fontSize,
    focusVisible,
    announcements,

    // Actions
    focusElement,
    trapFocus,
    announce,
    skipToContent,
    handleKeyboardNavigation,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    getContrastRatio,
    setAriaExpanded,
    setAriaSelected,
    setAriaHidden,
    hideFromScreenReader,
    showToScreenReader,
  };
}
