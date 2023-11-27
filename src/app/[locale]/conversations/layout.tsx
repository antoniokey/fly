import React from 'react';

import ConversationList from '@/app/[locale]/conversations/components/ConversationList/ConversationList';
import SideBar from '@/app/components/SideBar/SideBar';

export default function ConversationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="conversations-layout common-page flex">
      <SideBar>
        <ConversationList />
      </SideBar>

      {children}
    </div>
  );
}
