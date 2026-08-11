export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";
import { withApiHandler } from "@/lib/api-handler";
import { Errors } from "@/lib/errors";

export const POST = withApiHandler(async (req) => {
  const token = req.cookies.get("refresh_token")?.value;
  if (!token) throw Errors.unauthorized();

  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.expiresAt < new Date()) {
    throw Errors.unauthorized("Refresh token expired");
  }

  const payload = await verifyRefreshToken(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: payload.sub },
  });

  const accessToken = await signAccessToken(user.id, user.role);
  return NextResponse.json({ accessToken });
});
