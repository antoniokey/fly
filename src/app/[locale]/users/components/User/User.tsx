'use client';

import { usePathname, useRouter } from 'next/navigation';

import './User.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { useTranslation } from 'react-i18next';

interface UserProps {
  user: any;
}

export default function User({ user }: UserProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const onUserClick = () => router.push(`/${i18n.language}/users/${user.id}`);

  const isUserSelected = () => {
    const splittedPathname = pathname.split('/');

    return +splittedPathname[splittedPathname.length - 1] === user.id;
  }
  
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
