'use client';

import { useTranslation } from 'react-i18next';

import { usePathname, useRouter } from 'next/navigation';

import './User.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { User } from '@/app/interfaces/users.interfaces';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

interface UserProps {
  user: User;
  conversations: Conversation[];
}

export default function User({ user, conversations }: UserProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const isUserSelected = () => {
    const splittedPathname = pathname.split('/');

    return +splittedPathname[splittedPathname.length - 1] === user.id;
  };

  const getAlreadyStartedConversation = () =>
    conversations.find(conversation =>
      conversation.participant_ids.includes(user.id)
    );

  const onUserClick = () => {
    const alreadyStartedConversation = getAlreadyStartedConversation();

    if (alreadyStartedConversation) {
      router.push(`/${i18n.language}/conversations/${alreadyStartedConversation.id}`);
    } else {
      router.push(`/${i18n.language}/users/${user.id}`);
    }
  };
  
  return (
    <div
      className={`user ${isUserSelected() && 'selected'}`}
      onClick={onUserClick}
    >
      <Avatar user={user} status='online' />

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
