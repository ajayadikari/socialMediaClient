"use client";

import { createContext, useState, SetStateAction, ReactNode } from "react";

export interface FriendChatInteface {
  query: string;
  learner: boolean;
  selectedUser: number | null;
  setQuery: React.Dispatch<SetStateAction<string>>;
  setLearner: React.Dispatch<SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<SetStateAction<null | number>>;
  clubQuery: string;
  setClubQuery: React.Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<FriendChatInteface | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [learner, setLearner] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [clubQuery, setClubQuery] = useState<string>("");
  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        learner,
        setLearner,
        selectedUser,
        setSelectedUser,
        clubQuery,
        setClubQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
