import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for Supabase auth cookie
  const supabaseCookie = request.cookies.get("sb-access-token") ||
    Array.from(request.cookies.getAll()).find(
      (c) => c.name.includes("sb-") && c.name.includes("-auth-token")
    );

  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPath = request.nextUrl.pathname === "/admin/login";

  if (isAdminPath && !isLoginPath && !supabaseCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
