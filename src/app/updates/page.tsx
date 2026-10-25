import type { Metadata } from "next";
import Link from "next/link";
import { getUpdates } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Product Updates & Changelog | Cyber Savvy Pro",
  description:
    "Stay up to date with the latest product releases, feature launches, and engineering updates from Cyber Savvy Pro.",
  alternates: { canonical: "/updates" },
  openGraph: {
    title: "Product Updates & Changelog | Cyber Savvy Pro",
    description:
      "Stay up to date with the latest product releases, feature launches, and engineering updates from Cyber Savvy Pro.",
    url: "/updates",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro product updates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Updates & Changelog | Cyber Savvy Pro",
    description:
      "Stay up to date with the latest product releases, feature launches, and engineering updates from Cyber Savvy Pro.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  Launch: "bg-indigo-600",
  Feature: "bg-emerald-600",
  Improvement: "bg-amber-600",
  Security: "bg-rose-600",
};

export default async function UpdatesPage() {
  // Newest first — dates are ISO-style "YYYY-MM-DD" strings.
  const updates = (await getUpdates()).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📢</span>
            <span>Product Updates</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            What&apos;s New at Cyber Savvy Pro
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Latest releases, feature launches, security updates, and engineering notes — shipped by Sam Maina and the team.
          </p>
        </div>
      </section>

      {/* Updates List */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {updates.map((u) => (
            <div
              key={u.id}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${CATEGORY_COLORS[u.category] || "bg-indigo-600"}`}
                  >
                    {u.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white bg-gray-900 ${u.tag === "New" ? "bg-emerald-500" : u.tag === "Security" ? "bg-rose-500" : "bg-indigo-500"}`}
                  >
                    {u.tag}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">{u.date}</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl font-black text-gray-900">{u.version.replace("v", "")}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{u.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {u.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Need a custom update or feature?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Book a scoping call with Sam Maina to discuss your product roadmap.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Schedule a Call
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}