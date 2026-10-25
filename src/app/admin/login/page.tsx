"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get("expired") === "1";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState(
    expired ? "Your session expired. Please sign in again." : ""
  );
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Already signed in? Skip the form entirely.
  useEffect(() => {
    fetch("/api/admin/content", { method: "GET" })
      .then((response) => {
        if (response.ok) router.replace("/admin");
        else setCheckingSession(false);
      })
      .catch(() => setCheckingSession(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <p className="text-sm text-gray-500">Checking session…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-black text-gray-900">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to manage website content.</p>

        {info ? (
          <p role="status" className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
            {info}
          </p>
        ) : null}

        <label htmlFor="admin-username" className="mt-6 mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          type="text"
          required
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />

        <label htmlFor="admin-password" className="mt-4 mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => setCapsLock(e.getModifierState && e.getModifierState("CapsLock"))}
            aria-describedby={capsLock ? "caps-warning" : undefined}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {capsLock ? (
          <p id="caps-warning" className="mt-1.5 text-xs font-semibold text-amber-600">
            ⚠️ Caps Lock is on
          </p>
        ) : null}

        {error ? (
          <p role="alert" aria-live="assertive" className="mt-4 text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <Link href="/" className="mt-4 block text-center text-xs font-bold text-gray-500 hover:text-indigo-600">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
