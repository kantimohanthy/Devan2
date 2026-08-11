export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  let commit = "unknown";
  try {
    commit = execSync("git rev-parse --short HEAD").toString().trim();
  } catch {}

  return NextResponse.json({
    version: process.env.npm_package_version ?? "0.1.0",
    commit,
    node: process.version,
  });
}
