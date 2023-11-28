'use client';

import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

import { FieldValues, UseFormReset } from 'react-hook-form';

import axios from 'axios';

import './Chat.scss';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Chat {
  isOpen: boolean;
  isNewChat?: boolean;
  conversation?: any;
}

export default function Chat(
  {
    isOpen,
    isNewChat = false,
    conversation,
  }: Chat,
) {
  const session = useSession();
  const router = useRouter();
  const params = useParams();

  const { t: translate } = useTranslation();

  const onSendMessage = (resetMessageField: UseFormReset<FieldValues>) =>
    async (data: any) => {
      let conversationId;

      if (conversation.id) {
        conversationId = conversation.id;
      } else {
        const createdConversation = (await axios.post(
          '/api/conversations',
          { receiverId: conversation.receiver.id },
        )).data;

        conversationId = createdConversation.id;
      }

      await axios.post('/api/socket/messages', {
        session,
        conversationId,
        receiverId: conversation.receiver.id,
        message: data.message,
      });

      resetMessageField();
    };

  const onLeaveChat = async () => {
    await axios.delete(`/api/conversations/${params?.id}`);

    router.back();
    router.refresh();
  };

  return (
    <div className="chat">
      {
        isOpen
          ? (
              <div className="chat__body">
                <Header
                  receiver={conversation.receiver}
                  isNewChat={isNewChat}
                  onLeaveChat={onLeaveChat}
                />
                <Messages messages={conversation.messages || []} />
                <Footer onSendMessage={onSendMessage}/>
              </div>
            )
          : (
              <span className="chat__empty">
                {translate('chat.empty')}
              </span>
            )
      }
    </div>
  );
}
