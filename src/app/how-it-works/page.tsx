import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs, getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "How We Deliver - Scoping to Launch & Support - Cyber Savvy Pro",
  description:
    "How Cyber Savvy Pro delivers: free scoping with Sam Maina, fixed proposal in 48 hours, sprint builds with staging links, launch, and ongoing support.",
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: "How We Deliver - Scoping to Launch & Support - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro delivers: free scoping with Sam Maina, fixed proposal in 48 hours, sprint builds with staging links, launch, and ongoing support.",
    url: "/how-it-works",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "How Cyber Savvy Pro works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Deliver - Scoping to Launch & Support - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro delivers: free scoping with Sam Maina, fixed proposal in 48 hours, sprint builds with staging links, launch, and ongoing support.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

// Admin edits to steps/FAQs must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function HowItWorksPage() {
  const detailedSteps = await getPageSection("how-it-works-steps");
  const faqs = (await getFaqs()).filter((f) => f.page === "how-it-works");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>⚙️</span>
            <span>From Scoping to Support</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            How Cyber Savvy Pro delivers —{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              first call to launch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            A free scoping call with Sam Maina, a fixed proposal within 48 hours, weekly sprint builds you can watch live, and support that keeps answering after launch.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
            >
              View Pricing & Retainers
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              Talk to Sam Maina
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <div className="mx-auto max-w-7xl px-4 pt-20 space-y-24 sm:px-6 lg:px-8">
        {detailedSteps.map((s, idx) => (
          <section
            key={s.step}
            className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
              idx % 2 === 1 ? "lg:grid-flow-dense" : ""
            }`}
          >
            <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
              <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                <span>STEP {s.step}</span>
                <span>•</span>
                <span>{s.badge}</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {s.title}
              </h2>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                {s.description}
              </p>

              <ul className="mt-6 space-y-3">
                {s.points.map((pt: string) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-xs mt-0.5">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={idx % 2 === 1 ? "lg:col-start-1" : ""}>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-tr from-indigo-50 via-white to-violet-50 p-8 shadow-sm">
                <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                      <span className="text-xs font-semibold text-gray-400 ml-2">
                        {s.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">Active</span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="h-8 rounded-lg bg-gray-100 animate-pulse w-3/4" />
                    <div className="h-20 rounded-lg bg-indigo-50/50 p-4 border border-indigo-100">
                      <div className="h-3 rounded bg-indigo-200 w-1/2 mb-2" />
                      <div className="h-3 rounded bg-indigo-200 w-5/6" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 rounded bg-gray-100 flex-1" />
                      <div className="h-8 rounded bg-indigo-600 w-24 text-white flex items-center justify-center text-xs font-bold">
                        Confirm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Mini FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Frequently Asked Questions about Getting Started
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Have questions before diving in? Here is everything you need to know.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold text-gray-900">{f.q}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          >
            View all frequently asked questions →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Start with a free scoping call
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Join 50+ businesses that trust Sam Maina with custom software and growth.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-indigo-700 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              View pricing
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-white/40 px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

