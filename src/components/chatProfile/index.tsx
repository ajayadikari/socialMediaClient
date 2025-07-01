import React, { useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { FriendChatContext } from "@/context/friendsChat";
import { Profile } from "../chatList";
// import axiosInstance from "@/utils/axiosInstance";
import useCreateAxiosInstance from "@/utils/axiosInstance";

const Index = ({ profile }: { profile: Profile }) => {
  const FriendChatState = useContext(FriendChatContext);
  const axiosInstance = useCreateAxiosInstance()
  
  const fetchCn = async () => {
    const res = await axiosInstance(
      `/api/account/get-channel-name/${FriendChatState?.selectedFriend}`
    );
    const receiverCn = res.data.channel_name[0][0];
    FriendChatState?.setReceiverCn(receiverCn);
  };
  useEffect(() => {
    fetchCn();
  }, [FriendChatState?.selectedFriend]);

  return (
    <div
      onClick={() => FriendChatState?.setSelectedFriend(profile.id)}
      className="w-full flex gap-2 justify-stretch items-center py-[2px] px-1 border-b-[2px] border-gray-100 hover:bg-gray-50"
    >
      <div className="h-12 w-15 rounded-md border relative overflow-hidden">
        <Image
          src={profile.img}
          fill
          alt="profile pic"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="text-lg">{profile.username}</p>
        <p>last message here</p>
      </div>
    </div>
  );
};

export default Index;
