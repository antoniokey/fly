import { Message } from './messages.interfaces';
import { User } from './users.interfaces';

export interface Conversation {
  id: number;
  participant_ids: number[];
  created_at: Date;
  updated_at: Date;
  receiver: User;
  messages: Message[];
}

export type ConversationResponse = Omit<Conversation, 'receiver' | 'messages'>;
