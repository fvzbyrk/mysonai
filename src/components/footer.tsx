"use client"

import Link from 'next/link'
import { Bot, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Locale, getLocaleFromPathname } from '@/lib/i18n'
import { t } from '@/lib/translations'

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'tr'
  
  const footerLinks = {
    product: [
      { name: t(locale as Locale, 'nav.assistants'), href: '/tools' },
      { name: t(locale as Locale, 'nav.demo'), href: '/demo' },
      { name: t(locale as Locale, 'nav.pricing'), href: '/pricing' },
      { name: t(locale as Locale, 'nav.api'), href: '/api' },
    ],
    resources: [
      { name: t(locale as Locale, 'nav.docs'), href: '/docs' },
      { name: t(locale as Locale, 'nav.blog'), href: '/blog' },
      { name: 'Tutorial', href: '/tutorial' },
      { name: t(locale as Locale, 'nav.faq'), href: '/faq' },
    ],
    company: [
      { name: t(locale as Locale, 'nav.about'), href: '/about' },
      { name: 'Kariyer', href: '/careers' },
      { name: t(locale as Locale, 'nav.contact'), href: '/contact' },
      { name: 'Basın', href: '/press' },
    ],
    legal: [
      { name: 'Gizlilik', href: '/privacy' },
      { name: 'Kullanım Koşulları', href: '/terms' },
      { name: 'Çerez Politikası', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Bot className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold gradient-text">MySonAI</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Yapay zeka teknolojilerinin gücünü keşfedin. AI asistanlarınızla geleceği inşa edin.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/mysonai" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/mysonai" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/mysonai" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:info@mysonai.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Ürün
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Kaynaklar
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Şirket
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Yasal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MySonAI. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Türkiye</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Türkçe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
