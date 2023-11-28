'use client';

import './Messages.scss';

interface MessagesProps {
  messages: any[];
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="chat-messages">
      {
        messages.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))
      }
    </div>
  );
}
