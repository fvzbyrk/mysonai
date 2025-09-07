import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';
  
  // 1. www. redirect (www.mysonai.com -> mysonai.com)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    return NextResponse.redirect(
      new URL(`https://${newHostname}${pathname}`, request.url),
      { status: 301 }
    );
  }
  
  // 2. Root URL redirect (/ -> /tr)
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url),
      { status: 301 }
    );
  }
  
  // 3. Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 4. Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
      { status: 301 }
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
