import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { ConversationResponse } from '@/app/interfaces/conversations.interfaces';

import { nextAuthOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request): Promise<NextResponse<ConversationResponse>> {
  const session = await getServerSession(nextAuthOptions);

  const { receiverId } = await request.json();

  const createdConversation: ConversationResponse = await prisma.conversations.create({
    data: {
      participant_ids: [receiverId, session?.user?.id],
    },
  });

  return NextResponse.json(createdConversation);
}
