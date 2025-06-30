"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

export interface MessageInt{
  sender: number, 
  receiver: number, 
  club: number | null, 
  message: string | null, 
  image: null | string, 
  file: null | string, 
  created_at: string,
  id: number,
}

interface FriendChatInterface {
  selectedFriend: number | null;
  setSelectedFriend: Dispatch<SetStateAction<number | null>>;
  messages: MessageInt[];
  setMessages: Dispatch<SetStateAction<MessageInt[]>>;
  receiverCn: string | null;
  setReceiverCn: React.Dispatch<SetStateAction<string | null>>
}

export const FriendChatContext = createContext<FriendChatInterface | null>(null);

export const FriendChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageInt[]>([]);
  const [receiverCn, setReceiverCn] = useState<string | null>(null)


  return (
    <FriendChatContext.Provider
      value={{ selectedFriend, setSelectedFriend, messages, setMessages, receiverCn, setReceiverCn}}
    >
      {children}
    </FriendChatContext.Provider>
  );
};
