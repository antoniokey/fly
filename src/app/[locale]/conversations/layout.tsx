import ConversationList from '@/app/[locale]/conversations/components/ConversationList/ConversationList';
import SideBar from '@/app/components/SideBar/SideBar';
import { getConversations } from '@/app/actions/conversations.actions';
import { PageProps } from '@/app/interfaces/common.interfaces';

export default async function ConversationsLayout({ children }: PageProps) {
  const conversations = await getConversations();

  return (
    <div className="conversations-layout common-page flex">
      <SideBar hasData={true}>
        <ConversationList conversations={conversations} />
      </SideBar>

      {children}
    </div>
  );
}
