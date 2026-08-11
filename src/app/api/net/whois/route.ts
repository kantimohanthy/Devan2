export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { getCached, setCached } from "@/lib/cache";

type RdapNameserver = { ldhName?: string };

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const domain = req.nextUrl.searchParams.get("domain");
  if (!domain) {
    return NextResponse.json({ domain: "example.com", status: ["active"], events: [], nameservers: ["ns1.example.com"] });
  }

  const cacheKey = `whois:${domain}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "x-cache": "HIT" } });
  }

  const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
  if (!res.ok) throw Errors.notFound("RDAP record");
  const data = await res.json();

  const result = {
    domain,
    status: data.status,
    events: data.events,
    nameservers: (data.nameservers as RdapNameserver[] | undefined)?.map(
      (n) => n.ldhName
    ),
  };

  setCached(cacheKey, result, 600_000);
  return NextResponse.json(result, { headers: { "x-cache": "MISS" } });
});
