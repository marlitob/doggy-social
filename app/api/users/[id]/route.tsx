import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const followersCount = await prisma.friendship.count({
    where: { userAId: userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      followers: followersCount,
    },
  });

  const postsCount = await prisma.post.count({
    where: { authorId: userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      postsCount: postsCount,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        error: "User Not Found",
      },
      { status: 404 },
    );
  }
  return NextResponse.json(user);
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 },
    );
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  await prisma.user.delete({ where: { id: user.id } });
  return NextResponse.json({});
}
