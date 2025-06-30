import React from "react";
import { BadgePlus, PenTool, Bookmark, ThumbsUp } from "lucide-react";
import Item from "./Item";

const index = () => {
  const items = [
    {
      name: "Create post",
      logo: BadgePlus,
      link: "",
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
    <div className="grid grid-cols-1">
      {items.map((item, i) => {
        return <Item item={item} key={i} />;
      })}
    </div>
  );
};

export default index;
