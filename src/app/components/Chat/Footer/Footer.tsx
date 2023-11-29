'use client';

import { UseFormReset, useForm } from 'react-hook-form';
import { VscSend } from 'react-icons/vsc';

import './Footer.scss';

import { MessageFieldFormValues } from '@/app/interfaces/chat.interfaces';

interface FooterProps {
  onSendMessage: (resetMessageField: UseFormReset<MessageFieldFormValues>) =>
    (data: MessageFieldFormValues) => void;
}

export default function Footer({ onSendMessage }: FooterProps) {
  const { handleSubmit, register, reset } = useForm<MessageFieldFormValues>();

  return (
    <div className="chat-footer">
      <form
        className="chat-footer__form"
        onSubmit={handleSubmit(onSendMessage(reset))}
      >
        <input
          placeholder='Write a message'
          {...register('message')}
        />
      </form>

      <div
        className="chat-footer__send-button"
        onClick={handleSubmit(onSendMessage(reset))}
      >
        <VscSend />
      </div>
    </div>
  );
}
