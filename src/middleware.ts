import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';

  // Skip middleware for API routes, static files, and internal Next.js paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. www. redirect (www.mysonai.com -> mysonai.com)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    return NextResponse.redirect(new URL(`https://${newHostname}${pathname}`, request.url), {
      status: 301,
    });
  }

  // 2. Root URL redirect (/ -> /tr)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), { status: 301 });
  }

  // 3. Check if pathname starts with a valid locale
  const pathnameHasValidLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 4. Redirect if there is no valid locale (but not for root path)
  if (!pathnameHasValidLocale && pathname !== '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url), { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap|.*\\.).*)',
  ],
};
