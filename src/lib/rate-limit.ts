import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest } from "next/server";
import { Errors } from "./errors";

const limiter = new RateLimiterMemory({ points: 30, duration: 60 });

export async function enforceRateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  try {
    await limiter.consume(ip);
  } catch {
    throw Errors.rateLimited();
  }
}
