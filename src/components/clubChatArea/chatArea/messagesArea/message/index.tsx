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
      className={`w-full flex ${currUserId == message.sender ? "justify-end" : "justify-start"} `}
    >
      <div className="min-w-[200px] max-w-fit bg-white rounded p-1">
        <p className="text-sm text-gray-400">name</p>
        <p className="text-md">{message.message}</p>
        <p className="text-[10px] text-end text-red-500">
          {message.created_at + ""}
        </p>
      </div>
    </div>
  );
};

export default Index;
