import React from "react";
import Left from "@/components/home/components/Left";

const layout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Left />
      <div>{children}</div>
    </div>
  );
};

export default layout;
