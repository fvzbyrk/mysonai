import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysonai.com'
  
  const routes = [
    '',
    '/assistants',
    '/demo',
    '/signin',
    '/signup',
    '/dashboard',
    '/pricing',
    '/blog',
    '/contact',
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // Add root redirect
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  return sitemap
}
