import React from "react";

const index = ({ message }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="min-w-[200px] max-w-fit bg-white rounded p-1">
        <p className="text-sm text-gray-400">name</p>
        <p className="text-md">message</p>
        <p className="text-[10px] text-end text-red-500">data</p>
      </div>
    </div>
  );
};

export default index;
