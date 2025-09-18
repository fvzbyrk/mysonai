'use client';

import { useEffect, useState } from 'react';

// SEO utilities and hooks
export function useSEO() {
  const [metaTags, setMetaTags] = useState<Record<string, string>>({});
  const [structuredData, setStructuredData] = useState<any>(null);

  // Update page title
  const updateTitle = (title: string) => {
    document.title = title;
    setMetaTags(prev => ({ ...prev, title }));
  };

  // Update meta description
  const updateDescription = (description: string) => {
    updateMetaTag('description', description);
  };

  // Update meta keywords
  const updateKeywords = (keywords: string[]) => {
    updateMetaTag('keywords', keywords.join(', '));
  };

  // Update meta tag
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
    setMetaTags(prev => ({ ...prev, [name]: content }));
  };

  // Update Open Graph tags
  const updateOpenGraph = (data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
  }) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        updateMetaTag(`og:${key}`, value);
      }
    });
  };

  // Update Twitter Card tags
  const updateTwitterCard = (data: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
    site?: string;
  }) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        updateMetaTag(`twitter:${key}`, value);
      }
    });
  };

  // Add structured data
  const addStructuredData = (data: any) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    script.id = 'structured-data';
    
    // Remove existing structured data
    const existing = document.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    setStructuredData(data);
  };

  // Add canonical URL
  const addCanonical = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  };

  // Add hreflang tags
  const addHreflang = (hreflangs: Array<{ lang: string; url: string }>) => {
    // Remove existing hreflang tags
    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach(link => link.remove());
    
    // Add new hreflang tags
    hreflangs.forEach(({ lang, url }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    });
  };

  // Add robots meta tag
  const addRobots = (robots: string) => {
    updateMetaTag('robots', robots);
  };

  // Add viewport meta tag
  const addViewport = (viewport: string = 'width=device-width, initial-scale=1.0') => {
    updateMetaTag('viewport', viewport);
  };

  // Add charset
  const addCharset = (charset: string = 'UTF-8') => {
    let meta = document.querySelector('meta[charset]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('charset', charset);
      document.head.insertBefore(meta, document.head.firstChild);
    }
  };

  // Add language
  const addLanguage = (lang: string) => {
    document.documentElement.lang = lang;
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbData = (items: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  };

  // Generate organization structured data
  const generateOrganizationData = (data: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    contactPoint?: {
      telephone: string;
      contactType: string;
      email?: string;
    };
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      logo: data.logo,
      description: data.description,
      address: data.address,
      contactPoint: data.contactPoint
    };
  };

  // Generate FAQ structured data
  const generateFAQData = (faqs: Array<{ question: string; answer: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  };

  // Generate article structured data
  const generateArticleData = (data: {
    headline: string;
    description: string;
    image: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    publisher: string;
    url: string;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      image: data.image,
      author: {
        '@type': 'Person',
        name: data.author
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      publisher: {
        '@type': 'Organization',
        name: data.publisher
      },
      url: data.url
    };
  };

  // Generate product structured data
  const generateProductData = (data: {
    name: string;
    description: string;
    image: string;
    brand: string;
    price: number;
    currency: string;
    availability: string;
    rating?: number;
    reviewCount?: number;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image,
      brand: {
        '@type': 'Brand',
        name: data.brand
      },
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: data.currency,
        availability: data.availability
      },
      aggregateRating: data.rating ? {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount
      } : undefined
    };
  };

  // Generate local business structured data
  const generateLocalBusinessData = (data: {
    name: string;
    description: string;
    url: string;
    telephone: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    geo?: {
      latitude: number;
      longitude: number;
    };
    openingHours?: string[];
    priceRange?: string;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: data.name,
      description: data.description,
      url: data.url,
      telephone: data.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.streetAddress,
        addressLocality: data.address.addressLocality,
        addressRegion: data.address.addressRegion,
        postalCode: data.address.postalCode,
        addressCountry: data.address.addressCountry
      },
      geo: data.geo ? {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude
      } : undefined,
      openingHours: data.openingHours,
      priceRange: data.priceRange
    };
  };

  // Initialize SEO
  useEffect(() => {
    addCharset();
    addViewport();
    addLanguage('tr');
  }, []);

  return {
    // State
    metaTags,
    structuredData,
    
    // Basic SEO
    updateTitle,
    updateDescription,
    updateKeywords,
    updateMetaTag,
    updateOpenGraph,
    updateTwitterCard,
    addCanonical,
    addHreflang,
    addRobots,
    addViewport,
    addCharset,
    addLanguage,
    
    // Structured Data
    addStructuredData,
    generateBreadcrumbData,
    generateOrganizationData,
    generateFAQData,
    generateArticleData,
    generateProductData,
    generateLocalBusinessData,
  };
}
