"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-3 flex gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Join
      </button>
    </form>
  );
}
