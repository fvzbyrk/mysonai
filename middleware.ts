import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['tr', 'en'],

  // Used when no locale matches
  defaultLocale: 'tr',

  // Domains can be configured to support different locales
  // domains: [
  //   {
  //     domain: 'mysonai.com',
  //     defaultLocale: 'tr'
  // },
  //   {
  //     domain: 'mysonai.com/en',
  //     defaultLocale: 'en'
  // }
  // ]
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*']
};


