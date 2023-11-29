'use client';

import { useTranslation } from 'react-i18next';

import './ConversationList.scss';

import Conversation from '../Conversation/Conversation';
import { Conversation as IConversation } from '@/app/interfaces/conversations.interfaces';

interface ConversationListProps {
  conversations: IConversation[];
}

export default function ConversationList({ conversations }: ConversationListProps) {
  const { t: translate } = useTranslation();

  return (
    <div className="conversation-list">
      <div className="conversation-list__title">
        {translate('conversations.conversations_list_title')}
      </div>

      <div className="conversation-list__users">
        {conversations.map(conversation => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  );
}
