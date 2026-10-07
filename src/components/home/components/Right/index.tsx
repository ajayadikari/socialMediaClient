"use client";

import React, { useState } from "react";
import Post from "./post";

const Index = () => {
  const [showFullDescSet, setShowFullDescSet] = useState(new Set());
  const [posts, setPost] = useState([]);

  return (
    <div className=" w-fit h-full text-5xl text-gray-400 pt-[20px] overflow-y-hidden mx-auto ">
      <div className="h-full overflow-y-auto">
        {posts.map((post, id) => {
          return (
            <Post
              key={id}
              id={id}
              showFullDesc={showFullDescSet}
              setShowFullDescSet={setShowFullDescSet}
              post
            />
          );
        })}
        <Post
          key={1}
          id={1}
          showFullDescSet={showFullDescSet}
          setShowFullDescSet={setShowFullDescSet}
        />
        <Post
          key={1}
          id={1}
          showFullDescSet={showFullDescSet}
          setShowFullDescSet={setShowFullDescSet}
        />
        <Post
          key={1}
          id={1}
          showFullDescSet={showFullDescSet}
          setShowFullDescSet={setShowFullDescSet}
        />
      </div>
    </div>
  );
};

export default Index;
