import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Our Engineering & Development Process | Cyber Savvy Pro",
  description:
    "Explore our rigorous 5-stage software delivery lifecycle: Discovery, Architecture, Agile Sprints, Rigorous QA Testing, and Deployment & Maintenance.",
  alternates: { canonical: '/services/development-process' },
  openGraph: {
    title: "Our Engineering & Development Process | Cyber Savvy Pro",
    description:
      "Explore our rigorous 5-stage software delivery lifecycle: Discovery, Architecture, Agile Sprints, Rigorous QA Testing, and Deployment & Maintenance.",
    url: "/services/development-process",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro engineering and development process" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Engineering & Development Process | Cyber Savvy Pro",
    description:
      "Explore our rigorous 5-stage software delivery lifecycle: Discovery, Architecture, Agile Sprints, QA Testing, and Deployment.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

// Admin edits to process stages must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function DevProcessPage() {
  const stages = await getPageSection("services-development-process-stages");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🔄</span>
            <span>Engineering Excellence Standard</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Our Proven 5-Stage{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Development Lifecycle
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            No guesswork, no missing deadlines, and no surprise costs. We follow a disciplined engineering methodology that guarantees exceptional software quality.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Start Your Project with Us
            </Link>
            <Link
              href="/case-studies"
              className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto"
            >
              See Completed Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <div className="mx-auto max-w-5xl px-4 pt-20 space-y-12 sm:px-6 lg:px-8">
        {stages.map((s) => (
          <div
            key={s.phase}
            className="flex flex-col md:flex-row gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg"
          >
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-black text-white shadow-md">
                {s.phase}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Phase {s.phase}
              </span>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900">{s.name}</h2>
              <p className="mt-2 text-sm text-indigo-600 font-semibold">{s.tagline}</p>

              <ul className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                {s.details.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to experience structured, stress-free development?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Schedule a scoping call with Sam Maina to discuss your architecture and get a detailed proposal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Request Scoping Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
