"use client";

import React, { useState, useContext } from "react";
import { FriendChatContext } from "@/context/friendsChat";
// import axiosInstance from "@/utils/axiosInstance";
import useCreateAxiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { MessageInt } from "@/context/friendsChat";
import { Paperclip, Ellipsis, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Index = ({ ws }) => {
  const MessageState = useContext(FriendChatContext);
  const [message, setMessage] = useState<string>("");
  const FriendChatState = useContext(FriendChatContext);
  const userId = localStorage.getItem("userId");
  const [file, setFile] = useState<null | File>(null);
  const axiosInstance = useCreateAxiosInstance();
  const [filePreview, setFilePreview] = useState<string>();

  const pushMsg = async () => {
    if (!message.trim()) return;
    if (
      userId === null ||
      MessageState?.selectedFriend === null ||
      MessageState?.selectedFriend === undefined
    ) {
      toast.error("something went wrong");
      return;
    }
    const now = new Date();
    const data: MessageInt = {
      sender: +userId,
      receiver: MessageState?.selectedFriend,
      message: message,
      created_at: now + "",
      club: null,
      image: null,
      file: null,
      id: -1,
    };
    MessageState?.setMessages((prev) => [...prev, data]);
    const msg = {
      receiverId: MessageState?.selectedFriend,
      message: message,
    };
    try {
      const formData = new FormData();
      formData.append("message", msg.message);
      if (file) formData.append("file", file);
      formData.append("receiverId", MessageState?.selectedFriend);
      formData.append("sender", userId);

      const res = await axiosInstance({
        method: "post",
        url: "api/message/create-message/",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      toast.error("Failed to save message");
      console.log(error);
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
      <div className="h-[50px] w-full flex border-t-2 border-gray-200 relative">
        {file && (
          <div className=" top-[-220px] left-[10px] p-2 bg-gray-200 absolute rounded-lg">
            <img
              src={filePreview}
              className="w-[300px] h-[200px] rounded-lg"
            ></img>
            <div className="-top-3 -right-2 absolute ">
              <X
                onClick={() => {
                  setFile(null);
                  setFilePreview("");
                  document.getElementById("fileInput").value = "";
                }}
                className="text-black bg-gray-300 rounded-full cursor-pointer"
              />
            </div>
          </div>
        )}
        <div className="w-[100px] h-full border-r-2 border-gray-200 flex justify-between items-center">
          <Popover>
            <PopoverTrigger className="hover:bg-gray-100 w-full h-full flex justify-center items-center duration-100 cursor-pointer">
              <Ellipsis />
            </PopoverTrigger>
            <PopoverContent>available soon</PopoverContent>
          </Popover>

          <div className="hover:bg-gray-100 w-full h-full flex justify-center items-center duration-100 cursor-pointer overflow-hidden relative">
            {file && (
              <p className="absolute text-red-700 text-4xl font-bold right-2">
                .
              </p>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  setFile(file);
                  setFilePreview(URL.createObjectURL(file));
                }
              }}
              className="absolute top-1/2 left-0 translate-y-[-50%] h-[100px] w-[100px] cursor-pointer z-2"
              name=""
            />
            <Paperclip className="cursor-pointer z-1" />
          </div>
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pushMsg();
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
