'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';

interface AnalyticsEvent {
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
  timestamp: number;
  user_id?: string;
  session_id: string;
  page_url: string;
  page_title: string;
  user_agent: string;
  referrer?: string;
}

interface UserProperties {
  user_id?: string;
  plan?: string;
  signup_date?: string;
  last_active?: string;
  total_sessions?: number;
  total_events?: number;
  preferred_language?: string;
  device_type?: string;
  browser?: string;
  os?: string;
}

interface PageViewData {
  page_title: string;
  page_location: string;
  page_path: string;
  content_group1?: string;
  content_group2?: string;
  custom_map?: Record<string, any>;
}

export function useAnalytics() {
  const { enabled: analyticsEnabled } = useFeatureFlag('analytics');
  const [sessionId] = useState(() => generateSessionId());
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate unique session ID
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Initialize analytics
  const initializeAnalytics = useCallback(() => {
    if (!analyticsEnabled || typeof window === 'undefined') return;

    // Initialize Google Analytics if available
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: 'session_id',
          custom_parameter_2: 'user_plan',
        },
      });
    }

    setIsInitialized(true);
  }, [analyticsEnabled]);

  // Track page view
  const trackPageView = useCallback(
    (data?: Partial<PageViewData>) => {
      if (!analyticsEnabled || !isInitialized) return;

      const pageData: PageViewData = {
        page_title: data?.page_title || document.title,
        page_location: data?.page_location || window.location.href,
        page_path: data?.page_path || window.location.pathname,
        content_group1: data?.content_group1,
        content_group2: data?.content_group2,
        custom_map: data?.custom_map,
      };

      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'page_view', pageData);
      }

      // Custom analytics (send to your own endpoint)
      sendCustomEvent({
        event_name: 'page_view',
        event_category: 'navigation',
        page_url: pageData.page_location,
        page_title: pageData.page_title,
        custom_parameters: pageData.custom_map,
      });
    },
    [analyticsEnabled, isInitialized]
  );

  // Track custom event
  const trackEvent = useCallback(
    (
      eventName: string,
      category: string,
      label?: string,
      value?: number,
      customParameters?: Record<string, any>
    ) => {
      if (!analyticsEnabled || !isInitialized) return;

      const eventData = {
        event_category: category,
        event_label: label,
        value: value,
        ...customParameters,
      };

      // Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      // Custom analytics
      sendCustomEvent({
        event_name: eventName,
        event_category: category,
        event_label: label,
        value: value,
        custom_parameters: customParameters,
      });
    },
    [analyticsEnabled, isInitialized]
  );

  // Track user interaction
  const trackInteraction = useCallback(
    (action: string, target: string, category: string = 'user_interaction', value?: number) => {
      trackEvent(action, category, target, value, {
        interaction_type: 'click',
        target_element: target,
      });
    },
    [trackEvent]
  );

  // Track form submission
  const trackFormSubmission = useCallback(
    (formName: string, success: boolean, errorMessage?: string) => {
      trackEvent('form_submit', 'forms', formName, success ? 1 : 0, {
        form_name: formName,
        success: success,
        error_message: errorMessage,
      });
    },
    [trackEvent]
  );

  // Track conversion
  const trackConversion = useCallback(
    (
      conversionType: string,
      value?: number,
      currency?: string,
      customParameters?: Record<string, any>
    ) => {
      trackEvent('conversion', 'conversions', conversionType, value, {
        conversion_type: conversionType,
        currency: currency || 'TRY',
        ...customParameters,
      });
    },
    [trackEvent]
  );

  // Track error
  const trackError = useCallback(
    (errorType: string, errorMessage: string, errorCode?: string, stackTrace?: string) => {
      trackEvent('error', 'errors', errorType, 1, {
        error_type: errorType,
        error_message: errorMessage,
        error_code: errorCode,
        stack_trace: stackTrace,
        fatal: false,
      });
    },
    [trackEvent]
  );

  // Track performance
  const trackPerformance = useCallback(
    (metricName: string, value: number, unit: string = 'ms') => {
      trackEvent('performance', 'performance', metricName, value, {
        metric_name: metricName,
        unit: unit,
      });
    },
    [trackEvent]
  );

  // Track AI usage
  const trackAIUsage = useCallback(
    (assistantType: string, action: string, tokensUsed?: number, responseTime?: number) => {
      trackEvent('ai_usage', 'ai_interactions', `${assistantType}_${action}`, tokensUsed, {
        assistant_type: assistantType,
        action: action,
        tokens_used: tokensUsed,
        response_time: responseTime,
      });
    },
    [trackEvent]
  );

  // Track subscription events
  const trackSubscription = useCallback(
    (action: 'start' | 'upgrade' | 'downgrade' | 'cancel', planName: string, value?: number) => {
      trackEvent('subscription', 'subscriptions', `${action}_${planName}`, value, {
        subscription_action: action,
        plan_name: planName,
      });
    },
    [trackEvent]
  );

  // Set user properties
  const setUserProperties = useCallback(
    (properties: UserProperties) => {
      if (!analyticsEnabled || !isInitialized) return;

      // Google Analytics user properties
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
          user_id: properties.user_id,
          custom_map: {
            custom_parameter_1: properties.plan,
            custom_parameter_2: properties.preferred_language,
          },
        });
      }

      // Custom user properties tracking
      trackEvent('user_properties_set', 'user_management', 'properties_updated', 1, properties);
    },
    [analyticsEnabled, isInitialized, trackEvent]
  );

  // Send custom event to your analytics endpoint
  const sendCustomEvent = useCallback(
    async (
      event: Omit<
        AnalyticsEvent,
        'timestamp' | 'session_id' | 'page_url' | 'page_title' | 'user_agent' | 'referrer'
      >
    ) => {
      if (!analyticsEnabled) return;

      const fullEvent: AnalyticsEvent = {
        ...event,
        timestamp: Date.now(),
        session_id: sessionId,
        page_url: window.location.href,
        page_title: document.title,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      };

      try {
        // Send to your custom analytics endpoint
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fullEvent),
        });
      } catch (error) {
        console.error('Failed to send analytics event:', error);
      }
    },
    [analyticsEnabled, sessionId]
  );

  // Initialize on mount
  useEffect(() => {
    if (analyticsEnabled) {
      initializeAnalytics();
    }
  }, [analyticsEnabled, initializeAnalytics]);

  // Auto-track page views on route changes
  useEffect(() => {
    if (!analyticsEnabled || !isInitialized) return;

    const handleRouteChange = () => {
      trackPageView();
    };

    // Listen for route changes (Next.js)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [analyticsEnabled, isInitialized, trackPageView]);

  return {
    isInitialized,
    sessionId,
    trackPageView,
    trackEvent,
    trackInteraction,
    trackFormSubmission,
    trackConversion,
    trackError,
    trackPerformance,
    trackAIUsage,
    trackSubscription,
    setUserProperties,
  };
}
