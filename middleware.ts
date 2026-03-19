import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Authenticaton is handled completely on the client-side
  // via Supabase localStorage, so we bypass server-side checking here.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
