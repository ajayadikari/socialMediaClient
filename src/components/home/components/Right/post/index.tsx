"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Index = ({
  id,
  showFullDescSet,
  setShowFullDescSet,
  post,
}: {
  id: number;
  showFullDescSet: Set<number>;
  setShowFullDescSet;
  post;
}) => {
  useEffect(() => {}, [setShowFullDescSet, showFullDescSet]);

  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quod similique ullam in quasi, tenetur quaerat! Suscipit accusamus nonpariatur dolores, laboriosam animi beatae illo quae quis, nostrum eosnam at. Dignissimos sapiente autem tenetur quod delectus voluptas tempore excepturi temporibus id quia. Fuga nemo perspiciatis itaque odio incidunt sequi quod rerum modi id, suscipit mollitia quia quibusdam beatae, doloremque perferendis corrupti inventore, explicabo quidem. Blanditiis iusto, officiis, architecto eum quidem culpa doloremque sapiente, obcaecati temporibus minima harum quod suscipit mollitia ut. Cupiditate laboriosam suscipit alias, reiciendis blanditiis numquam error nemo dolor, ut animi fuga nostrum? Quod soluta quasi ea!";
  return (
    <div className="max-w-[600px] min-w-[350px] h-fit self-center flex flex-col p-[4px] border-2 border-gray-200 rounded mb-[20px]">
      <div className="relative h-[450px] mb-[10px]">
        <Image
          src={"/assests/under-construction.svg"}
          fill
          alt="error loading post image"
          className="object-contain"
        ></Image>
      </div>
      <div className="w-full h-fit bg-white mb-[10px] cursor-pointer">
        <div
          className="text-[14px] text-black"
          onClick={() =>
            setShowFullDescSet((prev) => {
              const set: Set<number> = new Set(prev);
              if (set.has(id)) set.delete(id);
              else set.add(id);
              return set;
            })
          }
        >
          {showFullDescSet.has(id) ? (
            desc
          ) : (
            <div>{desc.substring(0, 100)}...</div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className=""></div>
        <div className="border-2 border-gray-200 h-full w-fit flex text-[16px] cursor-pointer gap-1.5">
          <div>likes</div>
          <div>comments</div>
          <div>share</div>
          <div>bookmark</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
