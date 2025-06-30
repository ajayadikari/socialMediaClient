import React, from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Item {
  name: string;
  logo: LucideIcon;
  link: string;
}

const Item = ({ item }: { item: Item }) => {
  return (
    <Link
      href={item.link}
      className="h-10 border-b-1 border-gray-200 font-medium hover:bg-gray-50 duration-100 group"
    >
      <div className="grid grid-cols-4 h-full justify-items-start place-items-center">
        <p className="col-start-1 col-end-3 pl-1">{item.name}</p>
        <item.logo className="col-start-4 col-end-4 text-gray-500 size-[20px] group-hover:size-[24px] justify-self-center" />
      </div>
    </Link>
  );
};

export default Item;
