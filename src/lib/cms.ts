import { readJsonFile, writeJsonFile } from "@/lib/store";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  published?: boolean;
};

export type CareerOpening = {
  id: string;
  title: string;
  type: string;
  location: string;
  summary: string;
};

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  alt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  link: string;
  tech: string[];
};

export type RetainerPackage = {
  id: string;
  name: string;
  target: string;
  price: string;
  period: string;
  popular: boolean;
  cta: string;
  features: string[];
};

export type CustomProject = {
  id: string;
  title: string;
  priceRange: string;
  timeline: string;
  desc: string;
};

export type PricingData = {
  retainers: RetainerPackage[];
  projects: CustomProject[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  metricsHighlight: string;
};

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  /** Which page shows it: "general" (main /faq) or "how-it-works". */
  page?: string;
};

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  metrics: CaseStudyMetric[];
  tech: string[];
  /** One-line homepage card copy. Empty/absent = hidden from the homepage. */
  teaser?: string;
  /** Optional homepage eyebrow label; falls back to `service` when empty. */
  teaserService?: string;
};

export type PageSectionField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "list" | "object-list";
  /** Declared entry shape when type is "object-list" (nested repeater). */
  subfields?: { key: string; label: string; type?: "text" | "textarea" }[];
};

type PageSectionDef = {
  id: string;
  page: string;
  title: string;
  fields: PageSectionField[];
};

// Section items are plain render data (strings and string lists); pages read
// fields directly, so keep access loose like the rest of the site's content.
export type PageSectionItem = Record<string, any>;

export type PageSection = PageSectionDef & { items: PageSectionItem[] };

