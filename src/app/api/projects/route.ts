export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/project.service";
import { createProjectSchema } from "@/validators/project";

export async function GET() {
  try {
    const projects = await ProjectService.getProjects();

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = createProjectSchema.parse(body);
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required to create a project." },
        { status: 400 }
      );
    }

    const project = await ProjectService.createProject(data, userId);

    return NextResponse.json(project, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}