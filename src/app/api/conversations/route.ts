import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { ConversationResponse } from '@/app/interfaces/conversations.interfaces';

export async function POST(request: Request): Promise<NextResponse<ConversationResponse>> {
  const { participant_ids, group_name, is_group } = await request.json();

  const createdConversation: ConversationResponse = await prisma.conversations.create({
    data: {
      participant_ids,
      is_group,
      group_name,
    },
  });

  return NextResponse.json(createdConversation);
}
