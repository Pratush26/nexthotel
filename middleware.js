import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const validCageRoutes = [
  '/cage',
  '/cage/orders',
  '/cage/register',
  '/cage/book',
  '/cage/check-bookings',
  '/cage/notice-img',
  // Add more valid routes if needed
];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Skip if it's not a /cage route
  if (!pathname.startsWith('/cage')) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    // Show not found page instead of redirecting to login
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // Optional strict route check
  // Remove this check if you want to allow all /cage/* routes
  if (!validCageRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cage', '/cage/:path*'],
};
