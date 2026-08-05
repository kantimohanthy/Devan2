import { NextRequest, NextResponse } from "next/server";
import tls from "tls";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { getCached, setCached } from "@/lib/cache";

export const runtime = "nodejs";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const host = req.nextUrl.searchParams.get("host");
  if (!host) throw Errors.validation({ host: "required" });

  const cacheKey = `tls:${host}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "x-cache": "HIT" } });
  }

  const cert = await new Promise<any>((resolve, reject) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, timeout: 5000 },
      () => {
        const c = socket.getPeerCertificate();
        socket.end();
        resolve(c);
      }
    );
    socket.on("error", reject);
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("timeout"));
    });
  });

  const result = {
    host,
    issuer: cert.issuer?.O,
    subject: cert.subject?.CN,
    validFrom: cert.valid_from,
    validTo: cert.valid_to,
    daysRemaining: Math.round(
      (new Date(cert.valid_to).getTime() - Date.now()) / 86400000
    ),
  };

  setCached(cacheKey, result, 3600_000);
  return NextResponse.json(result, { headers: { "x-cache": "MISS" } });
});
