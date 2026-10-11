import React from "react";
import {
  BadgePlus,
  PenTool,
  Bookmark,
  ThumbsUp,
  Newspaper,
} from "lucide-react";
import Item from "./Item";

const index = () => {
  const items = [
    {
      name: "Feed",
      logo: Newspaper,
      link: "/",
    },
    {
      name: "Create post",
      logo: BadgePlus,
      link: "create-post/",
    },
    {
      name: "Edit post",
      logo: PenTool,
      link: "",
    },
    {
      name: "Liked posts",
      logo: ThumbsUp,
      link: "",
    },
    {
      name: "Saved posts",
      logo: Bookmark,
      link: "",
    },
  ];
  return (
    <div className=" border-r-[2px]">
      <div className="grid grid-cols-1 h-fit]">
        {items.map((item, i) => {
          return <Item item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default index;
