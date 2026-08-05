import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { withApiHandler } from "@/lib/api-handler";
import { Errors } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const POST = withApiHandler(async (req) => {
  await enforceRateLimit(req);

  const body = schema.safeParse(await req.json());
  if (!body.success) throw Errors.validation(body.error.flatten());

  const user = await prisma.user.findUnique({
    where: { email: body.data.email },
  });
  if (!user || !(await verifyPassword(body.data.password, user.passwordHash))) {
    throw Errors.unauthorized("Invalid credentials");
  }

  const accessToken = await signAccessToken(user.id, user.role);
  const refreshToken = await signRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 86400 * 1000),
    },
  });

  const res = NextResponse.json({ accessToken });
  res.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 86400,
  });
  return res;
});
