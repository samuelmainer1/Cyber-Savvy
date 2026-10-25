import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/store";

type ContactRecord = {
  id: string;
  name?: string;
  email?: string;
  service?: string;
  status?: string;
  createdAt?: string;
  message?: string;
};

type SubscriberRecord = {
  id: string;
  email?: string;
  createdAt?: string;
};

const newestFirst = <T extends { createdAt?: string }>(items: T[]) =>
  [...items].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

/**
 * Lightweight feed for the admin header notification bell.
 * Kept separate from /api/admin/content so the bell can poll cheaply.
 */
export async function GET() {
  const contacts = await readJsonFile<ContactRecord[]>("contacts.json", []);
  const subscribers = await readJsonFile<SubscriberRecord[]>("newsletter.json", []);

  const messages = newestFirst(contacts)
    .slice(0, 15)
    .map((item) => ({
      id: String(item.id),
      name: item.name || "Unknown sender",
      email: item.email || "",
      service: item.service || "General inquiry",
      status: item.status === "read" ? "read" : item.status === "replied" ? "replied" : "unread",
      createdAt: item.createdAt || "",
      preview: String(item.message || "").slice(0, 120),
    }));

  const recentSubscribers = newestFirst(subscribers)
    .slice(0, 15)
    .map((item) => ({
      id: String(item.id),
      email: item.email || "",
      createdAt: item.createdAt || "",
    }));

  return NextResponse.json({
    messages,
    subscribers: recentSubscribers,
    // Counted over the full list (not just the recent slice) so the badge stays accurate.
    unreadMessages: contacts.filter(
      (item) => item.status !== "read" && item.status !== "replied"
    ).length,
  });
}
