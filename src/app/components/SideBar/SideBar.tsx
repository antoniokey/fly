import React from 'react';

import './SideBar.scss';

import Menu from './Menu/Menu';

export default function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="side-bar">
      <Menu />

      <div className="side-bar__data">
        {children}
      </div>
    </div>
  );
}
