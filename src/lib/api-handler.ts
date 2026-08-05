import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { logger } from "./logger";
import { ApiError } from "./errors";
import { recordRequest } from "./metrics";

type Handler = (
  req: NextRequest,
  ctx: { requestId: string; traceId: string }
) => Promise<NextResponse>;

export function withApiHandler(handler: Handler) {
  return async (req: NextRequest) => {
    const incomingTraceId = req.headers.get("x-trace-id");
    const requestId = randomUUID();
    const traceId = incomingTraceId ?? requestId;
    const start = performance.now();

    const log = logger.child({
      requestId,
      traceId,
      path: req.nextUrl.pathname,
      method: req.method,
    });

    try {
      const res = await handler(req, { requestId, traceId });
      const durationMs = Math.round(performance.now() - start);
      res.headers.set("x-request-id", requestId);
      res.headers.set("x-trace-id", traceId);

      recordRequest(req.nextUrl.pathname, durationMs, false);

      log.info({ status: res.status, durationMs }, "request completed");
      return res;
    } catch (err) {
      const durationMs = Math.round(performance.now() - start);
      recordRequest(req.nextUrl.pathname, durationMs, true);

      if (err instanceof ApiError) {
        log.warn({ code: err.code, status: err.status }, err.message);
        return NextResponse.json(
          {
            error: {
              code: err.code,
              message: err.message,
              details: err.details,
              requestId,
              traceId,
            },
          },
          {
            status: err.status,
            headers: {
              "x-request-id": requestId,
              "x-trace-id": traceId,
            },
          }
        );
      }

      log.error({ err }, "unhandled error");
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong",
            requestId,
            traceId,
          },
        },
        {
          status: 500,
          headers: {
            "x-request-id": requestId,
            "x-trace-id": traceId,
          },
        }
      );
    }
  };
}
