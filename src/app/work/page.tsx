import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Portfolio & Work Gallery | Cyber Savvy Pro",
  description:
    "Browse our visual portfolio of custom software, ERP systems, websites, and digital marketing campaigns delivered by Cyber Savvy Pro.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Portfolio & Work Gallery | Cyber Savvy Pro",
    description:
      "Browse our visual portfolio of custom software, ERP systems, websites, and digital marketing campaigns delivered by Cyber Savvy Pro.",
    url: "/work",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Work Gallery | Cyber Savvy Pro",
    description:
      "Browse our visual portfolio of custom software, ERP systems, websites, and digital marketing campaigns delivered by Cyber Savvy Pro.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

const workCategories = [
  { id: "all", label: "All Work" },
  { id: "web-development", label: "Web Development" },
  { id: "erp-systems", label: "ERP & Systems" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "ui-ux-design", label: "UI/UX & Branding" },
  { id: "cybersecurity", label: "Cybersecurity" },
];

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>💼</span>
            <span>Our Work</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            A Gallery of Impact
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Custom software, ERP systems, websites, and growth campaigns — each built to solve a real business problem.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {workCategories.map((cat) => (
            <button
              key={cat.id}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                cat.id === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Work Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-4xl">
                  📁
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                    {cs.industry.split(" & ")[0]}
                  </span>
                  <Link
                    href={`/case-studies/${cs.client.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    View Case Study →
                  </Link>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {cs.client}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{cs.service}</p>

                <div className="grid grid-cols-1 gap-6 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  {cs.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-center sm:text-left">
                      <div className="text-2xl font-black text-indigo-600">{m.value}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{m.label}</div>
                    </div>
                  ))}
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
            Want Your Work Featured Here?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Let&apos;s build your next success story together. Book a scoping call with Sam Maina.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Start a Conversation
            </Link>
            <Link
              href="/case-studies"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Read All Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}