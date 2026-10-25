import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/cms";
import { slugify } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Case Studies & Client Results | Cyber Savvy Pro",
  description:
    "Explore real-world results: custom full-stack web applications, ERP automations, SEO traffic surges, and enterprise IT transformations delivered by Cyber Savvy Pro.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies & Client Results | Cyber Savvy Pro",
    description:
      "Explore real-world results: custom full-stack web applications, ERP automations, SEO traffic surges, and enterprise IT transformations delivered by Cyber Savvy Pro.",
    url: "/case-studies",
    type: "website",
    images: [{ url: "/images/hero/full-stack.jpg", alt: "Cyber Savvy Pro client results and case studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Client Results | Cyber Savvy Pro",
    description:
      "Explore real-world results: custom full-stack web applications, ERP automations, SEO traffic surges, and enterprise IT transformations delivered by Cyber Savvy Pro.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

// Admin edits to case studies must reflect immediately.
export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📊</span>
            <span>Proven Track Record</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Real Projects. Measurable Impact.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Exceptional Results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            See how Sam Maina and the Cyber Savvy Pro engineering team solve complex operational challenges, engineer bespoke systems, and accelerate client growth.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <div className="mx-auto max-w-7xl px-4 pt-16 space-y-12 sm:px-6 lg:px-8">
        {caseStudies.map((cs) => (
          <div
            key={cs.id ?? cs.client}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl sm:p-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {cs.industry}
                </span>
                <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
                  <Link href={`/case-studies/${slugify(cs.client)}`} className="hover:text-indigo-600 transition-colors">
                    {cs.client}
                  </Link>
                </h2>
                <p className="text-sm font-semibold text-indigo-600 mt-1">
                  {cs.service}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-3xl">
              {cs.summary}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl bg-gray-50 p-6 sm:grid-cols-3 border border-gray-100">
              {cs.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <div className="text-3xl font-black text-indigo-600">{m.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Want to be our next success story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Let&apos;s build a custom software system or growth campaign tailored to your exact business objectives.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100"
            >
              Start a Conversation with Sam Maina
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
