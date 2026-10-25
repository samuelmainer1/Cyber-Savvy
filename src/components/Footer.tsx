import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Founder Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Cyber Savvy Pro"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white">
                    Cyber Savvy
                  </span>
                  <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                  Full-Stack · IT · Digital Marketing
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-gray-400 leading-relaxed">
              We are an elite software engineering, digital marketing, and enterprise IT agency founded by <strong className="text-white">Sam Maina</strong>. We build high-performance digital systems, custom programs, and growth engines that scale businesses.
            </p>

            {/* Direct Contact Details */}
            <div className="mt-6 space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
                <span className="font-bold text-indigo-400">Founder:</span>
                <span className="text-white font-semibold">Sam Maina</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span className="font-bold text-indigo-400">Phone:</span>
                <a href="tel:+254722359298" className="hover:text-white transition-colors">
                  +254 722 359 298
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="font-bold text-indigo-400">Email:</span>
                <a href="mailto:samuelmaina@gmail.com" className="hover:text-white transition-colors">
                  samuelmaina@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="font-bold text-indigo-400">Location:</span>
                <span>Mombasa Road, Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/254722359298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/cyber-savvy-pro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cyber Savvy Pro on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/cybersavvypro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cyber Savvy Pro on X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-gray-400 hover:bg-white hover:text-gray-950"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/cybersavvypro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cyber Savvy Pro on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/cybersavvypro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cyber Savvy Pro on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-pink-500 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/full-stack-development">
                  Full-Stack Development
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/custom-systems">
                  Custom Systems & Programs
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/digital-marketing">
                  Digital Marketing & SEO
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/wordpress-development">
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/managed-it-cybersecurity">
                  Managed IT & Cybersecurity
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/ui-ux-design-branding">
                  UI/UX Design & Branding
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/website-maintenance-support">
                  Website Maintenance & Support
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/mobile-app-development">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/services/development-process">
                  Development Process
                </Link>
              </li>
              <li className="pt-1.5">
                <Link className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors" href="/services">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/about">
                  About Cyber Savvy Pro
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/team">
                  Our Team
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/case-studies">
                  Case Studies & Results
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/features">
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/how-it-works">
                  How We Deliver
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/pricing">
                  Pricing & Retainers
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/blog">
                  Engineering & Growth Blog
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/career">
                  Career
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/faq">
                  FAQ & Tech Stack
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/contact">
                  Request Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/docs">
                  Knowledge Base & Docs
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition-colors" href="/updates">
                  Product Updates & Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Digest */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Tech & Growth Digest
            </h4>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Get monthly insights on software architecture, SEO rankings, and IT security straight from our engineering desk.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-gray-800 py-2 text-xs text-gray-500 sm:justify-between">
          <span>© {new Date().getFullYear()} Cyber Savvy Pro. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
