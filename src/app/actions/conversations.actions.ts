import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import prisma from '../lib/prisma';
import { Conversation, ConversationResponse } from '../interfaces/conversations.interfaces';
import { User } from '../interfaces/users.interfaces';
import { excludeFields } from '../helpers/prisma.heplers';

export const getConversations = async (): Promise<Conversation[]> => {
  const session = await getServerSession(nextAuthOptions);

  const conversations: ConversationResponse[] = await prisma.conversations.findMany({
    where: {
      participant_ids: {
        has: session?.user?.id,
      },
    },
  });

  const conversationsReceiverIds = conversations.map(conversation => {
    const receiverId = conversation.participant_ids.filter(participant_id =>
      participant_id !== session?.user?.id,
    )[0];

    return receiverId;
  });
  
  const receivers: User[] = await prisma.users.findMany({
    where: {
      id: {
        in: conversationsReceiverIds,
      },
    },
  });

  return conversations.map((conversation, index) => ({
    ...conversation,
    receiver: excludeFields<User>(receivers[index], ['password']),
  })) as Conversation[];
}

export const getConversation = async (id: number): Promise<Conversation> => {
  const session = await getServerSession(nextAuthOptions);

  const conversation: ConversationResponse | null = await prisma.conversations.findFirst({
    where: { id },
    include: {
      messages: true,
    },
  });

  const conversationsReceiverId = (conversation?.participant_ids || []).filter(participant_id =>
    participant_id !== session?.user?.id,
  )[0];

  const receiver: User | null = await prisma.users.findFirst({
    where: {
      id: conversationsReceiverId,
    },
  });

  return {
    ...conversation,
    receiver: excludeFields<User | null>(receiver, ['password']),
  } as Conversation;
};
