'use client';

import './SingleConversation.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { useStatus } from '@/app/hooks/useStatus';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

interface SingleConversationProps {
  conversation: Conversation;
}

export default function SingleConversation({ conversation }: SingleConversationProps) {
  const status = useStatus(conversation.participants[0].id);

  return (
    <>
      <Avatar
        user={conversation.participants[0]}
        status={status}
        isEditable={false}
      />

      <div className="single-conversation__info">
        <div className="single-conversation__letters">
          <span className="single-conversation__first-name">
            {conversation.participants[0]?.first_name || ''}
          </span>
          <span className="single-conversation__last-name">
            {conversation.participants[0]?.last_name || ''}
          </span>
        </div>

        <span className="group-conversation__last-message">
          {(conversation.messages || []).slice(-1)[0]?.message || ''}
        </span>
      </div>
    </>
  );
}
