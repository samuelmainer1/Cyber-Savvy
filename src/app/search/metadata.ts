import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Search | Cyber Savvy Pro",
  description:
    "Search Cyber Savvy Pro for case studies, services, testimonials, and more.",
  // Internal search results should never be indexed — every ?q= permutation is
  // a thin, duplicate page. Keep follow:true so links found via a query still
  // get crawled.
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
  openGraph: {
    title: "Site Search | Cyber Savvy Pro",
    description:
      "Search Cyber Savvy Pro for case studies, services, testimonials, and more.",
    url: "/search",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro site search" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Search | Cyber Savvy Pro",
    description:
      "Search Cyber Savvy Pro for case studies, services, testimonials, and more.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};