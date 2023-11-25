'use client';

import { useTranslation } from 'react-i18next';

import './Chat.scss';

import { useConversation } from '@/app/hooks/useConversation';

export default function Chat() {
  const [isOpen] = useConversation();

  const { t: translate } = useTranslation();

  return (
    <div className="chat">
      {
        isOpen
          ? 'Chat opened'
          : <span className="chat__empty">{translate('chat.empty')}</span>
      }
    </div>
  );
}
