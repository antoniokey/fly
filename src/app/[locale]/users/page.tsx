import SideBar from '@/app/components/SideBar/SideBar';
import UserList from '@/app/[locale]/users/components/UserList/UserList';
import Chat from '@/app/components/Chat/Chat';

export default function UserPage() {
  return (
    <div className="user-page common-page flex">
      <SideBar>
        <UserList />
      </SideBar>

      <Chat />
    </div>
  );
}
