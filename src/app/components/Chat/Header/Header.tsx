'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsHorizontal } from 'react-icons/hi';

import { Menu } from 'primereact/menu';

import './Header.scss';

import { getHeaderSettingsMenuItems } from '@/app/constants/chat.constants';

import Avatar from '../../Avatar/Avatar';

interface HeaderProps {
  receiver: any;
}

export default function Header({ receiver }: HeaderProps) {
  const menuRef: any = useRef();

  const { t: translate } = useTranslation();

  const onLeaveClick = () => {};

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <Avatar
          status='online'
          user={receiver}
        />

        <div className="chat-header__user-info">
          <div className="chat-header__first-last-name">
            <span>{receiver.first_name}</span>
            <span>{receiver.last_name}</span>
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
