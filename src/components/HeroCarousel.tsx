"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/cms";
import { remoteImageProps } from "@/lib/image";

export default function HeroCarousel({ initialSlides = [] }: { initialSlides?: HeroSlide[] }) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState(0);

  // Refresh from the CMS on mount so admin edits appear without a rebuild.
  useEffect(() => {
    fetch("/api/content/hero")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
      })
      .catch(() => {
        /* keep SSR slides on fetch failure */
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    // SSR fallback copy — guarantees crawlers always see an <h1>.
    return (
      <section className="relative overflow-hidden border-b border-gray-200 bg-gray-950">
        <div className="relative mx-auto flex h-[520px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elite Full-Stack Software,{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
                Custom Systems &amp; Growth
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Custom web applications, enterprise ERPs, SEO ranking, and managed IT services by Cyber Savvy Pro — Mombasa Road, Nairobi.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const slide = slides[activeSlide] || slides[0];

  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-gray-950">
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.alt || item.title || "Cyber Savvy Pro service highlight"}
            fill
            priority={index === 0}
            sizes="100vw"
            aria-hidden={index !== activeSlide}
            {...remoteImageProps(item.image)}
            className={`object-cover transition-opacity duration-700 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className={`absolute inset-0 ${activeSlide === 0 ? "bg-black/50" : "bg-black/60"}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-slate-950/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex h-[520px] max-w-7xl items-center overflow-hidden px-4 py-5 sm:h-[500px] sm:px-6 sm:py-6 lg:h-[520px] lg:px-8 lg:py-8">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur-sm">
            <span>✦</span>
            <span>{slide.eyebrow} · Mombasa Road, Nairobi</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {slide.description}
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={slide.primaryHref}
              className="w-full rounded-xl bg-indigo-500 px-8 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-400 sm:w-auto"
            >
              {slide.primaryLabel}
            </Link>
            <Link
              href={slide.secondaryHref}
              className="w-full rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-center text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
            >
              {slide.secondaryLabel} →
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200">
            <span>✓ Direct Access to Founder Sam Maina</span>
            <span>✓ Fixed Timelines & Quality Assurance</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3" role="tablist" aria-label="Hero services">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Show ${item.eyebrow}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeSlide ? "w-10 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
          <span className="ml-3 text-xs font-semibold text-slate-200">
            0{activeSlide + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
