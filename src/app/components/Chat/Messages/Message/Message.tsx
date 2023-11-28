'use client';

import moment from 'moment';

import './Message.scss';

interface MessageProps {
  message: any;
  sender: any;
}

export default function Message({ message, sender }: MessageProps) {
  const messageType = message.sender_id === sender.id
    ? 'sender'
    : 'receiver';

  const messageCreatedTime = moment(message.created_at).format('hh:mm a');

  return (
    <div className={`chat-messages__message ${messageType}`}>
      <span className="chat-messages__message__text">
        {message.message}
      </span>
      <span className="chat-messages__message__created-time">
        {messageCreatedTime}
      </span>
    </div>
  );
}
