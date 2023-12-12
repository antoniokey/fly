import Chat from '@/app/components/Chat/Chat';

export default async function UsersPage() {
  return (
    <div className="user-page common-page">
      <Chat isOpen={false} />
    </div>
  );
}
