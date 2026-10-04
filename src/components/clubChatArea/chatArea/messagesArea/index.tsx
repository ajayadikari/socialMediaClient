import React, { useContext, useEffect } from "react";
import Message from "./message";
import { ClubContext, ClubContextInt } from "@/context/club";
import useAxiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const Index = () => {
  const clubState = useContext<ClubContextInt | null>(ClubContext);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetch = async () => {
      const clubId: number | string | null = clubState?.selectedClubId;
      if (!clubId) {
        toast.error("please select the club, clubId is null");
        return;
      }
      const res = await axiosInstance.get(
        `api/message/get-conversation/${clubState?.selectedClubId}`,
        {
          params: {
            group: true,
          },
        },
      );
      if (res.status >= 200 && res.status <= 204 && res.data.success)
        clubState?.setChat(res.data.messages);
      else {
        toast.error("unable to fetch chat");
        console.log(res.data);
      }
    };
    fetch();
  }, [clubState?.selectedClubId]);
  return (
    <div className="bg-gray-50 h-full p-2">
      {clubState?.chat ? (
        <>
          {clubState.chat?.length > 0 &&
            clubState.chat?.map((message, i) => (
              <Message message={message} key={i}></Message>
            ))}
        </>
      ) : (
        <p>do you guys use telepathy? no chat yet</p>
      )}
    </div>
  );
};

export default Index;
