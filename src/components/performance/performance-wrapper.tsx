'use client';

import { PerformanceMonitor } from './performance-monitor';
import { DynamicImport } from './dynamic-import';
import { OptimizedImage } from './optimized-image';
import { VirtualScroll, InfiniteScroll, VirtualGrid } from './virtual-scroll';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
  enableVirtualScrolling?: boolean;
  enableImageOptimization?: boolean;
  enableCodeSplitting?: boolean;
}

export function PerformanceWrapper({
  children,
  enableMonitoring = true,
  enableVirtualScrolling = false,
  enableImageOptimization = true,
  enableCodeSplitting = true,
}: PerformanceWrapperProps) {
  return (
    <PerformanceMonitor reportMetrics={enableMonitoring}>
      <DynamicImport>{children}</DynamicImport>
    </PerformanceMonitor>
  );
}

// Export all performance components
export {
  PerformanceMonitor,
  DynamicImport,
  OptimizedImage,
  VirtualScroll,
  InfiniteScroll,
  VirtualGrid,
};
