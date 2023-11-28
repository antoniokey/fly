import { getUser } from '@/app/actions/users.actions';
import Chat from '@/app/components/Chat/Chat';

export default async function UserPage({ params: { id } }: any) {
  const user = await getUser(+id);

  return (
    <div className="user-page w-[70%]">
      <Chat
        isOpen={true}
        isNewChat={true}
        receiver={user}
      />
    </div>
  );
}
