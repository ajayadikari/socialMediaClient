import React from "react";
import { Check } from "lucide-react";
import { ProfileInt } from "./index";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const Profile = ({ profile }: { profile: ProfileInt }) => {
  const acceptRequest = async () => {
    const res = await axiosInstance({
      method: "post",
      url: `api/friend-request/accept-friend-request/${profile.id}/`
    });
    if (res.data.success === true) {
      toast.success("req accepted, remove toast, remove the req");
    } else {
      toast.error(res.data.message);
    }
    console.log(res);
  };
  return (
    <div className="w-full border p-1 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="relative w-10 h-10 bg-gray-100 border">
          <Image
            src={profile.profile_pic}
            fill
            objectFit="cover"
            objectPosition="center"
            alt="profile pic"
          ></Image>
        </div>
        <p>{profile.username}</p>
      </div>
      <Check onClick={acceptRequest} />
    </div>
  );
};

export default Profile;
