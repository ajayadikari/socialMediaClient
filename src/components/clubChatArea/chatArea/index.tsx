import React from "react";
import MessageArea from "./messagesArea";
import ChatAreaOptions from './chatAreaOptions'


const index = () => {
  return (
    <div className="h-full w-full ">
      <div className="h-[55px] w-full z-2 px-3 flex justify-between items-center shadow-sm rounded-sm">
        <h1 className="text-4xl">Discussion</h1>
        <ChatAreaOptions/>
      </div>
      <div className="h-[calc(100%-56px-60px)] w-full">
        <MessageArea />
      </div>
      <div className="flex border-t">
        <div className="w-[100px] h-[60px] border-r">other options</div>
        <input type="text" className="h-[60px] w-full outline-0 px-3" />
      </div>
    </div>
  );
};

export default index;
