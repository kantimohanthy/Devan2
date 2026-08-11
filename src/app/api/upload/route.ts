export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { requireRole } from "@/lib/require-role";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { recordAuditLog } from "@/lib/audit";

export const POST = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const user = await requireRole(req, "ADMIN");

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    throw Errors.validation({ file: "File payload is required" });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    throw Errors.validation({ file: "Invalid file type. Supported: JPG, PNG, WEBP, SVG, PDF" });
  }

  if (file.size > 10 * 1024 * 1024) {
    throw Errors.validation({ file: "File exceeds 10MB size limit" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

  await recordAuditLog({
    action: "FILE_UPLOAD",
    target: file.name,
    details: `Size: ${file.size} bytes, Type: ${file.type}`,
    userId: user.sub,
  });

  return NextResponse.json({
    success: true,
    name: file.name,
    type: file.type,
    size: file.size,
    url: base64Data,
  });
});
