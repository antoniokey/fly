import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

import { nextAuthOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(nextAuthOptions);

  const {
    conversationId,
    receiverId,
    message,
  } = await request.json();

  await prisma.messages.create({
    data: {
      message,
      conversation_id: conversationId,
      sender_id: session?.user?.id,
      receiver_id: receiverId,
    },
  });

  return new NextResponse();
}
