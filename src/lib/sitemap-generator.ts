import { MetadataRoute } from 'next';

// Sitemap configuration
interface SitemapConfig {
  baseUrl: string;
  locales: string[];
  defaultLocale: string;
  pages: Array<{
    path: string;
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastmod?: string;
  }>;
  blogPosts?: Array<{
    slug: string;
    lastmod: string;
    priority: number;
  }>;
  categories?: Array<{
    slug: string;
    lastmod: string;
    priority: number;
  }>;
}

// Generate sitemap
export function generateSitemap(config: SitemapConfig): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add static pages
  config.pages.forEach(page => {
    // Add page for each locale
    config.locales.forEach(locale => {
      const url =
        locale === config.defaultLocale
          ? `${config.baseUrl}${page.path}`
          : `${config.baseUrl}/${locale}${page.path}`;

      sitemap.push({
        url,
        lastModified: page.lastmod ? new Date(page.lastmod) : new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
      });
    });
  });

  // Add blog posts
  if (config.blogPosts) {
    config.blogPosts.forEach(post => {
      config.locales.forEach(locale => {
        const url =
          locale === config.defaultLocale
            ? `${config.baseUrl}/blog/${post.slug}`
            : `${config.baseUrl}/${locale}/blog/${post.slug}`;

        sitemap.push({
          url,
          lastModified: new Date(post.lastmod),
          changeFrequency: 'weekly',
          priority: post.priority,
        });
      });
    });
  }

  // Add blog categories
  if (config.categories) {
    config.categories.forEach(category => {
      config.locales.forEach(locale => {
        const url =
          locale === config.defaultLocale
            ? `${config.baseUrl}/blog/kategori/${category.slug}`
            : `${config.baseUrl}/${locale}/blog/kategori/${category.slug}`;

        sitemap.push({
          url,
          lastModified: new Date(category.lastmod),
          changeFrequency: 'weekly',
          priority: category.priority,
        });
      });
    });
  }

  return sitemap;
}

// Default sitemap configuration
export const defaultSitemapConfig: SitemapConfig = {
  baseUrl: 'https://mysonai.com',
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pages: [
    {
      path: '',
      priority: 1.0,
      changefreq: 'daily',
    },
    {
      path: '/about',
      priority: 0.8,
      changefreq: 'monthly',
    },
    {
      path: '/services',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      path: '/solutions',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      path: '/blog',
      priority: 0.8,
      changefreq: 'daily',
    },
    {
      path: '/contact',
      priority: 0.7,
      changefreq: 'monthly',
    },
    {
      path: '/pricing',
      priority: 0.8,
      changefreq: 'weekly',
    },
    {
      path: '/demo',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      path: '/signin',
      priority: 0.5,
      changefreq: 'monthly',
    },
    {
      path: '/signup',
      priority: 0.6,
      changefreq: 'monthly',
    },
  ],
};

// Generate robots.txt
export function generateRobotsTxt(config: SitemapConfig): string {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${config.baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /dashboard/
Disallow: /billing/

# Allow important pages
Allow: /
Allow: /blog/
Allow: /services/
Allow: /solutions/
Allow: /contact/
Allow: /pricing/
Allow: /demo/

# Crawl delay
Crawl-delay: 1
`;

  return robotsTxt;
}

// Generate hreflang tags
export function generateHreflangTags(
  path: string,
  baseUrl: string,
  locales: string[],
  defaultLocale: string
): Array<{ lang: string; url: string }> {
  return locales.map(locale => ({
    lang: locale,
    url: locale === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
  }));
}

// SEO utilities
export class SEOUtils {
  // Generate meta title
  static generateTitle(
    title: string,
    siteName: string = 'MySonAI',
    separator: string = ' | '
  ): string {
    return `${title}${separator}${siteName}`;
  }

  // Generate meta description
  static generateDescription(description: string, maxLength: number = 160): string {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength - 3) + '...';
  }

  // Generate keywords
  static generateKeywords(keywords: string[], additionalKeywords: string[] = []): string {
    const allKeywords = [...keywords, ...additionalKeywords];
    return [...new Set(allKeywords)].join(', ');
  }

  // Generate Open Graph image URL
  static generateOGImageUrl(
    title: string,
    baseUrl: string,
    width: number = 1200,
    height: number = 630
  ): string {
    const encodedTitle = encodeURIComponent(title);
    return `${baseUrl}/api/og?title=${encodedTitle}&width=${width}&height=${height}`;
  }

  // Generate canonical URL
  static generateCanonicalUrl(
    path: string,
    baseUrl: string,
    locale: string,
    defaultLocale: string
  ): string {
    if (locale === defaultLocale) {
      return `${baseUrl}${path}`;
    }
    return `${baseUrl}/${locale}${path}`;
  }

  // Validate URL
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Generate structured data for organization
  static generateOrganizationStructuredData(
    name: string,
    url: string,
    logo: string,
    description: string,
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    },
    contactPoint?: {
      telephone: string;
      contactType: string;
      email?: string;
    }
  ) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      url,
      logo,
      description,
      address: address
        ? {
            '@type': 'PostalAddress',
            streetAddress: address.streetAddress,
            addressLocality: address.addressLocality,
            addressRegion: address.addressRegion,
            postalCode: address.postalCode,
            addressCountry: address.addressCountry,
          }
        : undefined,
      contactPoint: contactPoint
        ? {
            '@type': 'ContactPoint',
            telephone: contactPoint.telephone,
            contactType: contactPoint.contactType,
            email: contactPoint.email,
          }
        : undefined,
    };
  }

  // Generate structured data for website
  static generateWebsiteStructuredData(
    name: string,
    url: string,
    description: string,
    potentialAction?: {
      '@type': string;
      target: string;
      'query-input': string;
    }
  ) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name,
      url,
      description,
      potentialAction: potentialAction || {
        '@type': 'SearchAction',
        target: `${url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }
}
