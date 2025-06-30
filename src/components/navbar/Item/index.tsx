"use client";

import React, { SetStateAction } from "react";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import cn from "@/utils/cn";

const Index = ({
  icon: Icon,
  name,
  link,
  id,
  active,
  setActive,
}: {
  icon: LucideIcon;
  name: string;
  link: string;
  id: number;
  active: number;
  setActive: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Link
      onClick={() => setActive(id)}
      href={link}
      title={name}
      className="w-7 h-7 flex justify-center items-center"
    >
      <Icon
        className={cn(
          "w-full h-ful duration-100",
          active == id ? "text-red-400" : "text-gray-500 hover:text-gray-800"
        )}
      />
    </Link>
  );
};

export default Index;
