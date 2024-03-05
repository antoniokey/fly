'use client';

import './GroupConversation.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

interface GroupConversationProps {
  conversation: Conversation;
}

export default function GroupConversation({ conversation }: GroupConversationProps) {
  return (
    <>
      <div className="group-conversation__avatars">
        <div className="group-conversation__avatar-row">
          <Avatar
            user={conversation.participants[0]}
            status={null}
            isEditable={false}
          />
        </div>
        <div className="group-conversation__avatar-row">
          <Avatar
            user={conversation.participants[1]}
            status={null}
            isEditable={false}
          />
          <Avatar
            user={conversation.participants[2]}
            status={null}
            isEditable={false}
          />
        </div>
      </div>

      <div className="group-conversation__info">
        <span className="group-conversation__group-name">
          {conversation.group_name}
        </span>

        <span className="group-conversation__last-message">
          {(conversation.messages || []).slice(-1)[0]?.message || ''}
        </span>
      </div>
    </>
  );
}
