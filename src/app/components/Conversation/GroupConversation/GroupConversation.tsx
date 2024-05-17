'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import axios from 'axios';

import './GroupConversation.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

interface GroupConversationProps {
  conversation: Conversation;
  isEditGroupNameEnabled: boolean;
  hasSentMessagePersonIcon?: boolean;
}

export default function GroupConversation({
  conversation,
  isEditGroupNameEnabled,
  hasSentMessagePersonIcon,
}: GroupConversationProps) {
  const router = useRouter();

  const [isSetConversationName, setIsConversationName] = useState(false);

  const { t: translate } = useTranslation();

  const { register, getValues } = useForm({
    defaultValues: {
      group_name: conversation.group_name,
    },
  });

  const onConversationNameChangedClick = async () => {
    try {
      await axios.put(`/api/conversations/${conversation.id}`, { group_name: getValues('group_name') });

      setIsConversationName(false);

      toast.success(translate('conversations.group_name_was_successfully_updated'));

      router.refresh();
    } catch(err) {
      toast.error(translate('conversations.group_name_was_successfully_updated'));
    }
  }

  return (
    <>
      <div className="group-conversation__avatars">
        <div className="group-conversation__avatar-row">
          <Avatar
            user={conversation.participants[0]}
            status={null}
            isEditable={false}
          />
        </div>
        <div className="group-conversation__avatar-row">
          <Avatar
            user={conversation.participants[1]}
            status={null}
            isEditable={false}
          />
          <Avatar
            user={conversation.participants[2]}
            status={null}
            isEditable={false}
          />
        </div>
      </div>

      <div className="group-conversation__info">
        <div className='group-conversation__group-name'>
          {!isSetConversationName && (
            <span className="group-conversation__name">
              {conversation.group_name}
            </span>
          )}

          {isEditGroupNameEnabled && (
            <div className="group-conversation__edit-name">
            {
              !isSetConversationName
                ? (
                  <MdOutlineEdit
                    className="group-conversation__edit-icon"
                    onClick={() => setIsConversationName(true)}
                  />
                )
                : (
                  <div className="group-conversation__new-group-name">
                    <input {...register('group_name')} />

                    <button
                      className="group-conversation__new-group-name__save-button"
                      onClick={onConversationNameChangedClick}
                    >
                      {translate('conversations.actions.save')}
                    </button>

                    <button
                      className="group-conversation__new-group-name__cancel-button"
                      onClick={() => setIsConversationName(false)}
                    >
                      {translate('conversations.actions.cancel')}
                    </button>
                  </div>
                )
            }
          </div>
          )}
        </div>

        {hasSentMessagePersonIcon && (
          <span className="group-conversation__last-message">
            {(conversation.messages || []).slice(-1)[0]?.message || ''}
          </span>
        )}
      </div>
    </>
  );
}
