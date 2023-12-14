'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReset } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

import axios from 'axios';

import './Chat.scss';

import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { User } from '@/app/interfaces/users.interfaces';
import { MessageFieldFormValues } from '@/app/interfaces/chat.interfaces';
import { useSocket } from '@/app/hooks/useSocket';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface ChatProps {
  isOpen: boolean;
  isNewChat?: boolean;
  conversation?: Conversation;
}

export default function Chat(
  {
    isOpen,
    isNewChat = false,
    conversation,
  }: ChatProps,
) {
  const session = useSession();
  const router = useRouter();
  const params = useParams();

  const { socket } = useSocket();
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (socket && conversation?.id) {
      socket.emit('join-room', conversation.id);
    }
  }, [socket, conversation?.id]);

  const onSendMessage =
    (resetMessageField: UseFormReset<MessageFieldFormValues>): (data: MessageFieldFormValues) => Promise<void> =>
      async (data: MessageFieldFormValues): Promise<void> => {
        if (data.message) {
          let conversationId;

          if (conversation?.id) {
            conversationId = conversation.id;
          } else {
            const createdConversation = (await axios.post(
              '/api/conversations',
              { receiverId: conversation?.receiver?.id },
            )).data;

            conversationId = createdConversation.id;
          }

          const createdMessage = (await axios.post(
            '/api/messages',
            {
              conversationId,
              receiverId: conversation?.receiver.id,
              message: data.message,
            },
          )).data;

          await socket?.emit(
            'send-message',
            {
              roomId: conversationId,
              message: createdMessage,
            },
          );

          resetMessageField();
        }
      };

  const onLeaveChat = async (): Promise<void> => {
    await axios.delete(`/api/conversations/${params?.id}`);

    router.back();
    router.refresh();
  };

  const onClearChat = async (): Promise<void> => {
    await axios.delete(`/api/messages?conversationId=${params?.id}`);

    await socket?.emit(
      'send-clear-messages',
      conversation?.id,
    );
  }

  return (
    <div className="chat">
      {
        isOpen
          ? (
              <div className="chat__body">
                <Header
                  receiver={conversation?.receiver as User}
                  isNewChat={isNewChat}
                  onLeaveChat={onLeaveChat}
                  onClearChat={onClearChat}
                />
                <Messages
                  messages={conversation?.messages || []}
                  sender={session.data?.user}
                />
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
