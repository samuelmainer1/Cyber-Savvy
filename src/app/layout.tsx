import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { getEnvSiteUrl } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font: no runtime Google requests, automatic
// preloading, and a size-adjusted fallback so there's no layout shift. The
// --font-inter CSS variable feeds Tailwind's `font-sans` stack (see
// tailwind.config.js). This finally delivers the "Inter var" typography the
// Tailwind config has always declared.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Env override → Vercel auto domain vars → localhost. Static pages bake this
// at build time; dynamic routes (sitemap/robots) detect the live host instead.
const siteUrl = getEnvSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Sam Maina", url: siteUrl }],
  creator: "Cyber Savvy Pro",
  publisher: "Cyber Savvy Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // Square dedicated favicon/apple-touch assets (500x500, verified present
    // in /public). The wide logo.png is a poor favicon and is 500x500 too —
    // not the 512x512 the manifest previously claimed.
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
  description:
    "Cyber Savvy Pro provides elite Full-Stack Development for custom systems, websites, and programs, alongside high-impact Digital Marketing, SEO Web Ranking, and Enterprise IT Services.",
  keywords: [
    "Cyber Savvy Pro",
    "Full-Stack Developers",
    "Custom Software Development",
    "Web Development",
    "Systems Engineering",
    "Programs and APIs",
    "Digital Marketing",
    "SEO Web Ranking",
    "IT Company",
    "Managed IT Services",
    "Cybersecurity",
  ],
  openGraph: {
    type: "website",
    siteName: "Cyber Savvy Pro",
    title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
    description:
      "Cyber Savvy Pro provides elite Full-Stack Development for custom systems, websites, and programs, alongside high-impact Digital Marketing, SEO Web Ranking, and Enterprise IT Services.",
    url: siteUrl,
    images: [{ url: "/images/hero/hero-coding-team.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
    description:
      "Cyber Savvy Pro provides elite Full-Stack Development for custom systems, websites, and programs, alongside high-impact Digital Marketing, SEO Web Ranking, and Enterprise IT Services.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

/** Site-wide Organization + WebSite structured data (knowledge panel foundation). */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // ["Organization", "ProfessionalService"]: dual-typed so the address +
      // contactPoint below also register as a local business entity in
      // Google's local results, not just a plain Organization.
      "@type": ["Organization", "ProfessionalService"],
      name: "Cyber Savvy Pro",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      description:
        "Elite Full-Stack Development for custom systems, websites, and programs, alongside high-impact Digital Marketing, SEO Web Ranking, and Enterprise IT Services.",
      founder: {
        "@type": "Person",
        name: "Sam Maina",
        jobTitle: "Founder & Lead Engineer",
        url: `${siteUrl}/about`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mombasa Road",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+254722359298",
        areaServed: "KE",
      },
      // sameAs intentionally omitted: it is reserved for EXTERNAL social
      // profile URLs (LinkedIn, X, GitHub...). Internal pages must never be
      // listed — add real profiles here once the accounts exist.
    },
    {
      "@type": "WebSite",
      name: "Cyber Savvy Pro",
      url: siteUrl,
      // Powers Google's sitelinks search box; /search?q= is supported by
      // SearchClient (useSearchParams → q).
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

