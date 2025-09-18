'use client';

import { useEffect } from 'react';
import { useSEOContext } from './seo-provider';

interface SEOMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterImage?: string;
  facebookAppId?: string;
  structuredData?: any;
  hreflangs?: Array<{ lang: string; url: string }>;
}

export function SEOMeta({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = 'MySonAI',
  locale = 'tr_TR',
  canonical,
  robots = 'index, follow',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  twitterCard = 'summary_large_image',
  twitterSite = '@mysonai',
  twitterCreator = '@mysonai',
  twitterImage,
  facebookAppId,
  structuredData,
  hreflangs
}: SEOMetaProps) {
  const {
    updateTitle,
    updateDescription,
    updateKeywords,
    updateOpenGraph,
    updateTwitterCard,
    addCanonical,
    addHreflang,
    addRobots,
    addStructuredData
  } = useSEOContext();

  useEffect(() => {
    // Update title
    if (title) {
      updateTitle(title);
    }

    // Update description
    if (description) {
      updateDescription(description);
    }

    // Update keywords
    if (keywords) {
      updateKeywords(keywords);
    }

    // Update Open Graph
    if (title || description || image || url) {
      updateOpenGraph({
        title,
        description,
        image,
        url,
        type,
        siteName,
        locale
      });
    }

    // Update Twitter Card
    updateTwitterCard({
      card: twitterCard,
      title,
      description,
      image: twitterImage || image,
      creator: twitterCreator,
      site: twitterSite
    });

    // Add canonical URL
    if (canonical) {
      addCanonical(canonical);
    }

    // Add hreflang tags
    if (hreflangs) {
      addHreflang(hreflangs);
    }

    // Add robots meta
    addRobots(robots);

    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Add additional meta tags
    if (author) {
      updateMetaTag('author', author);
    }

    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime);
    }

    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime);
    }

    if (section) {
      updateMetaTag('article:section', section);
    }

    if (tags) {
      updateMetaTag('article:tag', tags.join(', '));
    }

    if (facebookAppId) {
      updateMetaTag('fb:app_id', facebookAppId);
    }

  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    siteName,
    locale,
    canonical,
    robots,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterImage,
    facebookAppId,
    structuredData,
    hreflangs,
    updateTitle,
    updateDescription,
    updateKeywords,
    updateOpenGraph,
    updateTwitterCard,
    addCanonical,
    addHreflang,
    addRobots,
    addStructuredData
  ]);

  return null;
}

// Helper function to update meta tags
function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}
