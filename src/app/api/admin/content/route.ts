import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/store";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { hasEmailConfig } from "@/lib/mailer";
import {
  getAllBlogPosts,
  getCareers,
  getCaseStudies,
  getFaqs,
  getHeroSlides,
  getPageSections,
  getPricing,
  getServices,
  getSiteSettings,
  getTeamMembers,
  getTestimonials,
  getUpdates,
  saveBlogPosts,
  saveCareers,
  saveCaseStudies,
  saveFaqs,
  saveHeroSlides,
  savePageSections,
  savePricing,
  saveServices,
  saveSiteSettings,
  saveTeamMembers,
  saveTestimonials,
  saveUpdates,
  slugify,
  TEAM_AVATAR_COLORS,
  type BlogPost,
  type CareerOpening,
  type CaseStudy,
  type CaseStudyMetric,
  type FaqItem,
  type HeroSlide,
  type PricingData,
  type ServiceItem,
  type SiteUpdate,
  type TeamMember,
  type Testimonial,
} from "@/lib/cms";

export async function GET() {
  const [blog, careers, hero, services, pricing, testimonials, faqs, caseStudies, pageSections, team, updates, siteSettings, contacts, newsletter, applications] =
    await Promise.all([
    getAllBlogPosts(),
    getCareers(),
    getHeroSlides(),
    getServices(),
    getPricing(),
      getTestimonials(),
      getFaqs(),
      getCaseStudies(),
    getPageSections(),
    getTeamMembers(),
    getUpdates(),
    getSiteSettings(),
    readJsonFile("contacts.json", []),
    readJsonFile("newsletter.json", []),
    readJsonFile("applications.json", []),
  ]);

  return NextResponse.json({
    blog,
    careers,
    hero,
    services,
    pricing,
    testimonials,
    faqs,
    caseStudies,
    pageSections,
    team,
    updates,
    siteSettings,
    emailConfigured: hasEmailConfig(),
    contacts,
    newsletter,
    applications,
  });
}

// Metric rows arrive from the admin UI as loose objects — normalize strictly.
function sanitizeMetrics(raw: unknown): CaseStudyMetric[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((row: any) => ({
      value: String(row?.value ?? "").trim(),
      label: String(row?.label ?? "").trim(),
    }))
    .filter((row) => row.value || row.label);
}

function splitLines(value: unknown): string[] {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function sanitizeStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }
  // Admin UI sends comma/newline separated text.
  return String(value || "")
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function sanitizeTeamLinks(raw: unknown): TeamMember["links"] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((row: any) => ({
      label: String(row?.label ?? "").trim(),
      href: String(row?.href ?? "").trim(),
      variant: row?.variant === "primary" ? ("primary" as const) : ("outline" as const),
    }))
    .filter((row) => row.label && row.href);
}

function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function buildTeamMember(body: any, existing?: TeamMember): TeamMember {
  const name = String(body?.name ?? existing?.name ?? "").trim();
  const avatar = String(body?.avatar ?? existing?.avatar ?? "").trim() || initialsFrom(name);
  const rawColor = String(body?.color ?? existing?.color ?? "").trim();
  const color = (TEAM_AVATAR_COLORS as readonly string[]).includes(rawColor)
    ? rawColor
    : "bg-indigo-600";
  return {
    id: String(existing?.id ?? body?.id ?? Date.now().toString()),
    name,
    role: String(body?.role ?? existing?.role ?? "").trim(),
    bio: String(body?.bio ?? existing?.bio ?? "").trim(),
    avatar: avatar.slice(0, 3),
    color,
    specialties: body?.specialties !== undefined ? sanitizeStringList(body.specialties) : existing?.specialties ?? [],
    links: body?.links !== undefined ? sanitizeTeamLinks(body.links) : existing?.links ?? [],
  };
}

const UPDATE_TAGS = ["New", "Improved", "Security", "Major"];

