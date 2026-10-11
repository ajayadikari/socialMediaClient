import React from "react";
import Left from "@/components/home/components/Left";

const layout = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <Left />
      <div className="w-[calc(100% - 300px)]">{children}</div>
    </div>
  );
};

export default layout;
