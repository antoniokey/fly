import { ChatState, NewChatSelectedPayload } from '@/app/interfaces/store/chat/chat.interfaces';

import { Action } from '../../interfaces/store/store.interfaces';
import { SET_NEW_CHAT_SELECTED } from './chat.types';

export const initialState: ChatState = {
  isNewChatSelected: false,
  newChatSelectedUser: undefined,
};

export default (state: ChatState, action: Required<Action<NewChatSelectedPayload>>): ChatState => {
  switch (action.type) {
    case SET_NEW_CHAT_SELECTED: {
      return {
        ...state,
        ...action.payload, 
      };
    }

    default: {
      return state;
    }
  }
};
