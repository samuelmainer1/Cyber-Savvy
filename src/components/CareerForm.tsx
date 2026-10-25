"use client";

import { useEffect, useState } from "react";

export default function CareerForm() {
  const [roles, setRoles] = useState<string[]>(["General application"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "General application",
    message: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/content/careers")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const titles = [...data.map((item: { title: string }) => item.title), "General application"];
          setRoles(titles);
          setFormData((current) => ({ ...current, role: titles[0] }));
        }
      })
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!cvFile) {
        throw new Error("Please upload your CV in PDF format.");
      }

      if (cvFile.type !== "application/pdf" && !cvFile.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("CV upload must be a PDF file.");
      }

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("role", formData.role);
      payload.append("message", formData.message);
      payload.append("cv", cvFile);

      const response = await fetch("/api/career", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit application.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-xl font-black text-gray-900">Application received</h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you, {formData.name}. Sam Maina will review your application for {formData.role}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h3 className="text-xl font-black text-gray-900">Apply to Cyber Savvy Pro</h3>
      <p className="mt-2 text-sm text-gray-600">Send your details and a short note. We will follow up by email.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Full name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
          Short note *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share relevant experience, availability, and why you want to join."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
          Upload CV (PDF) *
        </label>
        <input
          type="file"
          accept="application/pdf,.pdf"
          required
          onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
        />
        <p className="mt-2 text-xs text-gray-500">Please upload a PDF version of your CV.</p>
      </div>

      {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-700 disabled:opacity-70"
      >
        {loading ? "Sending..." : "Submit application"}
      </button>
    </form>
  );
}
