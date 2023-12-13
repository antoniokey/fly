'use client';

import { useTranslation } from 'react-i18next';

import './UserList.scss';

import { User as IUser } from '@/app/interfaces/users.interfaces';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

import User from '../User/User';

interface UserListProps {
  users: IUser[];
  conversations: Conversation[];
}

export default function UserList({ users, conversations }: UserListProps) {
  const { t: translate } = useTranslation();

  return (
    <div className="user-list">
      <div className="user-list__title common-page-title">
        {translate('users.users_list_title')}
      </div>

      <div className="user-list__users">
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            conversations={conversations}
          />
        ))}
      </div>
    </div>
  );
}
