"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe.");
      }

      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="mt-3 rounded-lg bg-green-50 p-3 text-xs text-green-800 border border-green-200">
        ðŸŽ‰ Thank you for subscribing! Check your inbox soon.
      </div>
    );
  }

  return (
    <form className="mt-3 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-70"
      >
        {loading ? "..." : "Join"}
      </button>
      {error ? <p className="mt-2 w-full text-xs font-semibold text-red-500">{error}</p> : null}
    </form>
  );
}

