'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import './Conversation.scss';

import { Conversation as IConversation } from '@/app/interfaces/conversations.interfaces';
import { isItemSelected } from '@/app/helpers/common.helpers';

import GroupConversation from '../../../../components/Conversation/GroupConversation/GroupConversation';
import SingleConversation from './SingleConversation/SingleConversation';

interface ConversationProps {
  conversation: IConversation;
}

export default function Conversation({ conversation }: ConversationProps) {
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
      {
        conversation.is_group
          ? <GroupConversation
              conversation={conversation}
              isEditGroupNameEnabled={false}
              hasSentMessagePersonIcon
            />
          : <SingleConversation conversation={conversation} />
      }
    </div>
  );
}
