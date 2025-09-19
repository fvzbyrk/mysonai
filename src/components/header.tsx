'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Bot, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { LanguageSwitcher } from './language-switcher';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from '@/lib/i18n';
import { FeatureGuard } from './feature-guard';

export function Header() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) || 'tr';

  const navigation = [
    { name: 'Ana Sayfa', href: `/${locale}`, feature: null },
    { name: 'Hakkımızda', href: `/${locale}/about`, feature: null },
    { 
      name: 'Hizmetler', 
      href: `/${locale}/services`, 
      feature: null,
      dropdown: [
        { name: 'AI Çözümleri', href: `/${locale}/services#ai-solutions` },
        { name: 'Klasik Bilişim', href: `/${locale}/services#classic-it` },
        { name: 'Yazılım İhtiyaçları', href: `/${locale}/services#software-needs` },
        { name: 'Dijital Medya', href: `/${locale}/services#digital-media` },
        { name: 'Danışmanlık & Eğitim', href: `/${locale}/services#consulting-education` },
        { name: 'Güvenlik', href: `/${locale}/services#security` }
      ]
    },
    { 
      name: 'Çözümler', 
      href: `/${locale}/solutions`, 
      feature: null,
      dropdown: [
        { name: 'MySon Video', href: `/${locale}/solutions#myson-video` },
        { name: 'MySon Firmatch', href: `/${locale}/solutions#myson-firmatch` },
        { name: 'MySon Avukat', href: `/${locale}/solutions#myson-avukat` },
        { name: 'MySon Kids', href: `/${locale}/solutions#myson-kids` },
        { name: 'MySon Education', href: `/${locale}/solutions#myson-education` },
        { name: 'MySon Music', href: `/${locale}/solutions#myson-music` }
      ]
    },
    { name: 'Demo', href: `/${locale}/demo`, feature: 'demo' },
    { name: 'Referanslar', href: `/${locale}/references`, feature: null },
    { name: 'İletişim', href: `/${locale}/contact`, feature: 'contact' },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href={`/${locale}`} className='-m-1.5 p-1.5 flex items-center space-x-2'>
            <Bot className='h-8 w-8 text-primary-600' />
            <span className='text-xl font-bold gradient-text'>MySonAI</span>
          </Link>
        </div>

        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Ana menüyü aç</span>
            <Menu className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        <div className='hidden lg:flex lg:gap-x-8'>
          {navigation.map(item => (
            item.feature ? (
              <FeatureGuard key={item.name} feature={item.feature as any}>
                <div className='relative'>
                  {item.dropdown ? (
                    <div
                      className='flex items-center space-x-1 cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors'
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className='h-4 w-4' />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className='text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors'
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && openDropdown === item.name && (
                    <div
                      className='absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.dropdown.map((dropdownItem, index) => (
                        <Link
                          key={index}
                          href={dropdownItem.href}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors'
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </FeatureGuard>
            ) : (
              <div key={item.name} className='relative'>
                {item.dropdown ? (
                  <div
                    className='flex items-center space-x-1 cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors'
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className='h-4 w-4' />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className='text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors'
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.name && (
                  <div
                    className='absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        href={dropdownItem.href}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors'
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
          <LanguageSwitcher />
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Tema değiştir</span>
          </Button>

          <div className='flex items-center space-x-2'>
            <Button asChild>
              <Link href={`/${locale}/contact`}>Teklif Al</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden'>
          <div className='fixed inset-0 z-50' />
          <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <Link href={`/${locale}`} className='-m-1.5 p-1.5 flex items-center space-x-2'>
                <Bot className='h-8 w-8 text-primary-600' />
                <span className='text-xl font-bold gradient-text'>MySonAI</span>
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Menüyü kapat</span>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map(item => (
                    item.feature ? (
                      <FeatureGuard key={item.name} feature={item.feature as any}>
                        <div>
                          <Link
                            href={item.href}
                            className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {item.dropdown && (
                            <div className='ml-4 space-y-1'>
                              {item.dropdown.map((dropdownItem, index) => (
                                <Link
                                  key={index}
                                  href={dropdownItem.href}
                                  className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors'
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </FeatureGuard>
                    ) : (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.dropdown && (
                          <div className='ml-4 space-y-1'>
                            {item.dropdown.map((dropdownItem, index) => (
                              <Link
                                key={index}
                                href={dropdownItem.href}
                                className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors'
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
                <div className='py-6'>
                  <div className='flex items-center justify-between'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                      <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                      <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    </Button>

                    <div className='flex flex-col space-y-2'>
                      <Button asChild>
                        <Link href={`/${locale}/contact`}>
                          Teklif Al
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
