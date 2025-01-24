import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware({
  // Configuration for next-intl middleware
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: 'always'
});
 
export const config = {
  // Match all pathnames except for
  // - ... (static files)
  // - _next/... (Next.js internals)
  // - api/... (API routes)
  // - favicon.ico, robots.txt, sitemap.xml (static files)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};