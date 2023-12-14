'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import './Conversation.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { Conversation as IConversation } from '@/app/interfaces/conversations.interfaces';
import { useStatus } from '@/app/hooks/useStatus';
import { isItemSelected } from '@/app/helpers/common.helpers';

interface ConversationProps {
  conversation: IConversation;
}

export default function Conversation({ conversation }: ConversationProps) {
  const status = useStatus(conversation.receiver.id);
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const onConversationClick = (): void =>
    router.push(`/${i18n.language}/conversations/${conversation.id}`);

  return (
    <div
      className={`conversation ${isItemSelected(pathname || '', conversation.id) ? 'selected' : ''}`}
      onClick={onConversationClick}
    >
      <Avatar
        user={conversation.receiver}
        status={status}
        isEditable={false}
      />

      <div className="conversation__info">
        <span className="conversation__first-name">
          {conversation.receiver?.first_name || ''}
        </span>
        <span className="conversation__last-name">
          {conversation.receiver?.last_name || ''}
        </span>
      </div>
    </div>
  );
}
