import { NewChatSelectedPayload } from '@/app/interfaces/store/chat/chat.interfaces';

import { SET_NEW_CHAT_SELECTED } from './chat.types';

export const setNewChatSelectedAction = (payload: NewChatSelectedPayload) =>({
  payload,
  type: SET_NEW_CHAT_SELECTED,
});
