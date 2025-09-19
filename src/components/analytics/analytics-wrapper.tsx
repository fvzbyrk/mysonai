'use client';

import { AnalyticsProvider } from './analytics-provider';
import { ScrollTracker } from './scroll-tracker';
import { TimeTracker } from './time-tracker';
import { ErrorTracker } from './error-tracker';
import { AnalyticsDashboard } from './analytics-dashboard';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

export function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  return (
    <AnalyticsProvider>
      <ErrorTracker>
        <ScrollTracker>
          <TimeTracker>{children}</TimeTracker>
        </ScrollTracker>
      </ErrorTracker>
    </AnalyticsProvider>
  );
}
