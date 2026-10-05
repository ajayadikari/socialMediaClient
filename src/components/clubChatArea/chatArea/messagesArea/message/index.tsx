"use client";

import React, { useEffect, useState } from "react";
import { ChatInt } from "@/context/club";

const Index = ({ message }: { message: ChatInt }) => {
  const [currUserId, setCurrUserId] = useState<number | string | null>(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCurrUserId(userId);
  }, [currUserId]);
  return (
    <div
      className={`w-full flex ${currUserId == message.sender ? "justify-end" : "justify-start "}`}
    >
      <div className="min-w-[200px] max-w-[50%] rounded p-1 bg-gray-100 mb-[8px] overflow-x-auto break-words whitespace-normal">
        {currUserId != message.sender && (
          <p className={`text-[10px] text-gray-400 wrap`}>name</p>
        )}
        <p className="text-md pl-1">{message.message}</p>
        <p className="text-[10px] text-end text-red-500">
          {message.created_at + ""}
        </p>
      </div>
    </div>
  );
};

export default Index;
