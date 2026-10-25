import type { MetadataRoute } from "next";
import { getBlogPosts, getCaseStudies, slugify } from "@/lib/cms";
import { getRequestSiteUrl } from "@/lib/site-server";

// Always render fresh: posts published through the admin CMS must appear
// immediately, without waiting for the next production build. This also lets
// the sitemap read request headers so it always declares the live domain.
export const dynamic = "force-dynamic";

// Stable build-time fallback for static pages: avoids "everything modified
// today" churn so Google trusts <lastmod> again. Ships with the code.
export const SITEMAP_BUILD_DATE = new Date("2026-10-07T00:00:00.000Z");

const MONTH_TO_NUMBER: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/** Blog dates are display strings ("Oct 2026"); convert for <lastmod>. */
function isoFromDisplayDate(display: string): Date | undefined {
  const [month, year] = display.trim().split(/\s+/);
  const monthNumber = MONTH_TO_NUMBER[month];
  return monthNumber && year ? new Date(Date.UTC(Number(year), Number(monthNumber) - 1, 1)) : undefined;
}

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/full-stack-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/custom-systems", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/digital-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/managed-it-cybersecurity", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/wordpress-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ui-ux-design-branding", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/website-maintenance-support", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/mobile-app-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/development-process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/book", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.6, changeFrequency: "monthly" },
  { path: "/company", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/how-it-works", priority: 0.7, changeFrequency: "yearly" },
  { path: "/features", priority: 0.6, changeFrequency: "monthly" },
  { path: "/integrations", priority: 0.5, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.6, changeFrequency: "weekly" },
  { path: "/updates", priority: 0.5, changeFrequency: "weekly" },
  { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/career", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Reflects the domain the request arrived on unless NEXT_PUBLIC_SITE_URL
  // is set to force a canonical domain.
  const siteUrl = await getRequestSiteUrl();
  const posts = await getBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: SITEMAP_BUILD_DATE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: isoFromDisplayDate(post.date) ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Case-study detail slugs are derived from the client name at render time
  // (same slugify() the /case-studies/[slug] route uses), so keep them in sync
  // automatically as the admin adds case studies.
  const caseStudies = await getCaseStudies();
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${slugify(cs.client)}`,
    lastModified: SITEMAP_BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Doc detail slugs live as a fixed array inside src/app/docs/[slug]/page.tsx
  // (page files may only export Next-reserved fields, so the array itself
  // cannot be imported here). Keep this list in sync with that array's `id`s.
  const DOC_SLUGS = [
    "getting-started",
    "full-stack-development-guide",
    "zero-trust-security",
    "technical-seo-checklist",
    "erp-implementation",
    "wordpress-maintenance",
    "api-integration",
    "disaster-recovery",
  ];
  const docsEntries: MetadataRoute.Sitemap = DOC_SLUGS.map((slug) => ({
    url: `${siteUrl}/docs/${slug}`,
    lastModified: SITEMAP_BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries, ...docsEntries];
}
