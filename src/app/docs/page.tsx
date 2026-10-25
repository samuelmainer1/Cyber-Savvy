import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Base & Documentation | Cyber Savvy Pro",
  description:
    "Technical documentation, implementation guides, and best practices from Cyber Savvy Pro — covering full-stack development, cybersecurity, SEO, and managed IT.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Knowledge Base & Documentation | Cyber Savvy Pro",
    description:
      "Technical documentation, implementation guides, and best practices from Cyber Savvy Pro.",
    url: "/docs",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro knowledge base" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Base & Documentation | Cyber Savvy Pro",
    description:
      "Technical documentation, implementation guides, and best practices from Cyber Savvy Pro.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

const docs = [
  {
    id: "getting-started",
    title: "Getting Started with Cyber Savvy Pro",
    category: "Onboarding",
    summary: "How to engage with Cyber Savvy Pro — from initial scoping call to project delivery and ongoing support.",
    href: "/docs/getting-started",
  },
  {
    id: "full-stack-development-guide",
    title: "Full-Stack Development Best Practices",
    category: "Engineering",
    summary: "Our standards for Next.js, React, TypeScript, Node.js, and Python backend architecture.",
    href: "/docs/full-stack-development-guide",
  },
  {
    id: "zero-trust-security",
    title: "Zero-Trust Network Security",
    category: "Security",
    summary: "Implementing zero-trust infrastructure, air-gapped backups, and EDR defense for enterprise clients.",
    href: "/docs/zero-trust-security",
  },
  {
    id: "technical-seo-checklist",
    title: "Technical SEO Implementation Checklist",
    category: "Marketing",
    summary: "Page speed, Core Web Vitals, schema markup, and ranking factors we optimize for every client.",
    href: "/docs/technical-seo-checklist",
  },
  {
    id: "erp-implementation",
    title: "Custom ERP Implementation Guide",
    category: "Systems",
    summary: "Replacing legacy spreadsheets with cloud ERPs — workflow design, data migration, and user training.",
    href: "/docs/erp-implementation",
  },
  {
    id: "wordpress-maintenance",
    title: "WordPress Site Maintenance Playbook",
    category: "Maintenance",
    summary: "Security patching, backups, uptime monitoring, and content updates for WordPress sites.",
    href: "/docs/wordpress-maintenance",
  },
  {
    id: "api-integration",
    title: "Third-Party API Integration Standards",
    category: "Engineering",
    summary: "Connecting Stripe, M-Pesa, Google Maps, Salesforce, and other APIs securely and reliably.",
    href: "/docs/api-integration",
  },
  {
    id: "disaster-recovery",
    title: "Disaster Recovery & Business Continuity",
    category: "Security",
    summary: "Air-gapped backups, RTO/RPO planning, and failover procedures for mission-critical infrastructure.",
    href: "/docs/disaster-recovery",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Onboarding: "bg-indigo-100 text-indigo-700",
  Engineering: "bg-emerald-100 text-emerald-700",
  Security: "bg-rose-100 text-rose-700",
  Marketing: "bg-amber-100 text-amber-700",
  Systems: "bg-blue-100 text-blue-700",
  Maintenance: "bg-violet-100 text-violet-700",
};

export default function DocsPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📚</span>
            <span>Knowledge Base</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Developer & Client Documentation
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Technical guides, implementation playbooks, and best practices from Sam Maina and the Cyber Savvy Pro engineering team.
          </p>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "All",
            "Onboarding",
            "Engineering",
            "Security",
            "Marketing",
            "Systems",
            "Maintenance",
          ].map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                cat === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {docs.map((doc) => (
            <Link
              key={doc.id}
              href={doc.href}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold mb-3 ${CATEGORY_COLORS[doc.category] || "bg-gray-100 text-gray-600"}`}>
                {doc.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{doc.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Need technical help?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Our engineers can assist with architecture reviews, security audits, and custom implementation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Request Technical Consultation
            </Link>
            <Link
              href="/book"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Book a Scoping Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}