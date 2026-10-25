import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Cyber Savvy Pro",
  description:
    "How Cyber Savvy Pro collects, uses, and protects your personal information when you request a quote, subscribe to our digest, or use our website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro collects, uses, and protects your personal information when you request a quote, subscribe to our digest, or use our website.",
    url: "/privacy",
    siteName: "Cyber Savvy Pro",
    images: [
      {
        url: "/images/hero/hero-coding-team.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Savvy Pro engineering team at work",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Cyber Savvy Pro",
    description:
      "How Cyber Savvy Pro collects, uses, and protects your personal information when you request a quote, subscribe to our digest, or use our website.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 pb-20">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🔒</span>
            <span>Privacy Policy</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Your data stays yours
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            Last updated October 2026. Cyber Savvy Pro (Mombasa Road, Nairobi, Kenya) collects only
            what we need to respond to inquiries and deliver client work.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl space-y-8 px-4 pt-12 text-sm leading-relaxed text-gray-700 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">1. Information we collect</h2>
          <p className="mt-2">
            Contact details you share (name, email, phone, company, project requirements) via our
            contact, career, and newsletter forms. We also receive basic analytics (pages visited,
            device type) to improve site performance.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">2. How we use it</h2>
          <p className="mt-2">
            To respond to quote requests within 24 hours, deliver proposals, send the Tech &amp;
            Growth Digest (only if you subscribe), and improve our services. We never sell your
            personal data.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">3. Client project data</h2>
          <p className="mt-2">
            Source code, databases, and credentials shared during engagements are handled under
            NDA-level confidentiality with encrypted storage and need-to-know access. Full IP
            transfers to you on final payment.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">4. Your rights</h2>
          <p className="mt-2">
            Request access, correction, or deletion of your data anytime by emailing{" "}
            <a href="mailto:samuelmaina@gmail.com" className="font-bold text-indigo-600">
              samuelmaina@gmail.com
            </a>{" "}
            or calling{" "}
            <a href="tel:+254722359298" className="font-bold text-indigo-600">
              +254 722 359 298
            </a>
            . Newsletter subscribers can unsubscribe in one click.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-700"
          >
            Questions? Contact Sam Maina
          </Link>
        </div>
      </section>
    </div>
  );
}