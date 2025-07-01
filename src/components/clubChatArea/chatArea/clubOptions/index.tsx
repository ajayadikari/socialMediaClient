"use client";

import React, { useEffect, useContext, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClubContext } from "@/context/club";
// import axiosInstance from "@/utils/axiosInstance";
import Profile from "./Profile";
import RequestList from "./RequestList";
import useCreateAxiosInstance from "@/utils/axiosInstance";

export interface ProfileInt {
  id: number;
  username: string;
  profile_pic: string | null;
  requestId: null | number;
}

const Index = () => {
  const clubState = useContext(ClubContext);
  const axiosInstance = useCreateAxiosInstance()
  const [clubMembers, setClubMembers] = useState<ProfileInt[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance({
        method: "get",
        url: `api/club/get-club-members/${clubState?.selectedClubId}`,
      });
      setClubMembers(res.data.members);
    };
    fetch();
  }, []);

  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Members</TabsTrigger>
        <TabsTrigger value="password">Requests</TabsTrigger>
      </TabsList>
      <TabsContent className="" value="account">
        <div className="max-h-[300px] overflow-y-auto">
          {clubMembers.length > 0 ? (
            <>
              {clubMembers.map((member, i) => {
                return <Profile profile={member} requestTab={false} key={i} />;
              })}
            </>
          ) : (
            <p>no club members</p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="password">
        <RequestList />
      </TabsContent>
    </Tabs>
  );
};

export default Index;
