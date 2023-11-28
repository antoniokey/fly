'use client';

import './UserList.scss';

import User from '../User/User';
import { useTranslation } from 'react-i18next';

interface UserListProps {
  users: any[];
  conversations: any[];
}

export default function UserList({ users, conversations }: UserListProps) {
  const { t: translate } = useTranslation();

  return (
    <div className="user-list">
      <div className="user-list__title">
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
