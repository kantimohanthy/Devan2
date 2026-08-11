export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { requireRole } from "@/lib/require-role";
import { prisma } from "@/lib/prisma";
import { recordAuditLog } from "@/lib/audit";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async (req: NextRequest) => {
  await requireRole(req, "ADMIN");
  const items = await prisma.skill.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(items);
});

export const POST = withApiHandler(async (req: NextRequest) => {
  const user = await requireRole(req, "ADMIN");
  const body = await req.json();

  if (!body.name || !body.category || typeof body.level !== "number") {
    throw Errors.validation({ fields: "name, category, and level numeric score are required" });
  }

  const item = await prisma.skill.create({
    data: {
      name: body.name,
      category: body.category,
      level: body.level,
      userId: user.sub,
    },
  });

  await recordAuditLog({
    action: "CREATE_SKILL",
    target: item.id,
    details: `Skill: ${item.name} (${item.category})`,
    userId: user.sub,
  });

  return NextResponse.json(item, { status: 201 });
});
