import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/store";

const BACKUP_FILES = [
  "blog.json",
  "careers.json",
  "hero.json",
  "services.json",
  "pricing.json",
  "testimonials.json",
  "faqs.json",
  "case-studies.json",
  "page-sections.json",
  "team.json",
  "updates.json",
  "site-settings.json",
  "contacts.json",
  "newsletter.json",
  "applications.json",
] as const;

// Objects — must never be created as [] by readJsonFile's fallback.
const OBJECT_FILES = new Set(["pricing.json", "site-settings.json"]);

export async function GET() {
  const backup: Record<string, unknown> = {};
  for (const file of BACKUP_FILES) {
    const fallback = OBJECT_FILES.has(file) ? {} : [];
    backup[file] = await readJsonFile(file, fallback);
  }
  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    ...backup,
  });
}