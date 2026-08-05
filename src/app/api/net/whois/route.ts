import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const domain = req.nextUrl.searchParams.get("domain");
  if (!domain) throw Errors.validation({ domain: "required" });

  const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
  if (!res.ok) throw Errors.notFound("RDAP record");
  const data = await res.json();

  return NextResponse.json({
    domain,
    status: data.status,
    events: data.events,
    nameservers: data.nameservers?.map((n: any) => n.ldhName),
  });
});
