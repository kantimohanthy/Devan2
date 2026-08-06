import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { requireRole } from "@/lib/require-role";
import { prisma } from "@/lib/prisma";
import { recordAuditLog } from "@/lib/audit";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async (req: NextRequest) => {
  await requireRole(req, "ADMIN");
  const items = await prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { technologies: { include: { technology: true } } },
  });
  return NextResponse.json(items);
});

export const POST = withApiHandler(async (req: NextRequest) => {
  const user = await requireRole(req, "ADMIN");
  const body = await req.json();

  if (!body.title || !body.slug || !body.summary || !body.description) {
    throw Errors.validation({ fields: "title, slug, summary, and description are required" });
  }

  const item = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      summary: body.summary,
      description: body.description,
      featured: body.featured ?? false,
      github: body.github,
      liveDemo: body.liveDemo,
      userId: user.sub,
    },
  });

  await recordAuditLog({
    action: "CREATE_PROJECT",
    target: item.id,
    details: `Title: ${item.title}`,
    userId: user.sub,
  });

  return NextResponse.json(item, { status: 201 });
});
