import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { logger } from "./logger";
import { ApiError } from "./errors";

type Handler = (
  req: NextRequest,
  ctx: { requestId: string }
) => Promise<NextResponse>;

export function withApiHandler(handler: Handler) {
  return async (req: NextRequest) => {
    const requestId = randomUUID();
    const start = performance.now();
    const log = logger.child({
      requestId,
      path: req.nextUrl.pathname,
      method: req.method,
    });

    try {
      const res = await handler(req, { requestId });
      res.headers.set("x-request-id", requestId);
      log.info(
        { status: res.status, durationMs: Math.round(performance.now() - start) },
        "request completed"
      );
      return res;
    } catch (err) {
      if (err instanceof ApiError) {
        log.warn({ code: err.code, status: err.status }, err.message);
        return NextResponse.json(
          {
            error: {
              code: err.code,
              message: err.message,
              details: err.details,
              requestId,
            },
          },
          { status: err.status, headers: { "x-request-id": requestId } }
        );
      }
      log.error({ err }, "unhandled error");
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong",
            requestId,
          },
        },
        { status: 500, headers: { "x-request-id": requestId } }
      );
    }
  };
}
