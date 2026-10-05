"use client";

import React from "react";
import MessageArea from "./messagesArea";
import ChatAreaOptions from "./chatAreaOptions";

const Index = ({ ws }) => {
  return (
    <div className="h-full w-full">
      <div className="h-[55px] w-full bg-white px-3 flex justify-between items-center shadow-sm rounded-sm border">
        <h1 className="text-4xl">Discussion</h1>
        <ChatAreaOptions />
      </div>

      <div className="w-full h-[90%]">
        <MessageArea ws={ws} />
      </div>
    </div>
  );
};

export default Index;
