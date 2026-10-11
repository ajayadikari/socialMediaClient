import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex h-[100% - 150px]">
      <form className=" flex flex-col w-[700px] min-w-[300px] self-center flex-1 border-2 px-[10px] py-[5px]">
        <div className="flex items-center gap-[5px] h-fit">
          <div className="w-[50px] h-[50px] rounded-full bg-white relative">
            <Image fill src="/profile.jpg" alt="pic" className="object-cover" />
          </div>
          <p>@username</p>
        </div>
        <input
          className="outline-none  h-[60px] text-[2rem]"
          type="text"
          name="title"
          id=""
          placeholder="Type title..."
        />
        <textarea
          className="outline-none"
          rows={10}
          name="description"
          id=""
          placeholder="Type description..."
        />

        <div className="relative h-[350px] w-full cursor-pointer">
          <Image fill src="/profile.jpg" alt="Preview" />

          <input
            type="file"
            name="image"
            id="posting"
            accept="image/*"
            className="hidden"
          />

          <label
            htmlFor="posting"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               z-10 flex h-[100px] w-[100px] items-center justify-center
               rounded-full border bg-gray-500/70 cursor-pointer"
          >
            Choose image
          </label>
        </div>

        <input
          type="file"
          className="w-[100px] h-[50px] bg-gray-200"
          name="files"
          id=""
        />
      </form>
    </div>
  );
};

export default page;
