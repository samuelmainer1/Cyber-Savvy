import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Digital Marketing, SEO & Growth Strategy | Cyber Savvy Pro",
  description:
    "Dominate Google rankings with Technical SEO, high-conversion Google Ads, Facebook/Instagram campaigns, social media growth, and content marketing by Cyber Savvy Pro.",
  alternates: { canonical: '/services/digital-marketing' },
  openGraph: {
    title: "Digital Marketing, SEO & Growth Strategy | Cyber Savvy Pro",
    description:
      "Dominate Google rankings with Technical SEO, high-conversion Google Ads, Facebook/Instagram campaigns, social media growth, and content marketing.",
    url: "/services/digital-marketing",
    type: "website",
    images: [{ url: "/images/hero/digital-marketing.jpg", alt: "Digital marketing and SEO growth analytics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing, SEO & Growth Strategy | Cyber Savvy Pro",
    description:
      "Dominate Google rankings with Technical SEO, high-conversion Google Ads, Facebook/Instagram campaigns, and content marketing.",
    images: ["/images/hero/digital-marketing.jpg"],
  },
};

// Admin edits to services/results must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function DigitalMarketingPage() {
  const marketingServices = await getPageSection("services-digital-marketing-list");
  const results = await getPageSection("services-digital-marketing-results");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📈</span>
            <span>Data-Driven Customer Acquisition</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Digital Marketing & SEO That Generates{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Real Qualified Revenue
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Stop wasting budget on vanity metrics. We combine technical search engine dominance, high-converting PPC campaigns, and social funnels that turn clicks into clients.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Get Free SEO & Marketing Audit
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto"
            >
              View Marketing Retainers
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Highlights */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            {results.map((r) => (
              <div key={r.label}>
                <div className="text-4xl font-black text-indigo-600 sm:text-5xl">{r.metric}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-500">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Services Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Growth Channels
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Full-funnel marketing campaigns engineered for scale
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {marketingServices.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  {s.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">What you get:</p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d: string) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to outrank your competitors and 10x your inbound leads?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Get in touch with Sam Maina and our digital growth team for a customized marketing blueprint.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Claim Free Growth Strategy
            </Link>
            <a
              href="mailto:samuelmaina@gmail.com"
              className="w-full rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Email samuelmaina@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
