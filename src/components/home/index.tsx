import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const index = () => {
  return (
    <div className="grid grid-cols-6 h-full border-t-2 border-gray-200">
      <div className="col-start-1 col-end-1 border-r-2 border-gray-200">
        <Left />
      </div>
      <div className="col-start-2 col-end-7 ">
        <Right />
      </div>
    </div>
  );
};

export default index;
