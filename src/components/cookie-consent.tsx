"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FeatureGuard } from '@/components/feature-guard'
import { Cookie, Settings, Shield, BarChart3, Eye, X, Check } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Locale, getLocaleFromPathname } from '@/lib/i18n'
import { t } from '@/lib/translations'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  functional: boolean
}

interface CookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void
  onReject?: () => void
}

export function CookieConsent({ onAccept, onReject }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    functional: false,
  })

  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'tr'
  const isTurkish = locale === 'tr'

  // Check if user has already made a choice
  useEffect(() => {
    const hasConsented = localStorage.getItem('mysonai_cookie_consent')
    if (!hasConsented) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
    }
    
    setPreferences(allPreferences)
    localStorage.setItem('mysonai_cookie_consent', JSON.stringify(allPreferences))
    setIsVisible(false)
    onAccept?.(allPreferences)
    
    // Enable Google Analytics if accepted
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      })
    }
  }

  const handleRejectAll = () => {
    const minimalPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
    }
    
    setPreferences(minimalPreferences)
    localStorage.setItem('mysonai_cookie_consent', JSON.stringify(minimalPreferences))
    setIsVisible(false)
    onReject?.()
    
    // Disable Google Analytics if rejected
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  }

  const handleSavePreferences = () => {
    localStorage.setItem('mysonai_cookie_consent', JSON.stringify(preferences))
    setIsVisible(false)
    setShowSettings(false)
    onAccept?.(preferences)
    
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.analytics ? 'granted' : 'denied',
      })
    }
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <FeatureGuard feature="cookies">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="bg-white/95 backdrop-blur-md border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isTurkish ? 'Çerez Onayı' : 'Cookie Consent'}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              
              {/* Introduction */}
              <div className="text-gray-700">
                <p className="mb-4">
                  {isTurkish 
                    ? 'Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz. Çerez tercihlerinizi aşağıdan yönetebilirsiniz.'
                    : 'We use cookies on our website to improve user experience. You can manage your cookie preferences below.'
                  }
                </p>
                <p className="text-sm text-gray-600">
                  {isTurkish 
                    ? 'Gerekli çerezler web sitesinin çalışması için zorunludur ve devre dışı bırakılamaz.'
                    : 'Essential cookies are required for the website to function and cannot be disabled.'
                  }
                </p>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4">
                
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {isTurkish ? 'Gerekli Çerezler' : 'Essential Cookies'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isTurkish 
                          ? 'Web sitesinin temel işlevleri için gerekli'
                          : 'Required for basic website functions'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      {isTurkish ? 'Her zaman aktif' : 'Always active'}
                    </span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {isTurkish ? 'Analitik Çerezler' : 'Analytics Cookies'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isTurkish 
                          ? 'Web sitesi kullanımını analiz etmek için'
                          : 'To analyze website usage'
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={preferences.analytics ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('analytics')}
                    className={preferences.analytics ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {preferences.analytics 
                      ? (isTurkish ? 'Aktif' : 'Active')
                      : (isTurkish ? 'Pasif' : 'Inactive')
                    }
                  </Button>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {isTurkish ? 'Fonksiyonel Çerezler' : 'Functional Cookies'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isTurkish 
                          ? 'Gelişmiş özellikler ve kişiselleştirme için'
                          : 'For advanced features and personalization'
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={preferences.functional ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('functional')}
                    className={preferences.functional ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {preferences.functional 
                      ? (isTurkish ? 'Aktif' : 'Active')
                      : (isTurkish ? 'Pasif' : 'Inactive')
                    }
                  </Button>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {isTurkish ? 'Detaylı Ayarlar' : 'Detailed Settings'}
                </Button>
                
                <div className="flex gap-3 sm:ml-auto">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    {isTurkish ? 'Sadece Gerekli' : 'Essential Only'}
                  </Button>
                  
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isTurkish ? 'Tümünü Kabul Et' : 'Accept All'}
                  </Button>
                </div>
              </div>

              {/* Detailed Settings */}
              {showSettings && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {isTurkish ? 'Detaylı Çerez Ayarları' : 'Detailed Cookie Settings'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {isTurkish ? 'Google Analytics' : 'Google Analytics'}
                      </span>
                      <Button
                        variant={preferences.analytics ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePreference('analytics')}
                        className={preferences.analytics ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {preferences.analytics ? 'ON' : 'OFF'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {isTurkish ? 'Kullanıcı Tercihleri' : 'User Preferences'}
                      </span>
                      <Button
                        variant={preferences.functional ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePreference('functional')}
                        className={preferences.functional ? "bg-purple-600 hover:bg-purple-700" : ""}
                      >
                        {preferences.functional ? 'ON' : 'OFF'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleSavePreferences}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isTurkish ? 'Tercihleri Kaydet' : 'Save Preferences'}
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Card>
      </div>
    </FeatureGuard>
  )
}
