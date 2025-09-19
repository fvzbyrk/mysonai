// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      this.metrics.set(label, performance.now());
    }
  }

  endTiming(label: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = this.metrics.get(label);
      if (startTime !== undefined) {
        const duration = performance.now() - startTime;
        this.metrics.delete(label);
        return duration;
      }
    }
    return null;
  }

  measureWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Measure Core Web Vitals
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureFCP();
    this.measureTTFB();
  }

  private measureLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private measureFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private measureCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private measureFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FCP:', entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  private measureTTFB(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log('TTFB:', entry.responseStart - entry.requestStart);
          }
        });
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Memory usage monitoring
  measureMemoryUsage(): void {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory Usage:', {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      });
    }
  }

  // Network monitoring
  measureNetworkPerformance(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            console.log('Resource Load Time:', {
              name: entry.name,
              duration: entry.duration,
              transferSize: (entry as any).transferSize
            });
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }
}

// Hook for React components
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();

  return {
    startTiming: monitor.startTiming.bind(monitor),
    endTiming: monitor.endTiming.bind(monitor),
    measureWebVitals: monitor.measureWebVitals.bind(monitor),
    measureMemoryUsage: monitor.measureMemoryUsage.bind(monitor),
    measureNetworkPerformance: monitor.measureNetworkPerformance.bind(monitor)
  };
}

