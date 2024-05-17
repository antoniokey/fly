import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function PUT(request: Request): Promise<NextResponse> {
  const body = await request.json();

  const splittedUrl = request.url.split('/');
  const conversationId = +splittedUrl[splittedUrl.length - 1];

  await prisma.conversations.update({
    where: { id: conversationId },
    data: body,
  });

  return new NextResponse();
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { url } = request;

  const splittedUrl = url.split('/');
  const conversationId = +splittedUrl[splittedUrl.length - 1];

  await prisma.conversations.delete({
    where: { id: conversationId },
  });

  return new NextResponse();
}
