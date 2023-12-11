import { getUser } from '@/app/actions/users.actions';
import Chat from '@/app/components/Chat/Chat';
import { PageParams } from '@/app/interfaces/common.interfaces';
import { Conversation } from '@/app/interfaces/conversations.interfaces';

export default async function UserPage({ params: { id } }: { params: PageParams }) {
  const user = await getUser(+id);

  const conversation: Pick<Conversation, 'receiver'> = { receiver: user };

  return (
    <div className="user-page w-[70%]">
      <Chat
        isOpen={true}
        isNewChat={true}
        conversation={conversation as Conversation}
      />
    </div>
  );
}
