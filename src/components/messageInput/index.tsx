"use client";

import React, { useState, useContext, Ref } from "react";
import { FriendChatContext } from "@/context/friendsChat";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { MessageInt } from "@/context/friendsChat";

const Index = ({ ws }) => {
  const MessageState = useContext(FriendChatContext);
  const [message, setMessage] = useState<string>("");
  const FriendChatState = useContext(FriendChatContext);
  const userId = localStorage.getItem("userId");
  

  const pushMsg = async () => {
    if (!message.trim()) return;
    if(userId === null || MessageState?.selectedFriend === null || MessageState?.selectedFriend === undefined) {
      toast.error("something went wrong")
      return
    }
    const now = new Date()
    const data:MessageInt = {
      "sender": +userId, 
      "receiver": MessageState?.selectedFriend, 
      "message": message, 
      "created_at": now+'', 
      'club': null, 
      image: null, 
      file: null, 
      id: -1,
    }
    MessageState?.setMessages((prev) => [ ...prev, data]);
    const msg = {
      receiverId: MessageState?.selectedFriend,
      message: message,
    };
    try {
      await axiosInstance.post("api/message/create-message/", msg);
    } catch (error) {
      toast.error("Failed to save message");
      console.log(error)
    }
  };


  const sendMessage = () => {
    if (!message.trim()) return;
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ message, cn: FriendChatState?.receiverCn })
      );
      setMessage("");
      pushMsg();
    } else {
      toast.error("WebSocket is not connected");
    }
  };

  return (
    MessageState?.selectedFriend && (
      <div className="h-[50px] w-full flex border-t-2 border-gray-200">
        <div className="w-[100px] h-full border-r-2 border-gray-200">
          other options
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pushMsg()
              sendMessage();
            }
          }}
          value={message}
          type="text"
          className="h-full w-full p-2 outline-none"
          placeholder="enter message"
        />
      </div>
    )
  );
};

export default Index;
