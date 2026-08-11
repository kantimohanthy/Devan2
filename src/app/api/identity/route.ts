export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { identityService } from "@/services/identity.service";

export const GET = withApiHandler(async () => {
  const profile = await identityService.getProfile();
  return NextResponse.json(profile);
});
