import Chat from '@/app/components/Chat/Chat';

export default async function UsersPage() {
  return (
    <div className="user-page w-[70%]">
      <Chat isOpen={false} />
    </div>
  );
}
