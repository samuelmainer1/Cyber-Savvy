import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { verifyCredentials } from "@/lib/auth";

/**
 * Change the admin credentials from the dashboard (Settings tab).
 * Writes ADMIN_USER / ADMIN_PASSWORD into .env.local and applies them to the
 * running process so the change takes effect immediately in development.
 * (On multi-instance production deployments, update the environment directly.)
 */
export async function POST(request: Request) {
  let body: { username?: unknown; currentPassword?: unknown; newPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = String(body.username || "").trim();
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");

  if (!username || !currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Username, current password, and new password are required." },
      { status: 400 }
    );
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  if (!verifyCredentials(username, currentPassword)) {
    return NextResponse.json({ error: "Current username or password is incorrect." }, { status: 401 });
  }

  // Persist to .env.local (create or update the two keys).
  const envPath = path.join(process.cwd(), ".env.local");
  let env = "";
  try {
    env = await readFile(envPath, "utf8");
  } catch {
    env = "";
  }
  const upsert = (key: string, value: string) => {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(env)) {
      env = env.replace(pattern, line);
    } else {
      env = env.trimEnd() + `\n${line}\n`;
    }
  };
  upsert("ADMIN_USER", username);
  upsert("ADMIN_PASSWORD", newPassword);
  await writeFile(envPath, env, "utf8");

  // Apply to the running process so re-login works without a restart.
  process.env.ADMIN_USER = username;
  process.env.ADMIN_PASSWORD = newPassword;

  return NextResponse.json({ ok: true });
}
