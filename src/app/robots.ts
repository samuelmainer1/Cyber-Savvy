import type { MetadataRoute } from "next";
import { getRequestSiteUrl } from "@/lib/site-server";

// Render per-request so the Sitemap line always names the live domain.
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getRequestSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
