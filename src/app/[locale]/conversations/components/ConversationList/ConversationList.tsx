'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCreateOutline } from 'react-icons/io5';
import Modal from 'react-modal';

import './ConversationList.scss';

import { User as IUser } from '@/app/interfaces/users.interfaces';
import { Conversation as IConversation } from '@/app/interfaces/conversations.interfaces';
import NewChat from '@/app/components/Chat/NewChat/NewChat';

import Conversation from '../Conversation/Conversation';

interface ConversationListProps {
  conversations: IConversation[];
  users: IUser[];
}

export default function ConversationList({ conversations, users }: ConversationListProps) {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const { t: translate } = useTranslation();

  const onNewChatModalClose = () => setIsNewChatModalOpen(false);

  return (
    <div className="conversation-list">
      <div className="conversation-list__header common-page-title">
        <div className="conversation-list__title">
          {translate('conversations.conversations_list_title')}
        </div>

        <div className="conversation-list__new-chat-icon">
          <IoCreateOutline onClick={() => setIsNewChatModalOpen(true)} />
        </div>
      </div>

      <div className="conversation-list__conversations">
        {conversations.map(conversation => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>

      <Modal
        className="conversation-list__new-chat-modal"
        isOpen={isNewChatModalOpen}
        onRequestClose={onNewChatModalClose}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <NewChat
          users={users}
          conversations={conversations}
          onNewChatModalClose={onNewChatModalClose}
        />
      </Modal>
    </div>
  );
}
