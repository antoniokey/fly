'use client';

import moment from 'moment';

import './Message.scss';

import { Message } from '@/app/interfaces/messages.interfaces';
import { User } from '@/app/interfaces/users.interfaces';
import { MessageUserType } from '@/app/enum/messages.enum';

interface MessageProps {
  message: Message;
  sender: User;
}

export default function Message({ message, sender }: MessageProps) {
  const messageType = message.sender_id === sender.id
    ? MessageUserType.Sender
    : MessageUserType.Receiver;

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
