import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Managed IT Services & Cybersecurity Solutions | Cyber Savvy Pro",
  description:
    "24/7 Managed IT support, cloud infrastructure, cybersecurity audits, network setup, data backups, and disaster recovery for modern enterprises by Cyber Savvy Pro.",
  alternates: { canonical: '/services/managed-it-cybersecurity' },
  openGraph: {
    title: "Managed IT Services & Cybersecurity Solutions | Cyber Savvy Pro",
    description:
      "24/7 Managed IT support, cloud infrastructure, cybersecurity audits, network setup, data backups, and disaster recovery for modern enterprises.",
    url: "/services/managed-it-cybersecurity",
    type: "website",
    images: [{ url: "/images/hero/cybersecurity.jpg", alt: "Cybersecurity and managed IT services monitoring" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed IT Services & Cybersecurity Solutions | Cyber Savvy Pro",
    description:
      "24/7 Managed IT support, cloud infrastructure, cybersecurity audits, network setup, data backups, and disaster recovery.",
    images: ["/images/hero/cybersecurity.jpg"],
  },
};

// Admin edits to IT services must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function ManagedITPage() {
  const itServices = await getPageSection("services-managed-it-list");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🛡️</span>
            <span>Enterprise Infrastructure & Security</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Managed IT & Cybersecurity That Protects{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Your Entire Business
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Eliminate costly downtime and security breaches. We provide 24/7 proactive IT infrastructure management, cloud operations, and military-grade cybersecurity.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Request Free IT & Security Assessment
            </Link>
            <a
              href="tel:+254722359298"
              className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto"
            >
              Emergency Support: +254 722 359 298
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Managed Services
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Complete IT protection and proactive infrastructure care
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itServices.map((s) => (
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
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Capabilities:</p>
                <ul className="space-y-1.5">
                  {s.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-14">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="p-6">
              <span className="text-3xl font-black text-indigo-600">99.99%</span>
              <h4 className="mt-2 text-lg font-bold text-gray-900">Uptime SLA</h4>
              <p className="mt-1 text-xs text-gray-600">Guaranteed system reliability backed by contractual service levels.</p>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <span className="text-3xl font-black text-indigo-600">&lt; 15 Mins</span>
              <h4 className="mt-2 text-lg font-bold text-gray-900">Emergency Response</h4>
              <p className="mt-1 text-xs text-gray-600">Direct access to senior engineers when critical incidents arise.</p>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <span className="text-3xl font-black text-indigo-600">Zero-Trust</span>
              <h4 className="mt-2 text-lg font-bold text-gray-900">Security Standard</h4>
              <p className="mt-1 text-xs text-gray-600">State-of-the-art encryption and continuous access authentication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Protect your business from downtime & cyber threats today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Schedule a free IT infrastructure assessment with founder Sam Maina.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Book Infrastructure Audit
            </Link>
            <a
              href="tel:+254722359298"
              className="w-full rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Direct Line: +254 722 359 298
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
