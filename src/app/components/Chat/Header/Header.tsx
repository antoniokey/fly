'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

import { useRouter } from 'next/navigation';

import { Menu } from 'primereact/menu';

import './Header.scss';

import { getHeaderSettingsMenuItems } from '@/app/constants/chat.constants';
import { User } from '@/app/interfaces/users.interfaces';
import { Status } from '@/app/enum/users.enum';
import { useStatus } from '@/app/hooks/useStatus';

import Avatar from '../../Avatar/Avatar';

interface HeaderProps {
  receiver: User;
  isNewChat: boolean;
  onLeaveChat: () => void;
  onClearChat: () => void;
}

export default function Header(
  {
    receiver,
    isNewChat,
    onLeaveChat,
    onClearChat,
  }: HeaderProps,
) {
  const status = useStatus(receiver.id);
  const router = useRouter();

  const menuRef: any = useRef();

  const { t: translate } = useTranslation();

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <Avatar
          status={status}
          user={receiver}
        />

        <div className="chat-header__user-info">
          <div className="chat-header__first-last-name">
            <span>{receiver.first_name}</span>
            <span>{receiver.last_name}</span>
          </div>

          {
            status === Status.Online && (
              <div className="chat-header__status">
                {translate(`users.status.${Status.Online}`)}
              </div>
            )
          }
        </div>
      </div>

      {
        isNewChat
          ? (
              <IoCloseOutline
                className="chat-header__close-button"
                onClick={() => router.back()}
              />
            )
          : (
              <>
                <Menu
                  popup
                  ref={menuRef}
                  model={
                    getHeaderSettingsMenuItems(
                      translate,
                      onLeaveChat,
                      onClearChat,
                    )
                  }
                  className="chat-header__settings-menu"
                />
          
                <HiDotsHorizontal
                  className="chat-header__settings-button"
                  onClick={(event: any) => menuRef.current.toggle(event)}
                />
              </>
            )
      }
    </div>
  );
}
