import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About Cyber Savvy Pro | Founder Sam Maina & Our Story",
  description:
    "Learn about Cyber Savvy Pro, our founder Sam Maina, our engineering standards, our headquarters along Mombasa Road, and our commitment to software excellence.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Cyber Savvy Pro | Founder Sam Maina & Our Story",
    description:
      "Learn about Cyber Savvy Pro, our founder Sam Maina, our engineering standards, our headquarters along Mombasa Road, and our commitment to software excellence.",
    url: "/about",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Two developers pair programming, with source code visible on the laptop screen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Cyber Savvy Pro | Founder Sam Maina & Our Story",
    description:
      "Learn about Cyber Savvy Pro, our founder Sam Maina, our engineering standards, our headquarters along Mombasa Road, and our commitment to software excellence.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

// Admin edits to stats/values must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const stats = await getPageSection("about-stats");
  const values = await getPageSection("about-values");
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        {/* Hero background image */}
        <Image
          src="/images/hero/hero-coding-team.jpg"
          alt="Two developers pair programming, with source code visible on the laptop screen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/85" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span>🏢</span>
            <span>About Cyber Savvy Pro</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building High-Impact Software & IT Infrastructure —{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Crafted in Nairobi for the World
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl leading-relaxed">
            Founded by <strong className="text-white">Sam Maina</strong>, Cyber Savvy Pro is an elite technology agency specializing in full-stack web and mobile development, custom enterprise ERPs, digital marketing growth, and managed IT services.
          </p>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black text-indigo-600 sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-14 shadow-lg">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="inline-block relative">
                <Image
                  src="/images/Sam.png"
                  alt="Sam Maina, Founder of Cyber Savvy Pro"
                  width={144}
                  height={144}
                  className="h-36 w-36 rounded-3xl object-cover shadow-xl mx-auto lg:mx-0"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 border-4 border-white p-2 text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-6 text-2xl font-black text-gray-900">Sam Maina</h3>
              <p className="text-sm font-bold text-indigo-600">Founder & Lead Software Architect</p>
              <div className="mt-4 space-y-1.5 text-xs text-gray-600">
                <p>📍 Location: Mombasa Road, Nairobi</p>
                <p>📞 Phone: +254 722 359 298</p>
                <p>✉️ Email: samuelmaina@gmail.com</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                A Note From The Founder
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                &ldquo;We engineer software as a strategic advantage, not an afterthought.&rdquo;
              </h2>
              <div className="mt-6 space-y-4 text-base text-gray-600 leading-relaxed">
                <p>
                  I founded Cyber Savvy Pro with a simple yet uncompromising standard: to give forward-thinking businesses access to high-caliber software engineering, custom enterprise programs, and digital growth strategies without the friction, delays, and poor communication typical of traditional agencies.
                </p>
                <p>
                  Whether we are architecting a custom ERP system to replace manual paper trails, ranking a business on Page 1 of Google, or locking down corporate network infrastructure against cyber threats, my team and I bring rigorous craftsmanship and obsessive attention to detail to every project.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700 transition-all"
                >
                  Schedule a Call with Sam
                </Link>
                <a
                  href="tel:+254722359298"
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Direct Call: +254 722 359 298
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Our Core Principles
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What sets Cyber Savvy Pro apart
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                {v.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{v.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Our Purpose
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Mission &amp; Vision
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Why we build, and where we are headed.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Mission Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl mb-6">
              🎯
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To give forward-thinking businesses access to high-caliber software
              engineering, custom enterprise programs, and digital growth strategies
              — without the friction, delays, and poor communication typical of
              traditional agencies.
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl mb-6">
              🔭
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted technology partner for businesses across Kenya
              and beyond — crafting software that doesn&apos;t just work, but drives
              measurable revenue growth, operational efficiency, and lasting customer
              delight.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            How We Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Approach
          </h2>
          <p className="mt-3 text-base text-gray-600">
            The principles that guide every project we touch.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
          {[
            {
              icon: "📋",
              title: "Discovery First",
              description:
                "We listen before we build. Every project starts with understanding your business goals, users, and constraints.",
            },
            {
              icon: "🏗️",
              title: "Engineering Excellence",
              description:
                "Clean architecture, maintainable code, and rigorous testing — so your software scales without breaking.",
            },
            {
              icon: "🤝",
              title: "No Hand-offs to Juniors",
              description:
                "The same senior team that scopes your project builds and supports it. You deal directly with experienced engineers.",
            },
            {
              icon: "📈",
              title: "Measurable Impact",
              description:
                "We focus on outcomes — revenue growth, cost savings, and efficiency gains — not just shipping features.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Let&apos;s build something extraordinary together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Visit us along Mombasa Road, Nairobi or request a remote scoping workshop.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg hover:bg-gray-100 transition-all"
            >
              Request Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}