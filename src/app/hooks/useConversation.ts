'use client';

import { useParams } from 'next/navigation';

export const useConversation = () => {
  const params = useParams();

  const conversationId = params.conversationId;
  const isOpen = !!conversationId;

  return [isOpen, conversationId];
};
