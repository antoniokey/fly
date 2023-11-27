'use client';

import { useForm } from 'react-hook-form';

import { VscSend } from 'react-icons/vsc';

import './Footer.scss';

export default function Footer() {
  const { handleSubmit, register } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data)
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
