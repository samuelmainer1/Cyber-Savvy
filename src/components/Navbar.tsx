"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect, type FormEvent } from "react";

// Mega menu mirrors the 9 real service pages (8 services + process).
// New service pages must be added here AND as a route under src/app/services.
const megaServices = [
  {
    label: "Full-Stack Web Development",
    href: "/services/full-stack-development",
    icon: "💻",
    desc: "Custom web apps, APIs & high-scale platforms",
    badge: "Core",
  },
  {
    label: "Custom Systems & ERPs",
    href: "/services/custom-systems",
    icon: "⚙️",
    desc: "Bespoke operations portals & internal tools",
    badge: "Popular",
  },
  {
    label: "Digital Marketing & SEO",
    href: "/services/digital-marketing",
    icon: "📈",
    desc: "Page 1 search ranking, Google & Meta Ads",
    badge: "Growth",
  },
  {
    label: "WordPress Development",
    href: "/services/wordpress-development",
    icon: "📝",
    desc: "Custom WordPress business sites and WooCommerce builds",
    badge: "CMS",
  },
  {
    label: "UI/UX Design & Branding",
    href: "/services/ui-ux-design-branding",
    icon: "🎨",
    desc: "Figma prototypes, brand identity & usability audits",
    badge: "Design",
  },
  {
    label: "Managed IT & Cybersecurity",
    href: "/services/managed-it-cybersecurity",
    icon: "🛡️",
    desc: "24/7 IT helpdesk, threat monitoring & backups",
    badge: "Security",
  },
  {
    label: "Website Maintenance & Support",
    href: "/services/website-maintenance-support",
    icon: "🔧",
    desc: "Updates, backups, uptime monitoring & care plans",
    badge: "Support",
  },
  {
    label: "Mobile App Development",
    href: "/services/mobile-app-development",
    icon: "📱",
    desc: "iOS & Android apps with React Native and cross-platform delivery",
    badge: "Mobile",
  },
  {
    label: "Development Process",
    href: "/services/development-process",
    icon: "🔄",
    desc: "Our 5-stage sprint, QA & deployment lifecycle",
    badge: "Method",
  },
];

const navLinksLeft = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
];

const navLinksRight = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

// Company & Resources mega menu — replaces the old standalone Features link.
// Every page not reachable from the main bar now lives here (14 destinations).
const companyWhatWeDo = [
  { label: "Features", desc: "Platform capabilities & modules", href: "/features", icon: "⭐" },
  { label: "How We Deliver", desc: "Our 5-stage build process", href: "/how-it-works", icon: "🧭" },
  { label: "Our Work", desc: "Selected projects & outcomes", href: "/work", icon: "🗂️" },
  { label: "Integrations", desc: "Tools & platforms we support", href: "/integrations", icon: "🔌" },
];

const companyWhoWeAre = [
  { label: "Company Hub", desc: "Who we are at a glance", href: "/company", icon: "🏢" },
  { label: "Our Team", desc: "People, roles & experts", href: "/team", icon: "👥" },
  { label: "Careers", desc: "Open roles & internships", href: "/career", icon: "💼" },
  { label: "Testimonials", desc: "What our clients say", href: "/testimonials", icon: "💬" },
  { label: "FAQ & Tech Stack", desc: "Common questions answered", href: "/faq", icon: "❓" },
];

const companyResources = [
  { label: "Knowledge Base & Docs", desc: "Guides, docs & tutorials", href: "/docs", icon: "📚" },
  { label: "Product Updates", desc: "Changelog & announcements", href: "/updates", icon: "📰" },
  { label: "Book a Demo", desc: "Walkthrough with the founder", href: "/book", icon: "📅" },
  { label: "Terms of Engagement", desc: "Our working terms", href: "/terms", icon: "📜" },
  { label: "Privacy Policy", desc: "How we handle data", href: "/privacy", icon: "🔒" },
];

const companyNavGroups = [
  { heading: "What We Do", items: companyWhatWeDo },
  { heading: "Who We Are", items: companyWhoWeAre },
  { heading: "Resources", items: companyResources },
];

const companyLinks = [...companyWhatWeDo, ...companyWhoWeAre, ...companyResources];

