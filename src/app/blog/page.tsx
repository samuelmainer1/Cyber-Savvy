import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { remoteImageProps } from "@/lib/image";
import { getBlogPosts } from "@/lib/cms";

// Blog list must reflect admin publish/unpublish actions immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering & Growth Blog | Cyber Savvy Pro",
  description:
    "Insights on full-stack web architecture, custom ERP development, technical SEO ranking, and enterprise cybersecurity from Sam Maina and the Cyber Savvy Pro team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Engineering & Growth Blog | Cyber Savvy Pro",
    description:
      "Insights on full-stack web architecture, custom ERP development, technical SEO ranking, and enterprise cybersecurity from Sam Maina and the Cyber Savvy Pro team.",
    url: "/blog",
    type: "website",
    images: [{ url: "/images/hero/hero-coding-team.jpg", alt: "Cyber Savvy Pro engineering and growth blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering & Growth Blog | Cyber Savvy Pro",
    description:
      "Insights on full-stack web architecture, custom ERP development, technical SEO ranking, and enterprise cybersecurity from Sam Maina and the Cyber Savvy Pro team.",
    images: ["/images/hero/hero-coding-team.jpg"],
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="bg-gray-50 pb-20">
      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/70 via-emerald-500/40 to-transparent"
        />
        <div className="relative mx-auto flex h-[400px] max-w-7xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center self-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <span>📝</span>
            <span>Engineering & Growth Insights</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Technical Insights from the{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Cyber Savvy Pro Desk
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-50 sm:text-xl">
            Actionable software architecture, custom ERP case studies, Google SEO ranking guides, and enterprise IT security blueprints written by founder Sam Maina.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    {...remoteImageProps(post.image)}
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <div className="mb-3 text-xs text-gray-500">{post.readTime}</div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-black leading-snug text-gray-900 hover:text-indigo-700">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{post.summary}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{post.author}</div>
                    <div className="text-[11px] text-gray-400">{post.date}</div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Need custom technical architecture for your business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Consult directly with Sam Maina for a free technical assessment and roadmap.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg transition-all hover:bg-gray-100"
            >
              Schedule Scoping Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
