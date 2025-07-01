"use client";

import React, { useEffect, useRef } from "react";
import Message from "../message";
import MessageInput from "../messageInput";
// import axiosInstance from "@/utils/axiosInstance";
import { useContext } from "react";
import { FriendChatContext } from "@/context/friendsChat";
import useCreateAxiosInstance from "@/utils/axiosInstance";

const Index = ({ws}) => {
  const lastMsg = useRef<HTMLDivElement | null>(null);
  const messagesState = useContext(FriendChatContext);
  const axiosInstance = useCreateAxiosInstance()

  const fetchMessages = async () => {
    const res = await axiosInstance({
      method: "GET",
      url: `api/message/get-conversation/${messagesState?.selectedFriend}`,
    });
    messagesState?.setMessages(res.data.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [messagesState?.selectedFriend]);

  useEffect(() => {
    lastMsg.current?.scrollIntoView();
  }, [messagesState?.messages]);

  return (
    <div>
      <div className="w-full p-2 h-[calc(100vh-110px)] overflow-y-auto scroll-smooth">
        {messagesState?.selectedFriend !== null ? (
          <div>
            {messagesState?.messages?.length === 0 ? (
              <p>start messaging</p>
            ) : (
              messagesState?.messages?.map((message, i) => {
                return <Message message={message} key={i} />;
              })
            )}
          </div>
        ) : (
          <p>Select a friend to chat</p>
        )}
        <div ref={lastMsg} />
      </div>
      <MessageInput ws={ws} />
    </div>
  );
};

export default Index;
