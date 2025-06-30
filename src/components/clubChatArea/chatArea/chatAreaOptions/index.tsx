import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ClubOptions from "../clubOptions";

const index = () => {
    
  return (
    <Popover>
      <PopoverTrigger className="p-0.5 active:bg-gray-100 duration-300 rounded-full cursor-pointer">
        <EllipsisVertical className="" />
      </PopoverTrigger>
      <PopoverContent>
        <ClubOptions />
      </PopoverContent>
    </Popover>
  );
};

export default index;
