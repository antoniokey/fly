import { User } from '../../users.interfaces';

export interface ChatState {
  isNewChatSelected: boolean;
  newChatSelectedUser?: User;
}

export interface NewChatSelectedPayload extends ChatState {}
