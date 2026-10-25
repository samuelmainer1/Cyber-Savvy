import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("[admin-auth] Missing required env var: ADMIN_SECRET");
  }
  return secret;
}

// Credentials fingerprint — bound into every session token so changing
// ADMIN_USER / ADMIN_PASSWORD instantly revokes all previously issued
// sessions. Must stay byte-identical to the node copy in src/lib/auth.ts.
async function fingerprint(): Promise<string> {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) {
    throw new Error("[admin-auth] Missing required env vars: ADMIN_USER / ADMIN_PASSWORD");
  }
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${getSecret()}:${user}:${password}`),
  );
  return Array.from(new Uint8Array(digest))
    .slice(0, 8)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySession(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload);
  if (expected.length !== signature.length) return false;

  let mismatch = 0;
  for (let index = 0; index < signature.length; index += 1) {
    mismatch |= signature.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  if (mismatch !== 0) return false;

  // Payload is `user:credentialsFingerprint:expiry`; parse from the end so a
  // colon inside the username can't shift the fields.
  const parts = payload.split(":");
  if (parts.length < 3) return false;

  const expiry = Number(parts[parts.length - 1] || 0);
  if (!Number.isFinite(expiry) || Date.now() >= expiry) return false;

  const tokenFingerprint = parts[parts.length - 2];
  const expectedFingerprint = await fingerprint();
  if (tokenFingerprint.length !== expectedFingerprint.length) return false;

  mismatch = 0;
  for (let index = 0; index < tokenFingerprint.length; index += 1) {
    mismatch |= tokenFingerprint.charCodeAt(index) ^ expectedFingerprint.charCodeAt(index);
  }

  return mismatch === 0;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = token ? await verifySession(token) : false;
  if (valid) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  if (token) {
    // A present-but-invalid token means genuine expiry, not a fresh visit.
    loginUrl.searchParams.set("expired", "1");
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
