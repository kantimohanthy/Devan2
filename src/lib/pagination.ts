import { NextRequest } from "next/server";

export function getPagination(
  req: NextRequest,
  defaultLimit = 20,
  maxLimit = 100
) {
  const url = req.nextUrl;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(
    maxLimit,
    Math.max(1, Number(url.searchParams.get("limit") ?? defaultLimit))
  );
  return { skip: (page - 1) * limit, take: limit, page, limit };
}
