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
import { Status } from '@/app/enum/users.enum';
import { useStatus } from '@/app/hooks/useStatus';
import { useScreenSize } from '@/app/hooks/useScreenSize';
import { ScreenSize } from '@/app/enum/common.enum';
import { useChat } from '@/app/hooks/useChat';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

import Avatar from '../../Avatar/Avatar';
import GroupConversation from '../../Conversation/GroupConversation/GroupConversation';

interface HeaderProps {
  conversation: Conversation
  onLeaveChat: () => void;
  onClearChat: () => void;
}

export default function Header(
  {
    onLeaveChat,
    onClearChat,
    conversation,
  }: HeaderProps,
) {
  const screenSize = useScreenSize();
  const router = useRouter();

  const { t: translate } = useTranslation();
  const { isNewChatSelected, newChatSelectedUser, setIsNewChatSelected } = useChat();

  const receiver = newChatSelectedUser || conversation?.participants[0];

  const status = useStatus(newChatSelectedUser?.id || conversation?.participants[0]?.id);
  const menuRef: any = useRef();

  const onAvatarClick = (event: any) => {
    if (screenSize.width <= ScreenSize.Mobile) {
      menuRef.current.toggle(event);
    }
  };

  const onCloseChat = () =>
    isNewChatSelected
      ? setIsNewChatSelected({
          isNewChatSelected: false,
          newChatSelectedUser: undefined,
        })
      : router.back();

  return (
    <div className={`chat-header common-chat-body-section ${isNewChatSelected ? 'new-chat-selected' : ''}`}>
      <FaArrowLeft
        className="chat-header__back-button"
        onClick={onCloseChat}
      />

      <div
        className={
          `chat-header__user ${conversation?.is_group ? 'group-conversation-header' : ''}`
        }
      >
        {
          conversation?.is_group
            ? <GroupConversation conversation={conversation} isEditGroupNameEnabled />
            : <>
                <Avatar
                  status={status}
                  user={receiver}
                  isEditable={false}
                  onClick={onAvatarClick}
                />

                <div className="chat-header__user-info">
                  <div className="chat-header__first-last-name">
                    <span>{receiver?.first_name}</span>
                    <span>{receiver?.last_name}</span>
                  </div>

                  {
                    status === Status.Online && (
                      <div className="chat-header__status">
                        {translate(`users.status.${Status.Online}`)}
                      </div>
                    )
                  }
                </div>
              </>
        }
      </div>

      {
        isNewChatSelected
          ? screenSize.width > ScreenSize.Mobile && (
              <IoCloseOutline
                className="chat-header__close-button"
                onClick={onCloseChat}
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
