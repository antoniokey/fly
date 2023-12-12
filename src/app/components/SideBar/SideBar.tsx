'use client';

import { useParams } from 'next/navigation';

import './SideBar.scss';

import Menu from './Menu/Menu';

interface SideBarProps {
  children?: React.ReactNode;
  hasData: boolean;
} 

export default function SideBar({ children, hasData }: SideBarProps) {
  const params = useParams();

  return (
    <div
      className={`
          side-bar
          ${!hasData ? 'side-bar__no-data' : ''}
          ${params?.id ? 'side-bar__chat-page' : ''}
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
