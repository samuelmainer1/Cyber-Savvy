import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Cyber Savvy Pro",
  description:
    "The page you are looking for moved or never existed. Visit our homepage, services, or request a free quote.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
          <span>🧭</span>
          <span>Page not found</span>
        </span>
        <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">404</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          The page you are looking for moved or never existed. Try our services overview, pricing,
          or request a free consultation instead.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700"
          >
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Request Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}