import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Capabilities & Services - Custom Software, SEO & Managed IT - Cyber Savvy Pro",
  description:
    "Explore Cyber Savvy Pro capabilities: custom full-stack development, bespoke ERPs, technical SEO, digital marketing, and managed IT & cybersecurity by Sam Maina.",
  alternates: { canonical: '/features' },
  openGraph: {
    title: "Capabilities & Services - Custom Software, SEO & Managed IT - Cyber Savvy Pro",
    description:
      "Explore Cyber Savvy Pro capabilities: custom full-stack development, bespoke ERPs, technical SEO, digital marketing, and managed IT & cybersecurity by Sam Maina.",
    url: "/features",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro features and capabilities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capabilities & Services - Custom Software, SEO & Managed IT - Cyber Savvy Pro",
    description:
      "Explore Cyber Savvy Pro capabilities: custom full-stack development, bespoke ERPs, technical SEO, digital marketing, and managed IT & cybersecurity by Sam Maina.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

// Admin edits to feature categories must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function FeaturesPage() {
  const featureCategories = await getPageSection("features-categories");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>⚡</span>
            <span>Capabilities & Expertise</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            Full-stack capabilities,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              engineered for impact
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            From custom ERPs and offline-first mobile apps to technical SEO and zero-trust security — scoped, built and supported by one accountable team led by Sam Maina.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
            >
              Request Free Quote
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="mx-auto max-w-7xl px-4 pt-16 space-y-20 sm:px-6 lg:px-8">
        {featureCategories.map((cat, idx) => (
          <section key={cat.category} className="scroll-mt-24">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                0{idx + 1} · {cat.category}
              </span>
              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {cat.tagline}
              </h3>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cat.items.map((item: { icon: string; title: string; desc: string }) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-indigo-600">
                    Learn more <span className="ml-1">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Comparison */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Custom Build vs Off-the-Shelf Tools
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            When custom software beats a generic tool
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Most clients come to us after stitching together five tools that almost fit. Here is how a purpose-built system compares.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6 text-indigo-600 font-extrabold bg-indigo-50/50">
                    Custom System by Cyber Savvy Pro
                  </th>
                  <th className="py-4 px-6">Stitched-Together Off-the-Shelf Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Fit to Your Operations</td>
                  <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/30">Built around your exact workflows</td>
                  <td className="py-4 px-6 text-gray-500">Change your process to fit the tool</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Your Data</td>
                  <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/30">One system of record — no copy-paste</td>
                  <td className="py-4 px-6 text-gray-500">CSV exports and manual re-entry between five tools</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Automation</td>
                  <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/30">Built for your dispatch, billing and approvals</td>
                  <td className="py-4 px-6 text-gray-500">Generic templates that half-fit your workflow</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Security & Compliance</td>
                  <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/30">Zero-trust architecture aligned to Kenya&apos;s Data Protection Act</td>
                  <td className="py-4 px-6 text-gray-500">Varies per tool — compliance is your problem</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Total Cost of Ownership</td>
                  <td className="py-4 px-6 font-bold text-indigo-600 bg-indigo-50/30">One predictable build + optional support retainer</td>
                  <td className="py-4 px-6 text-gray-500">5-8 subscriptions that grow with headcount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready for software that fits your business — not the other way around?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Request a free consultation and get a formal proposal within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-indigo-700 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              Request Free Quote
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-white/40 bg-white/10 px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Book a Scoping Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}