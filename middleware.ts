import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { getCurrentUser } from './actions/auth';

// Create the intl middleware
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip authentication for public files and API routes
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return intlMiddleware(request);
  }

  const isAuthenticated = await getCurrentUser();
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');

  // Handle authentication redirects
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuthenticated && !isAuthPage) {
    // Allow access to home page for unauthenticated users
    // Normalize the pathname by removing trailing slashes and checking if it's empty or just the locale
    const normalizedPath = pathname.replace(/^\/+|\/+$/g, '');
    if (!normalizedPath || normalizedPath === routing.defaultLocale || routing.locales.includes(normalizedPath as 'en' | 'fr')) {
      return intlMiddleware(request);
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Apply intl middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - ... (static files)
  // - _next/... (Next.js internals)
  // - api/... (API routes)
  // - favicon.ico, robots.txt, sitemap.xml (static files)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};