import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const Index = () => {
  return (
    <div className="grid grid-cols-6 border-t-2 border-gray-200 h-[calc(100%)]">
      <div className="col-start-1 col-end-1 border-r-2 border-gray-200">
        <Left />
      </div>
      <div className="col-start-2 col-end-7 h-full w-full overflow-y-hidden">
        <Right />
      </div>
    </div>
  );
};

export default Index;
