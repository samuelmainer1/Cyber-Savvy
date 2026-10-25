import { NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/store";
import { checkWriteRateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const limit = checkWriteRateLimit(clientIp(request), 8, 60_000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many inquiries. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim().slice(0, 200);
    const email = String(body.email || "").trim().slice(0, 320);
    const phone = String(body.phone || "").trim().slice(0, 50);
    const company = String(body.company || "").trim().slice(0, 200);
    const service = String(body.service || "").trim().slice(0, 200);
    const budget = String(body.budget || "").trim().slice(0, 100);
    const message = String(body.message || "").trim().slice(0, 5000);

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and project details are required." },
        { status: 400 }
      );
    }

    const record = await appendJsonRecord("contacts.json", {
      id: Date.now().toString(),
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      status: "unread",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json({ error: "Unable to save this inquiry." }, { status: 500 });
  }
}
