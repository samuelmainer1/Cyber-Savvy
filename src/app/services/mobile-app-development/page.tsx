import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mobile App Development | iOS & Android Apps - Cyber Savvy Pro",
  description:
    "Cross-platform iOS and Android mobile apps built with React Native and Flutter. Native performance, shared business logic, and rapid time-to-market from Cyber Savvy Pro.",
  alternates: { canonical: "/services/mobile-app-development" },
  openGraph: {
    title: "Mobile App Development | iOS & Android Apps - Cyber Savvy Pro",
    description:
      "Cross-platform iOS and Android mobile apps built with React Native and Flutter from Cyber Savvy Pro.",
    url: "/services/mobile-app-development",
    type: "website",
    images: [
      {
        url: "/images/hero/full-stack.jpg",
        alt: "Mobile app development on iOS and Android",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development | iOS & Android Apps - Cyber Savvy Pro",
    description:
      "Cross-platform iOS and Android mobile apps built with React Native and Flutter from Cyber Savvy Pro.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

// Admin edits to page content must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function MobileAppDevelopmentPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-gray-50"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📱</span>
            <span>Cross-Platform Mobile Apps</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Mobile Apps Built for Real Users, Not Just App Stores
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            We build iOS and Android apps with React Native and Flutter — sharing business logic across
            platforms for faster delivery, lower cost, and native performance on every device.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:w-auto"
            >
              Discuss Your Mobile App
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

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Mobile Capabilities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything your mobile product needs to succeed
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                📱
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Cross-Platform Development</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                One codebase for iOS and Android using React Native and Flutter — faster builds, easier
                maintenance, consistent experience.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                ⚡
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Native Performance</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Compiled to native code with smooth animations, responsive gestures, and full device
                hardware access — camera, GPS, biometrics, and push notifications.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🚀
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">Rapid Time-to-Market</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Shared business logic and reusable components cut development time in half. Launch on both
                app stores simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            How We Build
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            From idea to App Store launch
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            { step: "01", title: "Discovery", desc: "Define app goals, target users, and platform strategy." },
            { step: "02", title: "Design", desc: "Figma prototypes and user flows validated before code." },
            { step: "03", title: "Build", desc: "Agile sprints with shared React Native / Flutter codebase." },
            { step: "04", title: "Test", desc: "Device testing, QA, and performance tuning across iOS & Android." },
            { step: "05", title: "Launch", desc: "App Store & Play Store submission, release management, and support." },
          ].map((s) => (
            <div key={s.step} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-indigo-50 text-2xl mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to launch your mobile app?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Sam Maina will help you scope, build, and ship your iOS and Android app on time and on budget.
          </p>
          <div className="mt-8 flex justify-center sm:flex-row gap-3">
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