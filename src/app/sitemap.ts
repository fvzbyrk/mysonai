import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysonai.com'
  
  const routes = [
    '',
    '/assistants',
    '/blog',
    '/blog/mysonai-vs-pi-analysis',
    '/blog/ai-privacy-guide',
    '/blog/ai-companion-guide',
    '/blog/turkish-ai-assistants',
    '/blog/ai-productivity-tips',
    '/blog/ai-education-benefits',
    '/demo',
    '/signin',
    '/signup',
    '/dashboard',
    '/billing',
    '/pricing',
    '/contact',
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            acc[loc] = `${baseUrl}/${loc}${route}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })

  return sitemap
}
