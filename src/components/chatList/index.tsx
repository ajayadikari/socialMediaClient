"use client";

import React, { useEffect, useState } from "react";
import ChatProfile from "@/components/chatProfile";
import Image from "next/image";
// import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import useCreateAxiosInstance from "@/utils/axiosInstance";

export interface Profile {
  name: string;
  img: string;
  id: number;
  username: string;
}

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const axiosInstance = useCreateAxiosInstance()

  const getFriends = async () => {
    try {
      const res = await axiosInstance({
        method: "get",
        url: "api/account/get-friends",
      });
      setProfiles(res.data.friends);
    } catch (err) {
      toast.error("error fetching friends");
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="pt-2 min-h-[80vh] max-h-[80vh] overflow-y-auto border-t-2 border-b-2 border-gray-200 overflow-hidden relative scroll-smooth">
      <p className="w-full bg-red-200">search friend(coming soon)</p>
      {profiles.length > 0 ? (
        profiles.map((profile, i) => {
          return <ChatProfile profile={profile} key={i} />;
        })
      ) : (
        <div>
          <p>No friends</p>
          <Image
            src={"/assests/alone.svg"}
            fill
            className="object-contain"
            alt="image"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default Index;
