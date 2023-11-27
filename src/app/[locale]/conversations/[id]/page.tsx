import Chat from '@/app/components/Chat/Chat';

export default function ConversationPage() {
  return (
    <div className="conversation-page w-[70%]">
      <Chat isOpen={true} />
    </div>
  );
}
