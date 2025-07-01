import React from "react";
import Image from "next/image";
import { PersonalDetailsInterface } from "./learnerDetailsGrid";
// import axiosInstance from "@/utils/axiosInstance";
import useCreateAxiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const LearnerDetails = ({
  data,
}: {
  data: PersonalDetailsInterface | null | undefined;
}) => {
  const axiosInstance = useCreateAxiosInstance()
  const sendFriendReq = async () => {
    try {
      const res = await axiosInstance({
        method: "POST",
        url: `api/friend-request/send-friend-request/${data?.id}`,
      });
      if (res.data.success) toast.success("request sent");
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("unable to send request");
      console.log(err);
    }
    console.log(data)
  };
  return (
    <div className="h-full overflow-y-auto border-r">
      {data ? (
        <>
          <p className="text-center text-xl">Personal Details</p>
          <div className="w-full h-[250px] max-w-[300px] relative mx-auto bg-gray-100">
            {data?.profile_pic && (
              <Image
                src={data.profile_pic}
                fill
                alt="profile pic"
                objectFit="contain"
                objectPosition="center"
              ></Image>
            )}
          </div>
          {data.username && (
            <p className="text-center text-xl mb-3">{data.username}</p>
          )}
          {data.first_name && (
            <p className="text-center">
              {data?.first_name ? data?.first_name : "no firstname"}
            </p>
          )}
          {data.last_name && (
            <p className="text-center">
              {data?.last_name ? data?.last_name : "no lastname"}
            </p>
          )}
          {data && (
            <button
              onClick={sendFriendReq}
              className="mx-auto w-full border mt-2 bg-gray-100 text-black text-xl"
            >
              Send Request
            </button>
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LearnerDetails;
