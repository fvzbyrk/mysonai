'use client';

import { SEOProvider } from './seo-provider';
import { SEOMeta } from './seo-meta';
import { Breadcrumb } from './breadcrumb';

interface SEOWrapperProps {
  children: React.ReactNode;
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
  breadcrumbItems?: Array<{ name: string; url: string; current?: boolean }>;
  showBreadcrumb?: boolean;
}

export function SEOWrapper({
  children,
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
  hreflangs,
  breadcrumbItems,
  showBreadcrumb = false
}: SEOWrapperProps) {
  return (
    <SEOProvider>
      <SEOMeta
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={url}
        type={type}
        siteName={siteName}
        locale={locale}
        canonical={canonical}
        robots={robots}
        author={author}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        section={section}
        tags={tags}
        twitterCard={twitterCard}
        twitterSite={twitterSite}
        twitterCreator={twitterCreator}
        twitterImage={twitterImage}
        facebookAppId={facebookAppId}
        structuredData={structuredData}
        hreflangs={hreflangs}
      />
      
      {showBreadcrumb && breadcrumbItems && (
        <Breadcrumb items={breadcrumbItems} />
      )}
      
      {children}
    </SEOProvider>
  );
}