const mainNavLinks = [...navLinksLeft, ...navLinksRight];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isCompanyActive = companyLinks.some(
    (l) => pathname === l.href || pathname.startsWith(l.href + "/")
  );

  function submitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const term = searchTerm.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
    setSearchOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
        setServicesOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCompanyOpen(false);
        setServicesOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setCompanyOpen(false);
    setMobileCompanyOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Cyber Savvy Pro"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-gray-950">
                Cyber Savvy
              </span>
              <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                PRO
              </span>
            </div>
            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              Full-Stack · IT · Growth
            </span>
          </div>
        </Link>

        {/* Desktop Sticky Header Links */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {/* Left direct links: About Us, Case Studies */}
          {navLinksLeft.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onMouseEnter={() => setServicesOpen(true)}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                pathname.startsWith("/services") || servicesOpen
                  ? "bg-indigo-50 text-indigo-700 font-bold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              Services
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
              >
                <div className="w-[840px] max-w-[calc(100vw-4rem)] rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                    Our Services & Technical Solutions
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Browse All Services →
                    </Link>
                    <Link
                      href="/services/development-process"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-bold text-gray-500 hover:text-indigo-600"
                    >
                      View Engineering Process →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {megaServices.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className="group flex flex-col justify-between rounded-2xl p-3.5 transition-all hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                          {item.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-gray-900 group-hover:text-indigo-700 leading-tight">
                              {item.label}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-gray-500 group-hover:text-gray-600 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 p-3.5 flex items-center justify-between border border-indigo-100/70">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="font-bold text-indigo-900">Need a custom scope?</span>
                    <span className="text-gray-500">Founder Sam Maina is ready to review your project.</span>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setServicesOpen(false)}
                    className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-700"
                  >
                    Request Scoping Call
                  </Link>
                </div>
                </div>
              </div>
            )}
          </div>

          {/* Company & Resources mega menu (replaces the old Features link) */}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              onMouseEnter={() => setCompanyOpen(true)}
              onClick={() => setCompanyOpen(!companyOpen)}
              aria-haspopup="true"
              aria-expanded={companyOpen}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                isCompanyActive || companyOpen
                  ? "bg-indigo-50 text-indigo-700 font-bold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              Company
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {companyOpen && (
              <div
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
              >
                <div className="w-[840px] max-w-[calc(100vw-4rem)] rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                      Company, People & Resources
                    </span>
                    <Link
                      href="/career"
                      onClick={() => setCompanyOpen(false)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Hiring? See open roles →
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {companyNavGroups.map((group) => (
                      <div key={group.heading}>
                        <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {group.heading}
                        </h4>
                        <ul className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setCompanyOpen(false)}
                                className="group flex items-start gap-2.5 rounded-xl border border-transparent p-2 transition-all hover:border-indigo-100 hover:bg-indigo-50/70"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                  {item.icon}
                                </span>
                                <span>
                                  <span className="block text-xs font-black leading-tight text-gray-900 group-hover:text-indigo-700">
                                    {item.label}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 group-hover:text-gray-600">
                                    {item.desc}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right direct links: Company dropdown, Pricing, Blog, Contact Us */}
          {navLinksRight.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

          <button
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setServicesOpen(false);
            }}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:border-indigo-300 hover:text-indigo-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
          </button>

        {/* Right Action: Direct Phone & Quote CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+254722359298"
            className="text-xs font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            +254 722 359 298
          </a>
          <Link
            href="/contact"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Get Free Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex lg:hidden items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Toggle Menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop search dropdown */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-full hidden border-t border-gray-100 bg-white/95 px-6 py-4 shadow-lg backdrop-blur lg:block">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-xl items-center gap-2">
              <input
                type="search"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services, case studies…"
                aria-label="Search the site"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={submitSearch} className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search the site…"
              aria-label="Search the site"
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
            >
              Go
            </button>
          </form>

          {/* Mobile Services Accordion */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50"
            >
              <span>Services ({megaServices.length} Capabilities)</span>
              <svg
                className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-indigo-100 pl-3">
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-black text-indigo-700 hover:bg-indigo-50"
                >
                  <span>🗂️</span>
                  <span>Browse All Services</span>
                </Link>
                {megaServices.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Company & Resources Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                aria-expanded={mobileCompanyOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50"
              >
                <span>Company & Resources</span>
                <svg
                  className={`h-4 w-4 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileCompanyOpen && (
                <div className="ml-3 space-y-1 border-l-2 border-indigo-100 pl-3">
                  {companyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Mobile Links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-5 space-y-3">
            <a
              href="tel:+254722359298"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              📞 +254 722 359 298
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow hover:bg-indigo-700"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
