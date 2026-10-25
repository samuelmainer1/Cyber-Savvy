import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { getEnvSiteUrl } from "@/lib/site";

const siteUrl = getEnvSiteUrl();

export const metadata: Metadata = {
  title: "Contact Us | Request a Free Quote - Cyber Savvy Pro",
  description:
    "Tell us about your software, digital marketing, or IT project. Founder Sam Maina will review your requirements and respond within 24 hours. Call +254 722 359 298.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Request a Free Quote - Cyber Savvy Pro",
    description:
      "Tell us about your software, digital marketing, or IT project. Founder Sam Maina will review your requirements and respond within 24 hours.",
    url: `${siteUrl}/contact`,
    images: [{ url: "/images/hero/contact-hero.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Request a Free Quote - Cyber Savvy Pro",
    description:
      "Tell us about your software, digital marketing, or IT project. Founder Sam Maina will review your requirements and respond within 24 hours.",
    images: ["/images/hero/contact-hero.jpg"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Cyber Savvy Pro",
  url: `${siteUrl}/contact`,
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <ContactForm />
    </>
  );
}
