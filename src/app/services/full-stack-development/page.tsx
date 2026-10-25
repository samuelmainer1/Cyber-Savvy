import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Full-Stack Web & App Development | Cyber Savvy Pro",
  description:
    "End-to-end full-stack development using Next.js, React, Node.js, Python, TypeScript and cloud infrastructure. Scalable web applications and enterprise platforms.",
  alternates: { canonical: '/services/full-stack-development' },
  openGraph: {
    title: "Full-Stack Web & App Development | Cyber Savvy Pro",
    description:
      "End-to-end full-stack development using Next.js, React, Node.js, Python, TypeScript and cloud infrastructure. Scalable web applications and enterprise platforms.",
    url: "/services/full-stack-development",
    type: "website",
    images: [{ url: "/images/hero/full-stack.jpg", alt: "Developer working on a full-stack software application" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Web & App Development | Cyber Savvy Pro",
    description:
      "End-to-end full-stack development using Next.js, React, Node.js, Python, TypeScript and cloud infrastructure.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

// Admin edits to capabilities/deliverables must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function FullStackDevPage() {
  const capabilities = await getPageSection("services-full-stack-capabilities");
  const deliverables = await getPageSection("services-full-stack-deliverables");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>💻</span>
            <span>End-to-End Software Engineering</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Elite Full-Stack Development for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              High-Growth Systems
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            From complex web portals and SaaS platforms to real-time APIs and cross-platform apps. We architect, build, and scale custom software that drives measurable revenue.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 sm:w-auto"
            >
              Request Free Technical Consultation
            </Link>
            <Link
              href="/case-studies"
              className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50 sm:w-auto"
            >
              View Past Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            What We Build
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Complete software engineering from front to back
          </h2>
          <p className="mt-3 text-base text-gray-600">
            We don’t use generic templates. Every line of code is tailored to your business rules, performance requirements, and scalability targets.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  {c.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {c.tech.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-md bg-indigo-50/70 px-2 py-0.5 text-xs font-semibold text-indigo-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Walkthrough */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-14">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Our Methodology
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How we take your project from idea to production
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((d) => (
              <div key={d.step} className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
                <span className="text-2xl font-black text-indigo-600">{d.step}</span>
                <h3 className="mt-3 text-base font-bold text-gray-900">{d.name}</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Have a custom web or software project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Speak directly with our founder Sam Maina to discuss technical feasibility, timelines, and pricing estimates.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+254722359298"
              className="w-full rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Call +254 722 359 298
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
