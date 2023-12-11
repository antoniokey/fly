import './SideBar.scss';

import { PageProps } from '@/app/interfaces/common.interfaces';

import Menu from './Menu/Menu';

interface SideBarProps extends PageProps {
  hasData: boolean;
} 

export default function SideBar({ children, hasData }: SideBarProps) {
  return (
    <div className={`side-bar ${!hasData ? 'side-bar__no-data' : ''}`}>
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
