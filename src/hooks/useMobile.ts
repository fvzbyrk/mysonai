'use client';

import { useState, useEffect, useCallback } from 'react';

// Mobile detection and utilities
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenWidth(width);
      setScreenHeight(height);

      // Device type detection
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      // Orientation detection
      setOrientation(width > height ? 'landscape' : 'portrait');

      // Touch device detection
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mobile-specific utilities
  const preventZoom = useCallback(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
  }, []);

  const allowZoom = useCallback(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  }, []);

  const hideAddressBar = useCallback(() => {
    if (isMobile) {
      window.scrollTo(0, 1);
    }
  }, [isMobile]);

  const showAddressBar = useCallback(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  // Touch utilities
  const addTouchClass = useCallback(() => {
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.remove('touch-device');
    }
  }, [isTouchDevice]);

  const removeTouchClass = useCallback(() => {
    document.body.classList.remove('touch-device');
  }, []);

  // Mobile-specific event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Prevent double-tap zoom
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Prevent scroll bounce on iOS
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, []);

  // Responsive utilities
  const getResponsiveValue = useCallback(
    <T>(mobile: T, tablet: T, desktop: T): T => {
      if (isMobile) {
        return mobile;
      }
      if (isTablet) {
        return tablet;
      }
      return desktop;
    },
    [isMobile, isTablet]
  );

  const getResponsiveClass = useCallback(
    (mobile: string, tablet: string, desktop: string): string => {
      if (isMobile) {
        return mobile;
      }
      if (isTablet) {
        return tablet;
      }
      return desktop;
    },
    [isMobile, isTablet]
  );

  // Mobile-specific CSS classes
  const getMobileClasses = useCallback(() => {
    const classes = [];

    if (isMobile) {
      classes.push('mobile');
    }
    if (isTablet) {
      classes.push('tablet');
    }
    if (isDesktop) {
      classes.push('desktop');
    }
    if (isTouchDevice) {
      classes.push('touch');
    }
    if (orientation === 'landscape') {
      classes.push('landscape');
    }
    if (orientation === 'portrait') {
      classes.push('portrait');
    }
    if (!isOnline) {
      classes.push('offline');
    }

    return classes.join(' ');
  }, [isMobile, isTablet, isDesktop, isTouchDevice, orientation, isOnline]);

  // Mobile breakpoints
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  };

  const isBreakpoint = useCallback(
    (breakpoint: keyof typeof breakpoints) => {
      return screenWidth < breakpoints[breakpoint];
    },
    [screenWidth]
  );

  return {
    // Device detection
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    screenHeight,
    orientation,
    isTouchDevice,
    isOnline,

    // Utilities
    preventZoom,
    allowZoom,
    hideAddressBar,
    showAddressBar,
    addTouchClass,
    removeTouchClass,
    handleTouchStart,
    handleTouchMove,
    getResponsiveValue,
    getResponsiveClass,
    getMobileClasses,
    isBreakpoint,
    breakpoints,
  };
}
