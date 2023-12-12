import Chat from '@/app/components/Chat/Chat';

export default function ConversationsPage() {
  return (
    <div className="conversations-page common-page">
      <Chat isOpen={false} />
    </div>
  );
}
