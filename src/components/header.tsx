"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon, Bot, User, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/contexts/auth-context'
import { Button } from './ui/button'
import { LanguageSwitcher } from './language-switcher'
import { usePathname } from 'next/navigation'
import { Locale, getLocaleFromPathname } from '@/lib/i18n'
import { t } from '@/lib/translations'

export function Header() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'tr'
  
  const navigation = [
    { name: t(locale as Locale, 'nav.home'), href: `/${locale}` },
    { name: t(locale as Locale, 'nav.assistants'), href: `/${locale}/assistants` },
    { name: t(locale as Locale, 'nav.demo'), href: `/${locale}/demo` },
    { name: 'Fiyatlandırma', href: `/${locale}/pricing` },
    { name: 'Blog', href: `/${locale}/blog` },
    { name: 'İletişim', href: `/${locale}/contact` },
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold gradient-text">MySonAI</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ana menüyü aç</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Tema değiştir</span>
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <User className="h-4 w-4" />
                <span>{user.name || user.email}</span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t(locale as Locale, 'nav.signout')}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/${locale}/signin`}>{t(locale as Locale, 'nav.signin')}</Link>
              </Button>
              <Button asChild>
                <Link href={`/${locale}/signup`}>{t(locale as Locale, 'nav.signup')}</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center space-x-2">
                <Bot className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold gradient-text">MySonAI</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Menüyü kapat</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    
                    {user ? (
                      <div className="flex flex-col space-y-2">
                        <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                          <User className="h-4 w-4" />
                          <span>{user.name || user.email}</span>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => signOut()}
                          className="flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t(locale as Locale, 'nav.signout')}</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" asChild>
                          <Link href={`/${locale}/signin`}>{t(locale as Locale, 'nav.signin')}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={`/${locale}/signup`}>{t(locale as Locale, 'nav.signup')}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
