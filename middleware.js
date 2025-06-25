import { NextResponse } from 'next/server';

const validCageRoutes = [
  '/cage',
  '/cage/orders',
  '/cage/admin/register',
  '/cage/book',
  '/cage/check-bookings',
  '/cage/admin/notice-img',
  '/cage/admin/rooms',
  '/cage/admin/rooms/edit/Jitesh-04',
  // Add more valid routes if needed
];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  
  const token = req.cookies.get("__Secure-authjs.session-token") || req.cookies.get("authjs.session-token")
  // Skip if it's not a /cage route
  if (!pathname.startsWith('/cage')) {
    return NextResponse.next();
  }


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
