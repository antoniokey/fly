'use client';

import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

import { UseFormReset } from 'react-hook-form';

import axios from 'axios';

import './Chat.scss';

import { Conversation } from '@/app/interfaces/conversations.interfaces';
import { User } from '@/app/interfaces/users.interfaces';
import { MessageFieldFormValues } from '@/app/interfaces/chat.interfaces';

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

  const { t: translate } = useTranslation();

  const onSendMessage =
    (resetMessageField: UseFormReset<MessageFieldFormValues>): (data: MessageFieldFormValues) => Promise<void> =>
      async (data: MessageFieldFormValues): Promise<void> => {
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

        await axios.post('/api/socket/messages', {
          session,
          conversationId,
          receiverId: conversation?.receiver?.id,
          message: data.message,
        });

        resetMessageField();
      };

  const onLeaveChat = async (): Promise<void> => {
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
                  receiver={conversation?.receiver as User}
                  isNewChat={isNewChat}
                  onLeaveChat={onLeaveChat}
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
