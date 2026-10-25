import type { Metadata } from "next";
import Link from "next/link";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "WordPress Development & Custom Business Websites | Cyber Savvy Pro",
  description:
    "WordPress design and development for professional business websites, SEO-friendly content sites, and WooCommerce storefronts built for growth.",
  alternates: { canonical: '/services/wordpress-development' },
  openGraph: {
    title: 'WordPress Development & Custom Business Websites | Cyber Savvy Pro',
    description:
      'WordPress design and development for professional business websites, SEO-friendly content sites, and WooCommerce storefronts built for growth.',
    url: '/services/wordpress-development',
    type: 'website',
    images: [{ url: '/images/hero/full-stack.jpg', alt: 'Custom WordPress business website development' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Development & Custom Business Websites | Cyber Savvy Pro',
    description:
      'WordPress design and development for professional business websites, SEO-friendly content sites, and WooCommerce storefronts.',
    images: ['/images/hero/full-stack.jpg'],
  },
};

// Admin edits to services/process must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function WordPressDevelopmentPage() {
  const wordpressServices = await getPageSection("services-wordpress-list");
  const process = await getPageSection("services-wordpress-process");
  return (
    <div className="bg-gray-50 pb-20">
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📝</span>
            <span>WordPress for Growing Businesses</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Powerful WordPress websites built for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              trust, traffic, and conversions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Whether you need a clean corporate website, a content-rich marketing platform, or a WooCommerce storefront, we build WordPress experiences that look polished and perform under real business pressure.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Request a WordPress Quote
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

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            What we deliver
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Clean design. Smart functionality. Business-ready results.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wordpressServices.map((s) => (
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
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Includes:</p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d: string) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-14">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Our process
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A simple, reliable path from concept to launch
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.step} className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
                <span className="text-2xl font-black text-indigo-600">{step.step}</span>
                <h3 className="mt-3 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Need a WordPress website that actually drives results?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Let’s build a website that represents your business professionally and helps turn traffic into enquiries, sales, and loyal clients.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Book a Free Consultation
            </Link>
            <a
              href="mailto:samuelmaina@gmail.com"
              className="w-full rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Email samuelmaina@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
