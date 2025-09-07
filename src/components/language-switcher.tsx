'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, getPathnameWithoutLocale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    const pathWithoutLocale = getPathnameWithoutLocale(pathname);
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className='flex gap-2'>
      {locales.map(locale => (
        <Button
          key={locale}
          variant={pathname.startsWith(`/${locale}`) ? 'default' : 'outline'}
          size='sm'
          onClick={() => handleLanguageChange(locale)}
          className='min-w-[40px]'
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
