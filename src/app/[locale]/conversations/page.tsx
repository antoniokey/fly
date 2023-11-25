import ConversationList from '@/app/[locale]/conversations/components/ConversationList/ConversationList';
import Chat from '@/app/components/Chat/Chat';
import SideBar from '@/app/components/SideBar/SideBar';

export default function ConversationsPage() {
  return (
    <div className="conversations-page common-page flex">
      <SideBar>
        <ConversationList />
      </SideBar>

      <Chat />
    </div>
  );
}
