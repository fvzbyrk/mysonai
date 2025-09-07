"use client"

import { useState, useEffect, useCallback } from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  functional: boolean
}

interface CookieConsentHook {
  preferences: CookiePreferences
  hasConsented: boolean
  isVisible: boolean
  acceptAll: () => void
  rejectAll: () => void
  updatePreferences: (preferences: CookiePreferences) => void
  showBanner: () => void
  hideBanner: () => void
  resetConsent: () => void
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  functional: false,
}

const STORAGE_KEY = 'mysonai_cookie_consent'

export function useCookieConsent(): CookieConsentHook {
  const { enabled: cookiesEnabled } = useFeatureFlag('cookies')
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)
  const [hasConsented, setHasConsented] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedPreferences = JSON.parse(stored)
        setPreferences(parsedPreferences)
        setHasConsented(true)
        
        // Update Google Analytics consent
        updateGoogleAnalyticsConsent(parsedPreferences)
      } else if (cookiesEnabled) {
        // Show banner if no consent given and cookies are enabled
        setIsVisible(true)
      }
    } catch (error) {
      console.error('Failed to load cookie preferences:', error)
    }
  }, [cookiesEnabled])

  // Update Google Analytics consent
  const updateGoogleAnalyticsConsent = useCallback((prefs: CookiePreferences) => {
    if (typeof window === 'undefined' || !window.gtag) return

    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.analytics ? 'granted' : 'denied',
      functionality_storage: prefs.functional ? 'granted' : 'denied',
      personalization_storage: prefs.functional ? 'granted' : 'denied',
    })
  }, [])

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const allPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
    }
    
    setPreferences(allPreferences)
    setHasConsented(true)
    setIsVisible(false)
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allPreferences))
    
    // Update Google Analytics
    updateGoogleAnalyticsConsent(allPreferences)
  }, [updateGoogleAnalyticsConsent])

  // Reject all non-essential cookies
  const rejectAll = useCallback(() => {
    const minimalPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
    }
    
    setPreferences(minimalPreferences)
    setHasConsented(true)
    setIsVisible(false)
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalPreferences))
    
    // Update Google Analytics
    updateGoogleAnalyticsConsent(minimalPreferences)
  }, [updateGoogleAnalyticsConsent])

  // Update specific preferences
  const updatePreferences = useCallback((newPreferences: CookiePreferences) => {
    setPreferences(newPreferences)
    setHasConsented(true)
    setIsVisible(false)
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences))
    
    // Update Google Analytics
    updateGoogleAnalyticsConsent(newPreferences)
  }, [updateGoogleAnalyticsConsent])

  // Show consent banner
  const showBanner = useCallback(() => {
    if (cookiesEnabled) {
      setIsVisible(true)
    }
  }, [cookiesEnabled])

  // Hide consent banner
  const hideBanner = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Reset consent (for testing or user request)
  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setPreferences(DEFAULT_PREFERENCES)
    setHasConsented(false)
    
    if (cookiesEnabled) {
      setIsVisible(true)
    }
    
    // Reset Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
      })
    }
  }, [cookiesEnabled])

  // Check if specific cookie type is allowed
  const isAllowed = useCallback((type: keyof CookiePreferences): boolean => {
    return preferences[type]
  }, [preferences])

  // Get cookie statistics
  const getCookieStats = useCallback(() => {
    const stats = {
      total: 0,
      essential: 0,
      analytics: 0,
      functional: 0,
    }

    if (typeof document === 'undefined') return stats

    // Count cookies by type (simplified)
    const cookies = document.cookie.split(';')
    stats.total = cookies.length

    // This is a simplified approach - in reality, you'd need to map cookies to their types
    cookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim()
      if (name.includes('_ga') || name.includes('analytics')) {
        stats.analytics++
      } else if (name.includes('pref') || name.includes('theme')) {
        stats.functional++
      } else {
        stats.essential++
      }
    })

    return stats
  }, [])

  // Initialize Google Analytics consent
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return

    // Set default consent state
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    })

    // Update based on current preferences
    updateGoogleAnalyticsConsent(preferences)
  }, [preferences, updateGoogleAnalyticsConsent])

  return {
    preferences,
    hasConsented,
    isVisible,
    acceptAll,
    rejectAll,
    updatePreferences,
    showBanner,
    hideBanner,
    resetConsent,
    isAllowed,
    getCookieStats,
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