// Registry of admin-editable page content blocks. Metadata (page/title/fields)
// lives in code; the items themselves live in data/page-sections.json.
export const PAGE_SECTION_DEFS: PageSectionDef[] = [
  {
    id: "home-stats",
    page: "Home",
    title: "Stats bar",
    fields: [
      { key: "value", label: "Value", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  {
    id: "about-stats",
    page: "About",
    title: "Stats bar",
    fields: [
      { key: "value", label: "Value", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  {
    id: "about-values",
    page: "About",
    title: "Company values",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "career-benefits",
    page: "Careers",
    title: "Benefits",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "features-categories",
    page: "Features",
    title: "Feature categories",
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea" },
      {
        key: "items",
        label: "Feature cards",
        type: "object-list",
        subfields: [
          { key: "icon", label: "Icon (emoji)" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "how-it-works-steps",
    page: "How It Works",
    title: "Detailed steps",
    fields: [
      { key: "step", label: "Step number", type: "text" },
      { key: "tag", label: "Tag", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "points", label: "Bullet points (one per line)", type: "list" },
      { key: "badge", label: "Badge", type: "text" },
    ],
  },
  {
    id: "testimonials-metrics",
    page: "Testimonials",
    title: "Metrics bar",
    fields: [
      { key: "value", label: "Value", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  {
    id: "services-custom-systems-solutions",
    page: "Services / Custom Systems",
    title: "Solutions grid",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "benefits", label: "Benefits (one per line)", type: "list" },
    ],
  },
  {
    id: "services-development-process-stages",
    page: "Services / Development Process",
    title: "Process stages",
    fields: [
      { key: "phase", label: "Phase number", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "details", label: "Details (one per line)", type: "list" },
    ],
  },
  {
    id: "services-digital-marketing-list",
    page: "Services / Digital Marketing",
    title: "Marketing services",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "deliverables", label: "Deliverables (one per line)", type: "list" },
    ],
  },
  {
    id: "services-digital-marketing-results",
    page: "Services / Digital Marketing",
    title: "Results metrics",
    fields: [
      { key: "metric", label: "Metric", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  {
    id: "services-full-stack-capabilities",
    page: "Services / Full-Stack",
    title: "Capabilities",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Tech (one per line)", type: "list" },
    ],
  },
  {
    id: "services-full-stack-deliverables",
    page: "Services / Full-Stack",
    title: "Deliverables",
    fields: [
      { key: "step", label: "Step number", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "services-managed-it-list",
    page: "Services / Managed IT",
    title: "IT services",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "features", label: "Features (one per line)", type: "list" },
    ],
  },
  {
    id: "services-ui-ux-capabilities",
    page: "Services / UI-UX",
    title: "Capabilities",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Tech (one per line)", type: "list" },
    ],
  },
  {
    id: "services-ui-ux-steps",
    page: "Services / UI-UX",
    title: "Process steps",
    fields: [
      { key: "step", label: "Step number", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "services-maintenance-coverage",
    page: "Services / Maintenance",
    title: "Coverage",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Tech (one per line)", type: "list" },
    ],
  },
  {
    id: "services-maintenance-routine",
    page: "Services / Maintenance",
    title: "Care routine",
    fields: [
      { key: "step", label: "Step number", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "services-wordpress-list",
    page: "Services / WordPress",
    title: "WordPress services",
    fields: [
      { key: "icon", label: "Icon (emoji)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "deliverables", label: "Deliverables (one per line)", type: "list" },
    ],
  },
  {
    id: "services-wordpress-process",
    page: "Services / WordPress",
    title: "Process steps",
    fields: [
      { key: "step", label: "Step number", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ],
  },
];

export async function getAllBlogPosts() {
  const posts = await readJsonFile<BlogPost[]>("blog.json", []);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPosts() {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.published !== false);
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getCareers() {
  return readJsonFile<CareerOpening[]>("careers.json", []);
}

/** Homepage "Client Success Stories" cards — only case studies with teaser copy. */
export async function getHomepageCaseStudies() {
  const items = await getCaseStudies();
  return items.filter((item) => Boolean(item.teaser && item.teaser.trim()));
}

export async function getPageSections(): Promise<PageSection[]> {
  const stored = await readJsonFile<{ id: string; items: PageSectionItem[] }[]>(
    "page-sections.json",
    []
  );
  const byId = new Map(stored.map((entry) => [entry.id, entry.items]));
  return PAGE_SECTION_DEFS.map((def) => ({ ...def, items: byId.get(def.id) ?? [] }));
}

/** Items for a single registered section (registry order is canonical). */
export async function getPageSection(id: string): Promise<PageSectionItem[]> {
  const sections = await getPageSections();
  return sections.find((section) => section.id === id)?.items ?? [];
}

/**
 * Normalize one raw admin item against a section's declared fields:
 * unknown keys dropped, text coerced to string, list fields to string[].
 */
export function sanitizePageSectionItem(
  def: PageSectionDef,
  raw: unknown
): PageSectionItem {
  const source = (raw ?? {}) as Record<string, unknown>;
  const item: PageSectionItem = {};
  for (const field of def.fields) {
    const value = source[field.key];
    if (field.type === "list") {
      item[field.key] = Array.isArray(value)
        ? value.map((line) => String(line).trim()).filter(Boolean)
        : String(value ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
    } else if (field.type === "object-list") {
      const subs = field.subfields ?? [];
      const rows = Array.isArray(value) ? value : [];
      item[field.key] = rows
        .map((row) => {
          const entry: Record<string, string> = {};
          for (const sub of subs) {
            entry[sub.key] = String((row as Record<string, unknown>)?.[sub.key] ?? "");
          }
          return entry;
        })
        .filter((entry) => subs.some((sub) => entry[sub.key]?.trim()));
    } else {
      item[field.key] = String(value ?? "");
    }
  }
  return item;
}

/** Persist page sections against the registry (unknown ids are dropped). */
export async function savePageSections(
  input: { id: string; items: unknown[] }[]
) {
  const current = await readJsonFile<{ id: string; items: PageSectionItem[] }[]>(
    "page-sections.json",
    []
  );
  const currentById = new Map(current.map((entry) => [entry.id, entry.items]));
  const inputById = new Map(input.map((entry) => [entry.id, entry.items]));
  const next = PAGE_SECTION_DEFS.map((def) => {
    const rawItems = inputById.has(def.id) ? inputById.get(def.id)! : currentById.get(def.id) ?? [];
    return { id: def.id, items: rawItems.map((raw) => sanitizePageSectionItem(def, raw)) };
  });
  await writeJsonFile("page-sections.json", next);
}

export async function getHeroSlides() {
  return readJsonFile<HeroSlide[]>("hero.json", []);
}

export async function getServices() {
  return readJsonFile<ServiceItem[]>("services.json", []);
}

export async function getPricing() {
  return readJsonFile<PricingData>("pricing.json", { retainers: [], projects: [] });
}

export async function getTestimonials() {
  return readJsonFile<Testimonial[]>("testimonials.json", []);
}

export async function getFaqs() {
  return readJsonFile<FaqItem[]>("faqs.json", []);
}

export async function getCaseStudies() {
  return readJsonFile<CaseStudy[]>("case-studies.json", []);
}

export async function saveBlogPosts(posts: BlogPost[]) {
  await writeJsonFile("blog.json", posts);
}

export async function saveCareers(items: CareerOpening[]) {
  await writeJsonFile("careers.json", items);
}

export async function saveHeroSlides(items: HeroSlide[]) {
  await writeJsonFile("hero.json", items);
}

export async function saveServices(items: ServiceItem[]) {
  await writeJsonFile("services.json", items);
}

export async function savePricing(data: PricingData) {
  await writeJsonFile("pricing.json", data);
}

export async function saveTestimonials(items: Testimonial[]) {
  await writeJsonFile("testimonials.json", items);
}

export async function saveFaqs(items: FaqItem[]) {
  await writeJsonFile("faqs.json", items);
}

export async function saveCaseStudies(items: CaseStudy[]) {
  await writeJsonFile("case-studies.json", items);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Team members (managed from the admin dashboard → /team page)
// ---------------------------------------------------------------------------

export type TeamLink = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
  specialties: string[];
  links: TeamLink[];
};

/** Whitelisted avatar background classes — anything else falls back to indigo. */
export const TEAM_AVATAR_COLORS = [
  "bg-indigo-600",
  "bg-violet-600",
  "bg-emerald-600",
  "bg-blue-600",
  "bg-pink-600",
  "bg-amber-600",
] as const;

export async function getTeamMembers(): Promise<TeamMember[]> {
  return readJsonFile<TeamMember[]>("team.json", []);
}

export async function saveTeamMembers(items: TeamMember[]) {
  await writeJsonFile("team.json", items);
}

// ---------------------------------------------------------------------------
// Product updates / changelog (managed from the admin dashboard → /updates page)
// ---------------------------------------------------------------------------

export type SiteUpdate = {
  id: string;
  date: string;
  version: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  tag: string;
};

export const UPDATE_CATEGORIES = ["Launch", "Feature", "Improvement", "Security"] as const;

export async function getUpdates(): Promise<SiteUpdate[]> {
  return readJsonFile<SiteUpdate[]>("updates.json", []);
}

export async function saveUpdates(items: SiteUpdate[]) {
  await writeJsonFile("updates.json", items);
}

// ---------------------------------------------------------------------------
// Site settings — contact & booking form options (admin → Settings tab)
// ---------------------------------------------------------------------------

export type SiteSettings = {
  contactServices: string[];
  contactBudgets: string[];
  bookBudgets: string[];
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contactServices: [
    "Full-Stack Development",
    "Custom Systems & ERPs",
    "Digital Marketing & SEO",
    "Managed IT & Cybersecurity",
    "Monthly Dedicated Retainer",
    "Other",
  ],
  contactBudgets: [
    "Under KSh 150,000",
    "KSh 150,000 - KSh 300,000",
    "KSh 300,000 - KSh 500,000",
    "KSh 500,000 - KSh 1,000,000",
    "KSh 1,000,000+",
    "Not sure yet",
  ],
  bookBudgets: [
    "Under KSh 150,000",
    "KSh 150,000 - KSh 300,000",
    "KSh 300,000 - KSh 500,000",
    "KSh 500,000 - KSh 1,000,000",
    "KSh 1,000,000+",
    "Not sure yet",
  ],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const stored = await readJsonFile<Partial<SiteSettings>>("site-settings.json", {});
  return {
    contactServices: stored.contactServices?.length
      ? stored.contactServices
      : DEFAULT_SITE_SETTINGS.contactServices,
    contactBudgets: stored.contactBudgets?.length
      ? stored.contactBudgets
      : DEFAULT_SITE_SETTINGS.contactBudgets,
    bookBudgets: stored.bookBudgets?.length ? stored.bookBudgets : DEFAULT_SITE_SETTINGS.bookBudgets,
  };
}

export async function saveSiteSettings(settings: SiteSettings) {
  await writeJsonFile("site-settings.json", settings);
}
