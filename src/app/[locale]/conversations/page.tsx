import Chat from '@/app/components/Chat/Chat';

export default function ConversationsPage() {
  return (
    <div className="conversations-page w-[70%]">
      <Chat isOpen={false} />
    </div>
  );
}
