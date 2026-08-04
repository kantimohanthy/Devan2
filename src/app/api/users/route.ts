import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/user.service";
import { createUserSchema } from "@/validators/user";

export async function GET() {
  try {
    const users = await UserService.getUsers();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = createUserSchema.parse(body);

    const user = await UserService.createUser(data);

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 }
    );
  }
}