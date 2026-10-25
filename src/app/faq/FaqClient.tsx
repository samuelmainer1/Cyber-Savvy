"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { techStack } from "./faqs";

export default function FaqClient({
  faqs,
}: {
  faqs: { id?: string; q: string; a: string }[];
}) {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden border-b border-gray-200 bg-slate-950">
        {/* Hero background image (native 1920×350, section pinned to match) */}
        <Image
          src="/images/hero/faq-hero.jpg"
          alt="Two colleagues in discussion during a client consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_50%]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span>❓</span>
            <span>Knowledge Base & Technical Standards</span>
          </div>

          <h1 className="mt-4 w-full max-w-4xl text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions &{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Our Tech Stack
            </span>
          </h1>

          <p className="mt-4 w-full max-w-2xl text-sm text-slate-200 sm:text-base leading-relaxed">
            Everything you need to know about our engineering standards, technology selections, pricing models, and how we work with clients.
          </p>

          <div className="mt-6 w-full max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. M-Pesa, retainers, code ownership)..."
              className="w-full rounded-2xl border border-gray-300 bg-white py-3 px-6 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Modern Tooling
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Enterprise Technology Stack We Build With
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            We choose modern, battle-tested technologies that ensure sub-second latency, security, and effortless scaling.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((ts) => (
            <div
              key={ts.category}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
            >
              <h3 className="text-base font-black text-indigo-600 border-b border-gray-100 pb-3">
                {ts.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {ts.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs List */}
      <section className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Direct Answers
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
            Common Client Questions
          </h2>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <details
              key={faq.id ?? faq.q}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-gray-900 marker:hidden">
                <span className="pr-4">{faq.q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-extrabold text-sm transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Have a specific technical question for Sam?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100 text-lg">
            We are always happy to discuss software architectures and feasibility.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg hover:bg-gray-100 transition-all"
            >
              Contact Sam Maina
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
