import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userAId = parseInt(body.userAId, 10);
  const userBId = parseInt(body.userBId, 10);

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newFriendship = await prisma.friendship.create({
    data: {
      userAId: userAId,
      userBId: userBId,
      status: "accepted",
    },
  });

  return NextResponse.json(newFriendship);
}
