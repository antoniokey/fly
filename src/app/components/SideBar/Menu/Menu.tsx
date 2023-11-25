'use client';

import { TbMessageCircle } from 'react-icons/tb';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { PiUsersThree } from 'react-icons/pi';

import { useTranslation } from 'react-i18next';

import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import './Menu.scss';

export default function Menu() {
  const { i18n } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();

  const onConversationsClick = () => router.push(`/${i18n.language}/conversations`);
  const onUsersClick = () => router.push(`/${i18n.language}/users`);
  const onSettingsClick = () => router.push(`/${i18n.language}/settings`);

  const onLogoutClick = () => signOut({ callbackUrl: `/${i18n.language}` });

  const getMenuItemClassName = (menuItemKey: string) =>
    pathname.includes(menuItemKey)
      ? 'selected'
      : '';

  return (
    <div className="menu">
      <div className="menu__navigation-items">
        <TbMessageCircle
          className={getMenuItemClassName('conversations')}
          onClick={onConversationsClick}
        />
        <PiUsersThree
          className={getMenuItemClassName('users')}
          onClick={onUsersClick}
        />
        <IoSettingsOutline
          className={getMenuItemClassName('settings')}
          onClick={onSettingsClick}
        />
        <IoIosLogOut onClick={onLogoutClick} />
      </div>
    </div>
  );
}
