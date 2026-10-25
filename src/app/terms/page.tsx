import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Engagement - Cyber Savvy Pro",
  description:
    "How Cyber Savvy Pro scopes, prices, and delivers custom software, marketing retainers, and managed IT engagements.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Engagement - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro scopes, prices, and delivers custom software, marketing retainers, and managed IT engagements.",
    url: "/terms",
    siteName: "Cyber Savvy Pro",
    images: [
      {
        url: "/images/hero/hero-coding-team.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Savvy Pro engineering team at work",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Engagement - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro scopes, prices, and delivers custom software, marketing retainers, and managed IT engagements.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 pb-20">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📄</span>
            <span>Terms of Engagement</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Clear scope. Fixed timelines. No surprises.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            Last updated October 2026. Every engagement is confirmed in a written proposal before
            work begins.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-8 px-4 pt-12 text-sm leading-relaxed text-gray-700 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">1. Proposals &amp; payment</h2>
          <p className="mt-2">
            Fixed-scope projects are billed by milestone (typically 40% kickoff, 40% staging
            delivery, 20% launch). Monthly retainers (engineering, SEO, managed IT) are billed in
            advance and can be paused with 14 days notice. Invoices available in KES.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">2. Ownership</h2>
          <p className="mt-2">
            On final payment you receive 100% of source code repositories, database schemas, and
            documentation. We retain no license over your IP.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">3. Support &amp; SLAs</h2>
          <p className="mt-2">
            Dedicated engineering retainers include a 4-hour urgent bug response SLA. Managed IT
            plans include 24/7 monitoring, automated backups, and quarterly disaster-recovery
            drills as listed on the pricing page.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">4. Confidentiality</h2>
          <p className="mt-2">
            All client materials are treated as confidential. We sign NDAs on request and never
            reuse proprietary code or data across clients.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-700"
          >
            Request a Custom Proposal
          </Link>
        </div>
      </section>
    </div>
  );
}