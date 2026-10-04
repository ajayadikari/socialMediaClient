"use client";

import React, { useContext, useRef, useEffect } from "react";
import ChatArea from "../chatArea";
import SyllabusArea from "./syllabusArea";
import { ClubContext } from "@/context/club";
import { toast } from "react-toastify";

const Index = () => {
  const ClubState = useContext(ClubContext);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (
      ClubState?.selectedClubName === "" ||
      ClubState?.selectedClubName === null
    )
      return;

    const club_name = ClubState?.selectedClubName.replaceAll(" ", "-");
    const socket = new WebSocket(`ws://localhost:8000/club-chat/${club_name}/`);
    ws.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
        toast.success("Message received");
      } catch (err) {
        console.warn("Non-JSON message:", event.data);
        console.log(err);
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
  }, [ClubState?.selectedClubName]);

  return (
    <div className="h-[calc(100vh-58px)] overflow-y-auto">
      {ClubState?.selectedClubId === null ? (
        <p>select a club</p>
      ) : (
        <>
          {/* leaving space for the header of the discussion tab */}
          <div className="h-[calc(100%-56px)] overflow-y-auto sticky top-0">
            <SyllabusArea />
          </div>
          <div className="h-full relative">
            <ChatArea ws={ws} />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
