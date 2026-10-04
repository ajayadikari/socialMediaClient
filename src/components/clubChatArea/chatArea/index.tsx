"use client";

import React, { useState, useContext, useEffect } from "react";
import MessageArea from "./messagesArea";
import ChatAreaOptions from "./chatAreaOptions";
import useCreateAxiosInstance from "@/utils/axiosInstance";
import { ClubContext, ClubContextInt, ChatInt } from "@/context/club";
import { toast } from "react-toastify";

const Index = ({ ws }) => {
  const [message, setMessage] = useState<string>("");

  const axiosInstance = useCreateAxiosInstance();
  const clubState = useContext<ClubContextInt | null>(ClubContext);
  const [currUserId, setCurrUserId] = useState<string | number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCurrUserId(userId);
  }, []);

  const sendMsg = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: message }));
    } else {
      toast.error("WebSocket is not open");
    }
  };

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    try {
      sendMsg();
    } catch (e) {
      toast.error("error in sending data in websocket");
      console.log(e);
    }

    const currentMessage = e.currentTarget.value.trim();
    console.log(currentMessage);

    if (!currentMessage) return;

    const clubId = clubState?.selectedClubId;

    if (!clubId) return;

    const formData = new FormData();
    formData.append("clubId", String(clubId));
    formData.append("message", currentMessage);

    try {
      const res = await axiosInstance.post(
        "api/message/create-message/",
        formData,
      );

      if (res.status >= 200 && res.status < 300 && res.data.success) {
        const msgObj: ChatInt = {
          message: currentMessage,
          sender: currUserId,
          created_at: Date.now() + "",
          club: clubState.selectedClubId,
          file: null,
          image: null,
        };
        if (clubState.chat != null && clubState.chat?.length > 0) {
          clubState.setChat((prev) => [...(prev ?? []), msgObj]);
        } else clubState.setChat([msgObj]);
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="h-[55px] w-full z-2 px-3 flex justify-between items-center shadow-sm rounded-sm">
        <h1 className="text-4xl">Discussion</h1>
        <ChatAreaOptions />
      </div>

      <div className="h-[calc(100%-56px-60px)] w-full">
        <MessageArea />
      </div>

      <div className="flex border-t">
        <div className="w-[100px] h-[60px] border-r">other options</div>

        <input
          onKeyDown={sendMessage}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          className="h-[60px] w-full outline-0 px-3"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default Index;
