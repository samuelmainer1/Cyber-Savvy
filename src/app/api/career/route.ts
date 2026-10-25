import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/store";
import { checkWriteRateLimit, clientIp } from "@/lib/rate-limit";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    // Public endpoint: cap submissions per IP so data/*.json can't be flooded.
    const limit = checkWriteRateLimit(clientIp(request), 10, 60_000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    let name = "";
    let email = "";
    let phone = "";
    let role = "";
    let message = "";
    let cvUrl = "";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = String(formData.get("name") || "").trim();
      email = String(formData.get("email") || "").trim();
      phone = String(formData.get("phone") || "").trim();
      role = String(formData.get("role") || "").trim();
      message = String(formData.get("message") || "").trim();

      const file = formData.get("cv");
      if (file instanceof File && file.size > 0) {
        // Reject traversal and junk names: keep a sanitized basename only.
        const rawBase = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, "-");
        const ext = path.extname(rawBase).toLowerCase();

        if (ext !== ".pdf") {
          return NextResponse.json({ error: "CV must be a PDF file." }, { status: 400 });
        }
        if (file.size > MAX_CV_BYTES) {
          return NextResponse.json({ error: "CV must be under 5 MB." }, { status: 400 });
        }

        const fileName = `${Date.now()}-${rawBase.slice(0, 80).replace(/^-+/, "") || "cv.pdf"}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());

        // Belt-and-braces: resolved path must still live inside uploadDir.
        const target = path.join(uploadDir, fileName);
        if (!path.resolve(target).startsWith(path.resolve(uploadDir) + path.sep)) {
          return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
        }

        await writeFile(target, buffer);
        cvUrl = `/uploads/${fileName}`;
      }
    } else {
      const body = await request.json();
      name = String(body.name || "").trim();
      email = String(body.email || "").trim();
      phone = String(body.phone || "").trim();
      role = String(body.role || "").trim();
      message = String(body.message || "").trim();
      // Only accept CV links we served ourselves — never arbitrary URLs.
      const provided = String(body.cvUrl || "").trim();
      cvUrl = /^\/uploads\/[a-zA-Z0-9._-]+$/.test(provided) ? provided : "";
    }

    if (!name || !email || !role || !message) {
      return NextResponse.json(
        { error: "Name, email, role, and a short note are required." },
        { status: 400 }
      );
    }

    const record = await appendJsonRecord("applications.json", {
      id: Date.now().toString(),
      name: name.slice(0, 200),
      email: email.slice(0, 320),
      phone: phone.slice(0, 50),
      role: role.slice(0, 200),
      message: message.slice(0, 5000),
      cvUrl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json({ error: "Unable to save this application." }, { status: 500 });
  }
}
