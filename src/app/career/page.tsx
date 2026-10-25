import type { Metadata } from "next";
import Link from "next/link";
import CareerForm from "@/components/CareerForm";
import { getCareers, getPageSection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Careers | Cyber Savvy Pro",
  description:
    "Join Cyber Savvy Pro. Explore open roles in software engineering, digital marketing, and managed IT with founder Sam Maina in Nairobi.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers | Cyber Savvy Pro",
    description:
      "Join Cyber Savvy Pro. Explore open roles in software engineering, digital marketing, and managed IT with founder Sam Maina in Nairobi.",
    url: "/career",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Careers at Cyber Savvy Pro in Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Cyber Savvy Pro",
    description:
      "Join Cyber Savvy Pro. Explore open roles in software engineering, digital marketing, and managed IT with founder Sam Maina in Nairobi.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};
// Admin edits to roles/benefits must appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function CareerPage() {
  const openings = await getCareers();
  const benefits = await getPageSection("career-benefits");

  return (
    <div className="bg-gray-50 pb-20">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-500" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/70 via-emerald-500/40 to-transparent"
        />
        <div className="relative mx-auto flex h-[350px] max-w-7xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center self-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <span>Careers at Cyber Savvy Pro</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Build software, growth systems, and{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              secure infrastructure
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
            We hire focused engineers, marketers, and IT specialists who want to work on real client systems with founder oversight.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Why join us
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A small team with high standards
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Open roles
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Current openings
          </h2>
        </div>

        <div className="mt-10 grid gap-6">
          {openings.map((role) => (
            <article
              key={role.id}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-gray-900">{role.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-indigo-600">
                    {role.type} · {role.location}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                    {role.summary}
                  </p>
                </div>
                <a
                  href="#apply"
                  className="shrink-0 rounded-xl bg-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white shadow hover:bg-indigo-700"
                >
                  Apply
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-3xl px-4 pt-20 sm:px-6 lg:px-8">
        <CareerForm />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Do not see a matching role?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Send your CV and a short note to Sam Maina. We keep strong candidates for upcoming projects.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:samuelmaina@gmail.com"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100"
            >
              Email samuelmaina@gmail.com
            </a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/20"
            >
              Use the contact form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
