import SideBar from '@/app/components/SideBar/SideBar';
import { PageProps } from '@/app/interfaces/common.interfaces';

export default function SettingsLayout({ children }: PageProps) {
  return (
    <div className="settings-layout common-layout">
      <SideBar hasData={false}></SideBar>

      {children}
    </div>
  );
}
