import { NextResponse } from "next/server";
import { appendJsonRecord, readJsonFile } from "@/lib/store";
import { checkWriteRateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const limit = checkWriteRateLimit(clientIp(request), 6, 60_000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase().slice(0, 320);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const subscribers = await readJsonFile<{ email: string }[]>("newsletter.json", []);
    if (subscribers.some((item) => item.email === email)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await appendJsonRecord("newsletter.json", {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save this subscription." }, { status: 500 });
  }
}
