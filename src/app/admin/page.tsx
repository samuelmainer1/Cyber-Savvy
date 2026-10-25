"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RichBlogEditor = dynamic(() => import("@/components/RichBlogEditor"), { ssr: false });
import { useRouter } from "next/navigation";
import NotificationBell from "./NotificationBell";

type Tab =
  | "overview"
  | "hero"
  | "services"
  | "pricing"
  | "blog"
  | "testimonials"
  | "faqs"
  | "case-studies"
  | "page-content"
  | "careers"
  | "team"
  | "updates"
  | "messages"
  | "subscribers"
  | "settings";

type ContentState = {
  blog: any[];
  careers: any[];
  hero: any[];
  services: any[];
  pricing: { retainers: any[]; projects: any[] };
  testimonials: any[];
  faqs: any[];
  caseStudies: any[];
  pageSections: any[];
  team: any[];
  updates: any[];
  siteSettings: { contactServices: string[]; contactBudgets: string[]; bookBudgets: string[] };
  emailConfigured: boolean;
  contacts: any[];
  newsletter: any[];
  applications: any[];
};

const emptyContent: ContentState = {
  blog: [],
  careers: [],
  hero: [],
  services: [],
  pricing: { retainers: [], projects: [] },
  testimonials: [],
  faqs: [],
  caseStudies: [],
  pageSections: [],
  team: [],
  updates: [],
  siteSettings: { contactServices: [], contactBudgets: [], bookBudgets: [] },
  emailConfigured: false,
  contacts: [],
  newsletter: [],
  applications: [],
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<ContentState>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  // Bumped after every data mutation so the notification bell re-syncs its feed.
  const [refreshSignal, setRefreshSignal] = useState(0);

  // Confirm destructive actions — one misclick must never delete content.
  const confirmDelete = (label: string) =>
    window.confirm(`Delete "${label}"? This cannot be undone.`);

  const downloadBackup = async () => {
    try {
      const response = await fetch("/api/admin/backup");
      if (!response.ok) throw new Error("Backup failed.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `site-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      notify("Backup downloaded.");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Backup failed.");
    }
  };

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/content");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    const json = await response.json();
    setData(json);
    setRefreshSignal((value) => value + 1);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const notify = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const submit = async (payload: Record<string, unknown>) => {
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || "Save failed.");
    await load();
  };

  const update = async (payload: Record<string, unknown>) => {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || "Update failed.");
    await load();
  };

  const remove = async (type: string, id: string) => {
    await fetch(`/api/admin/content?type=${type}&id=${id}`, { method: "DELETE" });
    await load();
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || "Upload failed.");
    return json.url as string;
  };

  if (loading) {
    return <div className="px-4 py-20 text-center text-sm text-gray-500">Loading admin...</div>;
  }

  const navGroups: { label: string; items: { id: Tab; label: string; icon: string }[] }[] = [
    {
      label: "Dashboard",
      items: [
        { id: "overview", label: "Overview", icon: "📈" },
        { id: "settings", label: "Settings", icon: "⚙️" },
      ],
    },
    {
      label: "Site Content",
      items: [
        { id: "hero", label: "Hero", icon: "🖼️" },
        { id: "services", label: "Services", icon: "🧩" },
        { id: "pricing", label: "Pricing", icon: "💲" },
        { id: "blog", label: "Blog", icon: "✍️" },
        { id: "testimonials", label: "Testimonials", icon: "⭐" },
        { id: "faqs", label: "FAQ", icon: "❓" },
        { id: "case-studies", label: "Case Studies", icon: "📊" },
        { id: "page-content", label: "Page Content", icon: "🧱" },
        { id: "careers", label: "Careers", icon: "💼" },
        { id: "team", label: "Team", icon: "👥" },
        { id: "updates", label: "Updates", icon: "📢" },
      ],
    },
    {
      label: "Inbox",
      items: [
        { id: "messages", label: "Messages", icon: "✉️" },
        { id: "subscribers", label: "Subscribers", icon: "📬" },
      ],
    },
  ];

  const selectTab = (id: Tab) => {
    setTab(id);
    setSidebarOpen(false);
  };

  const renderNav = (mobile: boolean) => (
    <nav className="space-y-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <div className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {group.label}
          </div>
          <div className="mt-1.5 space-y-0.5">
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  tab === item.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "border border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span aria-hidden className="w-5 text-center text-base leading-none">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {mobile && tab === item.id ? <span className="ml-auto text-xs opacity-70">•</span> : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <section className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg shadow-slate-900/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-lg leading-none text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300 lg:hidden"
            >
              ☰
            </button>
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">
                Admin Panel
              </span>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">Website Admin</h1>
              <p className="mt-1 text-sm text-slate-300">Manage content, inquiries, and site settings.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <NotificationBell
              refreshSignal={refreshSignal}
              onOpenTab={selectTab}
              onChanged={load}
              notify={notify}
            />
            <button
              type="button"
              onClick={downloadBackup}
              title="Download a full JSON backup of all site content"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              ⬇ Backup
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      {/* Mobile slide-in sidebar */}
      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            aria-hidden
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation menu"
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-sm font-bold text-slate-500 hover:bg-slate-50"
              >
                ✕
              </button>
            </div>
            {renderNav(true)}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-7xl items-start gap-6 px-4 pt-8 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/50">
            {renderNav(false)}
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-10">
          {message ? (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-100">
              {message}
            </div>
          ) : null}

        {tab === "overview" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Blog posts", data.blog.length],
              ["Open roles", data.careers.length],
              ["Contact messages", data.contacts.length],
              ["Subscribers", data.newsletter.length],
              ["Applications", data.applications.length],
              ["Hero slides", data.hero.length],
              ["Services", data.services.length],
              ["Pricing packages", data.pricing.retainers.length + data.pricing.projects.length],
              ["Testimonials", data.testimonials.length],
              ["FAQs", data.faqs.length],
              ["Case studies", data.caseStudies.length],
              ["Page sections", data.pageSections.length],
              ["Team members", data.team.length],
              ["Product updates", data.updates.length],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-3xl font-black text-indigo-600">{value}</div>
                <div className="mt-2 text-sm font-semibold text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "blog" && (
          <BlogAdmin
            posts={data.blog}
            onCreate={async (payload) => {
              await submit({ type: "blog", ...payload });
              notify("Blog post published.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "blog", ...payload });
              notify("Blog post updated.");
            }}
            onDelete={async (id) => {
              const post = data.blog.find((p) => p.id === id);
              if (!confirmDelete(post?.title || "this blog post")) return;
              await remove("blog", id);
              notify("Blog post deleted.");
            }}
            onUpload={uploadImage}
          />
        )}

        {tab === "testimonials" && (
          <TestimonialsAdmin
            items={data.testimonials}
            onCreate={async (payload) => {
              await submit({ type: "testimonial", ...payload });
              notify("Testimonial added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "testimonial", ...payload });
              notify("Testimonial updated.");
            }}
            onDelete={async (id) => {
              const item = data.testimonials.find((t) => t.id === id);
              if (!confirmDelete(item?.name || "this testimonial")) return;
              await remove("testimonial", id);
              notify("Testimonial deleted.");
            }}
          />
        )}

        {tab === "faqs" && (
          <FaqsAdmin
            items={data.faqs}
            onCreate={async (payload) => {
              await submit({ type: "faq", ...payload });
              notify("FAQ added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "faq", ...payload });
              notify("FAQ updated.");
            }}
            onDelete={async (id) => {
              const item = data.faqs.find((f) => f.id === id);
              if (!confirmDelete(item?.q || "this FAQ")) return;
              await remove("faq", id);
              notify("FAQ deleted.");
            }}
          />
        )}

        {tab === "case-studies" && (
          <CaseStudiesAdmin
            items={data.caseStudies}
            onCreate={async (payload) => {
              await submit({ type: "case-study", ...payload });
              notify("Case study added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "case-study", ...payload });
              notify("Case study updated.");
            }}
            onDelete={async (id) => {
              const item = data.caseStudies.find((c) => c.id === id);
              if (!confirmDelete(item?.client || "this case study")) return;
              await remove("case-study", id);
              notify("Case study deleted.");
            }}
          />
        )}

        {tab === "page-content" && (
          <PageSectionsAdmin
            sections={data.pageSections}
            onSave={async (sections) => {
              await submit({ type: "page-sections", sections });
              notify("Page content saved.");
            }}
          />
        )}

        {tab === "careers" && (
          <CareerAdmin
            items={data.careers}
            applications={data.applications}
            onCreate={async (payload) => {
              await submit({ type: "career", ...payload });
              notify("Career posted.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "career", ...payload });
              notify("Career updated.");
            }}
            onDelete={async (id) => {
              const role = data.careers.find((r) => r.id === id);
              if (!confirmDelete(role?.title || "this role")) return;
              await remove("career", id);
              notify("Career deleted.");
            }}
            onDeleteApplication={async (id) => {
              const application = data.applications.find((a) => String(a.id) === String(id));
              if (!confirmDelete(`application from ${application?.name || "this candidate"}`)) return;
              await remove("application", id);
              notify("Application deleted.");
            }}
          />
        )}

        {tab === "messages" && (
          <MessagesAdmin
            contacts={data.contacts}
            emailConfigured={data.emailConfigured}
            onStatus={async (id, status) => {
              await update({ type: "message", id, status });
            }}
            onReply={async (payload) => {
              const response = await fetch("/api/admin/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "reply", ...payload }),
              });
              const json = await response.json();
              if (!response.ok) throw new Error(json.error || "Reply failed.");
              notify("Reply sent.");
            }}
            onDelete={async (id) => {
              const item = data.contacts.find((c) => String(c.id) === id);
              if (!confirmDelete(`message from ${item?.name || item?.email || "this sender"}`)) return;
              await remove("message", id);
              notify("Message deleted.");
            }}
          />
        )}
        {tab === "subscribers" && (
          <SubscribersAdmin
            items={data.newsletter}
            emailConfigured={data.emailConfigured}
            onSendEmail={async (payload) => {
              const response = await fetch("/api/admin/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "newsletter", ...payload }),
              });
              const json = await response.json();
              if (!response.ok) throw new Error(json.error || "Newsletter failed.");
              notify("Newsletter sent.");
            }}
            onDelete={async (id) => {
              const item = data.newsletter.find((s) => String(s.id) === id);
              if (!confirmDelete(`subscriber ${item?.email || "this address"}`)) return;
              await remove("subscriber", id);
              notify("Subscriber removed.");
            }}
          />
        )}

        {tab === "team" && (
          <TeamAdmin
            items={data.team}
            onCreate={async (payload) => {
              await submit({ type: "team-member", ...payload });
              notify("Team member added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "team-member", ...payload });
              notify("Team member updated.");
            }}
            onDelete={async (id) => {
              const member = data.team.find((t) => t.id === id);
              if (!confirmDelete(member?.name || "this team member")) return;
              await remove("team-member", id);
              notify("Team member deleted.");
            }}
          />
        )}

        {tab === "updates" && (
          <UpdatesAdmin
            items={data.updates}
            onCreate={async (payload) => {
              await submit({ type: "update", ...payload });
              notify("Product update published.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "update", ...payload });
              notify("Product update updated.");
            }}
            onDelete={async (id) => {
              const entry = data.updates.find((u) => u.id === id);
              if (!confirmDelete(entry?.title || "this update")) return;
              await remove("update", id);
              notify("Product update deleted.");
            }}
          />
        )}

        {tab === "settings" && (
          <SettingsAdmin
            settings={data.siteSettings}
            emailConfigured={data.emailConfigured}
            onSaveSettings={async (payload) => {
              await update({ type: "site-settings", ...payload });
              notify("Settings saved.");
            }}
          />
        )}

        {tab === "hero" && (
          <HeroAdmin
            items={data.hero}
            onCreate={async (payload) => {
              await submit({ type: "hero", ...payload });
              notify("Hero slide added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "hero", ...payload });
              notify("Hero slide updated.");
            }}
            onDelete={async (id) => {
              const slide = data.hero.find((s) => s.id === id);
              if (!confirmDelete(slide?.title || slide?.eyebrow || "this hero slide")) return;
              await remove("hero", id);
              notify("Hero slide deleted.");
            }}
            onUpload={uploadImage}
          />
        )}

        {tab === "services" && (
          <ServicesAdmin
            items={data.services}
            onCreate={async (payload) => {
              await submit({ type: "service", ...payload });
              notify("Service added.");
            }}
            onUpdate={async (payload) => {
              await update({ type: "service", ...payload });
              notify("Service updated.");
            }}
            onDelete={async (id) => {
              const item = data.services.find((s) => s.id === id);
              if (!confirmDelete(item?.title || "this service")) return;
              await remove("service", id);
              notify("Service deleted.");
            }}
          />
        )}

        {tab === "pricing" && (
          <PricingAdmin
            pricing={data.pricing}
            onCreateRetainer={async (payload) => {
              await submit({ type: "retainer", ...payload });
              notify("Retainer added.");
            }}
            onCreateProject={async (payload) => {
              await submit({ type: "project", ...payload });
              notify("Project package added.");
            }}
            onUpdateRetainer={async (payload) => {
              await update({ type: "retainer", ...payload });
              notify("Retainer updated.");
            }}
            onDeleteRetainer={async (id) => {
              const item = data.pricing.retainers.find((r) => r.id === id);
              if (!confirmDelete(item?.name || "this retainer")) return;
              await remove("retainer", id);
              notify("Retainer deleted.");
            }}
            onDeleteProject={async (id) => {
              const item = data.pricing.projects.find((p) => p.id === id);
              if (!confirmDelete(item?.title || "this project package")) return;
              await remove("project", id);
              notify("Project deleted.");
            }}
          />
        )}
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-200/40 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-200/40 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      )}
    </div>
  );
}

function BlogAdmin({
  posts,
  onCreate,
  onUpdate,
  onDelete,
  onUpload,
}: {
  posts: any[];
  onCreate: (payload: Record<string, string | boolean>) => Promise<void>;
  onUpdate: (payload: Record<string, string | boolean>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpload: (file: File) => Promise<string>;
}) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    summary: "",
    content: "",
    category: "Insights",
    image: "",
    published: true,
  });

  const resetForm = () => {
    setForm({ id: "", title: "", summary: "", content: "", category: "Insights", image: "", published: true });
  };

  const beginEdit = (post: any) => {
    setForm({
      id: post.id,
      title: post.title || "",
      summary: post.summary || "",
      content: post.content || "",
      category: post.category || "Insights",
      image: post.image || "",
      published: post.published !== false,
    });
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <form
        className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.id) {
            await onUpdate(form);
          } else {
            await onCreate(form);
          }
          resetForm();
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-900">{form.id ? "Edit blog post" : "Write a blog post"}</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
            Content
          </span>
        </div>
        <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <Field label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
        <Field label="Summary" value={form.summary} onChange={(summary) => setForm({ ...form, summary })} textarea />
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Full content (Rich Text)</div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <RichBlogEditor
              value={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
            />
          </div>
        </div>

        <Field label="Image URL" value={form.image} onChange={(image) => setForm({ ...form, image })} />
        <label className="block rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="mb-2 block font-semibold text-slate-700">Upload image (JPG/PNG/WebP, max 5MB)</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = await onUpload(file);
              setForm((current) => ({ ...current, image: url }));
            }}
          />
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input
            id="blog-published"
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="blog-published" className="text-sm font-semibold text-slate-700">
            Published live
          </label>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500">
            {form.id ? "Save changes" : "Publish"}
          </button>
          {form.id ? (
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              onClick={resetForm}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900">{post.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{post.summary}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  post.published === false ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {post.published === false ? "Draft" : "Live"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-black text-indigo-700"
                onClick={() => beginEdit(post)}
              >
                Edit
              </button>
              <button
                type="button"
                className={`rounded-lg px-3 py-1.5 text-[11px] font-black ${
                  post.published === false
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-amber-200 bg-amber-50 text-amber-700"
                }`}
                onClick={async () => {
                  const nextPublished = post.published === false ? true : false;
                  await onUpdate({ id: post.id, published: nextPublished });
                }}
              >
                {post.published === false ? "Publish live" : "Unpublish"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-600"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerAdmin({
  items,
  applications,
  onCreate,
  onUpdate,
  onDelete,
  onDeleteApplication,
}: {
  items: any[];
  applications: any[];
  onCreate: (payload: Record<string, string>) => Promise<void>;
  onUpdate: (payload: Record<string, string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onDeleteApplication: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState({ id: "", title: "", jobType: "Full-time", location: "Nairobi", summary: "" });

  const resetForm = () => setForm({ id: "", title: "", jobType: "Full-time", location: "Nairobi", summary: "" });

  const beginEdit = (item: any) => {
    setForm({
      id: item.id,
      title: item.title || "",
      jobType: item.type || "Full-time",
      location: item.location || "Nairobi",
      summary: item.summary || "",
    });
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.id) {
            await onUpdate(form);
          } else {
            await onCreate(form);
          }
          resetForm();
        }}
      >
        <h2 className="text-lg font-black">{form.id ? "Edit career role" : "Post a career"}</h2>
        <Field label="Role title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <Field label="Type" value={form.jobType} onChange={(jobType) => setForm({ ...form, jobType })} />
        <Field label="Location" value={form.location} onChange={(location) => setForm({ ...form, location })} />
        <Field label="Summary" value={form.summary} onChange={(summary) => setForm({ ...form, summary })} textarea />
        <div className="flex gap-3">
          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">
            {form.id ? "Update role" : "Post role"}
          </button>
          {form.id ? (
            <button type="button" className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700" onClick={resetForm}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
            <h3 className="font-black text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600">
              {item.type} · {item.location}
            </p>
            <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => beginEdit(item)}>
                Edit
              </button>
              <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
          <h3 className="font-black text-slate-900">Applications</h3>
          {applications.length === 0 ? <p className="mt-2 text-sm text-gray-500">No applications yet.</p> : null}
          {applications.map((item) => (
            <div key={item.id} className="mt-3 border-t border-gray-100 pt-3 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="font-bold">{item.name}</div>
                <button
                  type="button"
                  className="text-xs font-bold text-red-600 hover:underline"
                  onClick={() => onDeleteApplication(String(item.id))}
                >
                  Delete
                </button>
              </div>
              <div>{item.role}</div>
              <div className="text-gray-500">{item.email}</div>
              {item.cvUrl ? (
                <a href={item.cvUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-bold text-indigo-600 underline">
                  View CV (PDF)
                </a>
              ) : null}
              <p className="mt-1 text-gray-600">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesAdmin({
  contacts,
  emailConfigured,
  onStatus,
  onReply,
  onDelete,
}: {
  contacts: any[];
  emailConfigured: boolean;
  onStatus: (id: string, status: "unread" | "read" | "replied") => Promise<void>;
  onReply: (payload: { email: string; subject: string; message: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [subject, setSubject] = useState("Re: Your inquiry");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "replied">("all");

  const statusOf = (item: any): "unread" | "read" | "replied" =>
    item.status === "replied" ? "replied" : item.status === "read" ? "read" : "unread";

  const exportCsv = () => {
    const escapeCell = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = [
      ["name", "email", "phone", "company", "service", "budget", "message", "status", "createdAt"].join(","),
      ...contacts.map((item) =>
        [item.name, item.email, item.phone, item.company, item.service, item.budget, item.message, statusOf(item), item.createdAt]
          .map(escapeCell)
          .join(",")
      ),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `messages-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const [message, setMessage] = useState("");

  const beginReply = (item: any) => {
    setSelectedId(item.id);
    setSubject(`Re: ${item.service || "Your inquiry"}`);
    setMessage(`Hi ${item.name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nCyber Savvy Pro`);
    if (statusOf(item) === "unread") void onStatus(String(item.id), "read");
  };

  const handleSend = async (item: any) => {
    if (!item?.email) return;
    await onReply({ email: item.email, subject, message });
    await onStatus(String(item.id), "replied");
    setSelectedId(null);
    setMessage("");
  };

  const counts = {
    all: contacts.length,
    unread: contacts.filter((c) => statusOf(c) === "unread").length,
    read: contacts.filter((c) => statusOf(c) === "read").length,
    replied: contacts.filter((c) => statusOf(c) === "replied").length,
  };
  const visible =
    statusFilter === "all" ? contacts : contacts.filter((c) => statusOf(c) === statusFilter);

  const STATUS_STYLES: Record<string, string> = {
    unread: "bg-amber-100 text-amber-700 border-amber-200",
    read: "bg-slate-100 text-slate-600 border-slate-200",
    replied: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="mt-8 space-y-4">
      {!emailConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Reply-by-email is offline:</strong> SMTP is not configured. Add SMTP_HOST,
          SMTP_USER, SMTP_PASS, and SMTP_FROM to your environment to enable sending replies from
          this dashboard. You can still copy the message and reply from your own email client.
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "unread", "read", "replied"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatusFilter(key)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition ${
                statusFilter === key
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {key} ({counts[key]})
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          ⬇ CSV
        </button>
      </div>
      {visible.length === 0 ? <p className="text-sm text-gray-500">No contact messages yet.</p> : null}
      {visible.map((item) => (
        <div
          key={item.id}
          className={`rounded-3xl border bg-white p-6 ${
            statusOf(item) === "unread" ? "border-amber-300 shadow-sm shadow-amber-100" : "border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${STATUS_STYLES[statusOf(item)]}`}>
                  {statusOf(item)}
                </span>
                <span className="font-black text-gray-900">{item.name}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {item.email} · {item.phone} · {item.company}
              </div>
              <div className="mt-2 text-sm font-semibold text-indigo-600">
                {item.service} · {item.budget}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {statusOf(item) !== "read" ? (
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-600"
                  onClick={() => onStatus(String(item.id), "read")}
                >
                  Mark read
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-600"
                  onClick={() => onStatus(String(item.id), "unread")}
                >
                  Mark unread
                </button>
              )}
              {statusOf(item) !== "replied" ? (
                <button
                  type="button"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700"
                  onClick={() => onStatus(String(item.id), "replied")}
                >
                  Mark replied
                </button>
              ) : null}
              <button
                type="button"
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-black text-indigo-700"
                onClick={() => beginReply(item)}
              >
                Reply
              </button>
              <button
                type="button"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-600"
                onClick={() => onDelete(String(item.id))}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-700">{item.message}</p>

          {selectedId === item.id ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Reply message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleSend(item)}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
                >
                  Send reply
                </button>
                <button type="button" onClick={() => setSelectedId(null)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SubscribersAdmin({
  items,
  emailConfigured,
  onSendEmail,
  onDelete,
}: {
  items: any[];
  emailConfigured: boolean;
  onSendEmail: (payload: { subject: string; message: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [subject, setSubject] = useState("Update from Cyber Savvy Pro");
  const [message, setMessage] = useState("Hello,\n\nWe have a new update and we would love to stay connected with you.\n\nBest regards,\nCyber Savvy Pro");

  const exportCsv = () => {
    const rows = ["email,subscribedAt", ...items.map((s) => `${String(s.email || "").replace(/"/g, '""')},${s.createdAt || ""}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 space-y-5 rounded-3xl border border-gray-200 bg-white p-6">
      {!emailConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Broadcasts are offline:</strong> SMTP is not configured, so the Send button will
          fail. Add SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM to your environment to enable
          newsletter emails.
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">Send update to subscribers</h2>
          <p className="text-sm text-slate-600">{items.length} email{items.length === 1 ? "" : "s"} in your list</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          ⬇ CSV
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            await onSendEmail({ subject, message });
            setSubject("Update from Cyber Savvy Pro");
            setMessage("Hello,\n\nWe have a new update and we would love to stay connected with you.\n\nBest regards,\nCyber Savvy Pro");
          }}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500"
        >
          Send to all subscribers
        </button>
      </div>

      {items.length === 0 ? <p className="text-sm text-gray-500">No subscribers yet.</p> : null}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 text-sm text-gray-800">
            <span>
              {item.email} <span className="text-gray-400">{item.createdAt}</span>
            </span>
            <button
              type="button"
              className="text-xs font-bold text-red-600 hover:underline"
              onClick={() => onDelete(String(item.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
  onUpload,
}: {
  items: any[];
  onCreate: (payload: Record<string, string>) => Promise<void>;
  onUpdate: (payload: Record<string, string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpload: (file: File) => Promise<string>;
}) {
  const [form, setForm] = useState({
    eyebrow: "",
    title: "",
    highlight: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    eyebrow: "",
    title: "",
    highlight: "",
    description: "",
    image: "",
    alt: "",
  });

  const beginEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      eyebrow: item.eyebrow || "",
      title: item.title || "",
      highlight: item.highlight || "",
      description: item.description || "",
      image: item.image || "",
      alt: item.alt || "",
    });
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreate(form);
          setForm({ eyebrow: "", title: "", highlight: "", description: "", image: "" });
        }}
      >
        <h2 className="text-lg font-black">Add hero slide</h2>
        <Field label="Eyebrow" value={form.eyebrow} onChange={(eyebrow) => setForm({ ...form, eyebrow })} />
        <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <Field label="Highlight" value={form.highlight} onChange={(highlight) => setForm({ ...form, highlight })} />
        <Field label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} textarea />
        <Field label="Image URL" value={form.image} onChange={(image) => setForm({ ...form, image })} />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = await onUpload(file);
            setForm((current) => ({ ...current, image: url }));
          }}
        />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add slide</button>
      </form>
      <div className="space-y-4">
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              className="space-y-4 rounded-3xl border-2 border-indigo-300 bg-indigo-50/40 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                await onUpdate({ id: item.id, ...editForm });
                setEditingId(null);
              }}
            >
              <h3 className="font-black">Edit slide</h3>
              <Field label="Eyebrow" value={editForm.eyebrow} onChange={(eyebrow) => setEditForm({ ...editForm, eyebrow })} />
              <Field label="Title" value={editForm.title} onChange={(title) => setEditForm({ ...editForm, title })} />
              <Field label="Highlight" value={editForm.highlight} onChange={(highlight) => setEditForm({ ...editForm, highlight })} />
              <Field label="Description" value={editForm.description} onChange={(description) => setEditForm({ ...editForm, description })} textarea />
              <Field label="Image URL" value={editForm.image} onChange={(image) => setEditForm({ ...editForm, image })} />
              <Field label="Alt text" value={editForm.alt} onChange={(alt) => setEditForm({ ...editForm, alt })} />
              <div className="flex gap-3">
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Save slide</button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5">
              <h3 className="font-black">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.image}</p>
              <div className="mt-3 flex gap-3">
                <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => beginEdit(item)}>
                  Edit
                </button>
                <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ServicesAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, string>) => Promise<void>;
  onUpdate: (payload: Record<string, string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState({ icon: "✦", title: "", desc: "", link: "/contact", tech: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ icon: "", title: "", desc: "", link: "", tech: "" });

  const beginEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      icon: item.icon || "",
      title: item.title || "",
      desc: item.desc || "",
      link: item.link || "",
      tech: Array.isArray(item.tech) ? item.tech.join(", ") : item.tech || "",
    });
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreate(form);
          setForm({ icon: "✦", title: "", desc: "", link: "/contact", tech: "" });
        }}
      >
        <h2 className="text-lg font-black">Add service</h2>
        <Field label="Icon" value={form.icon} onChange={(icon) => setForm({ ...form, icon })} />
        <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <Field label="Description" value={form.desc} onChange={(desc) => setForm({ ...form, desc })} textarea />
        <Field label="Link" value={form.link} onChange={(link) => setForm({ ...form, link })} />
        <Field label="Tech (comma separated)" value={form.tech} onChange={(tech) => setForm({ ...form, tech })} />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add service</button>
      </form>
      <div className="space-y-4">
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              className="space-y-4 rounded-3xl border-2 border-indigo-300 bg-indigo-50/40 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                await onUpdate({ id: item.id, ...editForm });
                setEditingId(null);
              }}
            >
              <h3 className="font-black">Edit service</h3>
              <Field label="Icon" value={editForm.icon} onChange={(icon) => setEditForm({ ...editForm, icon })} />
              <Field label="Title" value={editForm.title} onChange={(title) => setEditForm({ ...editForm, title })} />
              <Field label="Description" value={editForm.desc} onChange={(desc) => setEditForm({ ...editForm, desc })} textarea />
              <Field label="Link" value={editForm.link} onChange={(link) => setEditForm({ ...editForm, link })} />
              <Field label="Tech (comma separated)" value={editForm.tech} onChange={(tech) => setEditForm({ ...editForm, tech })} />
              <div className="flex gap-3">
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Save service</button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5">
              <h3 className="font-black">
                {item.icon} {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <div className="mt-3 flex gap-3">
                <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => beginEdit(item)}>
                  Edit
                </button>
                <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function PricingAdmin({
  pricing,
  onCreateRetainer,
  onCreateProject,
  onUpdateRetainer,
  onDeleteRetainer,
  onDeleteProject,
}: {
  pricing: { retainers: any[]; projects: any[] };
  onCreateRetainer: (payload: Record<string, string | boolean>) => Promise<void>;
  onCreateProject: (payload: Record<string, string>) => Promise<void>;
  onUpdateRetainer: (payload: Record<string, string | boolean>) => Promise<void>;
  onDeleteRetainer: (id: string) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}) {
  const [retainer, setRetainer] = useState({
    name: "",
    target: "",
    price: "",
    period: "/month",
    cta: "Get Started",
    features: "",
    popular: false,
  });
  const [project, setProject] = useState({ title: "", priceRange: "", timeline: "", desc: "" });

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreateRetainer(retainer);
          setRetainer({ name: "", target: "", price: "", period: "/month", cta: "Get Started", features: "", popular: false });
        }}
      >
        <h2 className="text-lg font-black">Add retainer</h2>
        <Field label="Name" value={retainer.name} onChange={(name) => setRetainer({ ...retainer, name })} />
        <Field label="Price" value={retainer.price} onChange={(price) => setRetainer({ ...retainer, price })} />
        <Field label="Target" value={retainer.target} onChange={(target) => setRetainer({ ...retainer, target })} textarea />
        <Field label="Features (one per line)" value={retainer.features} onChange={(features) => setRetainer({ ...retainer, features })} textarea />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add retainer</button>
      </form>

      <form
        className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreateProject(project);
          setProject({ title: "", priceRange: "", timeline: "", desc: "" });
        }}
      >
        <h2 className="text-lg font-black">Add project package</h2>
        <Field label="Title" value={project.title} onChange={(title) => setProject({ ...project, title })} />
        <Field label="Price range" value={project.priceRange} onChange={(priceRange) => setProject({ ...project, priceRange })} />
        <Field label="Timeline" value={project.timeline} onChange={(timeline) => setProject({ ...project, timeline })} />
        <Field label="Description" value={project.desc} onChange={(desc) => setProject({ ...project, desc })} textarea />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add project</button>
      </form>

      <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
        {pricing.retainers.map((item) => (
          <RetainerCard key={item.id} item={item} onUpdate={onUpdateRetainer} onDelete={onDeleteRetainer} />
        ))}
        {pricing.projects.map((item) => (
          <ProjectCard key={item.id} item={item} onDelete={onDeleteProject} />
        ))}
      </div>
    </div>
  );
}

function RetainerCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: any;
  onUpdate: (payload: Record<string, string | boolean>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name || "",
    target: item.target || "",
    price: item.price || "",
    period: item.period || "/month",
    cta: item.cta || "Get Started",
    features: Array.isArray(item.features) ? item.features.join("\n") : String(item.features || ""),
    popular: Boolean(item.popular),
  });

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      {!editing ? (
        <>
          <h3 className="font-black">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.price}</p>
          <div className="mt-3 flex gap-3">
            <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            await onUpdate({ id: item.id, ...form });
            setEditing(false);
          }}
        >
          <Field label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
          <Field label="Price" value={form.price} onChange={(price) => setForm({ ...form, price })} />
          <Field label="Period" value={form.period} onChange={(period) => setForm({ ...form, period })} />
          <Field label="Target" value={form.target} onChange={(target) => setForm({ ...form, target })} textarea />
          <Field label="CTA" value={form.cta} onChange={(cta) => setForm({ ...form, cta })} />
          <Field label="Features (one per line)" value={form.features} onChange={(features) => setForm({ ...form, features })} textarea />
          <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
            Most popular
          </label>
          <div className="flex gap-3">
            <button className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white">Save</button>
            <button type="button" className="text-xs font-bold text-gray-500" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ProjectCard({ item, onDelete }: { item: any; onDelete: (id: string) => Promise<void> }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <h3 className="font-black">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.priceRange}</p>
      <p className="mt-1 text-xs text-gray-500">{item.timeline}</p>
      <button type="button" className="mt-3 text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </div>
  );
}

// Allowed avatar colors — literals must stay in source for Tailwind's scanner.
const TESTIMONIAL_COLORS = [
  { value: "bg-indigo-600", label: "Indigo" },
  { value: "bg-violet-600", label: "Violet" },
  { value: "bg-emerald-600", label: "Emerald" },
  { value: "bg-blue-600", label: "Blue" },
  { value: "bg-pink-600", label: "Pink" },
  { value: "bg-amber-600", label: "Amber" },
];

const selectClasses =
  "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-200/40 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100";

type TestimonialFormState = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  metricsHighlight: string;
};

const emptyTestimonialForm: TestimonialFormState = {
  quote: "",
  name: "",
  role: "",
  company: "",
  avatar: "",
  color: "bg-indigo-600",
  metricsHighlight: "",
};

function TestimonialsAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState<TestimonialFormState>(emptyTestimonialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TestimonialFormState>(emptyTestimonialForm);

  const beginEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      quote: item.quote || "",
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      avatar: item.avatar || "",
      color: item.color || "bg-indigo-600",
      metricsHighlight: item.metricsHighlight || "",
    });
  };

  const colorSelect = (value: string, onChange: (color: string) => void) => (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Avatar color</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClasses}>
        {TESTIMONIAL_COLORS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mt-8 space-y-6">
      <form
        className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreate(form);
          setForm(emptyTestimonialForm);
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-900">Add testimonial</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
            Social proof
          </span>
        </div>
        <Field label="Quote" value={form.quote} onChange={(quote) => setForm({ ...form, quote })} textarea />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
          <Field label="Role" value={form.role} onChange={(role) => setForm({ ...form, role })} />
          <Field label="Company" value={form.company} onChange={(company) => setForm({ ...form, company })} />
          <Field
            label="Avatar initials (optional)"
            value={form.avatar}
            onChange={(avatar) => setForm({ ...form, avatar })}
          />
          {colorSelect(form.color, (color) => setForm({ ...form, color }))}
          <Field
            label="Metric badge (e.g. +34% Activation)"
            value={form.metricsHighlight}
            onChange={(metricsHighlight) => setForm({ ...form, metricsHighlight })}
          />
        </div>
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add testimonial</button>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? <p className="text-sm text-gray-500">No testimonials yet.</p> : null}
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              className="space-y-4 rounded-3xl border-2 border-indigo-300 bg-indigo-50/40 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                await onUpdate({ id: item.id, ...editForm });
                setEditingId(null);
              }}
            >
              <h3 className="font-black">Edit testimonial</h3>
              <Field label="Quote" value={editForm.quote} onChange={(quote) => setEditForm({ ...editForm, quote })} textarea />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={editForm.name} onChange={(name) => setEditForm({ ...editForm, name })} />
                <Field label="Role" value={editForm.role} onChange={(role) => setEditForm({ ...editForm, role })} />
                <Field label="Company" value={editForm.company} onChange={(company) => setEditForm({ ...editForm, company })} />
                <Field
                  label="Avatar initials"
                  value={editForm.avatar}
                  onChange={(avatar) => setEditForm({ ...editForm, avatar })}
                />
                {colorSelect(editForm.color, (color) => setEditForm({ ...editForm, color }))}
                <Field
                  label="Metric badge"
                  value={editForm.metricsHighlight}
                  onChange={(metricsHighlight) => setEditForm({ ...editForm, metricsHighlight })}
                />
              </div>
              <div className="flex gap-3">
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Save testimonial</button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                    {item.metricsHighlight}
                  </div>
                  <p className="mt-2 text-sm italic text-gray-700">“{item.quote}”</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {item.name}
                    <span className="font-normal text-gray-500">
                      {" "}
                      · {item.role}
                      {item.company ? ` · ${item.company}` : ""}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => beginEdit(item)}>
                    Edit
                  </button>
                  <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

type FaqFormState = { q: string; a: string; page: string };
const emptyFaqForm: FaqFormState = { q: "", a: "", page: "general" };

function FaqPageSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Page</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-200/40 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <option value="general">Main FAQ page (/faq)</option>
        <option value="how-it-works">How It Works (/how-it-works)</option>
      </select>
    </div>
  );
}

function FaqsAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState<FaqFormState>(emptyFaqForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FaqFormState>(emptyFaqForm);

  return (
    <div className="mt-8 space-y-6">
      <form
        className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreate(form);
          setForm(emptyFaqForm);
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-900">Add FAQ</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
            Knowledge base
          </span>
        </div>
        <Field label="Question" value={form.q} onChange={(q) => setForm({ ...form, q })} />
        <Field label="Answer" value={form.a} onChange={(a) => setForm({ ...form, a })} textarea />
        <FaqPageSelect value={form.page} onChange={(page) => setForm({ ...form, page })} />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add FAQ</button>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? <p className="text-sm text-gray-500">No FAQs yet.</p> : null}
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              className="space-y-4 rounded-3xl border-2 border-indigo-300 bg-indigo-50/40 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                await onUpdate({ id: item.id, ...editForm });
                setEditingId(null);
              }}
            >
              <h3 className="font-black">Edit FAQ</h3>
              <Field label="Question" value={editForm.q} onChange={(q) => setEditForm({ ...editForm, q })} />
              <Field label="Answer" value={editForm.a} onChange={(a) => setEditForm({ ...editForm, a })} textarea />
              <FaqPageSelect value={editForm.page} onChange={(page) => setEditForm({ ...editForm, page })} />
              <div className="flex gap-3">
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Save FAQ</button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">{item.q}</h3>
              {item.page === "how-it-works" ? (
                <span className="mt-1 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  How it works page
                </span>
              ) : null}
              <p className="mt-2 text-sm text-gray-600">{item.a}</p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600"
                  onClick={() => {
                    setEditingId(item.id);
                    setEditForm({ q: item.q || "", a: item.a || "", page: item.page || "general" });
                  }}
                >
                  Edit
                </button>
                <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

type CaseStudyFormState = {
  client: string;
  industry: string;
  service: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tech: string;
  teaser: string;
  teaserService: string;
};

const emptyCaseStudyForm: CaseStudyFormState = {
  client: "",
  industry: "",
  service: "",
  summary: "",
  metrics: [{ value: "", label: "" }],
  tech: "",
  teaser: "",
  teaserService: "",
};

function CaseStudyFields({
  form,
  onChange,
}: {
  form: CaseStudyFormState;
  onChange: (next: CaseStudyFormState) => void;
}) {
  const setMetric = (index: number, patch: { value?: string; label?: string }) => {
    onChange({
      ...form,
      metrics: form.metrics.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Client" value={form.client} onChange={(client) => onChange({ ...form, client })} />
        <Field label="Industry" value={form.industry} onChange={(industry) => onChange({ ...form, industry })} />
      </div>
      <Field label="Service" value={form.service} onChange={(service) => onChange({ ...form, service })} />
      <Field
        label="Homepage card line (empty = hide from homepage)"
        value={form.teaser}
        onChange={(teaser) => onChange({ ...form, teaser })}
        textarea
      />
      <Field
        label="Homepage card label (blank = use Service)"
        value={form.teaserService}
        onChange={(teaserService) => onChange({ ...form, teaserService })}
      />
      <Field label="Summary" value={form.summary} onChange={(summary) => onChange({ ...form, summary })} textarea />
      <div>
        <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Metrics</div>
        <div className="space-y-2">
          {form.metrics.map((row, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={row.value}
                onChange={(e) => setMetric(index, { value: e.target.value })}
                placeholder="Value (e.g. 65%)"
                className="w-1/3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <input
                value={row.label}
                onChange={(e) => setMetric(index, { label: e.target.value })}
                placeholder="Label (e.g. Faster Dispatch Turnaround)"
                className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                aria-label="Remove metric"
                onClick={() => onChange({ ...form, metrics: form.metrics.filter((_, i) => i !== index) })}
                className="rounded-2xl border border-slate-300 px-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({ ...form, metrics: [...form.metrics, { value: "", label: "" }] })}
          className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
        >
          + Add metric
        </button>
      </div>
      <Field
        label="Tech tags (one per line)"
        value={form.tech}
        onChange={(tech) => onChange({ ...form, tech })}
        textarea
      />
    </>
  );
}

function CaseStudiesAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [form, setForm] = useState<CaseStudyFormState>(emptyCaseStudyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CaseStudyFormState>(emptyCaseStudyForm);

  const beginEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      client: item.client || "",
      industry: item.industry || "",
      service: item.service || "",
      summary: item.summary || "",
      metrics:
        Array.isArray(item.metrics) && item.metrics.length > 0
          ? item.metrics.map((row: any) => ({ value: row.value || "", label: row.label || "" }))
          : [{ value: "", label: "" }],
      tech: Array.isArray(item.tech) ? item.tech.join("\n") : String(item.tech || ""),
      teaser: item.teaser || "",
      teaserService: item.teaserService || "",
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <form
        className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreate(form);
          setForm(emptyCaseStudyForm);
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-900">Add case study</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
            Portfolio
          </span>
        </div>
        <CaseStudyFields form={form} onChange={setForm} />
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white">Add case study</button>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? <p className="text-sm text-gray-500">No case studies yet.</p> : null}
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              className="space-y-4 rounded-3xl border-2 border-indigo-300 bg-indigo-50/40 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                await onUpdate({ id: item.id, ...editForm });
                setEditingId(null);
              }}
            >
              <h3 className="font-black">Edit case study</h3>
              <CaseStudyFields form={editForm} onChange={setEditForm} />
              <div className="flex gap-3">
                <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Save case study</button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5">
              <h3 className="font-black">{item.client}</h3>
              <p className="text-sm text-gray-600">
                {item.industry}
                {item.service ? ` · ${item.service}` : ""}
              </p>
              <p className="mt-2 text-sm text-gray-700">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-indigo-700">
                {(item.metrics || []).map((row: any, index: number) => (
                  <span key={index}>
                    {row.value} <span className="font-normal text-gray-500">{row.label}</span>
                  </span>
                ))}
              </div>
              {item.teaser ? (
                <p className="mt-2 text-xs font-semibold text-indigo-600">🏠 Homepage: {item.teaser}</p>
              ) : null}
              <div className="mt-3 flex gap-3">
                <button type="button" className="text-xs font-bold text-indigo-600" onClick={() => beginEdit(item)}>
                  Edit
                </button>
                <button type="button" className="text-xs font-bold text-red-600" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

type PageSectionDraft = Record<string, string | Record<string, string>[]>;
type DraftField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "list" | "object-list";
  subfields?: { key: string; label: string; type?: "text" | "textarea" }[];
};

function toDraft(section: {
  fields: { key: string; type: string; subfields?: { key: string; label: string; type?: string }[] }[];
  items: Record<string, any>[];
}): PageSectionDraft[] {
  return section.items.map((item) => {
    const row: PageSectionDraft = {};
    for (const field of section.fields) {
      const value = item[field.key];
      if (field.type === "object-list") {
        const entries = Array.isArray(value) ? value : [];
        row[field.key] = entries.map((entry: any) => {
          const obj: Record<string, string> = {};
          for (const sub of field.subfields ?? []) obj[sub.key] = String(entry?.[sub.key] ?? "");
          return obj;
        });
      } else {
        row[field.key] = Array.isArray(value) ? value.join("\n") : String(value ?? "");
      }
    }
    return row;
  });
}

function PageSectionsAdmin({
  sections,
  onSave,
}: {
  sections: {
    id: string;
    page: string;
    title: string;
    fields: DraftField[];
    items: Record<string, any>[];
  }[];
  onSave: (sections: { id: string; items: unknown[] }[]) => Promise<void>;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [drafts, setDrafts] = useState<Record<string, PageSectionDraft[]>>({});
  const [saving, setSaving] = useState(false);

  const active = sections.find((section) => section.id === activeId) ?? sections[0];
  const draft: PageSectionDraft[] = active ? drafts[active.id] ?? toDraft(active) : [];

  const setDraft = (rows: PageSectionDraft[]) => {
    if (!active) return;
    setDrafts({ ...drafts, [active.id]: rows });
  };

  const patchRow = (index: number, key: string, value: string) =>
    setDraft(draft.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  const addRow = () => {
    if (!active) return;
    const blank: PageSectionDraft = {};
    for (const field of active.fields) blank[field.key] = field.type === "object-list" ? [] : "";
    setDraft([...draft, blank]);
  };

  const patchSub = (
    index: number,
    fieldKey: string,
    subIndex: number,
    subKey: string,
    value: string
  ) => {
    const current = (draft[index]?.[fieldKey] ?? []) as Record<string, string>[];
    const next = current.map((entry, i) => (i === subIndex ? { ...entry, [subKey]: value } : entry));
    setDraft(draft.map((row, i) => (i === index ? { ...row, [fieldKey]: next } : row)));
  };

  const addSub = (index: number, fieldKey: string, subfields: { key: string }[]) => {
    const current = (draft[index]?.[fieldKey] ?? []) as Record<string, string>[];
    const blank: Record<string, string> = {};
    for (const sub of subfields) blank[sub.key] = "";
    setDraft(draft.map((row, i) => (i === index ? { ...row, [fieldKey]: [...current, blank] } : row)));
  };

  const removeSub = (index: number, fieldKey: string, subIndex: number) => {
    const current = (draft[index]?.[fieldKey] ?? []) as Record<string, string>[];
    setDraft(
      draft.map((row, i) =>
        i === index ? { ...row, [fieldKey]: current.filter((_, j) => j !== subIndex) } : row
      )
    );
  };

  const removeRow = (index: number) => setDraft(draft.filter((_, i) => i !== index));

  const moveRow = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= draft.length) return;
    const rows = [...draft];
    const moved = rows.splice(index, 1)[0] as PageSectionDraft;
    rows.splice(target, 0, moved);
    setDraft(rows);
  };

  const save = async () => {
    if (!active) return;
    setSaving(true);
    try {
      await onSave(
        sections.map((section) => ({
          id: section.id,
          items: section.id === active.id ? draft : drafts[section.id] ?? section.items,
        }))
      );
      setDrafts({});
    } finally {
      setSaving(false);
    }
  };

  if (sections.length === 0) {
    return <p className="mt-8 text-sm text-gray-500">No page sections registered.</p>;
  }

  const groups: { page: string; sections: typeof sections }[] = [];
  for (const section of sections) {
    const group = groups.find((candidate) => candidate.page === section.page);
    if (group) group.sections.push(section);
    else groups.push({ page: section.page, sections: [section] });
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-4 self-start rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50">
        {groups.map((group) => (
          <div key={group.page}>
            <div className="mb-1.5 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {group.page}
            </div>
            <div className="space-y-1">
              {group.sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveId(section.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition ${
                    active?.id === section.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "border border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>{section.title}</span>
                  <span className={active?.id === section.id ? "text-indigo-200" : "text-slate-400"}>
                    {section.items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active ? (
        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900">{active.title}</h2>
              <p className="text-sm text-slate-500">
                {active.page} · {draft.length} item{draft.length === 1 ? "" : "s"}
              </p>
            </div>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save section"}
            </button>
          </div>

          <div className="space-y-4">
            {draft.length === 0 ? <p className="text-sm text-gray-500">No items yet.</p> : null}
            {draft.map((row, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Item {index + 1}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      aria-label="Move up"
                      onClick={() => moveRow(index, -1)}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      onClick={() => moveRow(index, 1)}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeRow(index)}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-red-500 hover:bg-red-50"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {active.fields.map((field) =>
                    field.type === "object-list" ? (
                      <div key={field.key}>
                        <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
                          {field.label}
                        </div>
                        <div className="space-y-2">
                          {(
                            (Array.isArray(row[field.key]) ? row[field.key] : []) as Record<string, string>[]
                          ).map((entry, entryIndex) => (
                            <div key={entryIndex} className="rounded-2xl border border-slate-200 bg-white p-3">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                  Card {entryIndex + 1}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Remove card"
                                  onClick={() => removeSub(index, field.key, entryIndex)}
                                  className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-bold text-red-500 hover:bg-red-50"
                                >
                                  ✕
                                </button>
                              </div>
                              <div className="space-y-2">
                                {(field.subfields ?? []).map((sub) => (
                                  <Field
                                    key={sub.key}
                                    label={sub.label}
                                    value={String(entry[sub.key] ?? "")}
                                    onChange={(value) => patchSub(index, field.key, entryIndex, sub.key, value)}
                                    textarea={sub.type === "textarea"}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => addSub(index, field.key, field.subfields ?? [])}
                          className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
                        >
                          + Add card
                        </button>
                      </div>
                    ) : (
                      <Field
                        key={field.key}
                        label={field.label}
                        value={typeof row[field.key] === "string" ? String(row[field.key]) : ""}
                        onChange={(value) => patchRow(index, field.key, value)}
                        textarea={field.type !== "text"}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addRow} className="text-xs font-bold text-indigo-600 hover:underline">
            + Add item
          </button>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Team members (admin → /team page)
// ---------------------------------------------------------------------------

const TEAM_COLOR_OPTIONS = [
  { value: "bg-indigo-600", label: "Indigo" },
  { value: "bg-violet-600", label: "Violet" },
  { value: "bg-emerald-600", label: "Emerald" },
  { value: "bg-blue-600", label: "Blue" },
  { value: "bg-pink-600", label: "Pink" },
  { value: "bg-amber-600", label: "Amber" },
];

type TeamLinkDraft = { label: string; href: string; variant: "primary" | "outline" };
type TeamDraft = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
  specialties: string;
  links: TeamLinkDraft[];
};

const emptyTeamDraft: TeamDraft = {
  name: "",
  role: "",
  bio: "",
  avatar: "",
  color: "bg-indigo-600",
  specialties: "",
  links: [{ label: "Contact", href: "/contact", variant: "primary" }],
};

function TeamLinkEditor({
  links,
  onChange,
}: {
  links: TeamLinkDraft[];
  onChange: (links: TeamLinkDraft[]) => void;
}) {
  const patch = (index: number, entry: Partial<TeamLinkDraft>) =>
    onChange(links.map((link, i) => (i === index ? { ...link, ...entry } : link)));
  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={link.label}
            onChange={(e) => patch(index, { label: e.target.value })}
            placeholder="Label"
            className="w-40 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <input
            value={link.href}
            onChange={(e) => patch(index, { href: e.target.value })}
            placeholder="/contact or tel:+254..."
            className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <select
            value={link.variant}
            onChange={(e) => patch(index, { variant: e.target.value === "primary" ? "primary" : "outline" })}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="primary">Primary</option>
            <option value="outline">Outline</option>
          </select>
          <button
            type="button"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", href: "", variant: "outline" }])}
        className="text-xs font-bold text-indigo-600 hover:underline"
      >
        + Add link
      </button>
    </div>
  );
}

function TeamFields({ draft, onChange }: { draft: TeamDraft; onChange: (next: TeamDraft) => void }) {
  const patch = (entry: Partial<TeamDraft>) => onChange({ ...draft, ...entry });
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Full name" value={draft.name} onChange={(v) => patch({ name: v })} />
        <Field label="Role" value={draft.role} onChange={(v) => patch({ role: v })} />
      </div>
      <Field label="Bio" value={draft.bio} onChange={(v) => patch({ bio: v })} textarea />
      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          label="Avatar initials (blank = auto)"
          value={draft.avatar}
          onChange={(v) => patch({ avatar: v })}
        />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
            Avatar color
          </label>
          <select
            value={draft.color}
            onChange={(e) => patch({ color: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {TEAM_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Specialties (comma-separated)"
          value={draft.specialties}
          onChange={(v) => patch({ specialties: v })}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
          Button links
        </label>
        <TeamLinkEditor links={draft.links} onChange={(links) => patch({ links })} />
      </div>
    </div>
  );
}

function TeamAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<TeamDraft>(emptyTeamDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<TeamDraft>(emptyTeamDraft);

  const toPayload = (state: TeamDraft) => ({
    name: state.name,
    role: state.role,
    bio: state.bio,
    avatar: state.avatar,
    color: state.color,
    specialties: state.specialties,
    links: state.links.filter((link) => link.label && link.href),
  });

  const toDraft = (item: any): TeamDraft => ({
    name: String(item.name ?? ""),
    role: String(item.role ?? ""),
    bio: String(item.bio ?? ""),
    avatar: String(item.avatar ?? ""),
    color: String(item.color ?? "bg-indigo-600"),
    specialties: Array.isArray(item.specialties) ? item.specialties.join(", ") : "",
    links: Array.isArray(item.links)
      ? item.links.map((link: any) => ({
          label: String(link?.label ?? ""),
          href: String(link?.href ?? ""),
          variant: link?.variant === "primary" ? ("primary" as const) : ("outline" as const),
        }))
      : [],
  });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          {items.length} member{items.length === 1 ? "" : "s"} on the{" "}
          <span className="font-bold text-indigo-600">/team</span> page
        </p>
        <button
          type="button"
          onClick={() => setCreating(!creating)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
        >
          {creating ? "Close" : "+ Add member"}
        </button>
      </div>

      {creating ? (
        <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6">
          <TeamFields draft={draft} onChange={setDraft} />
          <button
            type="button"
            onClick={async () => {
              await onCreate(toPayload(draft));
              setDraft(emptyTeamDraft);
              setCreating(false);
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            Save member
          </button>
        </div>
      ) : null}

      {items.map((item) => (
        <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-6">
          {editingId === item.id ? (
            <>
              <TeamFields draft={editDraft} onChange={setEditDraft} />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    await onUpdate({ id: item.id, ...toPayload(editDraft) });
                    setEditingId(null);
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Update member
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${
                    TEAM_COLOR_OPTIONS.some((c) => c.value === item.color) ? item.color : "bg-indigo-600"
                  }`}
                >
                  {item.avatar}
                </span>
                <div>
                  <div className="font-black text-gray-900">{item.name}</div>
                  <div className="text-sm font-semibold text-indigo-600">{item.role}</div>
                  <p className="mt-1 max-w-xl text-sm text-gray-600">{item.bio}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(item.specialties || []).map((s: string) => (
                      <span
                        key={s}
                        className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(item.id);
                    setEditDraft(toDraft(item));
                  }}
                  className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-black text-indigo-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(String(item.id))}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product updates / changelog (admin → /updates page)
// ---------------------------------------------------------------------------

const UPDATE_TAG_OPTIONS = ["New", "Improved", "Security", "Major"];

type UpdateDraft = {
  date: string;
  version: string;
  title: string;
  category: string;
  summary: string;
  highlights: string;
  tag: string;
};

const emptyUpdateDraft: UpdateDraft = {
  date: "",
  version: "",
  title: "",
  category: "Feature",
  summary: "",
  highlights: "",
  tag: "New",
};

function UpdateFields({
  draft,
  onChange,
}: {
  draft: UpdateDraft;
  onChange: (next: UpdateDraft) => void;
}) {
  const patch = (entry: Partial<UpdateDraft>) => onChange({ ...draft, ...entry });
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Date (YYYY-MM-DD)" value={draft.date} onChange={(v) => patch({ date: v })} />
        <Field label="Version (e.g. v2.5.0)" value={draft.version} onChange={(v) => patch({ version: v })} />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
            Category
          </label>
          <select
            value={draft.category}
            onChange={(e) => patch({ category: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {["Launch", "Feature", "Improvement", "Security"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <Field label="Title" value={draft.title} onChange={(v) => patch({ title: v })} />
      <Field label="Summary" value={draft.summary} onChange={(v) => patch({ summary: v })} textarea />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Highlights (comma-separated)"
          value={draft.highlights}
          onChange={(v) => patch({ highlights: v })}
        />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
            Tag
          </label>
          <select
            value={draft.tag}
            onChange={(e) => patch({ tag: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {UPDATE_TAG_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function UpdatesAdmin({
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  items: any[];
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
  onUpdate: (payload: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<UpdateDraft>(emptyUpdateDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<UpdateDraft>(emptyUpdateDraft);

  const sorted = items
    .slice()
    .sort((a: any, b: any) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          {items.length} release note{items.length === 1 ? "" : "s"} on{" "}
          <span className="font-bold text-indigo-600">/updates</span> (newest first)
        </p>
        <button
          type="button"
          onClick={() => setCreating(!creating)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
        >
          {creating ? "Close" : "+ Publish update"}
        </button>
      </div>

      {creating ? (
        <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6">
          <UpdateFields draft={draft} onChange={setDraft} />
          <button
            type="button"
            onClick={async () => {
              await onCreate(draft);
              setDraft(emptyUpdateDraft);
              setCreating(false);
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            Publish
          </button>
        </div>
      ) : null}

      {sorted.map((item) => (
        <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-6">
          {editingId === item.id ? (
            <>
              <UpdateFields draft={editDraft} onChange={setEditDraft} />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    await onUpdate({ id: item.id, ...editDraft });
                    setEditingId(null);
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-white">{item.version}</span>
                  <span>{item.date}</span>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{item.tag}</span>
                </div>
                <div className="mt-2 font-black text-gray-900">{item.title}</div>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">{item.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(item.highlights || []).map((h: string) => (
                    <span
                      key={h}
                      className="rounded-lg bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(item.id);
                    setEditDraft({
                      date: String(item.date ?? ""),
                      version: String(item.version ?? ""),
                      title: String(item.title ?? ""),
                      category: String(item.category ?? "Feature"),
                      summary: String(item.summary ?? ""),
                      highlights: Array.isArray(item.highlights) ? item.highlights.join(", ") : "",
                      tag: String(item.tag ?? "New"),
                    });
                  }}
                  className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-black text-indigo-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(String(item.id))}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-black text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Settings — admin password + contact/booking form options + email status
// ---------------------------------------------------------------------------

function SettingsAdmin({
  settings,
  emailConfigured,
  onSaveSettings,
}: {
  settings: { contactServices: string[]; contactBudgets: string[]; bookBudgets: string[] };
  emailConfigured: boolean;
  onSaveSettings: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [services, setServices] = useState((settings.contactServices || []).join("\n"));
  const [contactBudgets, setContactBudgets] = useState((settings.contactBudgets || []).join("\n"));
  const [bookBudgets, setBookBudgets] = useState((settings.bookBudgets || []).join("\n"));

  const changePassword = async () => {
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Password change failed.");
      setPasswordMessage("Password updated. Use the new password next time you log in.");
      setUsername("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage(err instanceof Error ? err.message : "Password change failed.");
    } finally {
      setSavingPassword(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
  const labelClass = "mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-700";

  return (
    <div className="mt-8 space-y-6">
      {/* Email status */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black text-slate-900">Email (SMTP) status</h2>
        <p className={`mt-2 text-sm font-bold ${emailConfigured ? "text-emerald-600" : "text-amber-600"}`}>
          {emailConfigured
            ? "✔ SMTP is configured — replies and newsletter broadcasts can send."
            : "✖ SMTP is not configured — replies and broadcasts will fail."}
        </p>
        {!emailConfigured ? (
          <p className="mt-2 text-sm text-slate-600">
            Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM to your .env.local and
            restart the server to enable sending emails from the dashboard.
          </p>
        ) : null}
      </div>

      {/* Admin password */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black text-slate-900">Change admin login</h2>
        <p className="mt-1 text-sm text-slate-600">
          Credentials are stored in .env.local (ADMIN_USER / ADMIN_PASSWORD).
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Current password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>New password (min 8 chars)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {passwordMessage ? (
          <p className="mt-3 text-sm font-bold text-slate-700">{passwordMessage}</p>
        ) : null}
        <button
          type="button"
          onClick={changePassword}
          disabled={savingPassword || !username || !currentPassword || !newPassword}
          className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {savingPassword ? "Saving..." : "Update password"}
        </button>
      </div>

      {/* Contact & booking form options */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black text-slate-900">Contact &amp; booking form options</h2>
        <p className="mt-1 text-sm text-slate-600">
          One option per line. These drive the dropdowns on the /contact and /book pages.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div>
            <label className={labelClass}>Contact — services</label>
            <textarea
              value={services}
              onChange={(e) => setServices(e.target.value)}
              rows={8}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Contact — budget brackets</label>
            <textarea
              value={contactBudgets}
              onChange={(e) => setContactBudgets(e.target.value)}
              rows={8}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Booking (/book) — budget brackets</label>
            <textarea
              value={bookBudgets}
              onChange={(e) => setBookBudgets(e.target.value)}
              rows={8}
              className={inputClass}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={async () => {
            await onSaveSettings({ contactServices: services, contactBudgets, bookBudgets });
          }}
          className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
        >
          Save form options
        </button>
      </div>
    </div>
  );
}
