import { getConversation } from '@/app/actions/conversations.actions';
import Chat from '@/app/components/Chat/Chat';
import { PageParams } from '@/app/interfaces/common.interfaces';

export default async function ConversationPage({ params: { id } }: { params: PageParams }) {
  const conversation = await getConversation(+id);

  return (
    <div className="conversation-page common-page common-chat-page">
      <Chat 
        isOpen={true}
        conversation={conversation}
      />
    </div>
  );
}
