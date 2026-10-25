import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Custom Systems, ERPs & Automation Programs | Cyber Savvy Pro",
  description:
    "Bespoke enterprise software, internal tools, ERPs, CRMs, inventory managers, and workflow automation programs engineered for maximum operational efficiency.",
  alternates: { canonical: '/services/custom-systems' },
  openGraph: {
    title: "Custom Systems, ERPs & Automation Programs | Cyber Savvy Pro",
    description:
      "Bespoke enterprise software, internal tools, ERPs, CRMs, inventory managers, and workflow automation programs engineered for maximum operational efficiency.",
    url: "/services/custom-systems",
    type: "website",
    images: [{ url: "/images/hero/full-stack.jpg", alt: "Custom ERP and enterprise system engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Systems, ERPs & Automation Programs | Cyber Savvy Pro",
    description:
      "Bespoke enterprise software, internal tools, ERPs, CRMs, inventory managers, and workflow automation programs.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

// Admin edits to the solutions grid must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function CustomSystemsPage() {
  const solutions = await getPageSection("services-custom-systems-solutions");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>⚙️</span>
            <span>Tailored Enterprise Solutions</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Custom Systems & Programs Engineered for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Flawless Operations
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Off-the-shelf software rarely fits unique business processes. We build custom ERPs, internal tools, automated pipelines, and management programs that adapt perfectly to your workflow.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Discuss Your System Needs
            </Link>
            <a
              href="tel:+254722359298"
              className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto"
            >
              Call Sam Maina Directly
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Custom Capabilities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Software built around how you work, not the other way around
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
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
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Key Advantages:</p>
                <ul className="space-y-1.5">
                  {s.benefits.map((b: string) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gray-900 p-8 text-white sm:p-14 lg:flex lg:items-center lg:justify-between shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Need a Custom Demo?
            </span>
            <h3 className="mt-2 text-3xl font-black">
              Ready to automate your manual business bottlenecks?
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              We conduct a comprehensive workflow audit to identify redundant steps and design a custom software solution with guaranteed ROI.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-500 transition-all"
            >
              Schedule System Audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
