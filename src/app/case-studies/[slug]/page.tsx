import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudies, slugify } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudies = await getCaseStudies();
  const cs = caseStudies.find((c) => slugify(c.client) === params.slug);

  if (!cs) {
    return { title: "Case Study Not Found | Cyber Savvy Pro" };
  }

  return {
    title: `${cs.client} Case Study | Cyber Savvy Pro`,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${slugify(cs.client)}` },
    openGraph: {
      title: `${cs.client} — Case Study | Cyber Savvy Pro`,
      description: cs.summary,
      url: `/case-studies/${slugify(cs.client)}`,
      type: "website",
      images: [{ url: "/images/hero/hero-coding-team.jpg", alt: `${cs.client} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.client} Case Study | Cyber Savvy Pro`,
      description: cs.summary,
      images: ["/images/hero/hero-coding-team.jpg"],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const caseStudies = await getCaseStudies();
  const cs = caseStudies.find((c) => slugify(c.client) === params.slug);

  if (!cs) {
    notFound();
  }

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📊</span>
            <span>{cs.industry}</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {cs.client}
          </h1>

          <p className="mx-auto mt-4 text-xl text-indigo-600 font-semibold sm:text-2xl">
            {cs.service}
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            {cs.summary}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 text-center">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">{m.value}</div>
                <div className="mt-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Summary */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Project Overview
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>{cs.summary}</p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Tech Stack</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Engineered With
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {cs.tech.map((t) => (
            <div key={t} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
              <span className="text-gray-500 font-medium">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Want Results Like {cs.client}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Let&apos;s build a custom system tailored to your exact business objectives.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Start a Conversation with Sam Maina
            </Link>
            <Link
              href="/case-studies"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Back to All Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}