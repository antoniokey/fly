import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function DELETE(request: Request): Promise<NextResponse> {
  const { url } = request;

  const splittedUrl = url.split('/');
  const conversationId = +splittedUrl[splittedUrl.length - 1];

  await prisma.conversations.delete({
    where: { id: conversationId },
  });

  return new NextResponse();
}
