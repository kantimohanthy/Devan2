import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/user.service";
import { createUserSchema } from "@/validators/user";
import { withApiHandler } from "@/lib/api-handler";
import { requireRole } from "@/lib/require-role";
import { hashPassword } from "@/lib/auth";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async () => {
  const users = await UserService.getUsers();
  return NextResponse.json(users);
});

export const POST = withApiHandler(async (req: NextRequest) => {
  await requireRole(req, "ADMIN");

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) throw Errors.validation(parsed.error.flatten());

  const passwordHash = await hashPassword(
    body.password ?? "DefaultUserPassword123!"
  );

  const user = await UserService.createUser({
    ...parsed.data,
    passwordHash,
  });

  return NextResponse.json(user, { status: 201 });
});