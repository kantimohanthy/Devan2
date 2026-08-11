export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { getCached, setCached } from "@/lib/cache";

export const runtime = "nodejs";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const ip = req.nextUrl.searchParams.get("ip");
  if (!ip) {
    return NextResponse.json({ ip: "1.1.1.1", asn: "AS13335", prefix: "1.1.1.0/24", country: "US", registry: "APNIC", allocated: "2010-07-14" });
  }

  const cacheKey = `asn:${ip}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "x-cache": "HIT" } });
  }

  const reversed = ip.split(".").reverse().join(".");
  let records: string[][];
  try {
    records = await dns.resolveTxt(`${reversed}.origin.asn.cymru.com`);
  } catch {
    throw Errors.notFound(`ASN record for IP ${ip}`);
  }

  if (!records || !records[0] || !records[0][0]) {
    throw Errors.notFound(`ASN record for IP ${ip}`);
  }

  const [asn, prefix, country, registry, allocated] = records[0][0]
    .split(" | ")
    .map((s) => s.trim());

  const result = {
    ip,
    asn: `AS${asn}`,
    prefix,
    country,
    registry,
    allocated,
  };

  setCached(cacheKey, result, 3600_000);
  return NextResponse.json(result, { headers: { "x-cache": "MISS" } });
});
