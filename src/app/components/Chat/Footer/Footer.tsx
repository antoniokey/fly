'use client';

import { FieldValues, UseFormReset, useForm } from 'react-hook-form';
import { VscSend } from 'react-icons/vsc';

import './Footer.scss';

interface FooterProps {
  onSendMessage: (resetMessageField: UseFormReset<FieldValues>) => (data: any) => void;
}

export default function Footer({ onSendMessage }: FooterProps) {
  const { handleSubmit, register, reset } = useForm();

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
