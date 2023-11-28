'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import './Conversation.scss';

import Avatar from '@/app/components/Avatar/Avatar';

interface Conversation {
  conversation: any;
  receiver: any;
}

export default function Conversation({ conversation }: Conversation) {
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const onConversationClick = () => router.push(`/${i18n.language}/conversations/${conversation.id}`);

  const isConversationSelected = () => {
    const splittedPathname = pathname.split('/');

    return +splittedPathname[splittedPathname.length - 1] === conversation.id;
  }

  return (
    <div
      className={`conversation ${isConversationSelected() && 'selected'}`}
      onClick={onConversationClick}
    >
      <Avatar user={conversation.receiver} status='online' />

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
