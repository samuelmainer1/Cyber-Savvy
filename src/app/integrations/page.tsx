import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integrations & Partners | Cyber Savvy Pro",
  description:
    "Third-party integrations and technology partnerships supported by Cyber Savvy Pro — Stripe, M-Pesa, Salesforce, Google Maps, AWS, Azure, and more.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations & Partners | Cyber Savvy Pro",
    description:
      "Third-party integrations and technology partnerships supported by Cyber Savvy Pro.",
    url: "/integrations",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro integrations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations & Partners | Cyber Savvy Pro",
    description:
      "Third-party integrations and technology partnerships supported by Cyber Savvy Pro.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

const integrations = [
  {
    category: "Payments",
    items: [
      { name: "Stripe", desc: "Recurring billing, one-time payments, and multi-currency checkout." },
      { name: "M-Pesa", desc: "Mobile money collections and disbursements for East African markets." },
      { name: "PayPal", desc: "Global payment processing with buyer/seller protection." },
    ],
  },
  {
    category: "CRM & Sales",
    items: [
      { name: "Salesforce", desc: "Two-way sync for leads, accounts, and opportunities." },
      { name: "HubSpot", desc: "Marketing automation and CRM data synchronization." },
      { name: "Pipedrive", desc: "Sales pipeline and activity tracking integration." },
    ],
  },
  {
    category: "Maps & Location",
    items: [
      { name: "Google Maps API", desc: "Geocoding, place search, and interactive maps." },
      { name: "Mapbox", desc: "Custom styled maps and geospatial analytics." },
    ],
  },
  {
    category: "Communication",
    items: [
      { name: "Twilio", desc: "SMS, WhatsApp, and voice notifications." },
      { name: "SendGrid", desc: "Transactional and marketing email delivery." },
      { name: "Slack", desc: "Real-time alerts and team collaboration webhooks." },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      { name: "Amazon Web Services (AWS)", desc: "EC2, S3, RDS, Lambda, and CloudFront hosting." },
      { name: "Microsoft Azure", desc: "Virtual machines, SQL, and Active Directory integration." },
      { name: "Vercel", desc: "Edge deployment and preview environments for Next.js apps." },
    ],
  },
  {
    category: "Security & Identity",
    items: [
      { name: "SAML / SSO", desc: "Enterprise single sign-on with conditional access." },
      { name: "Azure AD (Entra ID)", desc: "Identity and access management for corporate users." },
      { name: "AWS KMS", desc: "Key management and envelope encryption for data at rest." },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  "Payments": "💳",
  "CRM & Sales": "🤝",
  "Maps & Location": "🗺️",
  "Communication": "💬",
  "Cloud & Infrastructure": "☁️",
  "Security & Identity": "🔐",
};

export default function IntegrationsPage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🔌</span>
            <span>Integrations</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Connect Your Stack
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Cyber Savvy Pro integrates with the tools your business already uses — payments, CRM, cloud, security, and more.
          </p>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {integrations.map((cat) => (
          <div key={cat.category} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{CATEGORY_ICONS[cat.category]}</span>
              <h2 className="text-2xl font-bold text-gray-900">{cat.category}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl font-bold mb-3">
                    {item.name.charAt(0)}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Custom Integration CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Need a Custom Integration?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            We build secure, production-grade API connectors for any platform your business relies on.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Request Integration Scoping
            </Link>
            <Link
              href="/book"
              className="rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Book a Call with Sam
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}