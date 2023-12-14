'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUsers } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

import './NewChat.scss';

import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { User as IUser } from '@/app/interfaces/users.interfaces';
import User from '@/app/[locale]/users/components/User/User';

interface NewChatProps {
  conversations: Conversation[];
  users: IUser[];
  onNewChatModalClose: () => void;
}

export default function NewChat({ users, conversations, onNewChatModalClose }: NewChatProps) {
  const [isMultipleUsersSelected, setIsMultipleUsersSelected] = useState(false);

  const { t: translate } = useTranslation();

  const { register } = useForm({
    defaultValues: {
      selectedUserIds: [],
      group_name: translate('conversations.new_chat.new_group'),
    },
  });

  const onMultipleUsersMenuItemClick = () => setIsMultipleUsersSelected(!isMultipleUsersSelected);

  const onSaveClick = () => {

  };

  return (
    <div className="new-chat-modal">
      <div className="new-chat-modal__menu">
        <div
          className="new-chat-modal__menu-item"
          onClick={onMultipleUsersMenuItemClick}
        >
          {
            !isMultipleUsersSelected && (
              <HiOutlineUsers className="new-chat-modal__menu-item-icon" />
            )
          }

          <span className="new-chat-modal__menu-item-label">
            {
              isMultipleUsersSelected
                ? translate('conversations.new_chat.cancel')
                : translate('conversations.new_chat.new_group')
            }
          </span>
        </div>
      </div>

      {
        isMultipleUsersSelected && (
          <div className="new-chat-modal__group-name">
            <input
              className="new-chat-modal__group-name-field"
              placeholder={translate('conversations.new_chat.enter_group_name')}
              {...register('group_name')}
            />
          </div>
        )
      }

      <div className="new-chat-modal__data">
        <div className="new-chat-modal__users">
          {users.map(user => (
            <div
              className="new-chat-modal__user-item"
              key={user.id}
            >
              {
                isMultipleUsersSelected && (
                  <input
                    className="new-chat-modal__checkbox"
                    type="checkbox"
                    value={user.id}
                    {...register('selectedUserIds')}
                  />
                )
              }

              <User
                onClick={onNewChatModalClose}
                user={user}
                conversations={conversations}
              />
            </div>
          ))}
        </div>

        {
          isMultipleUsersSelected && (
            <div className="new-chat-modal__buttons">
              <button
                className="new-chat-modal__save-button"
                onClick={onSaveClick}
              >
                {translate('conversations.new_chat.actions.save')}
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
