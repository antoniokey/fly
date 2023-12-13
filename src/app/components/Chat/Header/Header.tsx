'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import { FaArrowLeft } from 'react-icons/fa6';

import { useRouter } from 'next/navigation';

import { Menu } from 'primereact/menu';

import './Header.scss';

import { getHeaderSettingsMenuItems } from '@/app/constants/chat.constants';
import { User } from '@/app/interfaces/users.interfaces';
import { Status } from '@/app/enum/users.enum';
import { useStatus } from '@/app/hooks/useStatus';
import { useScreenSize } from '@/app/hooks/useScreenSize';
import { ScreenSize } from '@/app/enum/common.enum';

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
  const screenSize = useScreenSize();
  const status = useStatus(receiver?.id);
  const router = useRouter();

  const menuRef: any = useRef();

  const { t: translate } = useTranslation();

  const onAvatarClick = (event: any) => {
    if (screenSize.width <= ScreenSize.Mobile) {
      menuRef.current.toggle(event);
    }
  };

  return (
    <div className="chat-header common-chat-body-section">

      <FaArrowLeft
        className="chat-header__back-button"
        onClick={() => router.back()}
      />

      <div className="chat-header__user">
        <Avatar
          status={status}
          user={receiver}
          isEditable={false}
          onClick={onAvatarClick}
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
              <HiDotsHorizontal
                className="chat-header__settings-button"
                onClick={(event: any) => menuRef.current.toggle(event)}
              />
            )
      }

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
    </div>
  );
}
