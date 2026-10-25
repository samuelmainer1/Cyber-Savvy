import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection, getTestimonials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Customer Stories & Testimonials - Cyber Savvy Pro",
  description:
    "See how 50+ businesses accelerate revenue, cut manual work, and delight customers with custom software from Cyber Savvy Pro.",
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: "Customer Stories & Testimonials - Cyber Savvy Pro",
    description:
      "See how 50+ businesses accelerate revenue, cut manual work, and delight customers with custom software from Cyber Savvy Pro.",
    url: "/testimonials",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro customer stories and testimonials" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Stories & Testimonials - Cyber Savvy Pro",
    description:
      "See how 50+ businesses accelerate revenue, cut manual work, and delight customers with custom software from Cyber Savvy Pro.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

// Admin edits to testimonials must reflect immediately.
export const dynamic = "force-dynamic";

// Fixed map so Tailwind's scanner sees every allowed avatar color literal.
const AVATAR_COLORS: Record<string, string> = {
  "bg-indigo-600": "bg-indigo-600",
  "bg-violet-600": "bg-violet-600",
  "bg-emerald-600": "bg-emerald-600",
  "bg-blue-600": "bg-blue-600",
  "bg-pink-600": "bg-pink-600",
  "bg-amber-600": "bg-amber-600",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const metrics = await getPageSection("testimonials-metrics");
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
            <span>⭐</span>
            <span>Customer Success Stories</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            Loved by ambitious businesses{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Discover why 50+ businesses trust founder Sam Maina to scale revenue, streamline operations, and retain customers.
          </p>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
                  {m.value}
                </div>
                <div className="mt-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id ?? t.name}
              className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(5)}
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    {t.metricsHighlight}
                  </span>
                </div>
                <blockquote className="mt-6 text-sm text-gray-700 leading-relaxed italic">
                  “{t.quote}”
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-sm shadow ${AVATAR_COLORS[t.color] || "bg-indigo-600"}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.role} · <span className="font-semibold text-indigo-600">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Join 50+ high-performing businesses
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
              className="w-full rounded-lg border border-white/40 px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Book a Scoping Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

