import { getConversation } from '@/app/actions/conversations.actions';
import Chat from '@/app/components/Chat/Chat';

export default async function ConversationPage({ params: { id } }: any) {
  const conversation = await getConversation(+id);

  return (
    <div className="conversation-page w-[70%]">
      <Chat 
        isOpen={true}
        receiver={conversation.receiver}
      />
    </div>
  );
}
