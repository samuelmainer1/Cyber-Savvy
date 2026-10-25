import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  // Guard the disk: type + size + safe filename.
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  if ((!file.type || !ALLOWED_MIME.has(file.type)) && !ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP, GIF or SVG images are allowed." }, { status: 400 });
  }
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: "Unsupported file extension." }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeBase = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const filename = `${safeBase}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
