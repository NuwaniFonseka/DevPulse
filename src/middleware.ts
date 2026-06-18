import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect unauthenticated users away from protected pages
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  // Only run middleware on these paths — skip static files and API routes
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
