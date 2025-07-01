"use client";

import React, { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./Profile";
// import axiosInstance from "@/utils/axiosInstance";
import cn from "@/utils/cn";
import useCreateAxiosInstance from "@/utils/axiosInstance";

export interface ProfileInt {
  username: string;
  id: number;
  profile_pic: string;
  email: string;
  channel_name: string;
}

const Index = () => {
  const [requestList, setRequestList] = useState<ProfileInt[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const axiosInstance = useCreateAxiosInstance()
  const SetFriendRequests = async () => {
    const res = await axiosInstance({
      method: "GET",
      url: "api/friend-request/get-friend-requests/",
    });
    setRequestList(res.data.data);
  };

  useEffect(() => {
    SetFriendRequests();
  }, []);

  return (
    <div className="h-14 flex flex-col justify-center px-1 z-1">
      <div className="self-end items-center relative">
        <Radio
          className="text-gray-500 p-[2px] bg-gray-100 rounded-full hover:text-gray-800"
          onClick={() => setShowNotifications(!showNotifications)}
        />
        <div className="absolute top-1 -left-1 text-red-600 font-bold text-lg">
          {requestList.length}
        </div>
        <Tabs
          defaultValue="account"
          className={cn(
            "w-[400px] absolute z-3 top-6 right-2 shadow-xl p-2 rounded-sm bg-gray-50 border",
            showNotifications ? "block" : "hidden"
          )}
        >
          <TabsList className="gap-1">
            <TabsTrigger value="account">Friend Requests</TabsTrigger>
            <TabsTrigger value="password">Requests sent</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {requestList.length > 0 ? (
              requestList.map((profile, i) => {
                return <Profile key={i} profile={profile} />;
              })
            ) : (
              <p>no friend requests</p>
            )}
          </TabsContent>
          <TabsContent value="password">requests sent list</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