function buildUpdate(body: any, existing?: SiteUpdate): SiteUpdate {
  const rawCategory = String(body?.category ?? existing?.category ?? "Feature").trim();
  const category = ["Launch", "Feature", "Improvement", "Security"].includes(rawCategory)
    ? rawCategory
    : "Feature";
  const rawTag = String(body?.tag ?? existing?.tag ?? "New").trim();
  return {
    id: String(existing?.id ?? body?.id ?? `upd-${Date.now()}`),
    date: String(body?.date ?? existing?.date ?? "").trim(),
    version: String(body?.version ?? existing?.version ?? "").trim(),
    title: String(body?.title ?? existing?.title ?? "").trim(),
    category,
    summary: String(body?.summary ?? existing?.summary ?? "").trim(),
    highlights:
      body?.highlights !== undefined ? sanitizeStringList(body.highlights) : existing?.highlights ?? [],
    tag: UPDATE_TAGS.includes(rawTag) ? rawTag : "New",
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const type = String(body.type || "");

  if (type === "blog") {
    const posts = await getAllBlogPosts();
    const title = String(body.title || "").trim();
    const summary = String(body.summary || "").trim();
    const content = String(body.content || "").trim();
    if (!title || !summary) {
      return NextResponse.json({ error: "Title and summary are required." }, { status: 400 });
    }
    // Unique slug: "seo-guide", "seo-guide-2", "seo-guide-3"...
    const base = slugify(title) || `post-${Date.now()}`;
    const taken = new Set(posts.map((p) => p.slug));
    let slug = base;
    let n = 2;
    while (taken.has(slug)) slug = `${base}-${n++}`;
    const post: BlogPost = {
      id: Date.now().toString(),
      slug,
      title,
      summary,
      content: sanitizeBlogHtml(content),
      date: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
      category: String(body.category || "Insights"),
      readTime: String(body.readTime || "5 min read"),
      author: String(body.author || "Sam Maina"),
      image: String(body.image || "/images/hero/full-stack.jpg"),
      imageAlt: String(body.imageAlt || title),
      published: body.published === undefined ? true : Boolean(body.published),
    };
    await saveBlogPosts([post, ...posts]);
    return NextResponse.json({ ok: true, post });
  }

  if (type === "career") {
    const items = await getCareers();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Role title is required." }, { status: 400 });
    }
    const item: CareerOpening = {
      id: Date.now().toString(),
      title,
      type: String(body.jobType || "Full-time"),
      location: String(body.location || "Nairobi"),
      summary: String(body.summary || ""),
    };
    await saveCareers([item, ...items]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "hero") {
    const items = await getHeroSlides();
    const item: HeroSlide = {
      id: Date.now().toString(),
      eyebrow: String(body.eyebrow || ""),
      title: String(body.title || ""),
      highlight: String(body.highlight || ""),
      description: String(body.description || ""),
      image: String(body.image || ""),
      alt: String(body.alt || body.title || "Hero image"),
      primaryLabel: String(body.primaryLabel || "Contact Us"),
      primaryHref: String(body.primaryHref || "/contact"),
      secondaryLabel: String(body.secondaryLabel || "Learn more"),
      secondaryHref: String(body.secondaryHref || "/about"),
    };
    await saveHeroSlides([...items, item]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "service") {
    const items = await getServices();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Service title is required." }, { status: 400 });
    }
    const item: ServiceItem = {
      id: Date.now().toString(),
      icon: String(body.icon || "✦"),
      title,
      desc: String(body.desc || ""),
      link: String(body.link || "/contact"),
      tech: String(body.tech || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    };
    await saveServices([...items, item]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "retainer") {
    const pricing = await getPricing();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "Package name is required." }, { status: 400 });
    }
    pricing.retainers.push({
      id: Date.now().toString(),
      name,
      target: String(body.target || ""),
      price: String(body.price || ""),
      period: String(body.period || "/month"),
      popular: Boolean(body.popular),
      cta: String(body.cta || "Get Started"),
      features: String(body.features || "")
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
    });
    await savePricing(pricing);
    return NextResponse.json({ ok: true, pricing });
  }

  if (type === "project") {
    const pricing = await getPricing();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }
    pricing.projects.push({
      id: Date.now().toString(),
      title,
      priceRange: String(body.priceRange || ""),
      timeline: String(body.timeline || ""),
      desc: String(body.desc || ""),
    });
    await savePricing(pricing);
    return NextResponse.json({ ok: true, pricing });
  }

  if (type === "testimonial") {
    const items = await getTestimonials();
    const quote = String(body.quote || "").trim();
    const name = String(body.name || "").trim();
    if (!quote || !name) {
      return NextResponse.json({ error: "Quote and name are required." }, { status: 400 });
    }
    const item: Testimonial = {
      id: Date.now().toString(),
      quote,
      name,
      role: String(body.role || ""),
      company: String(body.company || ""),
      avatar: String(body.avatar || "").trim() || name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
      color: String(body.color || "bg-indigo-600"),
      metricsHighlight: String(body.metricsHighlight || ""),
    };
    await saveTestimonials([...items, item]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "faq") {
    const items = await getFaqs();
    const q = String(body.q || "").trim();
    const a = String(body.a || "").trim();
    if (!q || !a) {
      return NextResponse.json({ error: "Question and answer are required." }, { status: 400 });
    }
    const item: FaqItem = {
      id: Date.now().toString(),
      q,
      a,
      page: body.page === "how-it-works" ? "how-it-works" : "general",
    };
    await saveFaqs([...items, item]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "case-study") {
    const items = await getCaseStudies();
    const client = String(body.client || "").trim();
    if (!client) {
      return NextResponse.json({ error: "Client name is required." }, { status: 400 });
    }
    const item: CaseStudy = {
      id: Date.now().toString(),
      client,
      industry: String(body.industry || ""),
      service: String(body.service || ""),
      summary: String(body.summary || ""),
      metrics: sanitizeMetrics(body.metrics),
      tech: splitLines(body.tech),
      teaser: String(body.teaser || ""),
      teaserService: String(body.teaserService || ""),
    };
    await saveCaseStudies([...items, item]);
    return NextResponse.json({ ok: true, item });
  }

  if (type === "team-member") {
    const items = await getTeamMembers();
    const member = buildTeamMember(body);
    if (!member.name || !member.role) {
      return NextResponse.json({ error: "Name and role are required." }, { status: 400 });
    }
    await saveTeamMembers([...items, member]);
    return NextResponse.json({ ok: true });
  }

  if (type === "update") {
    const items = await getUpdates();
    const entry = buildUpdate(body);
    if (!entry.title || !entry.version) {
      return NextResponse.json({ error: "Version and title are required." }, { status: 400 });
    }
    await saveUpdates([...items, entry]);
    return NextResponse.json({ ok: true });
  }

  if (type === "page-sections") {
    const sections = Array.isArray(body.sections) ? body.sections : [];
    await savePageSections(
      sections.map((section: any) => ({
        id: String(section?.id || ""),
        items: Array.isArray(section?.items) ? section.items : [],
      }))
    );
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const type = String(body.type || "");
  const id = String(body.id || "");

  if (type === "hero") {
    const items = await getHeroSlides();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            eyebrow: String(body.eyebrow ?? item.eyebrow),
            title: String(body.title ?? item.title),
            highlight: String(body.highlight ?? item.highlight),
            description: String(body.description ?? item.description),
            image: String(body.image ?? item.image),
            alt: String(body.alt ?? item.alt),
            primaryLabel: String(body.primaryLabel ?? item.primaryLabel),
            primaryHref: String(body.primaryHref ?? item.primaryHref),
            secondaryLabel: String(body.secondaryLabel ?? item.secondaryLabel),
            secondaryHref: String(body.secondaryHref ?? item.secondaryHref),
          }
        : item
    );
    await saveHeroSlides(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "service") {
    const items = await getServices();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            icon: String(body.icon ?? item.icon),
            title: String(body.title ?? item.title),
            desc: String(body.desc ?? item.desc),
            link: String(body.link ?? item.link),
            tech: Array.isArray(body.tech)
              ? body.tech
              : String(body.tech ?? item.tech.join(", "))
                  .split(",")
                  .map((value: string) => value.trim())
                  .filter(Boolean),
          }
        : item
    );
    await saveServices(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "retainer") {
    const pricing = await getPricing();
    pricing.retainers = pricing.retainers.map((item) =>
      item.id === id
        ? {
            ...item,
            name: String(body.name ?? item.name),
            target: String(body.target ?? item.target),
            price: String(body.price ?? item.price),
            period: String(body.period ?? item.period),
            popular: Boolean(body.popular),
            cta: String(body.cta ?? item.cta),
            features: String(body.features ?? item.features.join("\n"))
              .split("\n")
              .map((value) => value.trim())
              .filter(Boolean),
          }
        : item
    );
    await savePricing(pricing);
    return NextResponse.json({ ok: true });
  }

  if (type === "project") {
    const pricing = await getPricing();
    pricing.projects = pricing.projects.map((item) =>
      item.id === id
        ? {
            ...item,
            title: String(body.title ?? item.title),
            priceRange: String(body.priceRange ?? item.priceRange),
            timeline: String(body.timeline ?? item.timeline),
            desc: String(body.desc ?? item.desc),
          }
        : item
    );
    await savePricing(pricing);
    return NextResponse.json({ ok: true });
  }

  if (type === "blog") {
    const posts = await getAllBlogPosts();
    const next = posts.map((item) =>
      item.id === id
        ? {
            ...item,
            title: String(body.title ?? item.title),
            summary: String(body.summary ?? item.summary),
            content:
              body.content !== undefined ? sanitizeBlogHtml(String(body.content)) : item.content,
            category: String(body.category ?? item.category),
            readTime: String(body.readTime ?? item.readTime),
            author: String(body.author ?? item.author),
            image: String(body.image ?? item.image),
            imageAlt: String(body.imageAlt ?? item.imageAlt),
            published:
              body.published !== undefined ? Boolean(body.published) : item.published !== false,
          }
        : item
    );
    await saveBlogPosts(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "career") {
    const items = await getCareers();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            title: String(body.title ?? item.title),
            type: String(body.jobType ?? item.type),
            location: String(body.location ?? item.location),
            summary: String(body.summary ?? item.summary),
          }
        : item
    );
    await saveCareers(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "testimonial") {
    const items = await getTestimonials();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            quote: String(body.quote ?? item.quote),
            name: String(body.name ?? item.name),
            role: String(body.role ?? item.role),
            company: String(body.company ?? item.company),
            avatar: String(body.avatar ?? item.avatar),
            color: String(body.color ?? item.color),
            metricsHighlight: String(body.metricsHighlight ?? item.metricsHighlight),
          }
        : item
    );
    await saveTestimonials(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "faq") {
    const items = await getFaqs();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            q: String(body.q ?? item.q),
            a: String(body.a ?? item.a),
            page:
              body.page !== undefined
                ? body.page === "how-it-works"
                  ? "how-it-works"
                  : "general"
                : item.page,
          }
        : item
    );
    await saveFaqs(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "case-study") {
    const items = await getCaseStudies();
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            client: String(body.client ?? item.client),
            industry: String(body.industry ?? item.industry),
            service: String(body.service ?? item.service),
            summary: String(body.summary ?? item.summary),
            metrics: body.metrics !== undefined ? sanitizeMetrics(body.metrics) : item.metrics,
            tech: body.tech !== undefined ? splitLines(body.tech) : item.tech,
            teaser: String(body.teaser ?? item.teaser ?? ""),
            teaserService: String(body.teaserService ?? item.teaserService ?? ""),
          }
        : item
    );
    await saveCaseStudies(next);
    return NextResponse.json({ ok: true });
  }

  if (type === "team-member") {
    const items = await getTeamMembers();
    const existing = items.find((item) => item.id === id);
    if (!existing) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }
    const member = buildTeamMember(body, existing);
    if (!member.name || !member.role) {
      return NextResponse.json({ error: "Name and role are required." }, { status: 400 });
    }
    await saveTeamMembers(items.map((item) => (item.id === id ? member : item)));
    return NextResponse.json({ ok: true });
  }

  if (type === "update") {
    const items = await getUpdates();
    const existing = items.find((item) => item.id === id);
    if (!existing) {
      return NextResponse.json({ error: "Update not found." }, { status: 404 });
    }
    const entry = buildUpdate(body, existing);
    if (!entry.title || !entry.version) {
      return NextResponse.json({ error: "Version and title are required." }, { status: 400 });
    }
    await saveUpdates(items.map((item) => (item.id === id ? entry : item)));
    return NextResponse.json({ ok: true });
  }

  if (type === "message") {
    const status = String(body.status || "");
    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json({ error: "Invalid message status." }, { status: 400 });
    }
    const items = await readJsonFile<any[]>("contacts.json", []);
    await writeJsonFile(
      "contacts.json",
      items.map((item) => (String(item.id) === id ? { ...item, status } : item))
    );
    return NextResponse.json({ ok: true });
  }

  if (type === "site-settings") {
    const current = await getSiteSettings();
    const pick = (value: unknown, fallback: string[]) => {
      const list = sanitizeStringList(value);
      return list.length ? list : fallback;
    };
    const settings = {
      contactServices:
        body.contactServices !== undefined
          ? pick(body.contactServices, current.contactServices)
          : current.contactServices,
      contactBudgets:
        body.contactBudgets !== undefined
          ? pick(body.contactBudgets, current.contactBudgets)
          : current.contactBudgets,
      bookBudgets:
        body.bookBudgets !== undefined
          ? pick(body.bookBudgets, current.bookBudgets)
          : current.bookBudgets,
    };
    await saveSiteSettings(settings);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id") || "";

  if (type === "blog") {
    const posts = await getAllBlogPosts();
    await saveBlogPosts(posts.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "career") {
    const items = await getCareers();
    await saveCareers(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "message") {
    const items = await readJsonFile<any[]>("contacts.json", []);
    await writeJsonFile("contacts.json", items.filter((item) => String(item.id) !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "subscriber") {
    const items = await readJsonFile<any[]>("newsletter.json", []);
    await writeJsonFile("newsletter.json", items.filter((item) => String(item.id) !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "application") {
    const items = await readJsonFile<any[]>("applications.json", []);
    await writeJsonFile("applications.json", items.filter((item) => String(item.id) !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "hero") {
    const items = await getHeroSlides();
    await saveHeroSlides(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "service") {
    const items = await getServices();
    await saveServices(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "retainer") {
    const pricing = await getPricing();
    pricing.retainers = pricing.retainers.filter((item) => item.id !== id);
    await savePricing(pricing);
    return NextResponse.json({ ok: true });
  }
  if (type === "project") {
    const pricing = await getPricing();
    pricing.projects = pricing.projects.filter((item) => item.id !== id);
    await savePricing(pricing);
    return NextResponse.json({ ok: true });
  }
  if (type === "testimonial") {
    const items = await getTestimonials();
    await saveTestimonials(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "faq") {
    const items = await getFaqs();
    await saveFaqs(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "case-study") {
    const items = await getCaseStudies();
    await saveCaseStudies(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "team-member") {
    const items = await getTeamMembers();
    await saveTeamMembers(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }
  if (type === "update") {
    const items = await getUpdates();
    await saveUpdates(items.filter((item) => item.id !== id));
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
}
