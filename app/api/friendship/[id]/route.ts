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
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ userAId: parsedUserId }, { userBId: parsedUserId }],
        status: "accepted",
      },
      include: {
        userA: true,
        userB: true,
      },
    });

    const friends = friendships
      .flatMap((friendship) => [
        friendship.userAId === parsedUserId ? friendship.userB : null,
        friendship.userBId === parsedUserId ? friendship.userA : null,
      ])
      .filter(Boolean);

    return new NextResponse(JSON.stringify(friends), {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to retrieve friends:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve friends" }),
      {
        status: 500,
      },
    );
  }
}
