import ConversationList from '@/app/[locale]/conversations/components/ConversationList/ConversationList';
import SideBar from '@/app/components/SideBar/SideBar';
import { getConversations } from '@/app/actions/conversations.actions';
import { PageProps } from '@/app/interfaces/common.interfaces';
import { getUsers } from '@/app/actions/users.actions';

export default async function ConversationsLayout({ children }: PageProps) {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <div className="conversations-layout common-layout">
      <SideBar hasData={true}>
        <ConversationList
          conversations={conversations}
          users={users}
        />
      </SideBar>

      {children}
    </div>
  );
}
