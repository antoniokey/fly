'use client';

import './User.scss';

import Avatar from '@/app/components/Avatar/Avatar';

interface UserProps {
  user: any;
}

export default function User({ user }: UserProps) {
  return (
    <div className="user">
      <Avatar user={user} />

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
