import type { Metadata } from "next";
import FaqClient from "./FaqClient";
import { getFaqs } from "@/lib/cms";
import { getEnvSiteUrl } from "@/lib/site";

const siteUrl = getEnvSiteUrl();

// Admin edits to FAQs must reflect immediately (page also emits JSON-LD).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | Pricing, Timelines & Tech Stack - Cyber Savvy Pro",
  description:
    "Answers about custom software vs templates, monthly retainers, M-Pesa and Stripe integrations, code ownership, and starting a project with Sam Maina.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Pricing, Timelines & Tech Stack - Cyber Savvy Pro",
    description:
      "Answers about custom software vs templates, monthly retainers, M-Pesa and Stripe integrations, code ownership, and starting a project with Sam Maina.",
    url: `${siteUrl}/faq`,
    images: [{ url: "/images/hero/faq-hero.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Pricing, Timelines & Tech Stack - Cyber Savvy Pro",
    description:
      "Answers about custom software vs templates, monthly retainers, M-Pesa and Stripe integrations, code ownership, and starting a project with Sam Maina.",
    images: ["/images/hero/faq-hero.jpg"],
  },
};

export default async function FAQPage() {
  // Main FAQ page shows general questions only; how-it-works has its own set.
  const faqs = (await getFaqs()).filter((f) => f.page !== "how-it-works");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FaqClient faqs={faqs} />
    </>
  );
}
