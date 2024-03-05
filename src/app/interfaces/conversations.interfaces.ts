import { Message } from './messages.interfaces';
import { User } from './users.interfaces';

export interface Conversation {
  id: number;
  participant_ids: number[];
  is_group: boolean;
  group_name: string;
  created_at: Date;
  updated_at: Date;
  participants: User[];
  messages: Message[];
}

export type ConversationResponse = Omit<Conversation,  'messages'>;
