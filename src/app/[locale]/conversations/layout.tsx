import React from 'react';

import ConversationList from '@/app/[locale]/conversations/components/ConversationList/ConversationList';
import SideBar from '@/app/components/SideBar/SideBar';
import { getConversations } from '@/app/actions/conversations.actions';

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations();

  return (
    <div className="conversations-layout common-page flex">
      <SideBar>
        <ConversationList conversations={conversations} />
      </SideBar>

      {children}
    </div>
  );
}
