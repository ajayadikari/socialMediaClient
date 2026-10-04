"use client";

import { ReactNode, SetStateAction, useState, createContext } from "react";

export interface ChatInt {
  message: string;
  sender: number | string | null;
  image: File | null;
  file: File | null;
  created_at: Date;
  club: number | string | null;
}

export interface ClubContextInt {
  showForm: boolean;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  selectedClubId: number | null;
  setSelectedClubId: React.Dispatch<SetStateAction<number | null>>;
  selectedClubName: string;
  setSelectedClubName: React.Dispatch<SetStateAction<string>>;
  chat: ChatInt[] | null;
  setChat: React.Dispatch<SetStateAction<ChatInt[] | null>>;
}

export const ClubContext = createContext<ClubContextInt | null>(null);

export const ClubContextProvider = ({ children }: { children: ReactNode }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);
  const [selectedClubName, setSelectedClubName] = useState<string>("");
  const [chat, setChat] = useState<ChatInt[] | null>(null);
  return (
    <ClubContext.Provider
      value={{
        showForm,
        setShowForm,
        selectedClubId,
        setSelectedClubId,
        selectedClubName,
        setSelectedClubName,
        chat,
        setChat,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
