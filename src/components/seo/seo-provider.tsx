'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSEO } from '@/hooks/useSEO';

interface SEOContextType {
  metaTags: Record<string, string>;
  structuredData: any;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateKeywords: (keywords: string[]) => void;
  updateMetaTag: (name: string, content: string) => void;
  updateOpenGraph: (data: any) => void;
  updateTwitterCard: (data: any) => void;
  addCanonical: (url: string) => void;
  addHreflang: (hreflangs: Array<{ lang: string; url: string }>) => void;
  addRobots: (robots: string) => void;
  addViewport: (viewport?: string) => void;
  addCharset: (charset?: string) => void;
  addLanguage: (lang: string) => void;
  addStructuredData: (data: any) => void;
  generateBreadcrumbData: (items: Array<{ name: string; url: string }>) => any;
  generateOrganizationData: (data: any) => any;
  generateFAQData: (faqs: Array<{ question: string; answer: string }>) => any;
  generateArticleData: (data: any) => any;
  generateProductData: (data: any) => any;
  generateLocalBusinessData: (data: any) => any;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export function SEOProvider({ children }: { children: ReactNode }) {
  const seo = useSEO();

  return (
    <SEOContext.Provider value={seo}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEOContext() {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEOContext must be used within a SEOProvider');
  }
  return context;
}
