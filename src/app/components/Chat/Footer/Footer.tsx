'use client';

import { useForm } from 'react-hook-form';
import { VscSend } from 'react-icons/vsc';

import axios from 'axios';

import './Footer.scss';

interface FooterProps {
  receiver: any;
}

export default function Footer({ receiver }: FooterProps) {
  const { handleSubmit, register } = useForm();

  const onFormSubmit = async (data: any) => {
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

  return (
    <div className="chat-footer">
      <form
        className="chat-footer__form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          placeholder='Write a message'
          {...register('message')}
        />
      </form>

      <div
        className="chat-footer__send-button"
        onClick={handleSubmit(onFormSubmit)}
      >
        <VscSend />
      </div>
    </div>
  );
}
