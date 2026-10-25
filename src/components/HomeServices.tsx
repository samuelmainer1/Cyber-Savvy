"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ServiceItem } from "@/lib/cms";

export default function HomeServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch("/api/content/services")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => setServices([]));
  }, []);

  return (
    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <div
          key={s.id}
          className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              {s.icon}
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {s.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={s.link}
              className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Learn more about {s.title} <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
