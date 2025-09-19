'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Check if GA4 is available
export const isGA4Available = () => {
  return typeof window !== 'undefined' && GA_TRACKING_ID && typeof window.gtag !== 'undefined';
};

// Analytics events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'MySonAI',
        ...properties,
      });
    }

    // Console log for development
    // Analytics event tracked
  }
};

// Page view tracking
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        ...properties,
      });
    }

    // Page view tracked
  }
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: conversionType,
        value: value,
        currency: currency || 'TRY',
      });
    }

    // Conversion tracked
  }
};

// E-commerce events
export const trackPurchase = (
  transactionId: string,
  value: number,
  currency: string = 'TRY',
  items: any[] = []
) => {
  if (isGA4Available()) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
  // Purchase tracked
};

export const trackSubscribe = (
  subscriptionId: string,
  plan: string,
  value: number,
  currency: string = 'TRY'
) => {
  if (isGA4Available()) {
    window.gtag('event', 'subscribe', {
      subscription_id: subscriptionId,
      plan: plan,
      value: value,
      currency: currency,
    });
  }
  // Subscribe tracked
};

// AI Assistant events
export const trackAIAssistantUsed = (
  assistantName: string,
  assistantRole: string,
  sessionDuration: number
) => {
  trackEvent('ai_assistant_used', {
    assistant_name: assistantName,
    assistant_role: assistantRole,
    session_duration: sessionDuration,
  });
};

// User engagement events
export const trackDemoStarted = (demoType: string, userType: string = 'guest') => {
  trackEvent('demo_started', {
    demo_type: demoType,
    user_type: userType,
  });
};

export const trackSignupStarted = (method: string, source: string) => {
  trackEvent('signup_started', {
    method: method,
    source: source,
  });
};

export const trackSignupCompleted = (method: string, plan: string = 'free') => {
  trackEvent('sign_up', {
    method: method,
    plan: plan,
  });
};

// Usage tracking
export const trackUsage = (action: string, plan: string, usage?: Record<string, any>) => {
  trackEvent('usage_action', {
    action,
    plan,
    ...usage,
  });
};

// Plan upgrade tracking
export const trackPlanUpgrade = (fromPlan: string, toPlan: string, value?: number) => {
  trackConversion('plan_upgrade', value, 'TRY');
  trackEvent('plan_upgrade', {
    from_plan: fromPlan,
    to_plan: toPlan,
    value: value,
  });
};

// Subscription events
export const trackSubscriptionEvent = (
  event: string,
  plan: string,
  properties?: Record<string, any>
) => {
  trackEvent('subscription_event', {
    event,
    plan,
    ...properties,
  });
};

// AI Assistant usage tracking
export const trackAIAssistantUsage = (assistantId: string, action: string, plan: string) => {
  trackUsage('ai_assistant_usage', plan, {
    assistant_id: assistantId,
    action,
  });
};

// Error tracking
export const trackError = (error: string, context?: string) => {
  trackEvent('error', {
    error_message: error,
    context: context || 'unknown',
  });
};

// Enhanced e-commerce helpers
export const trackAddToCart = (
  itemId: string,
  itemName: string,
  category: string,
  price: number,
  quantity: number = 1
) => {
  if (isGA4Available()) {
    window.gtag('event', 'add_to_cart', {
      currency: 'TRY',
      value: price * quantity,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          category: category,
          quantity: quantity,
          price: price,
        },
      ],
    });
  }
  console.log('Add to Cart:', itemId, itemName, price, quantity);
};

export const trackBeginCheckout = (value: number, currency: string = 'TRY', items: any[] = []) => {
  if (isGA4Available()) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }
  console.log('Begin Checkout:', value, currency, items);
};

// User ID tracking
export const setUserId = (userId: string) => {
  if (isGA4Available()) {
    window.gtag('config', GA_TRACKING_ID, {
      user_id: userId,
    });
  }
};

// Custom dimensions
export const setUserProperties = (properties: Record<string, any>) => {
  if (isGA4Available()) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: properties,
    });
  }
};

// Debug mode
export const enableDebugMode = () => {
  if (isGA4Available()) {
    window.gtag('config', GA_TRACKING_ID, {
      debug_mode: true,
    });
  }
};

export const disableDebugMode = () => {
  if (isGA4Available()) {
    window.gtag('config', GA_TRACKING_ID, {
      debug_mode: false,
    });
  }
};

// Custom hook for automatic tracking
export function useAnalytics() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Set user ID for GA4
      setUserId(user.id);

      // Set user properties
      setUserProperties({
        user_plan: user.plan,
        signup_date: user.createdAt,
      });

      // Track user login
      trackEvent('user_login', {
        user_id: user.id,
        plan: user.plan,
        signup_date: user.createdAt,
      });
    }
  }, [user]);

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackUsage,
    trackPlanUpgrade,
    trackSubscriptionEvent,
    trackAIAssistantUsage,
    trackError,
    trackPurchase,
    trackSubscribe,
    trackAIAssistantUsed,
    trackDemoStarted,
    trackSignupStarted,
    trackSignupCompleted,
    trackAddToCart,
    trackBeginCheckout,
    setUserId,
    setUserProperties,
    enableDebugMode,
    disableDebugMode,
  };
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
