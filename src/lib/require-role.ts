import { NextRequest } from "next/server";
import { verifyAccessToken } from "./auth";
import { Errors } from "./errors";

type Role = "ADMIN" | "EDITOR" | "VIEWER";
const RANK: Record<Role, number> = { VIEWER: 0, EDITOR: 1, ADMIN: 2 };

export async function requireRole(req: NextRequest, minRole: Role) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) throw Errors.unauthorized();

  const token = authHeader.slice(7);
  let payload;
  try {
    payload = await verifyAccessToken(token);
  } catch {
    throw Errors.unauthorized("Invalid or expired token");
  }

  if (RANK[payload.role] < RANK[minRole]) throw Errors.forbidden();
  return payload;
}
