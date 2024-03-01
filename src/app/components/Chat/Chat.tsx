'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReset } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import axios from 'axios';

import './Chat.scss';

import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { User } from '@/app/interfaces/users.interfaces';
import { MessageFieldFormValues } from '@/app/interfaces/chat.interfaces';
import { useSocket } from '@/app/hooks/useSocket';
import { useChat } from '@/app/hooks/useChat';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface ChatProps {
  isOpen: boolean;
  conversation?: Conversation;
}

export default function Chat(
  {
    isOpen,
    conversation,
  }: ChatProps,
) {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const { socket } = useSocket();
  const { t: translate } = useTranslation();
  const { isNewChatSelected, newChatSelectedUser, setIsNewChatSelected } = useChat();

  const receiver = newChatSelectedUser
   ? newChatSelectedUser
   : conversation?.receiver;

  useEffect(() => {
    if (socket && conversation?.id) {
      socket.emit('join-room', conversation.id);
    }
  }, [socket, conversation?.id]);

  useEffect(() => {
    if (isNewChatSelected && conversation) {
      setIsNewChatSelected({
        isNewChatSelected: false,
        newChatSelectedUser: undefined,
      });
    }
  }, [isNewChatSelected, conversation]);

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
              { receiverId: receiver?.id },
            )).data;

            conversationId = createdConversation.id;
          }

          const createdMessage = (await axios.post(
            '/api/messages',
            {
              conversationId,
              receiverId: receiver?.id,
              message: data.message,
            },
          )).data;

          if (isNewChatSelected) {
            router.push(`${pathname}/${conversationId}`);
            router.refresh();
          }

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
    <div className={`chat ${isNewChatSelected ? 'chat__new-chat-created' : ''}`}>
      {
        isNewChatSelected || isOpen
          ? (
              <div className="chat__body">
                <Header
                  receiver={receiver as User}
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
