"use client"

import { useState, useEffect, useCallback } from 'react'

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  
  // Custom metrics
  pageLoadTime: number | null
  domContentLoaded: number | null
  resourceLoadTime: number | null
  
  // Memory usage
  memoryUsage: {
    usedJSHeapSize: number | null
    totalJSHeapSize: number | null
    jsHeapSizeLimit: number | null
  }
  
  // Network info
  connection: {
    effectiveType: string | null
    downlink: number | null
    rtt: number | null
  }
}

interface PerformanceObserver {
  disconnect: () => void
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    pageLoadTime: null,
    domContentLoaded: null,
    resourceLoadTime: null,
    memoryUsage: {
      usedJSHeapSize: null,
      totalJSHeapSize: null,
      jsHeapSizeLimit: null,
    },
    connection: {
      effectiveType: null,
      downlink: null,
      rtt: null,
    },
  })

  const [isSupported, setIsSupported] = useState(false)

  // Check if Performance API is supported
  useEffect(() => {
    setIsSupported(
      typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window
    )
  }, [])

  // Measure Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    if (!isSupported) return

    const observers: PerformanceObserver[] = []

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        startTime: number
      }
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    observers.push(lcpObserver)

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })
    observers.push(fidObserver)

    // CLS - Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          setMetrics(prev => ({ ...prev, cls: clsValue }))
        }
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    observers.push(clsObserver)

    // FCP - First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
      })
    })
    fcpObserver.observe({ entryTypes: ['paint'] })
    observers.push(fcpObserver)

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [isSupported])

  // Measure page load metrics
  const measurePageLoadMetrics = useCallback(() => {
    if (!isSupported) return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        resourceLoadTime: navigation.loadEventEnd - navigation.requestStart,
      }))
    }
  }, [isSupported])

  // Get memory usage
  const getMemoryUsage = useCallback(() => {
    if (!isSupported || !('memory' in performance)) return

    const memory = (performance as any).memory
    setMetrics(prev => ({
      ...prev,
      memoryUsage: {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      },
    }))
  }, [isSupported])

  // Get network information
  const getNetworkInfo = useCallback(() => {
    if (!isSupported || !('connection' in navigator)) return

    const connection = (navigator as any).connection
    setMetrics(prev => ({
      ...prev,
      connection: {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      },
    }))
  }, [isSupported])

  // Start monitoring
  useEffect(() => {
    if (!isSupported) return

    const cleanup = measureCoreWebVitals()
    
    // Measure page load metrics after page load
    if (document.readyState === 'complete') {
      measurePageLoadMetrics()
      getMemoryUsage()
      getNetworkInfo()
    } else {
      window.addEventListener('load', () => {
        measurePageLoadMetrics()
        getMemoryUsage()
        getNetworkInfo()
      })
    }

    return cleanup
  }, [isSupported, measureCoreWebVitals, measurePageLoadMetrics, getMemoryUsage, getNetworkInfo])

  // Performance score calculation
  const getPerformanceScore = useCallback(() => {
    if (!metrics.lcp || !metrics.fid || !metrics.cls) return null

    let score = 100

    // LCP scoring (0-100)
    if (metrics.lcp > 4000) score -= 30
    else if (metrics.lcp > 2500) score -= 15

    // FID scoring (0-100)
    if (metrics.fid > 300) score -= 30
    else if (metrics.fid > 100) score -= 15

    // CLS scoring (0-100)
    if (metrics.cls > 0.25) score -= 30
    else if (metrics.cls > 0.1) score -= 15

    return Math.max(0, score)
  }, [metrics])

  // Performance recommendations
  const getRecommendations = useCallback(() => {
    const recommendations: string[] = []

    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Optimize images and reduce LCP')
    }

    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Reduce JavaScript execution time')
    }

    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Fix layout shifts and add image dimensions')
    }

    if (metrics.pageLoadTime && metrics.pageLoadTime > 3000) {
      recommendations.push('Optimize page load time')
    }

    return recommendations
  }, [metrics])

  // Log performance data (for debugging)
  const logPerformanceData = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics')
      console.log('Core Web Vitals:', {
        LCP: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
        FID: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
        CLS: metrics.cls ? metrics.cls.toFixed(3) : 'N/A',
        FCP: metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
      })
      console.log('Page Load:', {
        'Page Load Time': metrics.pageLoadTime ? `${metrics.pageLoadTime.toFixed(2)}ms` : 'N/A',
        'DOM Content Loaded': metrics.domContentLoaded ? `${metrics.domContentLoaded.toFixed(2)}ms` : 'N/A',
        'TTFB': metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
      })
      console.log('Memory Usage:', metrics.memoryUsage)
      console.log('Network Info:', metrics.connection)
      console.log('Performance Score:', getPerformanceScore())
      console.log('Recommendations:', getRecommendations())
      console.groupEnd()
    }
  }, [metrics, getPerformanceScore, getRecommendations])

  return {
    metrics,
    isSupported,
    performanceScore: getPerformanceScore(),
    recommendations: getRecommendations(),
    logPerformanceData,
  }
}
