// middleware.js
import { NextResponse } from 'next/server';
import { authMiddleware } from "@/lib/auth-middleware";

export const config = {
  matcher: ['/cage/:path*', '/admin/:path*'],
};

export default async function middleware(req) {
  const { auth } = await authMiddleware(req);
  const pathname = req.nextUrl.pathname;

  const isAuthenticated = !!auth;
  const userRole = auth?.user?.role;

  console.log('Middleware:', { pathname, isAuthenticated, userRole });

  if (!isAuthenticated) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  if ((pathname.startsWith('/cage/admin') || pathname.startsWith('/admin')) && userRole !== 'admin') {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}
