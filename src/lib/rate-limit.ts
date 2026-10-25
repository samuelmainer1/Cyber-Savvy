import { NextResponse } from "next/server";

// Generic fixed-window in-memory rate limiter for public write endpoints.
// Same trade-off as the login limiter: per-process, resets on restart.
const buckets = new Map<string, { count: number; windowStart: number }>();

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export function checkWriteRateLimit(
  key: string,
  max: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    // Opportunistic cleanup so the map can't grow unbounded.
    if (buckets.size > 1000) {
      for (const [mapKey, value] of buckets) {
        if (now - value.windowStart > windowMs) buckets.delete(mapKey);
      }
    }
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.windowStart + windowMs - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}