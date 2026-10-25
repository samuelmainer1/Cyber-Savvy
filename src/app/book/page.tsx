import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/cms";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a Demo | Cyber Savvy Pro",
  description:
    "Schedule a free scoping call with founder Sam Maina. Get a custom technical proposal within 24 hours for your software, IT, or digital marketing project.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Demo | Cyber Savvy Pro",
    description:
      "Schedule a free scoping call with founder Sam Maina. Get a custom technical proposal within 24 hours.",
    url: "/book",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Book a demo with Cyber Savvy Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | Cyber Savvy Pro",
    description:
      "Schedule a free scoping call with founder Sam Maina. Get a custom technical proposal within 24 hours.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export const dynamic = "force-dynamic";

const serviceOptions = [
  { value: "full-stack-development", label: "Full-Stack Web & Mobile Development" },
  { value: "custom-systems", label: "Custom ERPs & Business Automation" },
  { value: "digital-marketing", label: "Digital Marketing & SEO" },
  { value: "wordpress-development", label: "WordPress Development" },
  { value: "ui-ux-design-branding", label: "UI/UX Design & Branding" },
  { value: "managed-it-cybersecurity", label: "Managed IT & Cybersecurity" },
  { value: "website-maintenance-support", label: "Website Maintenance & Support" },
  { value: "development-process", label: "Development Process Consulting" },
  { value: "pricing-retainers", label: "Pricing & Monthly Retainers" },
  { value: "other", label: "Other / Not Sure" },
];

export default async function BookDemoPage() {
  // Budget brackets are managed from the admin dashboard (Settings tab).
  const { bookBudgets } = await getSiteSettings();
  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>📅</span>
            <span>Book a Free Scoping Call</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Let&apos;s Build Something Extraordinary
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Book a 30-minute discovery call with founder <strong>Sam Maina</strong>. We&apos;ll discuss your goals, technical requirements, and timeline — no obligation, no sales pitch.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <BookingForm serviceOptions={serviceOptions} budgets={bookBudgets} />

          <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 text-xl font-bold shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Prefer to call directly?</h4>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Reach Sam Maina directly at <a href="tel:+254722359298" className="font-semibold text-indigo-600 hover:underline">+254 722 359 298</a>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 text-xl font-bold shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Email us</h4>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Send your project brief to <a href="mailto:samuelmaina@gmail.com" className="font-semibold text-indigo-600 hover:underline">samuelmaina@gmail.com</a>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 text-xl font-bold shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Visit us</h4>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Our office is along Mombasa Road, Nairobi. Remote scoping workshops available worldwide.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-indigo-600 bg-indigo-50 p-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-2">What happens next?</h4>
                <ol className="list-disc list-inside text-sm text-indigo-700 space-y-2">
                  <li>We review your submission within 4 business hours.</li>
                  <li>Sam schedules a 30-minute discovery call at your convenience.</li>
                  <li>You receive a formal proposal with scope, timeline, and pricing within 24 hours.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Frequently Asked</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Common Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Is the discovery call really free?",
              a: "Yes. The 30-minute scoping call with Sam Maina is completely free with no obligation.",
            },
            {
              q: "How soon will I hear back?",
              a: "We respond within 4 business hours and schedule your call within 24–48 hours.",
            },
            {
              q: "Do you work with international clients?",
              a: "Yes. We serve clients across Kenya, Africa, and globally — all scoping calls run remotely via video.",
            },
            {
              q: "What should I prepare for the call?",
              a: "Just bring your goals and any existing documentation. We&apos;ll help shape the technical approach together.",
            },
          ].map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <button className="w-full flex justify-between items-center text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                {faq.q}
              </button>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Book your free scoping call with Sam Maina today.
          </p>
          <Link
            href="#booking-form"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100"
          >
            Book My Free Call
          </Link>
        </div>
      </section>
    </div>
  );
}