// import { notFound } from 'next/navigation';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const locale = segments[1];

  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return null;
}

export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split('/');
  const locale = segments[1];

  if (locales.includes(locale as Locale)) {
    return '/' + segments.slice(2).join('/');
  }

  return pathname;
}

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);
  return `/${locale}${pathWithoutLocale}`;
}
