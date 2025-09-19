'use client';

import { useEffect, useState, useRef } from 'react';
import { useAnalyticsContext } from '@/components/analytics/analytics-provider';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  domContentLoaded: number;
  windowLoad: number;
}

interface PerformanceMonitorProps {
  children: React.ReactNode;
  reportMetrics?: boolean;
  threshold?: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
  };
}

export function PerformanceMonitor({
  children,
  reportMetrics = true,
  threshold = {
    fcp: 1800, // 1.8s
    lcp: 2500, // 2.5s
    fid: 100, // 100ms
    cls: 0.1, // 0.1
  },
}: PerformanceMonitorProps) {
  const { trackEvent } = useAnalyticsContext();
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!isMonitoring || !reportMetrics) {
      return;
    }

    // Monitor Core Web Vitals
    const monitorCoreWebVitals = () => {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(
            prev =>
              ({
                ...prev,
                fcp: fcpEntry.startTime,
              }) as PerformanceMetrics
          );
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(
            prev =>
              ({
                ...prev,
                lcp: lastEntry.startTime,
              }) as PerformanceMetrics
          );
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(
              prev =>
                ({
                  ...prev,
                  fid,
                }) as PerformanceMetrics
            );
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(
              prev =>
                ({
                  ...prev,
                  cls: clsValue,
                }) as PerformanceMetrics
            );
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    };

    // Monitor page load times
    const monitorPageLoad = () => {
      const handleLoad = () => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        const domContentLoaded =
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const windowLoad = navigation.loadEventEnd - navigation.loadEventStart;

        setMetrics(
          prev =>
            ({
              ...prev,
              domContentLoaded,
              windowLoad,
            }) as PerformanceMetrics
        );
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    };

    // Monitor Time to First Byte
    const monitorTTFB = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const ttfb = navigation.responseStart - navigation.requestStart;

      setMetrics(
        prev =>
          ({
            ...prev,
            ttfb,
          }) as PerformanceMetrics
      );
    };

    const cleanup1 = monitorCoreWebVitals();
    const cleanup2 = monitorPageLoad();
    monitorTTFB();

    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, [isMonitoring, reportMetrics]);

  // Report metrics when they change
  useEffect(() => {
    if (!metrics || !reportMetrics) {
      return;
    }

    const reportPerformanceMetrics = () => {
      // Check if metrics meet thresholds
      const performanceIssues = [];

      if (metrics.fcp > threshold.fcp) {
        performanceIssues.push(`FCP: ${metrics.fcp.toFixed(2)}ms (threshold: ${threshold.fcp}ms)`);
      }

      if (metrics.lcp > threshold.lcp) {
        performanceIssues.push(`LCP: ${metrics.lcp.toFixed(2)}ms (threshold: ${threshold.lcp}ms)`);
      }

      if (metrics.fid > threshold.fid) {
        performanceIssues.push(`FID: ${metrics.fid.toFixed(2)}ms (threshold: ${threshold.fid}ms)`);
      }

      if (metrics.cls > threshold.cls) {
        performanceIssues.push(`CLS: ${metrics.cls.toFixed(3)} (threshold: ${threshold.cls})`);
      }

      // Track performance metrics
      trackEvent({
        event_name: 'performance_metrics',
        event_category: 'performance',
        event_label: 'core_web_vitals',
        custom_parameters: {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          ttfb: metrics.ttfb,
          dom_content_loaded: metrics.domContentLoaded,
          window_load: metrics.windowLoad,
          performance_score: calculatePerformanceScore(metrics),
          issues: performanceIssues,
        },
      });

      // Track performance issues
      if (performanceIssues.length > 0) {
        trackEvent({
          event_name: 'performance_issues',
          event_category: 'performance',
          event_label: 'threshold_exceeded',
          custom_parameters: {
            issues: performanceIssues,
            severity: performanceIssues.length > 2 ? 'high' : 'medium',
          },
        });
      }
    };

    reportPerformanceMetrics();
  }, [metrics, reportMetrics, threshold, trackEvent]);

  // Calculate performance score
  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;

    // FCP scoring (0-100)
    if (metrics.fcp > 3000) {
      score -= 30;
    } else if (metrics.fcp > 1800) {
      score -= 15;
    }

    // LCP scoring (0-100)
    if (metrics.lcp > 4000) {
      score -= 30;
    } else if (metrics.lcp > 2500) {
      score -= 15;
    }

    // FID scoring (0-100)
    if (metrics.fid > 300) {
      score -= 20;
    } else if (metrics.fid > 100) {
      score -= 10;
    }

    // CLS scoring (0-100)
    if (metrics.cls > 0.25) {
      score -= 20;
    } else if (metrics.cls > 0.1) {
      score -= 10;
    }

    return Math.max(0, score);
  };

  // Monitor resource loading
  useEffect(() => {
    if (!reportMetrics) {
      return;
    }

    const monitorResources = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);

      if (slowResources.length > 0) {
        trackEvent({
          event_name: 'slow_resources',
          event_category: 'performance',
          event_label: 'resource_loading',
          custom_parameters: {
            slow_resources: slowResources.map(resource => ({
              name: resource.name,
              duration: resource.duration,
              size: (resource as any).transferSize || 0,
            })),
          },
        });
      }
    };

    // Monitor after page load
    const timer = setTimeout(monitorResources, 2000);
    return () => clearTimeout(timer);
  }, [reportMetrics, trackEvent]);

  return <>{children}</>;
}

// Performance optimization utilities
export class PerformanceUtils {
  // Debounce function
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }

  // Throttle function
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Preload critical resources
  static preloadResource(href: string, as: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }

  // Prefetch resources
  static prefetchResource(href: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  // Optimize images
  static optimizeImageSrc(src: string, width?: number, quality: number = 75): string {
    if (src.startsWith('data:') || src.startsWith('blob:')) {
      return src;
    }

    const params = new URLSearchParams();
    if (width) {
      params.set('w', width.toString());
    }
    params.set('q', quality.toString());
    params.set('f', 'webp');

    return `${src}?${params.toString()}`;
  }
}
