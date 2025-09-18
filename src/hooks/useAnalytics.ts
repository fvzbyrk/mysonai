'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 Event Types
export interface GA4Event {
  event_name: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Conversion Events
export interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

// Analytics Hook
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Google Analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_title: document.title,
        page_location: window.location.href,
      });

      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Track page views
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams, isInitialized]);

  // Track custom events
  const trackEvent = (event: GA4Event) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event_name, {
        event_category: event.event_category,
        event_label: event.event_label,
        value: event.value,
        ...event.custom_parameters,
      });
    }
  };

  // Track conversions
  const trackConversion = (conversion: ConversionEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
        event_category: 'conversion',
        event_label: conversion.event_name,
        value: conversion.value,
        currency: conversion.currency || 'TRY',
        items: conversion.items,
      });
    }
  };

  // Track user engagement
  const trackEngagement = (action: string, element?: string) => {
    trackEvent({
      event_name: 'engagement',
      event_category: 'user_interaction',
      event_label: `${action}${element ? `_${element}` : ''}`,
    });
  };

  // Track form submissions
  const trackFormSubmission = (formName: string, success: boolean = true) => {
    trackEvent({
      event_name: 'form_submit',
      event_category: 'form',
      event_label: formName,
      custom_parameters: {
        success: success,
        form_name: formName,
      },
    });
  };

  // Track button clicks
  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent({
      event_name: 'button_click',
      event_category: 'engagement',
      event_label: buttonName,
      custom_parameters: {
        button_name: buttonName,
        location: location || pathname,
      },
    });
  };

  // Track downloads
  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent({
      event_name: 'file_download',
      event_category: 'engagement',
      event_label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType,
      },
    });
  };

  // Track video interactions
  const trackVideoInteraction = (action: string, videoTitle: string) => {
    trackEvent({
      event_name: 'video_interaction',
      event_category: 'media',
      event_label: `${action}_${videoTitle}`,
      custom_parameters: {
        video_action: action,
        video_title: videoTitle,
      },
    });
  };

  // Track search queries
  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    trackEvent({
      event_name: 'search',
      event_category: 'engagement',
      event_label: searchTerm,
      custom_parameters: {
        search_term: searchTerm,
        results_count: resultsCount,
      },
    });
  };

  // Track scroll depth
  const trackScrollDepth = (depth: number) => {
    trackEvent({
      event_name: 'scroll',
      event_category: 'engagement',
      event_label: `${depth}%`,
      custom_parameters: {
        scroll_depth: depth,
      },
    });
  };

  // Track time on page
  const trackTimeOnPage = (timeInSeconds: number) => {
    trackEvent({
      event_name: 'timing_complete',
      event_category: 'engagement',
      event_label: 'time_on_page',
      custom_parameters: {
        time_on_page: timeInSeconds,
      },
    });
  };

  // Track errors
  const trackError = (errorType: string, errorMessage: string) => {
    trackEvent({
      event_name: 'exception',
      event_category: 'error',
      event_label: errorType,
      custom_parameters: {
        error_type: errorType,
        error_message: errorMessage,
        fatal: false,
      },
    });
  };

  // Track e-commerce events
  const trackPurchase = (transactionId: string, value: number, currency: string = 'TRY') => {
    trackEvent({
      event_name: 'purchase',
      event_category: 'ecommerce',
      event_label: transactionId,
      value: value,
      custom_parameters: {
        transaction_id: transactionId,
        currency: currency,
      },
    });
  };

  // Track add to cart
  const trackAddToCart = (itemId: string, itemName: string, value: number) => {
    trackEvent({
      event_name: 'add_to_cart',
      event_category: 'ecommerce',
      event_label: itemName,
      value: value,
      custom_parameters: {
        item_id: itemId,
        item_name: itemName,
      },
    });
  };

  // Track newsletter signup
  const trackNewsletterSignup = (email: string, source: string) => {
    trackEvent({
      event_name: 'newsletter_signup',
      event_category: 'conversion',
      event_label: source,
      custom_parameters: {
        email_domain: email.split('@')[1],
        signup_source: source,
      },
    });
  };

  // Track demo requests
  const trackDemoRequest = (demoType: string, contactMethod: string) => {
    trackEvent({
      event_name: 'demo_request',
      event_category: 'conversion',
      event_label: demoType,
      custom_parameters: {
        demo_type: demoType,
        contact_method: contactMethod,
      },
    });
  };

  // Track contact form submissions
  const trackContactForm = (formType: string, success: boolean) => {
    trackEvent({
      event_name: 'contact_form_submit',
      event_category: 'conversion',
      event_label: formType,
      custom_parameters: {
        form_type: formType,
        success: success,
      },
    });
  };

  return {
    trackEvent,
    trackConversion,
    trackEngagement,
    trackFormSubmission,
    trackButtonClick,
    trackDownload,
    trackVideoInteraction,
    trackSearch,
    trackScrollDepth,
    trackTimeOnPage,
    trackError,
    trackPurchase,
    trackAddToCart,
    trackNewsletterSignup,
    trackDemoRequest,
    trackContactForm,
    isInitialized,
  };
}

// Global type declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}