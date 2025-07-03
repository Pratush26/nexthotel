// middleware.ts
import { auth } from "@/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.rewrite(new URL("/not-found", req.url)); // req.nextUrl - /cage/orders req.url - http://localhost:3000/cage/orders
  }
  
  if (req.nextUrl.startsWith("/cage/admin") && req.auth?.user.role !== "admin") {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  return NextResponse.next();
});

// Match all routes — apply middleware to everything
export const config = {
  matcher: ['/cage', '/cage/:path*'],
};