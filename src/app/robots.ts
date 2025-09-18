import { MetadataRoute } from 'next';
import { generateRobotsTxt, defaultSitemapConfig } from '@/lib/sitemap-generator';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/dashboard/', '/billing/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/dashboard/', '/billing/'],
      },
    ],
    sitemap: 'https://mysonai.com/sitemap.xml',
    host: 'https://mysonai.com',
  };
}
