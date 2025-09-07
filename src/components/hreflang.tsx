"use client"

import { usePathname } from 'next/navigation'
import { locales, getLocaleFromPathname, getPathnameWithoutLocale } from '@/lib/i18n'

export function HreflangTags() {
  const pathname = usePathname()
  const currentLocale = getLocaleFromPathname(pathname) || 'tr'
  const pathWithoutLocale = getPathnameWithoutLocale(pathname)
  
  const baseUrl = 'https://mysonai.com'
  
  return (
    <>
      {/* Hreflang tags */}
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}/${locale}${pathWithoutLocale}`}
        />
      ))}
      
      {/* X-default hreflang */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/tr${pathWithoutLocale}`}
      />
      
      {/* Canonical URL */}
      <link
        rel="canonical"
        href={`${baseUrl}/${currentLocale}${pathWithoutLocale}`}
      />
    </>
  )
}
