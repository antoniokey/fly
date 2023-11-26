'use client';

import './UserList.scss';

import User from '../User/User';
import { useTranslation } from 'react-i18next';

interface UserListProps {
  users: any[];
}

export default function UserList({ users }: UserListProps) {
  const { t: translate } = useTranslation();

  return (
    <div className="user-list">
      <div className="user-list__title">
        {translate('users.users_list_title')}
      </div>

      {users.map(user => (
        <User
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}
