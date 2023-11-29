import { getConversation } from '@/app/actions/conversations.actions';
import Chat from '@/app/components/Chat/Chat';
import { PageParamsProps } from '@/app/interfaces/common.interfaces';

export default async function ConversationPage({ params: { id } }: PageParamsProps) {
  const conversation = await getConversation(+id);

  return (
    <div className="conversation-page w-[70%]">
      <Chat 
        isOpen={true}
        conversation={conversation}
      />
    </div>
  );
}
