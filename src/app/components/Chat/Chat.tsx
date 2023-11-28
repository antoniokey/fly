'use client';

import { useTranslation } from 'react-i18next';

import { useParams, useRouter } from 'next/navigation';

import axios from 'axios';

import './Chat.scss';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Chat {
  isOpen: boolean;
  isNewChat?: boolean;
  receiver?: any;
}

export default function Chat({ isOpen, isNewChat = false, receiver }: Chat) {
  const router = useRouter();
  const params = useParams();

  const { t: translate } = useTranslation();

  const onSendMessage = async (data: any) => {
    const createdConversation = (await axios.post(
      '/api/conversations',
      { receiverId: receiver.id },
    )).data;

    await axios.post('/api/messages', {
      conversationId: createdConversation.id,
      receiverId: receiver.id,
      message: data.message,
    });
  };

  const onLeaveChat = async () => {
    await axios.delete(`/api/conversations/${params.id}`);

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
                  receiver={receiver}
                  isNewChat={isNewChat}
                  onLeaveChat={onLeaveChat}
                />
                <Messages />
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
