'use client';

import { useEffect, useState } from 'react';

import './Messages.scss';

import { useSocket } from '@/app/hooks/useSocket';

interface MessagesProps {
  messages: any[];
}

export default function Messages({ messages }: MessagesProps) {
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
          <div key={index}>{message.message}</div>
        ))
      }
    </div>
  );
}
