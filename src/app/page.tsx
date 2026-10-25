import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import HomeServices from "@/components/HomeServices";
import ClientLogos from "@/components/ClientLogos";
import { getEnvSiteUrl } from "@/lib/site";
import { getHomepageCaseStudies, getHeroSlides, getPageSection, getTestimonials } from "@/lib/cms";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const siteUrl = getEnvSiteUrl();

export const metadata: Metadata = {
  title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
  description:
    "Elite software engineering, custom enterprise programs, search engine ranking, and managed IT services founded by Sam Maina. Based along Mombasa Road, Nairobi.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
    description:
      "Elite Full-Stack Development for custom systems, websites, and programs, alongside high-impact Digital Marketing, SEO Web Ranking, and Enterprise IT Services.",
    url: siteUrl,
    type: "website",
    siteName: "Cyber Savvy Pro",
    images: [{ url: "/images/hero/full-stack.jpg", alt: "Developer working on a full-stack software application" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Savvy Pro | Full-Stack Development, Digital Marketing & IT Solutions",
    description:
      "Elite software engineering, custom enterprise programs, search engine ranking, and managed IT services founded by Sam Maina. Based along Mombasa Road, Nairobi.",
    images: ["/images/hero/full-stack.jpg"],
  },
};

// Homepage must reflect admin hero edits immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // SSR the hero so crawlers see a real <h1> on first paint.
  // Admin edits still flow through: force-dynamic + client refresh.
  const initialSlides = await getHeroSlides();
  const stats = await getPageSection("home-stats");
  const caseStudiesTeaser = (await getHomepageCaseStudies()).map((cs) => ({
    client: cs.client,
    service: cs.teaserService || cs.service,
    result: cs.teaser || "",
  }));
  const testimonials = await getTestimonials();
  return (
    <div className="bg-gray-50 pb-20">
      <HeroCarousel initialSlides={initialSlides} />

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            End-to-End Capabilities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything your business needs to scale digitally
          </h2>
          <p className="mt-3 text-base text-gray-600">
            We operate as your dedicated technical partner, handling everything from code and infrastructure to search ranking and growth funnels.
          </p>
        </div>

        <HomeServices />
      </section>

      {/* Founder Profile Spotlight */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <Image
                src="/images/Sam.png"
                alt="Sam Maina, Founder of Cyber Savvy Pro"
                width={112}
                height={112}
                className="h-28 w-28 rounded-2xl object-cover shadow-lg mx-auto lg:mx-0"
              />
              <h3 className="mt-4 text-xl font-black text-gray-900">Sam Maina</h3>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Founder & Lead Architect
              </p>
              <p className="mt-2 text-xs text-gray-500">📍 Mombasa Road, Nairobi</p>
              <p className="text-xs text-gray-500">📞 +254 722 359 298</p>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                Direct founder oversight on every line of code & strategy
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Unlike bloated corporate agencies where your project is handed off to junior interns, at Cyber Savvy Pro, every client works directly with founder Sam Maina. We provide honest technical scoping, architecture planning, and agile sprint delivery.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-indigo-700 transition-all"
                >
                  Read Founder Story & Values
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Book Scoping Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Proven Results
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Recent Client Success Stories
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {caseStudiesTeaser.map((cs) => (
            <div
              key={cs.client}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {cs.service}
                </span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{cs.client}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{cs.result}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/case-studies"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Read case study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Testimonial Carousel */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Main CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Ready to transform your business with custom software & growth?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            Speak directly with Sam Maina for a free technical consultation and formal quote within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
            >
              Request Free Quote
            </Link>
            <a
              href="tel:+254722359298"
              className="w-full rounded-xl border border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Call +254 722 359 298
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
