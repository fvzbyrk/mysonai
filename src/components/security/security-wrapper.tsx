'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSecurity } from '@/hooks/useSecurity';
import { SecurityMonitor } from './security-monitor';

interface SecurityContextType {
  securityScore: number;
  threats: any[];
  isSecure: boolean;
  securityEvents: any[];
  rateLimitStatus: any;
  suspiciousActivity: any[];
  securityHeaders: any;
  cspViolations: any[];
  xssAttempts: any[];
  csrfAttempts: any[];
  injectionAttempts: any[];
  bruteForceAttempts: any[];
  botDetection: any;
  geoLocation: any;
  deviceFingerprint: any;
  sessionSecurity: any;
  addSecurityEvent: (type: string, severity: string, message: string, details: any) => void;
  addSuspiciousActivity: (type: string, description: string, severity: string, details: any) => void;
  blockThreat: (threatId: string) => void;
  clearSecurityEvents: () => void;
  updateSecurityScore: () => void;
  getSecurityReport: () => any;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: ReactNode }) {
  const security = useSecurity();

  return (
    <SecurityContext.Provider value={security}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurityContext() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
}

interface SecurityWrapperProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
  enableAlerts?: boolean;
  enableBlocking?: boolean;
}

export function SecurityWrapper({ 
  children,
  enableMonitoring = true,
  enableAlerts = true,
  enableBlocking = true
}: SecurityWrapperProps) {
  return (
    <SecurityProvider>
      {children}
      {enableMonitoring && (
        <SecurityMonitor 
          enableAlerts={enableAlerts}
          enableBlocking={enableBlocking}
        />
      )}
    </SecurityProvider>
  );
}
