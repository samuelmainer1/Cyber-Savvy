import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTeamMembers } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Meet the Team | Cyber Savvy Pro",
  description:
    "Meet Sam Maina and the Cyber Savvy Pro engineering team — elite full-stack developers, designers, and IT specialists based along Mombasa Road, Nairobi.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Team | Cyber Savvy Pro",
    description:
      "Meet Sam Maina and the Cyber Savvy Pro engineering team — elite full-stack developers, designers, and IT specialists based along Mombasa Road, Nairobi.",
    url: "/team",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Team | Cyber Savvy Pro",
    description:
      "Meet Sam Maina and the Cyber Savvy Pro engineering team — elite full-stack developers, designers, and IT specialists based along Mombasa Road, Nairobi.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

// Fixed map so Tailwind's scanner sees every allowed avatar color literal.
const AVATAR_COLORS: Record<string, string> = {
  "bg-indigo-600": "bg-indigo-600",
  "bg-violet-600": "bg-violet-600",
  "bg-emerald-600": "bg-emerald-600",
  "bg-blue-600": "bg-blue-600",
  "bg-pink-600": "bg-pink-600",
  "bg-amber-600": "bg-amber-600",
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
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
            <span>👥</span>
            <span>Meet Our Team</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            The People Behind Your Software
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl leading-relaxed">
            Elite engineers, designers, and growth specialists based along Mombasa Road, Nairobi — crafting high-impact
            software for forward-thinking businesses.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl transition-all"
            >
              <div>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-3xl text-3xl font-bold text-white shadow-lg mb-6 ${AVATAR_COLORS[member.color] || "bg-indigo-600"}`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-black text-gray-900">{member.name}</h3>
                <p className="mt-1 text-lg font-semibold text-indigo-600">{member.role}</p>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{member.bio}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {member.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                {member.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={`w-full text-center text-sm font-bold rounded-lg px-4 py-2.5 transition-all ${
                      link.variant === "primary"
                        ? "bg-indigo-600 text-white shadow hover:bg-indigo-700"
                        : "border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Our Standards</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How We Work
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              title: "Founder-Led",
              desc: "Every project is personally overseen by Sam Maina — no account managers, no junior handoffs.",
            },
            {
              title: "Zero Trust",
              desc: "Security-first architecture with end-to-end encryption, audit logging, and air-gapped backups.",
            },
            {
              title: "Nairobi-Based",
              desc: "Headquartered along Mombasa Road, serving clients across Kenya, Africa, and globally.",
            },
            {
              title: "Transparent Pricing",
              desc: "Fixed project scopes and clear monthly retainers — no hidden fees or surprise invoices.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-2xl mb-4">
                {"✦"}
              </div>
              <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Book a scoping call with founder Sam Maina and get a formal proposal within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Schedule a Call
            </Link>
            <a
              href="tel:+254722359298"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              +254 722 359 298
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}