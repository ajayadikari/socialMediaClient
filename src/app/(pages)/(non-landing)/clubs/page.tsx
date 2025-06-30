import React from "react";
import ClubChatArea from "@/components/clubChatArea";
import { ClubContextProvider } from "@/context/club";

const page = () => {
  return (
    <ClubContextProvider>
      <ClubChatArea />
    </ClubContextProvider>
  );
};

export default page;
