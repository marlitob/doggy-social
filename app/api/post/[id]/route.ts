import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!params.id) {
    return new NextResponse(JSON.stringify({ error: "UserId is required" }), {
      status: 400,
    });
  }

  const parsedUserId = parseInt(params.id, 10);
  if (isNaN(parsedUserId)) {
    return new NextResponse(JSON.stringify({ error: "Invalid userId" }), {
      status: 400,
    });
  }

  try {
    // @ts-ignore
    const post = await prisma.post.findMany({
      where: {
        authorId: parsedUserId,
      },
    });

    return new NextResponse(JSON.stringify(post), {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to retrieve post:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve post" }),
      {
        status: 500,
      },
    );
  }
}
