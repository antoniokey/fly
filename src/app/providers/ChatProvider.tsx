'use client';

import React, { createContext, useReducer } from 'react';

import chatReducer, { initialState } from '../store/chat/chat.reducer';
import { ChatState, NewChatSelectedPayload } from '../interfaces/store/chat/chat.interfaces';
import { PageProps } from '../interfaces/common.interfaces';
import { setNewChatSelectedAction } from '../store/chat/chat.actions';

interface ChatContextType extends ChatState {
  setIsNewChatSelected: (newChatSelectedPayload: NewChatSelectedPayload) => void;
}

export const ChatContext = createContext<ChatContextType>({
  isNewChatSelected: false,
  newChatSelectedUser: undefined,
  setIsNewChatSelected: () => null,
});

export default function ChatProvider({ children }: PageProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const setIsNewChatSelected = (newChatSelectedPayload: NewChatSelectedPayload): void =>
    dispatch(setNewChatSelectedAction(newChatSelectedPayload));

  return (
    <ChatContext.Provider value={{ ...state, setIsNewChatSelected }}>
      {children}
    </ChatContext.Provider>
  );
}
