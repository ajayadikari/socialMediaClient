import React from "react";
import Tabs from "@/MyComponents/Tabs";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="grid grid-cols-2 w-full">
        <div className="relative bg-amber-200">
          <Image
            src={"/assests/landing.png"}
            fill
            objectFit="contain"
            objectPosition="center"
            alt="landing-page-image"
          />
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default page;
