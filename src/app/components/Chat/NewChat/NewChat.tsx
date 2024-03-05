'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUsers } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import axios from 'axios';

import './NewChat.scss';

import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { User as IUser } from '@/app/interfaces/users.interfaces';
import User from '@/app/components/User/User';

interface NewChatProps {
  conversations: Conversation[];
  users: IUser[];
  closeNewChatModal: () => void;
  onNewSingleChatSelected: (user: IUser) => void;
}

export default function NewChat(
  {
    users,
    conversations,
    closeNewChatModal,
    onNewSingleChatSelected
  }: NewChatProps,
) {
  const [isMultipleUsersSelected, setIsMultipleUsersSelected] = useState(false);

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const { t: translate } = useTranslation();

  const { register, getValues } = useForm({
    defaultValues: {
      participant_ids: [],
      group_name: translate('conversations.new_chat.new_group'),
    },
  });

  const onMultipleUsersMenuItemClick = () => setIsMultipleUsersSelected(!isMultipleUsersSelected);

  const onSaveClick = async () => {
    const formData = getValues();

    const createdConversation = (await axios.post(
      '/api/conversations',
      {
        is_group: isMultipleUsersSelected,
        group_name: formData.group_name,
        participant_ids: [
          session.data?.user.id,
          ...formData.participant_ids.map(participant_id => +participant_id),
        ],
      },
    )).data;

    closeNewChatModal();

    router.push(`${pathname}/${createdConversation.id}`);
    router.refresh();
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
                    {...register('participant_ids')}
                  />
                )
              }

              <User
                user={user}
                conversations={conversations}
                shouldComputeConversations={!isMultipleUsersSelected}
                onClick={() => !isMultipleUsersSelected ? onNewSingleChatSelected(user) : null}
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
