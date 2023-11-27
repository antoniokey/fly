'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsHorizontal } from 'react-icons/hi';

import { useSession } from 'next-auth/react';

import { Menu } from 'primereact/menu';

import './Header.scss';

import { getHeaderSettingsMenuItems } from '@/app/constants/chat.constants';

import Avatar from '../../Avatar/Avatar';

export default function Header() {
  const session = useSession();
  const menuRef: any = useRef();

  const { t: translate } = useTranslation();

  const onLeaveClick = () => {};

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <Avatar
          status='online'
          user={session.data?.user}
        />

        <div className="chat-header__user-info">
          <div className="chat-header__first-last-name">
            <span>{session.data?.user.first_name}</span>
            <span>{session.data?.user.last_name}</span>
          </div>

          <div className="chat-header__status">
            Online
          </div>
        </div>
      </div>

      <Menu
        popup
        ref={menuRef}
        model={
          getHeaderSettingsMenuItems(
            translate,
            onLeaveClick,
          )
        }
        className="chat-header__settings-menu"
      />

      <HiDotsHorizontal
        className="chat-header__settings-button"
        onClick={(event: any) => menuRef.current.toggle(event)}
      />
    </div>
  );
}
