'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Messages.scss';

import { useSocket } from '@/app/hooks/useSocket';
import { User } from '@/app/interfaces/users.interfaces';
import { Message as IMessage } from '@/app/interfaces/messages.interfaces';

import Message from './Message/Message';

interface MessagesProps {
  messages: IMessage[];
  sender: User;
}

export default function Messages({ messages, sender }: MessagesProps) {
  const [messagesData, setMessagesData] = useState(messages);

  const { socket } = useSocket();
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(
      'new-message',
      message =>
        setMessagesData(previousMessages => [...previousMessages, message]),
    );

    socket.on(
      'clear-messages',
      () => setMessagesData(() => []),
    );

    return () => {
      socket.off();
    };
  }, [socket]);

  return (
    <div className="chat-messages">
      {
        messagesData.length
          ? (
              messagesData.map((message, index) => (
                <Message
                  key={index}
                  message={message}
                  sender={sender}
                />
              ))
            )
          : (
              <div className="chat-messages__no-messages">
                {translate('chat.no_messages')}
              </div>
            )
      }
    </div>
  );
}
