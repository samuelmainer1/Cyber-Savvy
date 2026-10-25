import { headers } from "next/headers";

import { getEnvSiteUrl } from "./site";

const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

/**
 * Request-time site URL for dynamic routes (sitemap, robots).
 * Priority: explicit env override → the host the request actually arrived on
 * (x-forwarded-host / host header) → build-time fallbacks.
 * This is what lets the sitemap "point" to whatever domain the site is served
 * from, with no env configuration at all.
 * Server Components only — imports next/headers.
 */
export async function getRequestSiteUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const forwardedProto = h.get("x-forwarded-proto");
      const isLocal = /^(localhost|127\.|::1|\[::1\])/i.test(host);
      const proto = forwardedProto ?? (isLocal ? "http" : "https");
      return `${proto}://${host.split(",")[0].trim()}`;
    }
  } catch {
    // Not inside a request scope — fall through to env-based resolution.
  }

  return getEnvSiteUrl();
}