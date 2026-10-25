import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const docs = [
  {
    id: "getting-started",
    title: "Getting Started with Cyber Savvy Pro",
    category: "Onboarding",
    summary: "How to engage with Cyber Savvy Pro — from initial scoping call to project delivery and ongoing support.",
    content: `
      <p>Welcome to Cyber Savvy Pro. Here&apos;s how our engagement process works from first contact to delivery:</p>
      <ol>
        <li><strong>Discovery Call:</strong> Book a free 30-minute scoping call with founder Sam Maina to discuss your goals.</li>
        <li><strong>Technical Proposal:</strong> Within 24 hours, you&apos;ll receive a formal proposal with scope, timeline, and pricing.</li>
        <li><strong>Design & Wireframes:</strong> We create interactive Figma wireframes for your approval before writing code.</li>
        <li><strong>Development:</strong> Agile sprints with weekly demos, CI/CD staging, and continuous QA.</li>
        <li><strong>Launch:</strong> Zero-downtime deployment with monitoring, training, and handoff.</li>
        <li><strong>Support:</strong> Optional monthly retainer for maintenance, security, and growth.</li>
      </ol>
    `,
  },
  {
    id: "full-stack-development-guide",
    title: "Full-Stack Development Best Practices",
    category: "Engineering",
    summary: "Our standards for Next.js, React, TypeScript, Node.js, and Python backend architecture.",
    content: `
      <h3>Frontend Standards</h3>
      <ul>
        <li><strong>Framework:</strong> Next.js 15 with App Router and React Server Components.</li>
        <li><strong>Language:</strong> TypeScript with strict mode enabled.</li>
        <li><strong>Styling:</strong> Tailwind CSS with shadcn/ui component primitives.</li>
        <li><strong>State:</strong> React Query for server state, React Hook Form for client state.</li>
      </ul>
      <h3>Backend Standards</h3>
      <ul>
        <li><strong>Runtime:</strong> Node.js or Python (FastAPI) depending on project needs.</li>
        <li><strong>API:</strong> REST or GraphQL with OpenAPI documentation.</li>
        <li><strong>Database:</strong> PostgreSQL with Prisma ORM, Redis for caching.</li>
        <li><strong>Auth:</strong> NextAuth.js or SAML/SSO for enterprise clients.</li>
      </ul>
      <h3>Delivery</h3>
      <ul>
        <li>CI/CD pipelines with GitHub Actions.</li>
        <li>Zero-downtime blue-green deployments.</li>
        <li>Edge-cached API routes for global performance.</li>
      </ul>
    `,
  },
  {
    id: "zero-trust-security",
    title: "Zero-Trust Network Security",
    category: "Security",
    summary: "Implementing zero-trust infrastructure, air-gapped backups, and EDR defense for enterprise clients.",
    content: `
      <h3>Zero-Trust Principles</h3>
      <ul>
        <li><strong>Verify explicitly:</strong> Always authenticate and authorize every request.</li>
        <li><strong>Least privilege:</strong> Grant minimum access needed for each role.</li>
        <li><strong>Assume breach:</strong> Design for containment and rapid recovery.</li>
      </ul>
      <h3>Implementation</h3>
      <ul>
        <li>SAML/SSO with conditional access policies.</li>
        <li>EDR (Endpoint Detection &amp; Response) with Sentinel.</li>
        <li>Air-gapped, immutable backups with 90-day retention.</li>
        <li>Network micro-segmentation and Zero Trust Network Access (ZTNA).</li>
      </ul>
    `,
  },
  {
    id: "technical-seo-checklist",
    title: "Technical SEO Implementation Checklist",
    category: "Marketing",
    summary: "Page speed, Core Web Vitals, schema markup, and ranking factors we optimize for every client.",
    content: `
      <h3>Core Web Vitals</h3>
      <ul>
        <li>LCP (Largest Contentful Paint) under 2.5 seconds.</li>
        <li>INP (Interaction to Next Paint) under 200 milliseconds.</li>
        <li>CLS (Cumulative Layout Shift) under 0.1.</li>
      </ul>
      <h3>Technical Setup</h3>
      <ul>
        <li>Server-side rendering (SSR) for crawlable content.</li>
        <li>Structured data (JSON-LD) for organizations, products, and FAQs.</li>
        <li>XML sitemaps and robots.txt management.</li>
        <li>Canonical tags and hreflang for multi-region sites.</li>
      </ul>
    `,
  },
  {
    id: "erp-implementation",
    title: "Custom ERP Implementation Guide",
    category: "Systems",
    summary: "Replacing legacy spreadsheets with cloud ERPs — workflow design, data migration, and user training.",
    content: `
      <h3>Phased Approach</h3>
      <ol>
        <li><strong>Discovery:</strong> Map current processes, pain points, and data flows.</li>
        <li><strong>Design:</strong> Model workflows, user roles, and permissions.</li>
        <li><strong>Build:</strong> Develop custom modules, integrations, and reports.</li>
        <li><strong>Migrate:</strong> Clean and import legacy data with validation.</li>
        <li><strong>Train:</strong> Hands-on user training and SOP documentation.</li>
        <li><strong>Launch:</strong> Parallel run, cutover, and hypercare support.</li>
      </ol>
    `,
  },
  {
    id: "wordpress-maintenance",
    title: "WordPress Site Maintenance Playbook",
    category: "Maintenance",
    summary: "Security patching, backups, uptime monitoring, and content updates for WordPress sites.",
    content: `
      <h3>Monthly Care Plan</h3>
      <ul>
        <li>WordPress core, theme, and plugin updates.</li>
        <li>Security scanning and malware removal.</li>
        <li>Daily automated offsite backups.</li>
        <li>Uptime monitoring with 24/7 alerting.</li>
        <li>Content updates and page edits on request.</li>
      </ul>
      <h3>Performance</h3>
      <ul>
        <li>Caching and CDN configuration.</li>
        <li>Image optimization and lazy loading.</li>
        <li>Database cleanup and optimization.</li>
      </ul>
    `,
  },
  {
    id: "api-integration",
    title: "Third-Party API Integration Standards",
    category: "Engineering",
    summary: "Connecting Stripe, M-Pesa, Google Maps, Salesforce, and other APIs securely and reliably.",
    content: `
      <h3>Supported Integrations</h3>
      <ul>
        <li><strong>Payments:</strong> Stripe, M-Pesa, PayPal.</li>
        <li><strong>CRM:</strong> Salesforce, HubSpot.</li>
        <li><strong>Maps:</strong> Google Maps API, Mapbox.</li>
        <li><strong>Communication:</strong> Twilio, SendGrid, Sendinblue.</li>
      </ul>
      <h3>Security Standards</h3>
      <ul>
        <li>API keys stored in environment variables, never in code.</li>
        <li>OAuth 2.0 where available.</li>
        <li>Webhook signature verification.</li>
        <li>Rate limiting and retry logic with exponential backoff.</li>
      </ul>
    `,
  },
  {
    id: "disaster-recovery",
    title: "Disaster Recovery & Business Continuity",
    category: "Security",
    summary: "Air-gapped backups, RTO/RPO planning, and failover procedures for mission-critical infrastructure.",
    content: `
      <h3>Recovery Objectives</h3>
      <ul>
        <li><strong>RTO:</strong> Recovery Time Objective under 4 hours for critical systems.</li>
        <li><strong>RPO:</strong> Recovery Point Objective under 1 hour for transactional data.</li>
      </ul>
      <h3>Backup Strategy</h3>
      <ul>
        <li>Daily incremental, weekly full backups.</li>
        <li>Air-gapped, immutable copies in separate regions.</li>
        <li>Quarterly restore testing and drills.</li>
        <li>90-day retention for compliance.</li>
      </ul>
    `,
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doc = docs.find((d) => d.id === params.slug);
  if (!doc) {
    return { title: "Documentation Not Found | Cyber Savvy Pro" };
  }
  return {
    title: `${doc.title} | Cyber Savvy Pro Docs`,
    description: doc.summary,
    alternates: { canonical: `/docs/${doc.id}` },
    openGraph: {
      title: `${doc.title} | Cyber Savvy Pro Docs`,
      description: doc.summary,
      url: `/docs/${doc.id}`,
      type: "website",
      images: [{ url: "/images/hero/hero-coding-team.jpg", alt: doc.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} | Cyber Savvy Pro Docs`,
      description: doc.summary,
      images: ["/images/hero/hero-coding-team.jpg"],
    },
  };
}

export default function DocsDetailPage({ params }: { params: { slug: string } }) {
  const doc = docs.find((d) => d.id === params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="bg-gray-50 pb-20">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:w-80 flex-shrink-0 hidden lg:block">
            <div className="space-y-3">
              <Link
                href="/docs"
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                ← Back to Knowledge Base
              </Link>
              <nav className="mt-6 space-y-2">
                {docs.map((d) => (
                  <Link
                    key={d.id}
                    href={`/docs/${d.id}`}
                    className={`block px-3 py-2 rounded-xl text-sm transition-all ${
                      d.id === doc.id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                    }`}
                  >
                    {d.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-4">
              <span>{doc.category}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-6">{doc.title}</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">{doc.summary}</p>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: doc.content }} />
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
              <Link href="/docs" className="text-sm font-semibold text-indigo-600 hover:underline">
                ← All Documentation
              </Link>
              <Link href="/contact" className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-all">
                Ask an Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}