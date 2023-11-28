import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import prisma from '../lib/prisma';

export const getConversations = async () => {
  const session = await getServerSession(nextAuthOptions);

  const conversations = await prisma.conversations.findMany({
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
  
  const receivers = await prisma.users.findMany({
    where: {
      id: {
        in: conversationsReceiverIds,
      },
    },
  });

  return conversations.map((conversation, index) => ({
    ...conversation,
    receiver: receivers[index],
  }));
}

export const getConversation = async (id: number) => {
  const session = await getServerSession(nextAuthOptions);

  const conversation = await prisma.conversations.findFirst({
    where: { id },
    include: {
      messages: true,
    },
  });

  const conversationsReceiverId = (conversation?.participant_ids || []).filter(participant_id =>
    participant_id !== session?.user?.id,
  )[0];

  const receiver = await prisma.users.findFirst({
    where: {
      id: conversationsReceiverId,
    },
  });

  return {
    ...conversation,
    receiver,
  };
};
