import { getServerSession } from 'next-auth';

import prisma from '../lib/prisma';
import { Conversation, ConversationResponse } from '../interfaces/conversations.interfaces';
import { User } from '../interfaces/users.interfaces';
import { excludeFields } from '../helpers/prisma.heplers';
import { nextAuthOptions } from '../constants/auth.constants';

export const getConversations = async (): Promise<Conversation[]> => {
  const session = await getServerSession(nextAuthOptions);

  const conversations: ConversationResponse[] = await prisma.conversations.findMany({
    where: {
      participant_ids: {
        has: session?.user?.id,
      },
    },
    include: {
      messages: true,
    },
  });

  const conversationsParticipantIds = conversations.map(conversation =>
    conversation.participant_ids
  );
  
  const conversationsParticipants: User[][] = await Promise.all(
    conversationsParticipantIds.map(conversationParticipantIds =>
      prisma.users.findMany({
        where: {
          id: {
            in: conversationParticipantIds,
          },
        },
      }),
    ),
  );

  return conversations.map((conversation, index) => ({
    ...conversation,
    participants: excludeFields<User[]>(conversationsParticipants[index], ['password']),
  })) as Conversation[];
}

export const getConversation = async (id: number): Promise<Conversation> => {
  const conversation: ConversationResponse | null = await prisma.conversations.findFirst({
    where: { id },
    include: {
      messages: true,
    },
  });

  const participants: User[] = await prisma.users.findMany({
    where: {
      id: {
        in: conversation?.participant_ids || [],
      },
    },
  });

  return {
    ...conversation,
    participants: excludeFields<User[]>(participants, ['password']),
  } as Conversation;
};
