const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

/**
 * Build-time / env-based site URL used for metadata baked into static pages.
 * Safe to import from Client Components.
 * Priority: explicit env → Vercel production domain → Vercel URL → localhost.
 * On Vercel this picks up a custom domain automatically with zero configuration.
 */
export function getEnvSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
