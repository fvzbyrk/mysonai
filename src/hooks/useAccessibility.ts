'use client';

import { useState, useEffect, useCallback } from 'react';

interface AccessibilityPreferences {
  // Visual preferences
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';

  // Font preferences
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'default' | 'dyslexic' | 'monospace';

  // Interaction preferences
  keyboardNavigation: boolean;
  focusVisible: boolean;

  // Screen reader preferences
  screenReader: boolean;
  announceChanges: boolean;
}

interface AccessibilityMetrics {
  // Focus management
  focusableElements: number;
  focusTraps: number;

  // ARIA usage
  ariaLabels: number;
  ariaDescribedBy: number;
  ariaHidden: number;

  // Color contrast
  contrastRatio: number | null;

  // Keyboard navigation
  tabOrder: number[];
  skipLinks: number;
}

export function useAccessibility() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersColorScheme: 'no-preference',
    fontSize: 'medium',
    fontFamily: 'default',
    keyboardNavigation: false,
    focusVisible: false,
    screenReader: false,
    announceChanges: false,
  });

  const [metrics, setMetrics] = useState<AccessibilityMetrics>({
    focusableElements: 0,
    focusTraps: 0,
    ariaLabels: 0,
    ariaDescribedBy: 0,
    ariaHidden: 0,
    contrastRatio: null,
    tabOrder: [],
    skipLinks: 0,
  });

  // Detect accessibility preferences
  const detectPreferences = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // High contrast
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    // Color scheme
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ('dark' as const)
      : window.matchMedia('(prefers-color-scheme: light)').matches
        ? ('light' as const)
        : ('no-preference' as const);

    // Screen reader detection (basic)
    const screenReader =
      'speechSynthesis' in window ||
      'speechRecognition' in window ||
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver');

    setPreferences(prev => ({
      ...prev,
      prefersReducedMotion,
      prefersHighContrast,
      prefersColorScheme,
      screenReader,
    }));
  }, []);

  // Measure accessibility metrics
  const measureAccessibilityMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Focusable elements
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).length;

    // ARIA elements
    const ariaLabels = document.querySelectorAll('[aria-label]').length;
    const ariaDescribedBy = document.querySelectorAll('[aria-describedby]').length;
    const ariaHidden = document.querySelectorAll('[aria-hidden="true"]').length;

    // Skip links
    const skipLinks = document.querySelectorAll('a[href^="#"], [data-skip-link]').length;

    // Focus traps
    const focusTraps = document.querySelectorAll('[data-focus-trap]').length;

    // Tab order (simplified)
    const tabOrder: number[] = [];
    document.querySelectorAll('[tabindex]').forEach((el, index) => {
      const tabIndex = parseInt(el.getAttribute('tabindex') || '0');
      tabOrder.push(tabIndex);
    });

    setMetrics(prev => ({
      ...prev,
      focusableElements,
      focusTraps,
      ariaLabels,
      ariaDescribedBy,
      ariaHidden,
      tabOrder: tabOrder.sort((a, b) => a - b),
      skipLinks,
    }));
  }, []);

  // Check color contrast
  const checkColorContrast = useCallback((foreground: string, background: string) => {
    // Simple contrast ratio calculation
    const getLuminance = (color: string) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;

      const [r, g, b] = rgb.map(c => {
        const val = parseInt(c) / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const lum1 = getLuminance(foreground);
    const lum2 = getLuminance(background);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }, []);

  // Apply accessibility preferences
  const applyPreferences = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Reduced motion
    if (preferences.prefersReducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--animation-iteration-count', '1');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--animation-iteration-count');
    }

    // High contrast
    if (preferences.prefersHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--base-font-size', fontSizeMap[preferences.fontSize]);

    // Font family
    const fontFamilyMap = {
      default: 'Inter, system-ui, sans-serif',
      dyslexic: 'OpenDyslexic, Inter, system-ui, sans-serif',
      monospace: 'JetBrains Mono, Consolas, monospace',
    };
    root.style.setProperty('--font-family', fontFamilyMap[preferences.fontFamily]);

    // Keyboard navigation
    if (preferences.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }

    // Focus visible
    if (preferences.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
  }, [preferences]);

  // Update preferences
  const updatePreferences = useCallback((newPreferences: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  // Announce changes to screen readers
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!preferences.announceChanges) return;

      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;

      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    [preferences.announceChanges]
  );

  // Focus management
  const focusElement = useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize
  useEffect(() => {
    detectPreferences();
    measureAccessibilityMetrics();
  }, [detectPreferences, measureAccessibilityMetrics]);

  // Apply preferences when they change
  useEffect(() => {
    applyPreferences();
  }, [applyPreferences]);

  // Accessibility recommendations
  const getRecommendations = useCallback(() => {
    const recommendations: string[] = [];

    if (metrics.focusableElements > 20) {
      recommendations.push('Consider reducing the number of focusable elements');
    }

    if (metrics.ariaLabels < metrics.focusableElements * 0.5) {
      recommendations.push('Add more aria-labels to interactive elements');
    }

    if (metrics.skipLinks === 0) {
      recommendations.push('Add skip links for keyboard navigation');
    }

    if (metrics.contrastRatio && metrics.contrastRatio < 4.5) {
      recommendations.push('Improve color contrast ratio');
    }

    if (preferences.prefersReducedMotion) {
      recommendations.push('Ensure animations respect reduced motion preference');
    }

    return recommendations;
  }, [metrics, preferences]);

  return {
    preferences,
    metrics,
    updatePreferences,
    announce,
    focusElement,
    trapFocus,
    checkColorContrast,
    recommendations: getRecommendations(),
  };
}
