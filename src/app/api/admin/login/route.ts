import { NextResponse } from "next/server";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  recordFailedLogin,
  setSessionCookie,
  verifyCredentials,
} from "@/lib/auth";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  // Brute-force gate: reject before touching credentials.
  const gate = checkLoginRateLimit(ip);
  if (!gate.allowed) {
    console.warn(`[admin-auth] Rate-limited login attempt from ${ip}`);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${Math.ceil(gate.retryAfterSec / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(gate.retryAfterSec) } }
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const username = String(body.username || "");
  const password = String(body.password || "");
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  if (!verifyCredentials(username, password)) {
    const result = recordFailedLogin(ip);
    console.warn(`[admin-auth] Failed login for user "${username}" from ${ip}`);
    if (result.blocked) {
      return NextResponse.json(
        { error: "Too many failed attempts. Account locked for 5 minutes." },
        { status: 429, headers: { "Retry-After": String(result.retryAfterSec) } }
      );
    }
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  clearLoginAttempts(ip);
  console.warn(`[admin-auth] Successful login for user "${username}" from ${ip}`);
  setSessionCookie(createSessionToken());
  return NextResponse.json({ ok: true });
}
