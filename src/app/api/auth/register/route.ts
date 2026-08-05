import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { withApiHandler } from "@/lib/api-handler";
import { Errors } from "@/lib/errors";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

export const POST = withApiHandler(async (req) => {
  const body = schema.safeParse(await req.json());
  if (!body.success) throw Errors.validation(body.error.flatten());

  const existing = await prisma.user.findUnique({
    where: { email: body.data.email },
  });
  if (existing) throw Errors.validation({ email: "already registered" });

  const passwordHash = await hashPassword(body.data.password);
  const user = await prisma.user.create({
    data: { email: body.data.email, passwordHash, role: "VIEWER" },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
});
