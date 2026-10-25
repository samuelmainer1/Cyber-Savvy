import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "admin_session";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

// ---- Login brute-force protection (in-memory, per-process) ----
// 5 failed attempts per IP per 15-min window, then 429 + Retry-After.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

type AttemptRecord = { count: number; windowStart: number; blockedUntil: number };
const loginAttempts = new Map<string, AttemptRecord>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true, retryAfterSec: 0 };
  if (record.blockedUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((record.blockedUntil - now) / 1000) };
  }
  if (now - record.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.delete(ip);
    return { allowed: true, retryAfterSec: 0 };
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function recordFailedLogin(ip: string): { blocked: boolean; retryAfterSec: number } {
  const now = Date.now();
  let record = loginAttempts.get(ip);
  if (!record || now - record.windowStart > LOGIN_WINDOW_MS) {
    record = { count: 0, windowStart: now, blockedUntil: 0 };
  }
  record.count += 1;
  if (record.count >= LOGIN_MAX_ATTEMPTS) {
    // Progressive lockout: 5 min, then 15 min on repeat offenders within the window.
    const overBy = record.count - LOGIN_MAX_ATTEMPTS;
    record.blockedUntil = now + (overBy > 2 ? LOGIN_WINDOW_MS : 5 * 60 * 1000);
    loginAttempts.set(ip, record);
    return { blocked: true, retryAfterSec: Math.ceil((record.blockedUntil - now) / 1000) };
  }
  loginAttempts.set(ip, record);
  return { blocked: false, retryAfterSec: 0 };
}

export function clearLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}

// Fail hard if admin env is missing — never run on hardcoded defaults.
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[admin-auth] Missing required env var: ${name}`);
  }
  return value;
}

function getSecret(): string {
  return requiredEnv("ADMIN_SECRET");
}

function getAdminUser(): string {
  return requiredEnv("ADMIN_USER");
}

function getAdminPassword(): string {
  return requiredEnv("ADMIN_PASSWORD");
}

// Credentials fingerprint — bound into every session token so changing
// ADMIN_USER / ADMIN_PASSWORD instantly revokes all previously issued
// sessions. Must stay byte-identical to the edge-runtime copy in middleware.ts.
function credentialFingerprint(): string {
  return createHash("sha256")
    .update(`${getSecret()}:${getAdminUser()}:${getAdminPassword()}`)
    .digest("hex")
    .slice(0, 16);
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyCredentials(username: string, password: string) {
  return safeEqual(username, getAdminUser()) && safeEqual(password, getAdminPassword());
}

export function createSessionToken() {
  // Payload: `user:credentialsFingerprint:expiry`
  const payload = `${getAdminUser()}:${credentialFingerprint()}:${Date.now() + MAX_AGE_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(sign(payload), signature)) return false;

  // Parse the fixed fields from the END of the payload so a colon inside the
  // username can't shift positions.
  const parts = payload.split(":");
  if (parts.length < 3) return false;
  const expiry = Number(parts[parts.length - 1] || 0);
  const fingerprint = parts[parts.length - 2];
  if (!safeEqual(fingerprint, credentialFingerprint())) return false;
  return Number.isFinite(expiry) && Date.now() < expiry;
}

export function isAuthenticated() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return Boolean(token && verifySession(token));
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_MS / 1000,
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
