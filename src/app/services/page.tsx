import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/cms";

// Services are managed from the admin panel — render at request time so
// edits go live immediately (same policy as /blog and the homepage).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Services | Development, Marketing & IT - Cyber Savvy Pro",
  description:
    "Explore every Cyber Savvy Pro service: full-stack web development, custom systems and ERPs, digital marketing and SEO, WordPress, UI/UX design, managed IT, cybersecurity, website maintenance, and our development process.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "All Services | Development, Marketing & IT - Cyber Savvy Pro",
    description:
      "Full-stack development, custom ERPs, digital marketing & SEO, UI/UX, managed IT, cybersecurity, and website maintenance from Cyber Savvy Pro.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/images/hero/full-stack.jpg",
        alt: "Developer working on a full-stack software application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Services | Development, Marketing & IT - Cyber Savvy Pro",
    description:
      "Full-stack development, custom ERPs, digital marketing & SEO, UI/UX, managed IT, cybersecurity, and website maintenance from Cyber Savvy Pro.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span>🧩</span>
            <span>End-to-End Digital Capabilities</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Every service your business needs to{" "}
            <span className="bg-gradient-to-r from-cyan-200 to-indigo-200 bg-clip-text text-transparent">
              build, grow &amp; secure
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100 sm:text-xl">
            From custom software engineering and search ranking to 24/7 managed IT, Cyber Savvy Pro
            delivers every capability under one accountable team led by founder Sam Maina.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100"
            >
              Request Free Consultation
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              View Pricing &amp; Retainers
            </Link>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Our Services</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Capabilities engineered for measurable outcomes
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Each engagement is scoped, built, and supported by the same senior team — no hand-offs to
            juniors.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  {s.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={s.link}
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Learn more about {s.title} <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Not sure which service fits your project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Describe your goals and Sam Maina will recommend the right scope, stack, and budget within
            24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg hover:bg-gray-100 transition-all"
            >
              Talk to Sam Maina
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
