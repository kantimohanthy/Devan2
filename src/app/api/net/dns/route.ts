export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getCached, setCached } from "@/lib/cache";

type DnsAnswer = {
  name: string;
  TTL: number;
  data: string;
};

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const domain = req.nextUrl.searchParams.get("domain");
  const type = req.nextUrl.searchParams.get("type") ?? "A";
  if (!domain) {
    return NextResponse.json({ domain: "example.com", type, answers: [] });
  }

  const cacheKey = `dns:${domain}:${type}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "x-cache": "HIT" } });
  }

  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
    { headers: { accept: "application/dns-json" } }
  );
  const data = await res.json();
  const result = {
    domain,
    type,
    answers:
      (data.Answer as DnsAnswer[] | undefined)?.map((a) => ({
        name: a.name,
        ttl: a.TTL,
        data: a.data,
      })) ?? [],
  };

  setCached(cacheKey, result, 60_000);
  return NextResponse.json(result, { headers: { "x-cache": "MISS" } });
});
