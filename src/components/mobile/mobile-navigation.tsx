'use client';

import { useState, useEffect, useRef } from 'react';
import { useMobileContext } from './mobile-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Home, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

interface MobileNavigationProps {
  navigation: Array<{
    name: string;
    href: string;
    icon?: React.ComponentType<any>;
    badge?: string;
    children?: Array<{
      name: string;
      href: string;
      icon?: React.ComponentType<any>;
    }>;
  }>;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
}

export function MobileNavigation({ navigation, user, onSignOut }: MobileNavigationProps) {
  const { isMobile, isTouchDevice } = useMobileContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isMobile) {
    return null;
  }

  const handleItemClick = (href: string) => {
    setActiveItem(href);
    setIsOpen(false);
  };

  const handleSubmenuToggle = (itemName: string) => {
    setActiveItem(activeItem === itemName ? null : itemName);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant='ghost'
        size='sm'
        className='md:hidden p-2'
        aria-label='Menüyü aç'
        aria-expanded={isOpen}
      >
        {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-50 md:hidden'>
          {/* Backdrop */}
          <div className='fixed inset-0 bg-black bg-opacity-50' onClick={() => setIsOpen(false)} />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className='fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out'
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Menü</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant='ghost'
                size='sm'
                className='p-2'
                aria-label='Menüyü kapat'
              >
                <X className='w-5 h-5' />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className='flex-1 overflow-y-auto py-4'>
              <div className='space-y-1 px-4'>
                {navigation.map(item => (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => handleSubmenuToggle(item.name)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium rounded-md transition-colors',
                            activeItem === item.name
                              ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          )}
                        >
                          <div className='flex items-center'>
                            {item.icon && <item.icon className='w-5 h-5 mr-3' />}
                            {item.name}
                            {item.badge && (
                              <span className='ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full'>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className='text-gray-400'>
                            {activeItem === item.name ? '−' : '+'}
                          </span>
                        </button>

                        {activeItem === item.name && (
                          <div className='ml-6 mt-1 space-y-1'>
                            {item.children.map(child => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => handleItemClick(child.href)}
                                className='flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-md'
                              >
                                {child.icon && <child.icon className='w-4 h-4 mr-3' />}
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => handleItemClick(item.href)}
                        className={cn(
                          'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                          activeItem === item.href
                            ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        )}
                      >
                        {item.icon && <item.icon className='w-5 h-5 mr-3' />}
                        {item.name}
                        {item.badge && (
                          <span className='ml-auto px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full'>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* User Section */}
            {user && (
              <div className='border-t border-gray-200 dark:border-gray-700 p-4'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center'>
                    <User className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>{user.name}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>{user.email}</p>
                  </div>
                </div>

                <div className='space-y-1'>
                  <Link
                    href='/profile'
                    onClick={() => setIsOpen(false)}
                    className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md'
                  >
                    <Settings className='w-4 h-4 mr-3' />
                    Profil Ayarları
                  </Link>

                  <Link
                    href='/help'
                    onClick={() => setIsOpen(false)}
                    className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md'
                  >
                    <HelpCircle className='w-4 h-4 mr-3' />
                    Yardım
                  </Link>

                  {onSignOut && (
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsOpen(false);
                      }}
                      className='flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md'
                    >
                      <LogOut className='w-4 h-4 mr-3' />
                      Çıkış Yap
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
