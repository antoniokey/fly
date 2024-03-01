'use client';

import { useParams } from 'next/navigation';

import { useChat } from '@/app/hooks/useChat';

import './SideBar.scss';

import Menu from './Menu/Menu';

interface SideBarProps {
  children?: React.ReactNode;
  hasData: boolean;
} 

export default function SideBar({ children, hasData }: SideBarProps) {
  const params = useParams();

  const { isNewChatSelected } = useChat();

  return (
    <div
      className={`
          side-bar
          ${!hasData ? 'side-bar__no-data' : ''}
          ${params?.id ? 'side-bar__chat-page' : ''}
          ${isNewChatSelected ? 'side-bar__new-chat-selected' : ''}
      `}
    >
      <Menu />

      {
        hasData && (
          <div className="side-bar__data">
            {children}
          </div>
        )
      }
    </div>
  );
}
