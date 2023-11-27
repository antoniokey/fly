'use client';

import { useTranslation } from 'react-i18next';

import './Chat.scss';

import Messages from './Messages/Messages';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Chat {
  isOpen: boolean;
}

export default function Chat({ isOpen }: Chat) {
  const { t: translate } = useTranslation();

  return (
    <div className="chat">
      {
        isOpen
          ? (
              <div className="chat__body">
                <Header />
                <Messages />
                <Footer />
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
