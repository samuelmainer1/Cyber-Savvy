"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SearchResult = {
  type: "case-study" | "service" | "testimonial" | "page";
  title: string;
  subtitle: string;
  href: string;
  excerpt: string;
  icon: string;
};

type SearchClientProps = {
  initialResults: SearchResult[];
};

export function SearchClient({ initialResults }: SearchClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [results, setResults] = useState<SearchResult[]>(initialResults);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!query.trim()) return results;
    const q = query.toLowerCase();
    return results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q)
    );
  }, [query, results]);

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
            <span>🔍</span>
            <span>Search</span>
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Search Cyber Savvy Pro
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
            Find case studies, services, client stories, and more.
          </p>

          <div className="mt-10 mx-auto max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search case studies, services, testimonials…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-3xl border border-gray-200 bg-white px-6 py-4 text-lg text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              {query.trim() && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-3 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} found{query.trim() ? ` for "${query}"` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {query.trim() ? "No results found" : "Start searching"}
            </h3>
            <p className="text-gray-600">
              {query.trim()
                ? "Try adjusting your keywords or browse our most popular pages below."
                : "Enter a keyword above to search case studies, services, testimonials, and pages."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/case-studies" className="px-6 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Case Studies
              </Link>
              <Link href="/services" className="px-6 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Services
              </Link>
              <Link href="/testimonials" className="px-6 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Testimonials
              </Link>
              <Link href="/pricing" className="px-6 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Pricing
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={`${r.type}-${r.title}`}
                href={r.href}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl mb-4">
                  {r.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
                  {r.type.replace("-", " ")}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{r.excerpt}</p>
                <span className="text-xs font-semibold text-gray-400 mt-auto">{r.subtitle}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}