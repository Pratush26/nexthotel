// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes under /cage
const validCageRoutes = [
  '/cage',
  '/cage/orders',
  '/cage/admin/register',
  '/cage/book',
  '/cage/check-bookings',
  '/cage/admin/notice-img',
  '/cage/admin/rooms',
];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // ✅ Skip non-/cage routes
  if (!pathname.startsWith('/cage')) {
    return NextResponse.next();
  }

  // ✅ Get token from request
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log('Token:', token);

  // ❌ If no token, block access
  if (!token) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // ✅ Optional strict route check
  if (!validCageRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  return NextResponse.next();
}

// ✅ Run this middleware only on /cage/* routes
export const config = {
  matcher: ['/cage', '/cage/:path*'],
};
