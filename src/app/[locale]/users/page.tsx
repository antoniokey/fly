import SideBar from '@/app/components/SideBar/SideBar';
import UserList from '@/app/[locale]/users/components/UserList/UserList';
import Chat from '@/app/components/Chat/Chat';
import { getUsers } from '@/app/actions/users.actions';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="user-page common-page flex">
      <SideBar>
        <UserList users={users} />
      </SideBar>

      <Chat />
    </div>
  );
}
