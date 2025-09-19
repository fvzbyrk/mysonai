'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Security utilities and hooks
export function useSecurity() {
  const [securityScore, setSecurityScore] = useState(100);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [isSecure, setIsSecure] = useState(true);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus>({
    requests: 0,
    limit: 100,
    resetTime: Date.now() + 3600000, // 1 hour
    blocked: false,
  });
  const [suspiciousActivity, setSuspiciousActivity] = useState<SuspiciousActivity[]>([]);
  const [securityHeaders, setSecurityHeaders] = useState<SecurityHeaders>({});
  const [cspViolations, setCspViolations] = useState<CSPViolation[]>([]);
  const [xssAttempts, setXssAttempts] = useState<XSSAttempt[]>([]);
  const [csrfAttempts, setCsrfAttempts] = useState<CSRFAttempt[]>([]);
  const [injectionAttempts, setInjectionAttempts] = useState<InjectionAttempt[]>([]);
  const [bruteForceAttempts, setBruteForceAttempts] = useState<BruteForceAttempt[]>([]);
  const [botDetection, setBotDetection] = useState<BotDetection>({
    isBot: false,
    confidence: 0,
    botType: null,
    userAgent: navigator.userAgent,
  });
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState<DeviceFingerprint | null>(null);
  const [sessionSecurity, setSessionSecurity] = useState<SessionSecurity>({
    isValid: true,
    expiresAt: Date.now() + 3600000,
    ipAddress: '',
    userAgent: navigator.userAgent,
    lastActivity: Date.now(),
  });

  // Security threat types
  interface SecurityThreat {
    id: string;
    type: 'xss' | 'csrf' | 'injection' | 'brute_force' | 'bot' | 'rate_limit' | 'suspicious';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    timestamp: number;
    source: string;
    blocked: boolean;
    details: any;
  }

  interface SecurityEvent {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: number;
    source: string;
    details: any;
  }

  interface RateLimitStatus {
    requests: number;
    limit: number;
    resetTime: number;
    blocked: boolean;
  }

  interface SuspiciousActivity {
    id: string;
    type: string;
    description: string;
    timestamp: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    details: any;
  }

  interface SecurityHeaders {
    [key: string]: string;
  }

  interface CSPViolation {
    id: string;
    violatedDirective: string;
    blockedURI: string;
    sourceFile: string;
    lineNumber: number;
    columnNumber: number;
    timestamp: number;
  }

  interface XSSAttempt {
    id: string;
    payload: string;
    source: string;
    timestamp: number;
    blocked: boolean;
  }

  interface CSRFAttempt {
    id: string;
    token: string;
    source: string;
    timestamp: number;
    blocked: boolean;
  }

  interface InjectionAttempt {
    id: string;
    type: 'sql' | 'nosql' | 'command' | 'ldap';
    payload: string;
    source: string;
    timestamp: number;
    blocked: boolean;
  }

  interface BruteForceAttempt {
    id: string;
    target: string;
    attempts: number;
    source: string;
    timestamp: number;
    blocked: boolean;
  }

  interface BotDetection {
    isBot: boolean;
    confidence: number;
    botType: string | null;
    userAgent: string;
  }

  interface GeoLocation {
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }

  interface DeviceFingerprint {
    canvas: string;
    webgl: string;
    audio: string;
    fonts: string[];
    screen: string;
    timezone: string;
    language: string;
    platform: string;
  }

  interface SessionSecurity {
    isValid: boolean;
    expiresAt: number;
    ipAddress: string;
    userAgent: string;
    lastActivity: number;
  }

  // Initialize security monitoring
  useEffect(() => {
    // Monitor security headers
    const checkSecurityHeaders = () => {
      const headers: SecurityHeaders = {};

      // Check for security headers in meta tags
      const metaTags = document.querySelectorAll('meta[http-equiv]');
      metaTags.forEach(tag => {
        const httpEquiv = tag.getAttribute('http-equiv');
        const content = tag.getAttribute('content');
        if (httpEquiv && content) {
          headers[httpEquiv] = content;
        }
      });

      setSecurityHeaders(headers);
    };

    // Monitor CSP violations
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      const violation: CSPViolation = {
        id: Math.random().toString(36).substr(2, 9),
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
        timestamp: Date.now(),
      };

      setCspViolations(prev => [...prev, violation]);
      addSecurityEvent('csp_violation', 'medium', 'CSP violation detected', violation);
    };

    // Monitor XSS attempts
    const handleXSSAttempt = (payload: string, source: string) => {
      const attempt: XSSAttempt = {
        id: Math.random().toString(36).substr(2, 9),
        payload,
        source,
        timestamp: Date.now(),
        blocked: true,
      };

      setXssAttempts(prev => [...prev, attempt]);
      addSecurityEvent('xss_attempt', 'high', 'XSS attempt detected', attempt);
    };

    // Monitor CSRF attempts
    const handleCSRFAttempt = (token: string, source: string) => {
      const attempt: CSRFAttempt = {
        id: Math.random().toString(36).substr(2, 9),
        token,
        source,
        timestamp: Date.now(),
        blocked: true,
      };

      setCsrfAttempts(prev => [...prev, attempt]);
      addSecurityEvent('csrf_attempt', 'high', 'CSRF attempt detected', attempt);
    };

    // Monitor injection attempts
    const handleInjectionAttempt = (type: string, payload: string, source: string) => {
      const attempt: InjectionAttempt = {
        id: Math.random().toString(36).substr(2, 9),
        type: type as any,
        payload,
        source,
        timestamp: Date.now(),
        blocked: true,
      };

      setInjectionAttempts(prev => [...prev, attempt]);
      addSecurityEvent('injection_attempt', 'critical', 'Injection attempt detected', attempt);
    };

    // Monitor brute force attempts
    const handleBruteForceAttempt = (target: string, attempts: number, source: string) => {
      const attempt: BruteForceAttempt = {
        id: Math.random().toString(36).substr(2, 9),
        target,
        attempts,
        source,
        timestamp: Date.now(),
        blocked: true,
      };

      setBruteForceAttempts(prev => [...prev, attempt]);
      addSecurityEvent('brute_force_attempt', 'high', 'Brute force attempt detected', attempt);
    };

    // Monitor bot detection
    const detectBot = () => {
      const userAgent = navigator.userAgent;
      const botPatterns = [
        /bot/i,
        /crawler/i,
        /spider/i,
        /scraper/i,
        /curl/i,
        /wget/i,
        /python/i,
        /java/i,
        /php/i,
        /ruby/i,
        /perl/i,
        /go/i,
      ];

      const isBot = botPatterns.some(pattern => pattern.test(userAgent));
      const confidence = isBot ? 0.8 : 0.2;
      const botType = isBot ? 'automated' : null;

      setBotDetection({
        isBot,
        confidence,
        botType,
        userAgent,
      });

      if (isBot) {
        addSecurityEvent('bot_detected', 'medium', 'Bot detected', { userAgent, confidence });
      }
    };

    // Monitor rate limiting
    const checkRateLimit = () => {
      const now = Date.now();
      if (now > rateLimitStatus.resetTime) {
        setRateLimitStatus(prev => ({
          ...prev,
          requests: 0,
          resetTime: now + 3600000,
          blocked: false,
        }));
      }
    };

    // Monitor suspicious activity
    const monitorSuspiciousActivity = () => {
      // Check for rapid clicks
      let clickCount = 0;
      const clickThreshold = 10;
      const timeWindow = 5000; // 5 seconds

      const handleClick = () => {
        clickCount++;
        if (clickCount > clickThreshold) {
          addSuspiciousActivity('rapid_clicks', 'Rapid clicking detected', 'medium', {
            clickCount,
          });
        }
      };

      // Check for rapid scrolling
      let scrollCount = 0;
      const scrollThreshold = 20;

      const handleScroll = () => {
        scrollCount++;
        if (scrollCount > scrollThreshold) {
          addSuspiciousActivity('rapid_scrolling', 'Rapid scrolling detected', 'low', {
            scrollCount,
          });
        }
      };

      // Check for rapid form submissions
      let formSubmitCount = 0;
      const formSubmitThreshold = 5;

      const handleFormSubmit = () => {
        formSubmitCount++;
        if (formSubmitCount > formSubmitThreshold) {
          addSuspiciousActivity(
            'rapid_form_submissions',
            'Rapid form submissions detected',
            'high',
            { formSubmitCount }
          );
        }
      };

      document.addEventListener('click', handleClick);
      document.addEventListener('scroll', handleScroll);
      document.addEventListener('submit', handleFormSubmit);

      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('scroll', handleScroll);
        document.removeEventListener('submit', handleFormSubmit);
      };
    };

    // Initialize monitoring
    checkSecurityHeaders();
    detectBot();
    checkRateLimit();

    // Set up event listeners
    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    const cleanup = monitorSuspiciousActivity();

    // Set up intervals
    const interval = setInterval(() => {
      checkRateLimit();
      updateSecurityScore();
    }, 1000);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
      cleanup();
      clearInterval(interval);
    };
  }, [rateLimitStatus.resetTime]);

  // Add security event
  const addSecurityEvent = useCallback(
    (
      type: string,
      severity: 'low' | 'medium' | 'high' | 'critical',
      message: string,
      details: any
    ) => {
      const event: SecurityEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        severity,
        message,
        timestamp: Date.now(),
        source: window.location.href,
        details,
      };

      setSecurityEvents(prev => [...prev, event]);

      // Update security score
      updateSecurityScore();
    },
    []
  );

  // Add suspicious activity
  const addSuspiciousActivity = useCallback(
    (
      type: string,
      description: string,
      severity: 'low' | 'medium' | 'high' | 'critical',
      details: any
    ) => {
      const activity: SuspiciousActivity = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        description,
        timestamp: Date.now(),
        severity,
        details,
      };

      setSuspiciousActivity(prev => [...prev, activity]);
      addSecurityEvent('suspicious_activity', severity, description, details);
    },
    [addSecurityEvent]
  );

  // Update security score
  const updateSecurityScore = useCallback(() => {
    let score = 100;

    // Deduct points for security events
    securityEvents.forEach(event => {
      switch (event.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'low':
          score -= 5;
          break;
      }
    });

    // Deduct points for threats
    threats.forEach(threat => {
      switch (threat.severity) {
        case 'critical':
          score -= 25;
          break;
        case 'high':
          score -= 20;
          break;
        case 'medium':
          score -= 15;
          break;
        case 'low':
          score -= 10;
          break;
      }
    });

    // Deduct points for rate limiting
    if (rateLimitStatus.blocked) {
      score -= 15;
    }

    // Deduct points for bot detection
    if (botDetection.isBot) {
      score -= 10;
    }

    // Deduct points for suspicious activity
    suspiciousActivity.forEach(activity => {
      switch (activity.severity) {
        case 'critical':
          score -= 15;
          break;
        case 'high':
          score -= 10;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 2;
          break;
      }
    });

    setSecurityScore(Math.max(0, score));
    setIsSecure(score >= 70);
  }, [securityEvents, threats, rateLimitStatus.blocked, botDetection.isBot, suspiciousActivity]);

  // Block threat
  const blockThreat = useCallback((threatId: string) => {
    setThreats(prev =>
      prev.map(threat => (threat.id === threatId ? { ...threat, blocked: true } : threat))
    );
  }, []);

  // Clear security events
  const clearSecurityEvents = useCallback(() => {
    setSecurityEvents([]);
    setThreats([]);
    setSuspiciousActivity([]);
    setCspViolations([]);
    setXssAttempts([]);
    setCsrfAttempts([]);
    setInjectionAttempts([]);
    setBruteForceAttempts([]);
  }, []);

  // Get security report
  const getSecurityReport = useCallback(() => {
    return {
      securityScore,
      isSecure,
      threats: threats.length,
      securityEvents: securityEvents.length,
      suspiciousActivity: suspiciousActivity.length,
      cspViolations: cspViolations.length,
      xssAttempts: xssAttempts.length,
      csrfAttempts: csrfAttempts.length,
      injectionAttempts: injectionAttempts.length,
      bruteForceAttempts: bruteForceAttempts.length,
      botDetection,
      rateLimitStatus,
      securityHeaders,
      sessionSecurity,
      geoLocation,
      deviceFingerprint,
    };
  }, [
    securityScore,
    isSecure,
    threats.length,
    securityEvents.length,
    suspiciousActivity.length,
    cspViolations.length,
    xssAttempts.length,
    csrfAttempts.length,
    injectionAttempts.length,
    bruteForceAttempts.length,
    botDetection,
    rateLimitStatus,
    securityHeaders,
    sessionSecurity,
    geoLocation,
    deviceFingerprint,
  ]);

  return {
    // State
    securityScore,
    threats,
    isSecure,
    securityEvents,
    rateLimitStatus,
    suspiciousActivity,
    securityHeaders,
    cspViolations,
    xssAttempts,
    csrfAttempts,
    injectionAttempts,
    bruteForceAttempts,
    botDetection,
    geoLocation,
    deviceFingerprint,
    sessionSecurity,

    // Actions
    addSecurityEvent,
    addSuspiciousActivity,
    blockThreat,
    clearSecurityEvents,
    updateSecurityScore,
    getSecurityReport,
  };
}
