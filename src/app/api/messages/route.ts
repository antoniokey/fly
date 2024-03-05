import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/app/lib/prisma';
import { nextAuthOptions } from '@/app/constants/auth.constants';

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(nextAuthOptions);

  const {
    conversationId,
    receiverIds,
    message,
  } = await request.json();

  const createdMessage = await prisma.messages.create({
    data: {
      message,
      conversation_id: conversationId,
      sender_id: session?.user.id,
      receiver_ids: receiverIds,
    },
  });

  return NextResponse.json(createdMessage);
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const conversationId = searchParams.get('conversationId') as string;

  await prisma.messages.deleteMany({
    where: { conversation_id: +conversationId }
  });

  return new NextResponse();
}
