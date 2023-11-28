import React from 'react';

import SideBar from '@/app/components/SideBar/SideBar';
import { getUsers } from '@/app/actions/users.actions';
import { getConversations } from '@/app/actions/conversations.actions';

import UserList from './components/UserList/UserList';

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <div className="users-layout common-page flex">
      <SideBar>
        <UserList
          users={users}
          conversations={conversations}
        />
      </SideBar>

      {children}
    </div>
  );
}