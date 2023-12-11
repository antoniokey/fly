'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(
      'message',
      message =>
        setMessagesData(previousMessages => [...previousMessages, message]),
    );

    return () => {
      socket.off();
    };
  }, [socket]);

  return (
    <div className="chat-messages">
      {
        messagesData.map((message, index) => (
          <Message
            key={index}
            message={message}
            sender={sender}
          />
        ))
      }
    </div>
  );
}
