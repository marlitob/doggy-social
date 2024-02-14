import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // @ts-ignore
  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: parseInt(body.id, 10),
    },
  });

  return NextResponse.json(newPost);
}
