import Link from "next/link";
import Image from "next/image";
import { remoteImageProps } from "@/lib/image";
import { getBlogPost } from "@/lib/cms";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { notFound } from "next/navigation";
import { getEnvSiteUrl } from "@/lib/site";

const siteUrl = getEnvSiteUrl();

// Article pages read the CMS at request time so publish/unpublish and new
// posts take effect immediately in production (not only after a rebuild).
export const dynamic = "force-dynamic";

const MONTH_TO_NUMBER: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/** Convert the display date ("Oct 2026") into an ISO date for structured data. */
function isoFromDisplayDate(display: string) {
  const [month, year] = display.trim().split(/\s+/);
  const monthNumber = MONTH_TO_NUMBER[month];
  return monthNumber && year ? `${year}-${monthNumber}-01` : display;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Blog content is authored as HTML in the admin rich text editor.
 * - Legacy plain-text posts are split into escaped paragraphs.
 * - External links open in a new tab; internal links stay in the same tab.
 */
function toArticleHtml(content: string) {
  const looksLikeHtml = /<[a-z][^>]*>/i.test(content);
  if (!looksLikeHtml) {
    return content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => `<p>${escapeHtml(line.trim())}</p>`)
      .join("\n");
  }
  // Defense in depth: sanitize at render time so any legacy (or hand-edited)
  // content stored before the API-side sanitizer existed can't run scripts.
  return sanitizeBlogHtml(
    content.replace(
      /<a\s+href="(https?:\/\/[^"]+)"([^>]*)>/gi,
      (match, href: string, rest: string) =>
        /\btarget=/i.test(rest) ? match : `<a href="${href}"${rest} target="_blank" rel="noopener noreferrer">`
    )
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return {
    title: `${post.title} | Cyber Savvy Pro Blog`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) notFound();

  const articleHtml = toArticleHtml(post.content || post.summary);

  const isoDate = isoFromDisplayDate(post.date);
  const postImageUrl = post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: [postImageUrl],
    author: { "@type": "Person", name: post.author, url: `${siteUrl}/about` },
    publisher: {
      "@type": "Organization",
      name: "Cyber Savvy Pro",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
    },
    datePublished: isoDate,
    dateModified: isoDate,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
  };

  return (
    <div className="bg-gray-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8">
        <Link href="/blog" className="mb-8 inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700">
          ← Back to Blog
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-64 sm:h-80 lg:h-[420px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 896px"
              {...remoteImageProps(post.image)}
              className="object-cover"
            />
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              {post.category}
            </span>
          </div>

          <div className="p-8 sm:p-12">
            <header className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="font-bold text-gray-900">{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div className="space-y-6 leading-relaxed text-gray-700">
              <p className="rounded-r-xl border-l-4 border-indigo-200 bg-indigo-50/40 py-3 pl-5 text-lg font-medium italic leading-relaxed text-gray-800">
                {post.summary}
              </p>

              <div className="article-body" dangerouslySetInnerHTML={{ __html: articleHtml }} />

              <div className="mt-8 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-6 shadow-sm">
                <h3 className="text-lg font-black text-indigo-950">Want a personalized technical strategy?</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Founder Sam Maina offers direct scoping consultations to evaluate your current architecture and propose the most efficient development or growth pathway.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow transition-all hover:bg-indigo-700"
                >
                  Request a Free Technical Consultation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
