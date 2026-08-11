export const dynamic = "force-static";
import { NextResponse } from "next/server";
import * as Ably from "ably";

export async function GET() {
  const apiKey = process.env.ABLY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ABLY_API_KEY is not configured." },
      { status: 503 }
    );
  }

  try {
    const client = new Ably.Rest(apiKey);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: `guest-${Math.random().toString(36).substring(2, 9)}`,
    });

    return NextResponse.json(tokenRequestData);
  } catch (error) {
    console.error("Error creating Ably token request:", error);
    return NextResponse.json(
      { error: "Failed to create token request." },
      { status: 500 }
    );
  }
}
