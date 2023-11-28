import { getUser } from '@/app/actions/users.actions';
import Chat from '@/app/components/Chat/Chat';

export default async function UserPage({ params: { id } }: any) {
  const user = await getUser(+id);

  const conversation = { receiver: user };

  return (
    <div className="user-page w-[70%]">
      <Chat
        isOpen={true}
        isNewChat={true}
        conversation={conversation}
      />
    </div>
  );
}