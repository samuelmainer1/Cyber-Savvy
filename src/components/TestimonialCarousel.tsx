"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type CarouselTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  metricsHighlight: string;
};

// Fixed map so Tailwind's scanner sees every allowed avatar color literal.
const AVATAR_COLORS: Record<string, string> = {
  "bg-indigo-600": "bg-indigo-600",
  "bg-violet-600": "bg-violet-600",
  "bg-emerald-600": "bg-emerald-600",
  "bg-blue-600": "bg-blue-600",
  "bg-pink-600": "bg-pink-600",
  "bg-amber-600": "bg-amber-600",
};

const ROTATE_MS = 6000;

/**
 * Auto-rotating testimonial carousel for the homepage. Shows 3 cards at a
 * time on desktop (1 on smaller screens), sliding one position per tick,
 * then looping back to the start. All quotes render server-side
 * (SEO-friendly); the carousel only cycles visibility client-side.
 * Pauses on hover only.
 */
export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: CarouselTestimonial[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 3 cards visible on desktop, 1 on smaller screens.
  useEffect(() => {
    const measure = () => setPerView(window.innerWidth >= 768 ? 3 : 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxActive = Math.max(0, testimonials.length - perView);

  // Keep `active` valid when the viewport changes the number of visible cards.
  useEffect(() => {
    setActive((i) => Math.min(i, maxActive));
  }, [maxActive]);

  const next = useCallback(
    () => setActive((i) => (i >= maxActive ? 0 : i + 1)),
    [maxActive]
  );
  const prev = useCallback(
    () => setActive((i) => (i <= 0 ? maxActive : i - 1)),
    [maxActive]
  );

  useEffect(() => {
    if (paused || maxActive === 0) return;
    timerRef.current = setInterval(next, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, maxActive]);

  if (!testimonials.length) return null;

  return (
    <section
      className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8"
      aria-label="What our clients say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Client Voices
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          What our clients say about working with us
        </h2>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl">
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex items-stretch transition-transform duration-500 ease-in-out"
            style={{
              width: `${(100 * testimonials.length) / perView}%`,
              transform: `translateX(-${(active * 100) / testimonials.length}%)`,
            }}
          >
            {testimonials.map((t, i) => (
              <figure
                key={t.id ?? t.name}
                aria-hidden={i < active || i >= active + perView}
                className="h-full shrink-0 px-3"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex text-amber-400 text-lg">{"★".repeat(5)}</div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      {t.metricsHighlight}
                    </span>
                  </div>
                  <blockquote className="mt-6 flex-1 text-base text-gray-700 leading-relaxed italic">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow ${AVATAR_COLORS[t.color] || "bg-indigo-600"}`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">
                        {t.role} · <span className="font-semibold text-indigo-600">{t.company}</span>
                      </div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {maxActive > 0 && (
          <>
            {/* Arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-md transition-all hover:bg-indigo-50 sm:-left-6"
            >
              <span aria-hidden className="block h-4 w-4 text-gray-700">←</span>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-md transition-all hover:bg-indigo-50 sm:-right-6"
            >
              <span aria-hidden className="block h-4 w-4 text-gray-700">→</span>
            </button>

            {/* Dots — one per slide position */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: maxActive + 1 }, (_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonials from position ${i + 1}`}
                  aria-current={i === active}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${i === active ? "bg-indigo-600 scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/testimonials"
          className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
        >
          Read all customer stories →
        </Link>
      </div>
    </section>
  );
}
