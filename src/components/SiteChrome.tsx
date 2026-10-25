"use client";

import { usePathname } from "next/navigation";
import { getEnvSiteUrl } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = getEnvSiteUrl();

function labelFromSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function BreadcrumbJsonLd({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map((seg, i) => {
    const url = "/" + segments.slice(0, i + 1).join("/");
    return {
      "@type": "ListItem",
      position: i + 1,
      name: labelFromSegment(seg),
      item: `${siteUrl}${url}`,
    };
  });

  // Unshift the home root as the first breadcrumb.
  items.unshift({
    "@type": "ListItem",
    position: 0,
    name: "Home",
    item: siteUrl,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items,
        }),
      }}
    />
  );
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? null : <Navbar />}
      <main className="flex-1">
        {!isAdmin && <BreadcrumbJsonLd pathname={pathname} />}
        {children}
      </main>
      {isAdmin ? null : <Footer />}
    </>
  );
}
