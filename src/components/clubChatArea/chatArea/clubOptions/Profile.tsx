import React from "react";
import { ProfileInt } from ".";
import Image from "next/image";
import { EllipsisVertical, Check, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import useCreateAxiosInstance from "@/utils/axiosInstance";

const Profile = ({
  profile,
  requestTab,
}: {
  profile: ProfileInt;
  requestTab: boolean;
}) => {
  const curr_user_id = localStorage.getItem("userId");
  const axiosInstance = useCreateAxiosInstance()
  const acceptReqHandler = async () => {
    const res = await axiosInstance({
      method: "patch",
      url: `/api/club/accept-request/${profile.requestId}/`,
    });
    if (res.data.success) toast.success(res.data.message);
    else {
      toast.error(res.data.message);
      console.log(res.data.err);
    }
  };
  const rejectReqHandler = async () => {
    const res = await axiosInstance({
      method: "delete",
      url: `/api/club/reject-request/${profile.requestId}/`,
    });
    if (res.data.success) toast.success(res.data.message);
    else {
      toast.error(res.data.message);
      console.log(res.data.err);
    }
  };
  return (
    <div className="bg-gray-50 flex rounded-sm items-center gap-2 p-1">
      <div className="relative w-14 h-12 rounded-md overflow-hidden bg-gray-100">
        {profile.profile_pic && (
          <Image
            src={profile.profile_pic}
            fill
            objectFit="cover"
            objectPosition="center"
            alt="profile pic"
          ></Image>
        )}
      </div>
      <p className="text-xl">
        {curr_user_id === profile.id + "" ? "You" : profile.username}
      </p>
      <div className="cursor-pointer ml-auto">
        {requestTab ? (
          <div className="flex gap-1 justify-center items-center">
            <Check className="text-green-500" onClick={acceptReqHandler} />
            <X className="text-red-500" onClick={rejectReqHandler} />
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent>options</PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Profile;
