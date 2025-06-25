import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.role;

  console.log('Middleware triggered for:', pathname, 'Authenticated:', isAuthenticated, 'Role:', userRole);

  if (!isAuthenticated) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // Protect admin areas
  if ((pathname.startsWith('/cage/admin') || pathname.startsWith('/admin')) && userRole !== 'admin') {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/cage/:path*', '/admin/:path*'],
};
