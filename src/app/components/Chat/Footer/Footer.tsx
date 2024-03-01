'use client';

import { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { UseFormReset, useForm } from 'react-hook-form';
import { VscSend } from 'react-icons/vsc';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import './Footer.scss';

import { MessageFieldFormValues } from '@/app/interfaces/chat.interfaces';
import ClickOutside from '@/app/hoc/ClickOutside';
import { useChat } from '@/app/hooks/useChat';

interface FooterProps {
  onSendMessage: (resetMessageField: UseFormReset<MessageFieldFormValues>) =>
    (data: MessageFieldFormValues) => void;
}

export default function Footer({ onSendMessage }: FooterProps) {
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);

  const emojiPickerRef = useRef();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
  } = useForm<MessageFieldFormValues>();

  const { t: translate } = useTranslation();
  const { isNewChatSelected } = useChat();

  const onEmojiClick = (emojiData: EmojiClickData) =>
    setValue('message', `${getValues().message} ${emojiData.emoji}`);

  function onEmojiClose() {
    setIsEmojiOpened(false);
  }

  return (
    <div className={`chat-footer common-chat-body-section ${isNewChatSelected ? 'new-chat-selected' : ''}`}>
      <form
        className="chat-footer__form"
        onSubmit={handleSubmit(onSendMessage(reset))}
      >
        <input
          placeholder={translate('chat.message_field_placeholder')}
          {...register('message')}
        />

        <div
          className="chat-footer__emoji-button"
          onClick={() => setIsEmojiOpened(!isEmojiOpened)}
        >
          <span className="chat-footer__emoji-label">🙂</span>
        </div>

        {
          isEmojiOpened && (
            <ClickOutside
              elementRef={emojiPickerRef}
              callback={onEmojiClose}
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </ClickOutside>
          )
        }
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
