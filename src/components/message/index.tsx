"use client";

import React, { useEffect, useState } from "react";
import cn from "@/utils/cn";

const Index = ({ message }) => {
  const setUser = async () => {
    const curr_user = await localStorage.getItem("userId");
    setCurrUser(curr_user);
  };

  useEffect(() => {
    setUser();
  }, []);

  const [curr_user, setCurrUser] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "w-full p-1 grid cursor-pointer",
      )}
    >
      <div
        className={cn(
          "max-w-[700px] w-fit min-w-[200px] bg-gray-100 px-1 rounded-sm", curr_user == message.sender && "justify-self-end"
        )}
      >
        {/* <p className="w-full text-left text-sm">{message.}</p> */}
        <p className="text-lg pl-2">{message.message}</p>
        <p className="w-full text-right text-xs">{message.created_at}</p>
      </div>
    </div>
  );
};

export default Index;
