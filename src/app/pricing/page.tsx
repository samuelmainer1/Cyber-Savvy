import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPricing } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Pricing & Retainers | Cyber Savvy Pro - Transparent Pricing",
  description:
    "Choose between flexible monthly retainers for ongoing development and IT management, or milestone-based fixed pricing for custom software builds. No hidden costs, transparent pricing from Cyber Savvy Pro.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing & Retainers | Cyber Savvy Pro - Transparent Pricing",
    description:
      "Choose between flexible monthly retainers for ongoing development and IT management, or milestone-based fixed pricing for custom software builds. No hidden costs.",
    url: "/pricing",
    type: "website",
    images: [{ url: "/images/hero/pricing-hero.jpg", alt: "Laptop displaying a quarterly revenue growth chart during a pricing review" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Retainers | Cyber Savvy Pro - Transparent Pricing",
    description:
      "Choose between flexible monthly retainers for ongoing development and IT management, or milestone-based fixed pricing for custom software builds.",
    images: ["/images/hero/pricing-hero.jpg"],
  },
};

export default async function PricingPage() {
  const pricingData = await getPricing();
  const retainerPackages = pricingData.retainers;
  const customProjects = pricingData.projects;

  return (
    <div className="bg-gray-50 pb-20">
      <section className="relative overflow-hidden border-b border-gray-200 bg-slate-950">
        {/* Hero background image (native 1920×600) */}
        <Image
          src="/images/hero/pricing-hero.jpg"
          alt="Laptop displaying a quarterly revenue growth chart during a pricing review"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_50%]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span>💎</span>
            <span>Transparent Pricing & Retainers</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Predictable Investment.{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Maximum Business Value.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl leading-relaxed">
            Choose between flexible monthly retainers for ongoing development and IT management, or milestone-based fixed pricing for custom software builds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Monthly Retainers</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Ongoing engineering & growth support</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {retainerPackages.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col justify-between rounded-3xl border bg-white p-8 transition-all hover:shadow-xl ${
                p.popular
                  ? "border-indigo-600 shadow-xl ring-2 ring-indigo-600"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-xl font-black text-gray-900">{p.name}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed min-h-[40px]">{p.target}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">{p.price}</span>
                  <span className="text-sm font-semibold text-gray-500">{p.period}</span>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Included in Retainer:</p>
                  <ul className="space-y-3">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-gray-700">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/contact"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${
                    p.popular ? "bg-indigo-600 text-white shadow hover:bg-indigo-700" : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Fixed-Scope Projects</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Milestone-based delivery</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {customProjects.map((proj) => (
            <div
              key={proj.title}
              className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <div>
                <h3 className="text-xl font-black text-gray-900">{proj.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{proj.desc}</p>

                <div className="mt-6 rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Pricing & Timeline</div>
                  <div className="mt-1 text-xl font-black text-gray-900">{proj.priceRange}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">Estimated Delivery: {proj.timeline}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow hover:bg-indigo-700 transition-all"
                >
                  Get Custom Scoping Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Compare Your Options
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Retainer vs Fixed-Scope Project
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Choose the engagement model that matches your business needs and budget.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-4 text-sm font-bold text-indigo-600 uppercase tracking-wider">Monthly Retainer</th>
                <th className="px-6 py-4 text-sm font-bold text-indigo-600 uppercase tracking-wider">Fixed-Scope Project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Best for</td>
                <td className="px-6 py-4 text-gray-600">Ongoing development, maintenance, and growth support</td>
                <td className="px-6 py-4 text-gray-600">One-time builds with a defined scope and deadline</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Pricing</td>
                <td className="px-6 py-4 text-gray-600">Fixed monthly fee (cancel anytime)</td>
                <td className="px-6 py-4 text-gray-600">Milestone-based project quote</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Dedicated capacity</td>
                <td className="px-6 py-4 text-gray-600">Reserved developer hours each month</td>
                <td className="px-6 py-4 text-gray-600">Full team for project duration</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Changes & pivots</td>
                <td className="px-6 py-4 text-gray-600">Flexible — adjust priorities monthly</td>
                <td className="px-6 py-4 text-gray-600">Scope changes via change order</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Support & maintenance</td>
                <td className="px-6 py-4 text-gray-600">Included — updates, patches, monitoring</td>
                <td className="px-6 py-4 text-gray-600">Handoff + optional care plan</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Timeline</td>
                <td className="px-6 py-4 text-gray-600">Ongoing, month-to-month</td>
                <td className="px-6 py-4 text-gray-600">Fixed start and delivery dates</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Get started</td>
                <td className="px-6 py-4">
                  <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">Request retainer proposal</Link>
                </td>
                <td className="px-6 py-4">
                  <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">Get custom scoping quote</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gray-900 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Founder Commitment</span>
            <h3 className="mt-2 text-2xl font-black sm:text-3xl">Need a tailored proposal or custom billing schedule?</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Sam Maina is available to discuss hybrid retainers, milestone payments, or localized Kenyan Shillings invoices tailored to your company budget.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-500 transition-all text-center"
            >
              Request Custom Proposal
            </Link>
            <a
              href="tel:+254722359298"
              className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all text-center"
            >
              Call +254 722 359 298
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
