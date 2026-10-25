import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Enforces the canonical production domain.
 *
 * - In development (NEXT_PUBLIC_SITE_URL unset): passes through so localhost:3000 keeps working.
 *   In production: any request arriving on a non-canonical host (including localhost/IP if
 *   someone somehow hits the server directly) gets a 301 redirect to NEXT_PUBLIC_SITE_URL.
 */
export function middleware(request: NextRequest) {
  const canonical = process.env.NEXT_PUBLIC_SITE_URL
    ?.replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  if (!canonical) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";
  const hostWithoutPort = host.split(":")[0];

  if (hostWithoutPort !== canonical) {
    const url = request.nextUrl.clone();
    url.host = canonical;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (handled directly)
     * - internal API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};
