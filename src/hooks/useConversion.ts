'use client';

import { useState, useEffect, useCallback } from 'react';

// Conversion tracking utilities
export function useConversion() {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([]);
  const [abTests, setAbTests] = useState<ABTest[]>([]);
  const [ctaPerformance, setCtaPerformance] = useState<CTAPerformance[]>([]);
  const [formAbandonment, setFormAbandonment] = useState<FormAbandonment[]>([]);
  const [cartAbandonment, setCartAbandonment] = useState<CartAbandonment[]>([]);
  const [exitIntent, setExitIntent] = useState<ExitIntent[]>([]);
  const [scrollDepth, setScrollDepth] = useState<number>(0);
  const [timeOnPage, setTimeOnPage] = useState<number>(0);
  const [bounceRate, setBounceRate] = useState<number>(0);
  const [goalCompletions, setGoalCompletions] = useState<GoalCompletion[]>([]);
  const [revenue, setRevenue] = useState<number>(0);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0);
  const [customerLifetimeValue, setCustomerLifetimeValue] = useState<number>(0);

  // Conversion types
  interface Conversion {
    id: string;
    type: 'signup' | 'purchase' | 'download' | 'contact' | 'demo' | 'newsletter' | 'trial';
    value: number;
    timestamp: number;
    source: string;
    medium: string;
    campaign: string;
    userAgent: string;
    referrer: string;
    sessionId: string;
    userId?: string;
    metadata: any;
  }

  interface FunnelStep {
    id: string;
    name: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
    dropOffRate: number;
    averageTime: number;
    nextStep?: string;
  }

  interface ABTest {
    id: string;
    name: string;
    description: string;
    status: 'draft' | 'running' | 'paused' | 'completed';
    startDate: number;
    endDate?: number;
    variants: ABTestVariant[];
    winner?: string;
    confidence: number;
    trafficAllocation: number;
  }

  interface ABTestVariant {
    id: string;
    name: string;
    description: string;
    traffic: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    isControl: boolean;
  }

  interface CTAPerformance {
    id: string;
    text: string;
    type: 'button' | 'link' | 'form' | 'modal';
    location: string;
    clicks: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    averagePosition: number;
    visibility: number;
    color: string;
    size: string;
    position: string;
  }

  interface FormAbandonment {
    id: string;
    formName: string;
    step: number;
    totalSteps: number;
    fields: string[];
    completedFields: string[];
    abandonedFields: string[];
    timeSpent: number;
    timestamp: number;
    userId?: string;
    sessionId: string;
  }

  interface CartAbandonment {
    id: string;
    userId?: string;
    sessionId: string;
    items: CartItem[];
    totalValue: number;
    timestamp: number;
    reason?: string;
    recoveryAttempted: boolean;
    recovered: boolean;
  }

  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }

  interface ExitIntent {
    id: string;
    page: string;
    timeOnPage: number;
    scrollDepth: number;
    actions: string[];
    timestamp: number;
    userId?: string;
    sessionId: string;
    triggered: boolean;
  }

  interface GoalCompletion {
    id: string;
    goalName: string;
    value: number;
    timestamp: number;
    source: string;
    medium: string;
    campaign: string;
    userId?: string;
    sessionId: string;
  }

  // Track conversion
  const trackConversion = useCallback((conversion: Omit<Conversion, 'id' | 'timestamp'>) => {
    const newConversion: Conversion = {
      ...conversion,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    
    setConversions(prev => [...prev, newConversion]);
    
    // Update conversion rate
    updateConversionRate();
    
    // Track goal completion
    trackGoalCompletion(conversion.type, conversion.value, conversion.source, conversion.medium, conversion.campaign);
    
    // Track revenue
    if (conversion.value > 0) {
      setRevenue(prev => prev + conversion.value);
    }
  }, []);

  // Track goal completion
  const trackGoalCompletion = useCallback((goalName: string, value: number, source: string, medium: string, campaign: string) => {
    const goalCompletion: GoalCompletion = {
      id: Math.random().toString(36).substr(2, 9),
      goalName,
      value,
      timestamp: Date.now(),
      source,
      medium,
      campaign,
      sessionId: Math.random().toString(36).substr(2, 9)
    };
    
    setGoalCompletions(prev => [...prev, goalCompletion]);
  }, []);

  // Track CTA performance
  const trackCTAClick = useCallback((ctaId: string, text: string, type: string, location: string) => {
    const existingCTA = ctaPerformance.find(cta => cta.id === ctaId);
    
    if (existingCTA) {
      setCtaPerformance(prev => prev.map(cta => 
        cta.id === ctaId 
          ? { ...cta, clicks: cta.clicks + 1 }
          : cta
      ));
    } else {
      const newCTA: CTAPerformance = {
        id: ctaId,
        text,
        type: type as any,
        location,
        clicks: 1,
        conversions: 0,
        conversionRate: 0,
        revenue: 0,
        averagePosition: 0,
        visibility: 0,
        color: '',
        size: '',
        position: ''
      };
      
      setCtaPerformance(prev => [...prev, newCTA]);
    }
  }, [ctaPerformance]);

  // Track form abandonment
  const trackFormAbandonment = useCallback((formName: string, step: number, totalSteps: number, fields: string[], completedFields: string[]) => {
    const abandonment: FormAbandonment = {
      id: Math.random().toString(36).substr(2, 9),
      formName,
      step,
      totalSteps,
      fields,
      completedFields,
      abandonedFields: fields.filter(field => !completedFields.includes(field)),
      timeSpent: Date.now() - (window as any).formStartTime || 0,
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substr(2, 9)
    };
    
    setFormAbandonment(prev => [...prev, abandonment]);
  }, []);

  // Track cart abandonment
  const trackCartAbandonment = useCallback((items: CartItem[], totalValue: number, reason?: string) => {
    const abandonment: CartAbandonment = {
      id: Math.random().toString(36).substr(2, 9),
      sessionId: Math.random().toString(36).substr(2, 9),
      items,
      totalValue,
      timestamp: Date.now(),
      reason,
      recoveryAttempted: false,
      recovered: false
    };
    
    setCartAbandonment(prev => [...prev, abandonment]);
  }, []);

  // Track exit intent
  const trackExitIntent = useCallback((page: string, timeOnPage: number, scrollDepth: number, actions: string[]) => {
    const exitIntent: ExitIntent = {
      id: Math.random().toString(36).substr(2, 9),
      page,
      timeOnPage,
      scrollDepth,
      actions,
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substr(2, 9),
      triggered: true
    };
    
    setExitIntent(prev => [...prev, exitIntent]);
  }, []);

  // Update conversion rate
  const updateConversionRate = useCallback(() => {
    const totalVisitors = 1000; // Mock data
    const totalConversions = conversions.length;
    const rate = (totalConversions / totalVisitors) * 100;
    setConversionRate(rate);
  }, [conversions.length]);

  // Update funnel steps
  const updateFunnelSteps = useCallback(() => {
    const steps: FunnelStep[] = [
      {
        id: '1',
        name: 'Ana Sayfa',
        visitors: 1000,
        conversions: 800,
        conversionRate: 80,
        dropOffRate: 20,
        averageTime: 45,
        nextStep: '2'
      },
      {
        id: '2',
        name: 'Demo Sayfası',
        visitors: 800,
        conversions: 400,
        conversionRate: 50,
        dropOffRate: 50,
        averageTime: 120,
        nextStep: '3'
      },
      {
        id: '3',
        name: 'Kayıt Formu',
        visitors: 400,
        conversions: 200,
        conversionRate: 50,
        dropOffRate: 50,
        averageTime: 180,
        nextStep: '4'
      },
      {
        id: '4',
        name: 'Ödeme',
        visitors: 200,
        conversions: 100,
        conversionRate: 50,
        dropOffRate: 50,
        averageTime: 300
      }
    ];
    
    setFunnelSteps(steps);
  }, []);

  // Get conversion insights
  const getConversionInsights = useCallback(() => {
    const insights = [];
    
    if (conversionRate < 2) {
      insights.push('Dönüşüm oranınız düşük. CTA\'ları ve formları optimize edin.');
    }
    
    if (formAbandonment.length > 0) {
      insights.push(`${formAbandonment.length} form terk edildi. Form alanlarını azaltın.`);
    }
    
    if (cartAbandonment.length > 0) {
      insights.push(`${cartAbandonment.length} sepet terk edildi. Ödeme sürecini basitleştirin.`);
    }
    
    if (exitIntent.length > 0) {
      insights.push(`${exitIntent.length} çıkış niyeti tespit edildi. Exit-intent popup\'ları ekleyin.`);
    }
    
    return insights;
  }, [conversionRate, formAbandonment.length, cartAbandonment.length, exitIntent.length]);

  // Get conversion recommendations
  const getConversionRecommendations = useCallback(() => {
    const recommendations = [];
    
    if (conversionRate < 5) {
      recommendations.push('CTA metinlerini daha etkili hale getirin');
      recommendations.push('Form alanlarını azaltın');
      recommendations.push('Güven işaretleri ekleyin');
      recommendations.push('Sosyal kanıt ekleyin');
    }
    
    if (formAbandonment.length > 0) {
      recommendations.push('Form alanlarını azaltın');
      recommendations.push('Progress bar ekleyin');
      recommendations.push('Otomatik kaydetme ekleyin');
    }
    
    if (cartAbandonment.length > 0) {
      recommendations.push('Ödeme sürecini basitleştirin');
      recommendations.push('Güven işaretleri ekleyin');
      recommendations.push('Fiyat şeffaflığı sağlayın');
    }
    
    return recommendations;
  }, [conversionRate, formAbandonment.length, cartAbandonment.length]);

  // Get conversion report
  const getConversionReport = useCallback(() => {
    return {
      conversions: conversions.length,
      conversionRate,
      revenue,
      averageOrderValue: revenue / Math.max(conversions.length, 1),
      customerLifetimeValue: revenue / Math.max(conversions.length, 1) * 2.5,
      funnelSteps,
      ctaPerformance,
      formAbandonment: formAbandonment.length,
      cartAbandonment: cartAbandonment.length,
      exitIntent: exitIntent.length,
      goalCompletions: goalCompletions.length,
      insights: getConversionInsights(),
      recommendations: getConversionRecommendations()
    };
  }, [
    conversions.length,
    conversionRate,
    revenue,
    funnelSteps,
    ctaPerformance,
    formAbandonment.length,
    cartAbandonment.length,
    exitIntent.length,
    goalCompletions.length,
    getConversionInsights,
    getConversionRecommendations
  ]);

  // Initialize conversion tracking
  useEffect(() => {
    updateConversionRate();
    updateFunnelSteps();
  }, [updateConversionRate, updateFunnelSteps]);

  return {
    // State
    conversions,
    conversionRate,
    funnelSteps,
    abTests,
    ctaPerformance,
    formAbandonment,
    cartAbandonment,
    exitIntent,
    scrollDepth,
    timeOnPage,
    bounceRate,
    goalCompletions,
    revenue,
    averageOrderValue,
    customerLifetimeValue,
    
    // Actions
    trackConversion,
    trackGoalCompletion,
    trackCTAClick,
    trackFormAbandonment,
    trackCartAbandonment,
    trackExitIntent,
    updateConversionRate,
    updateFunnelSteps,
    
    // Analytics
    getConversionInsights,
    getConversionRecommendations,
    getConversionReport
  };
}
