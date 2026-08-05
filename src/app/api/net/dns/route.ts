import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const domain = req.nextUrl.searchParams.get("domain");
  const type = req.nextUrl.searchParams.get("type") ?? "A";
  if (!domain) throw Errors.validation({ domain: "required" });

  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
    { headers: { accept: "application/dns-json" } }
  );
  const data = await res.json();

  return NextResponse.json({
    domain,
    type,
    answers:
      data.Answer?.map((a: any) => ({
        name: a.name,
        ttl: a.TTL,
        data: a.data,
      })) ?? [],
  });
});
