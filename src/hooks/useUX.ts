'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// UX utilities and hooks
export function useUX() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    theme: 'system',
    language: 'tr',
    notifications: true,
    animations: true,
    reducedMotion: false
  });
  const [userJourney, setUserJourney] = useState<string[]>([]);
  const [sessionStart, setSessionStart] = useState<number>(Date.now());
  const [pageViews, setPageViews] = useState<number>(0);
  const [interactions, setInteractions] = useState<number>(0);
  const [scrollDepth, setScrollDepth] = useState<number>(0);
  const [timeOnPage, setTimeOnPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchDevice, setTouchDevice] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown');

  // Initialize UX tracking
  useEffect(() => {
    // Check if first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }

    // Load user preferences
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }

    // Track session start
    setSessionStart(Date.now());

    // Track page views
    setPageViews(prev => prev + 1);

    // Track user journey
    const currentPath = window.location.pathname;
    setUserJourney(prev => [...prev, currentPath]);

    // Track screen size
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    // Track visibility
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Track touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouchDevice);

    // Track battery level
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(battery.level);
      });
    }

    // Track connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType) {
        setConnectionSpeed(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' ? 'slow' : 'fast');
      }
    }

    // Track online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollDepth(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);

    // Track time on page
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeOnPage(Date.now() - startTime);
    }, 1000);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Save user preferences
  const saveUserPreferences = useCallback((preferences: Partial<typeof userPreferences>) => {
    const newPreferences = { ...userPreferences, ...preferences };
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  }, [userPreferences]);

  // Track interactions
  const trackInteraction = useCallback((type: string, data?: any) => {
    setInteractions(prev => prev + 1);
    
    // Log interaction for analytics
    console.log('UX Interaction:', { type, data, timestamp: Date.now() });
  }, []);

  // Show loading state
  const showLoading = useCallback((message?: string) => {
    setIsLoading(true);
    if (message) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, []);

  // Hide loading state
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Show error message
  const showError = useCallback((message: string) => {
    setHasError(true);
    setErrorMessage(message);
    setSuccessMessage(null);
    setIsLoading(false);
  }, []);

  // Show success message
  const showSuccess = useCallback((message: string) => {
    setHasError(false);
    setErrorMessage(null);
    setSuccessMessage(message);
    setIsLoading(false);
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setHasError(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  // Track user journey
  const addToJourney = useCallback((path: string) => {
    setUserJourney(prev => [...prev, path]);
  }, []);

  // Get user experience score
  const getUXScore = useCallback(() => {
    let score = 100;
    
    // Deduct points for errors
    if (hasError) score -= 20;
    
    // Deduct points for slow loading
    if (isLoading && timeOnPage > 3000) score -= 15;
    
    // Deduct points for low scroll depth
    if (scrollDepth < 25) score -= 10;
    
    // Deduct points for short time on page
    if (timeOnPage < 10000) score -= 5;
    
    // Deduct points for slow connection
    if (connectionSpeed === 'slow') score -= 10;
    
    // Deduct points for low battery
    if (batteryLevel && batteryLevel < 0.2) score -= 5;
    
    return Math.max(0, score);
  }, [hasError, isLoading, timeOnPage, scrollDepth, connectionSpeed, batteryLevel]);

  // Get user engagement level
  const getEngagementLevel = useCallback(() => {
    const interactionsPerMinute = interactions / (timeOnPage / 60000);
    const scrollEngagement = scrollDepth / 100;
    const timeEngagement = Math.min(timeOnPage / 60000, 1);
    
    const engagementScore = (interactionsPerMinute * 0.3) + (scrollEngagement * 0.4) + (timeEngagement * 0.3);
    
    if (engagementScore > 0.7) return 'high';
    if (engagementScore > 0.4) return 'medium';
    return 'low';
  }, [interactions, timeOnPage, scrollDepth]);

  // Get user behavior insights
  const getBehaviorInsights = useCallback(() => {
    const insights = [];
    
    if (scrollDepth < 25) {
      insights.push('User may not be finding relevant content');
    }
    
    if (timeOnPage < 10000) {
      insights.push('User may be leaving too quickly');
    }
    
    if (interactions < 3) {
      insights.push('User may not be engaging with content');
    }
    
    if (connectionSpeed === 'slow') {
      insights.push('User may be experiencing slow loading');
    }
    
    if (batteryLevel && batteryLevel < 0.2) {
      insights.push('User may be on low battery');
    }
    
    return insights;
  }, [scrollDepth, timeOnPage, interactions, connectionSpeed, batteryLevel]);

  // Get recommendations
  const getRecommendations = useCallback(() => {
    const recommendations = [];
    
    if (scrollDepth < 25) {
      recommendations.push('Consider improving content relevance');
    }
    
    if (timeOnPage < 10000) {
      recommendations.push('Consider improving page loading speed');
    }
    
    if (interactions < 3) {
      recommendations.push('Consider adding more interactive elements');
    }
    
    if (connectionSpeed === 'slow') {
      recommendations.push('Consider optimizing for slow connections');
    }
    
    if (batteryLevel && batteryLevel < 0.2) {
      recommendations.push('Consider reducing battery usage');
    }
    
    return recommendations;
  }, [scrollDepth, timeOnPage, interactions, connectionSpeed, batteryLevel]);

  // Get user session summary
  const getSessionSummary = useCallback(() => {
    return {
      sessionStart,
      pageViews,
      interactions,
      scrollDepth,
      timeOnPage,
      userJourney,
      uxScore: getUXScore(),
      engagementLevel: getEngagementLevel(),
      behaviorInsights: getBehaviorInsights(),
      recommendations: getRecommendations()
    };
  }, [
    sessionStart,
    pageViews,
    interactions,
    scrollDepth,
    timeOnPage,
    userJourney,
    getUXScore,
    getEngagementLevel,
    getBehaviorInsights,
    getRecommendations
  ]);

  return {
    // State
    isFirstVisit,
    userPreferences,
    userJourney,
    sessionStart,
    pageViews,
    interactions,
    scrollDepth,
    timeOnPage,
    isLoading,
    hasError,
    errorMessage,
    successMessage,
    isOnline,
    isVisible,
    mousePosition,
    touchDevice,
    screenSize,
    orientation,
    batteryLevel,
    connectionSpeed,
    
    // Actions
    saveUserPreferences,
    trackInteraction,
    showLoading,
    hideLoading,
    showError,
    showSuccess,
    clearMessages,
    addToJourney,
    
    // Analytics
    getUXScore,
    getEngagementLevel,
    getBehaviorInsights,
    getRecommendations,
    getSessionSummary
  };
}
