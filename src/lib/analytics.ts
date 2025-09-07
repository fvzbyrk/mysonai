'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

// Analytics events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'MySonAI',
        ...properties
      })
    }

    // Console log for development
    console.log('Analytics Event:', eventName, properties)
  }
}

// Page view tracking
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        ...properties
      })
    }

    console.log('Page View:', pageName, properties)
  }
}

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: conversionType,
        value: value,
        currency: currency || 'TRY'
      })
    }

    console.log('Conversion:', conversionType, value, currency)
  }
}

// Usage tracking
export const trackUsage = (action: string, plan: string, usage?: Record<string, any>) => {
  trackEvent('usage_action', {
    action,
    plan,
    ...usage
  })
}

// Plan upgrade tracking
export const trackPlanUpgrade = (fromPlan: string, toPlan: string, value?: number) => {
  trackConversion('plan_upgrade', value, 'TRY')
  trackEvent('plan_upgrade', {
    from_plan: fromPlan,
    to_plan: toPlan,
    value: value
  })
}

// Subscription events
export const trackSubscriptionEvent = (event: string, plan: string, properties?: Record<string, any>) => {
  trackEvent('subscription_event', {
    event,
    plan,
    ...properties
  })
}

// AI Assistant usage tracking
export const trackAIAssistantUsage = (assistantId: string, action: string, plan: string) => {
  trackUsage('ai_assistant_usage', plan, {
    assistant_id: assistantId,
    action
  })
}

// Error tracking
export const trackError = (error: string, context?: string) => {
  trackEvent('error', {
    error_message: error,
    context: context || 'unknown'
  })
}

// Custom hook for automatic tracking
export function useAnalytics() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Track user login
      trackEvent('user_login', {
        user_id: user.id,
        plan: user.plan,
        signup_date: user.createdAt
      })
    }
  }, [user])

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackUsage,
    trackPlanUpgrade,
    trackSubscriptionEvent,
    trackAIAssistantUsage,
    trackError
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
