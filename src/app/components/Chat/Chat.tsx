'use client';

import { useTranslation } from 'react-i18next';

import './Chat.scss';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Chat {
  isOpen: boolean;
  receiver?: any;
}

export default function Chat({ isOpen, receiver }: Chat) {
  const { t: translate } = useTranslation();

  return (
    <div className="chat">
      {
        isOpen
          ? (
              <div className="chat__body">
                <Header receiver={receiver} />
                <Messages />
                <Footer receiver={receiver} />
              </div>
            )
          : (
              <span className="chat__empty">
                {translate('chat.empty')}
              </span>
            )
      }
    </div>
  );
}
