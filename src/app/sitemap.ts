import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { generateSitemap, defaultSitemapConfig } from '@/lib/sitemap-generator';
import { blogPosts, blogCategories } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = {
    ...defaultSitemapConfig,
    blogPosts: blogPosts.map(post => ({
      slug: post.slug,
      lastmod: post.updatedAt,
      priority: post.featured ? 0.9 : 0.7,
    })),
    categories: blogCategories.map(category => ({
      slug: category.slug,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    })),
  };

  return generateSitemap(config);
}
