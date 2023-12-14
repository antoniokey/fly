'use client';

import { useTranslation } from 'react-i18next';

import { usePathname, useRouter } from 'next/navigation';

import './User.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { User } from '@/app/interfaces/users.interfaces';
import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { useStatus } from '@/app/hooks/useStatus';
import { isItemSelected } from '@/app/helpers/common.helpers';

interface UserProps {
  user: User;
  conversations: Conversation[];
  onClick?: () => void;
}

export default function User({ user, conversations, onClick }: UserProps) {
  const status = useStatus(user.id);
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const getAlreadyStartedConversation = (): Conversation | undefined =>
    conversations.find(conversation =>
      conversation.participant_ids.includes(user.id)
    );

  const onUserClick = (): void => {
    const alreadyStartedConversation = getAlreadyStartedConversation();

    if (alreadyStartedConversation) {
      router.push(`/${i18n.language}/conversations/${alreadyStartedConversation.id}`);
    } else {
      router.push(`/${i18n.language}/users/${user.id}`);
    }

    setTimeout(() => onClick && onClick())
  };
  
  return (
    <div
      className={`user ${isItemSelected(pathname || '', user.id) ? 'selected' : ''}`}
      onClick={onUserClick}
    >
      <Avatar
        user={user}
        status={status}
        isEditable={false}
      />

      <div className="user__info">
        <span className="user__first-name">
          {user.first_name}
        </span>
        <span className="user__last-name">
          {user.last_name}
        </span>
      </div>
    </div>
  );
}
