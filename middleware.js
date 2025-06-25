import { NextResponse } from 'next/server';

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("__Secure-authjs.session-token") || req.cookies.get("authjs.session-token");

  // Skip check if not under /cage route
  if (!pathname.startsWith('/cage')) {
    return NextResponse.next();
  }

  // If user not authenticated
  if (!token) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // Valid routes using regex (supports dynamic slugs)
  const validCageRoutePatterns = [
    /^\/cage$/,
    /^\/cage\/orders$/,
    /^\/cage\/admin\/register$/,
    /^\/cage\/book$/,
    /^\/cage\/check-bookings$/,
    /^\/cage\/admin\/notice-img$/,
    /^\/cage\/admin\/rooms$/,
    /^\/cage\/admin\/rooms\/edit\/[\w-]+$/, // dynamic slug support like 'Jitesh-04'
  ];

  const isValid = validCageRoutePatterns.some((regex) => regex.test(pathname));

  if (!isValid) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cage', '/cage/:path*'],
};
