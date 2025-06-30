"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import ChatList from "../chatList";
import MessageArea from "../messagesArea";
import { toast } from "react-toastify";
import { MessageInt } from "@/context/friendsChat";
import { FriendChatContext } from "@/context/friendsChat";

const Index = () => {
  const ws = useRef(null);
  const [myId, setMyId] = useState<string | null>(null);
  const FriendChatState = useContext(FriendChatContext);

  const pushMsg = (msg) => {
    const now = new Date();
    const data: MessageInt = {
      sender: FriendChatState?.selectedFriend,
      receiver: +myId,
      message: msg,
      created_at: now + "",
      club: null,
      image: null,
      file: null,
      id: -1,
    };
    FriendChatState?.setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setMyId(id);
  }, []);

  useEffect(() => {
    if (!myId) return;
    const socket = new WebSocket(`ws://localhost:8000/personal-chat/${myId}/`);
    ws.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      toast.success("conneted");
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log(msg);
        console.log(FriendChatState?.selectedFriend);
        pushMsg(msg);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = (event) => {
      console.log("WebSocket disconnected", event);
    };

    return () => {
      socket.close();
    };
  }, [myId]);

  return (
    <div className="grid grid-cols-5 h-full border-t-2 border-gray-200">
      <div className="col-start-1 col-end-2 overflow-hidden scroll-smooth border-r-2 border-gray-200">
        <p className="p-2 text-2xl font-bold tracking-wide">Friends</p>
        <ChatList />
      </div>
      <div className="col-start-2 col-end-6">
        <MessageArea ws={ws} />
      </div>
    </div>
  );
};

export default Index;
