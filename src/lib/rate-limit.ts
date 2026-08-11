import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest } from "next/server";
import { Errors } from "./errors";

const limiter = new RateLimiterMemory({ points: 30, duration: 60 });

export async function enforceRateLimit(req: NextRequest) {
  let ip = "unknown";
  try {
    ip = req.headers?.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  } catch {
    return; // Static export build time fallback
  }

  try {
    await limiter.consume(ip);
  } catch {
    throw Errors.rateLimited();
  }
}
