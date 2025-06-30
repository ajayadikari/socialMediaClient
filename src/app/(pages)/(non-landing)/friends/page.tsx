"use client";

import React from "react";
import ChatArea from "@/components/chatArea";
import { FriendChatProvider } from "@/context/friendsChat";


const Index = () => {
  

  return (
    <FriendChatProvider>
      <ChatArea />
    </FriendChatProvider>
  );
};

export default Index;
