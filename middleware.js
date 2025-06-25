// middleware.js
import { NextResponse } from 'next/server';
import { auth } from "./lib/auth"; // Adjust path if necessary

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

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuthenticated = !!req.auth; // req.auth will be null if not authenticated
  const userRole = req.auth?.user?.role; // Access the user's role from the session

  console.log('Middleware triggered for:', pathname, 'Authenticated:', isAuthenticated, 'Role:', userRole);

  // Skip if it's not a /cage route
  if (!pathname.startsWith('/cage')) {
    return NextResponse.next();
  }

  // --- Authentication Check ---
  if (!isAuthenticated) {
    // Show not found page instead of redirecting to login for unauthenticated users
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // --- Authorization Check (for admin routes within /cage) ---
  // Example: Protect all /cage/admin/* routes
  if (pathname.startsWith('/cage/admin')) {
    if (userRole !== 'admin') { // Assuming 'admin' is the role for administrators
      console.log('Access Denied: Not an admin for', pathname);
      // Redirect to a specific unauthorized page or home, or show not-found
      return NextResponse.rewrite(new URL('/unauthorized', req.url)); // Create a /unauthorized page
      // Or if you prefer to show not found for unauthorized access to admin pages:
      // return NextResponse.rewrite(new URL('/not-found', req.url));
    }
  }

  // Optional strict route check for general /cage routes (if not handled by admin check above)
  if (!validCageRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  // If authenticated and authorized, proceed
  return NextResponse.next();
}, {
    // You can also define an `authorized` callback here for NextAuth to handle redirects more granularly,
    // but the manual checks inside the middleware function give you more control over the response.
    // Example using `authorized` (less flexible for different redirect targets though):
    // callbacks: {
    //     authorized: ({ req, token }) => {
    //         // If it's an admin path, require admin role
    //         if (req.nextUrl.pathname.startsWith('/cage/admin')) {
    //             return token?.role === 'admin';
    //         }
    //         // For other /cage paths, just require authentication
    //         return !!token;
    //     },
    // },
    // pages: {
    //     signIn: '/auth/signin', // Optional: Redirect unauthenticated users to a specific sign-in page
    //     // error: '/auth/error', // Page for authorization errors if using authorized callback for redirect
    // },
});

export const config = {
  matcher: ['/cage', '/cage/:path*'],
};