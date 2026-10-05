import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./message";
import { ClubContext, ClubContextInt, ChatInt } from "@/context/club";
import useAxiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const Index = ({ ws }) => {
  const clubState = useContext<ClubContextInt | null>(ClubContext);
  const axiosInstance = useAxiosInstance();
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>("");
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

  useEffect(() => {
    const fetch = async () => {
      const clubId: number | string | null = clubState?.selectedClubId;
      if (!clubId) {
        toast.error("please select the club, clubId is null");
        return;
      }
      const res = await axiosInstance.get(
        `api/message/get-conversation/${clubState?.selectedClubId}`,
        {
          params: {
            group: true,
          },
        },
      );
      if (res.status >= 200 && res.status <= 204 && res.data.success)
        clubState?.setChat(res.data.messages);
      else {
        toast.error("unable to fetch chat");
        console.log(res.data);
      }
    };
    fetch();
  }, [clubState?.selectedClubId]);

  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [clubState?.chat]);

  return (
    <div className="flex flex-col h-full">
      <div className={`overflow-y-auto h-full max-w-full p-2`}>
        {clubState?.chat ? (
          <div className="">
            {clubState.chat?.length > 0 &&
              clubState.chat?.map((message, i) => (
                <Message message={message} key={i}></Message>
              ))}
            <div ref={scrollToBottomRef}></div>
          </div>
        ) : (
          <p>do you guys use telepathy? no chat yet</p>
        )}
      </div>

      <div className="flex border-t h-[60px]">
        <div className="w-[100px] border-r">other options</div>

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
