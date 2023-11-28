'use client';

import { useEffect, useState } from 'react';

import './Messages.scss';

import { useSocket } from '@/app/hooks/useSocket';
import Message from './Message/Message';

interface MessagesProps {
  messages: any[];
  receiver: any;
  sender: any;
}

export default function Messages({ messages, receiver, sender }: MessagesProps) {
  const [messagesData, setMessagesData] = useState(messages);

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(
      'message',
      message => setMessagesData([...messagesData, message]),
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
