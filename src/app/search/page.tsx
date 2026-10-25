import Link from "next/link";
import { Suspense } from "react";
import { getCaseStudies, getServices, getTestimonials } from "@/lib/cms";
import { SearchClient } from "./SearchClient";

// Wire up the dedicated metadata in ./metadata.ts (unique title/description,
// canonical, OG/Twitter). Without this re-export the page silently inherits the
// root layout's homepage metadata and ships indexable duplicate content.
export { metadata } from "./metadata";

export const dynamic = "force-dynamic";

type SearchResult = {
  type: "case-study" | "service" | "testimonial" | "page";
  title: string;
  subtitle: string;
  href: string;
  excerpt: string;
  icon: string;
};

export default async function SearchPage() {
  const [caseStudies, services, testimonials] = await Promise.all([
    getCaseStudies(),
    getServices(),
    getTestimonials(),
  ]);

  const initialResults: SearchResult[] = [
    ...caseStudies.map((cs) => ({
      type: "case-study" as const,
      title: cs.client,
      subtitle: cs.industry,
      href: `/case-studies/${cs.client.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
      excerpt: cs.summary,
      icon: "📊",
    })),
    ...services.map((s) => ({
      type: "service" as const,
      title: s.title,
      subtitle: s.desc,
      href: s.link,
      excerpt: s.desc,
      icon: s.icon,
    })),
    ...testimonials.map((t) => ({
      type: "testimonial" as const,
      title: t.name,
      subtitle: `${t.role}, ${t.company}`,
      href: "/testimonials",
      excerpt: t.quote,
      icon: "⭐",
    })),
    { type: "page", title: "About Cyber Savvy Pro", subtitle: "Our story, values, and team", href: "/about", excerpt: "Learn about founder Sam Maina and our engineering standards.", icon: "🏢" },
    { type: "page", title: "Pricing & Retainers", subtitle: "Transparent monthly retainers and project quotes", href: "/pricing", excerpt: "Flexible pricing for businesses of all sizes.", icon: "💰" },
    { type: "page", title: "Contact Us", subtitle: "Book a free consultation", href: "/contact", excerpt: "Get in touch with Sam Maina for a scoping call.", icon: "📞" },
    { type: "page", title: "Case Studies", subtitle: "Real client results and success stories", href: "/case-studies", excerpt: "Explore proven results across industries.", icon: "📊" },
    { type: "page", title: "Careers", subtitle: "Join the Cyber Savvy Pro team", href: "/career", excerpt: "We&apos;re hiring talented engineers and designers.", icon: "💼" },
  ];

  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading search…</div>}>
      <SearchClient initialResults={initialResults} />
    </Suspense>
  );
}