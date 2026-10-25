"use client";

import { useState } from "react";

type Option = { value: string; label: string };

/**
 * Booking request form (/book). Submits to the same inbox as the contact
 * form so requests show up in the admin dashboard tagged as "Booking request".
 */
export default function BookingForm({
  serviceOptions,
  budgets,
}: {
  serviceOptions: Option[];
  budgets: string[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(budgets[0] || "");
  const [service, setService] = useState("");
  const [goals, setGoals] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelClass = "mb-1 block text-sm font-semibold text-gray-700";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedGoals = goals.trim();
    const selected = serviceOptions.find((option) => option.value === service);

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedGoals || !service) {
      setError("Please fill in your name, email, phone, service, and project goals.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          company: company.trim(),
          service: `Booking request — ${selected?.label || "Not specified"}`,
          budget: budget || "Not specified",
          message: trimmedGoals,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send your request.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your request.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setBudget(budgets[0] || "");
    setService("");
    setGoals("");
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
          ✅
        </div>
        <h2 className="mt-4 text-xl font-black text-gray-900">Request received!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Thanks {name.split(" ")[0] || "there"} — we&apos;ll respond within 24 hours to
          schedule your scoping call.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="booking-name">
            Full Name *
          </label>
          <input
            id="booking-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="booking-email">
            Work Email *
          </label>
          <input
            id="booking-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="booking-company">
          Company / Organization
        </label>
        <input
          id="booking-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="booking-phone">
            Phone Number *
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="booking-budget">
            Budget Range
          </label>
          <select
            id="booking-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputClass}
          >
            {budgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="booking-service">
          Service Interest *
        </label>
        <select
          id="booking-service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="booking-goals">
          What would you like to achieve? *
        </label>
        <textarea
          id="booking-goals"
          required
          rows={4}
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Request Scoping Call"}
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          We&apos;ll respond within 24 hours to schedule your call.
        </p>
      </div>
    </form>
  );
}
