"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Fallbacks used until /api/content/form-options responds (also the prod defaults).
const DEFAULT_SERVICES = [
  "Full-Stack Development",
  "Custom Systems & ERPs",
  "Digital Marketing & SEO",
  "Managed IT & Cybersecurity",
  "Monthly Dedicated Retainer",
  "Other",
];

const DEFAULT_BUDGETS = [
  "Under KSh 150,000",
  "KSh 150,000 - KSh 300,000",
  "KSh 300,000 - KSh 500,000",
  "KSh 500,000 - KSh 1,000,000",
  "KSh 1,000,000+",
  "Not sure yet",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Full-Stack Development",
    budget: "KSh 150,000 - KSh 300,000",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<string[]>(DEFAULT_SERVICES);
  const [budgetOptions, setBudgetOptions] = useState<string[]>(DEFAULT_BUDGETS);

  // Dropdown options are managed from the admin dashboard (Settings tab).
  useEffect(() => {
    let cancelled = false;
    fetch("/api/content/form-options")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        if (Array.isArray(json.contactServices) && json.contactServices.length) {
          setServiceOptions(json.contactServices);
        }
        if (Array.isArray(json.contactBudgets) && json.contactBudgets.length) {
          setBudgetOptions(json.contactBudgets);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send this inquiry.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send this inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden border-b border-gray-200 bg-slate-950">
        {/* Hero background image (native 1920×350, section pinned to match) */}
        <Image
          src="/images/hero/contact-hero.jpg"
          alt="Friendly support agents with headsets ready to answer client questions"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_50%]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <span>✉️</span>
            <span>Request a Free Quote &amp; Consultation</span>
          </div>

          <h1 className="mt-4 w-full max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let&apos;s Build Your Next{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              High-Impact System
            </span>
          </h1>

          <p className="mt-4 w-full max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg lg:text-xl">
            Tell us about your software, digital marketing, or IT project. Founder Sam Maina will review your requirements and respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Founder Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Direct Communication
              </span>
              <h2 className="mt-2 text-3xl font-black text-gray-900">
                Reach Sam Maina directly
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Skip the sales reps. You speak directly with the founder and lead software architect.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+254722359298"
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-xl">
                  📞
                </span>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Phone & WhatsApp</h3>
                  <p className="text-sm text-indigo-600 font-bold mt-0.5">+254 722 359 298</p>
                  <p className="text-xs text-gray-500 mt-1">Available Mon - Sat, 8:00 AM - 7:00 PM EAT</p>
                </div>
              </a>

              <a
                href="mailto:samuelmaina@gmail.com"
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 text-xl">
                  ✉️
                </span>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Direct Founder Email</h3>
                  <p className="text-sm text-indigo-600 font-bold mt-0.5">samuelmaina@gmail.com</p>
                  <p className="text-xs text-gray-500 mt-1">Guaranteed response within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xl">
                  📍
                </span>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Office Location</h3>
                  <p className="text-sm text-gray-800 font-bold mt-0.5">Mombasa Road, Nairobi, Kenya</p>
                  <p className="text-xs text-gray-500 mt-1">In-person consultations available by appointment</p>
                </div>
              </div>
            </div>

            {/* Quick Consultation Promise */}
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-tr from-indigo-50 to-violet-50 p-6">
              <h4 className="text-sm font-black text-indigo-950">Our Proposal Promise</h4>
              <ul className="mt-3 space-y-2 text-xs text-indigo-900">
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> No high-pressure sales tactics
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Honest technical feasibility & stack recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Detailed scope document and fixed or milestone pricing
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-gray-900">
                    Quote Request Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 leading-relaxed">
                    Thank you, <strong className="text-gray-900">{formData.name}</strong>. Sam Maina will review your project details and reach out to you at <strong className="text-gray-900">{formData.email}</strong> / <strong className="text-gray-900">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        service: "Full-Stack Development",
        budget: "KSh 25,000 - KSh 75,000",
                        message: "",
                      });
                    }}
                    className="mt-8 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-indigo-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900">
                    Tell Us About Your Project
                  </h3>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@company.com"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +254 700 000 000"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Company Name / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Enterprises Ltd"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                      >
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you want to build, existing systems, target launch date, or any specific features..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>

                  {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send Request to Sam Maina →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
