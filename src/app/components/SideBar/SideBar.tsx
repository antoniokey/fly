import './SideBar.scss';

import { PageProps } from '@/app/interfaces/common.interfaces';

import Menu from './Menu/Menu';

export default function SideBar({ children }: PageProps) {
  return (
    <div className="side-bar">
      <Menu />

      <div className="side-bar__data">
        {children}
      </div>
    </div>
  );
}
