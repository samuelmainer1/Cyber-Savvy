/**
 * Hosts the Next.js image optimizer is allowed to fetch (mirrored in
 * next.config.js `images.remotePatterns`).
 */
const OPTIMIZED_HOSTS = new Set(["images.unsplash.com"]);

/**
 * CMS fields (blog covers, hero slides) accept any absolute image URL, so a
 * URL from a host we have not allowlisted must bypass the optimizer —
 * otherwise `/_next/image` would reject it and the image would never load.
 *
 * Local paths (`/images/...`, `/uploads/...`) and data URIs need no host
 * check and stay fully optimized.
 *
 * Usage: `<Image src={post.image} {...remoteImageProps(post.image)} />`
 */
export function remoteImageProps(src: string): { unoptimized?: boolean } {
  // Not an absolute URL (local path, data URI, etc.) — nothing to guard.
  if (!/^(https?:)?\/\//i.test(src)) return {};

  try {
    const url = new URL(src.startsWith("//") ? `https:${src}` : src);
    const allowlisted = url.protocol === "https:" && OPTIMIZED_HOSTS.has(url.hostname);
    return allowlisted ? {} : { unoptimized: true };
  } catch {
    return { unoptimized: true };
  }
}