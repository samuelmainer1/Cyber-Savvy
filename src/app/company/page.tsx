import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company Hub - Everything About Cyber Savvy Pro | Capabilities, Process, People & Proof",
  description:
    "The complete Cyber Savvy Pro directory: our capabilities and services, delivery process, case studies and testimonials, team and careers, plus resources — blog, FAQ, docs and product updates.",
  alternates: { canonical: "/company" },
  openGraph: {
    title: "Company Hub - Everything About Cyber Savvy Pro | Capabilities, Process, People & Proof",
    description:
      "The complete Cyber Savvy Pro directory: our capabilities and services, delivery process, case studies and testimonials, team and careers, plus resources — blog, FAQ, docs and product updates.",
    url: "/company",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro company hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Hub - Everything About Cyber Savvy Pro | Capabilities, Process, People & Proof",
    description:
      "The complete Cyber Savvy Pro directory: our capabilities and services, delivery process, case studies and testimonials, team and careers, plus resources — blog, FAQ, docs and product updates.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export default function CompanyHubPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🏢</span>
            <span>Company Directory</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            Everything about{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Cyber Savvy Pro
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Capabilities, delivery process, case studies, team and resources — every page of our site, organised in one place.
          </p>
        </div>
      </section>
    </div>
  );
}