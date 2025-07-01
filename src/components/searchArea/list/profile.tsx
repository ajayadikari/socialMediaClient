import React, { useContext } from "react";
import Image from "next/image";
import { SearchContext } from "@/context/search";
// import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import useCreateAxiosInstance from "@/utils/axiosInstance";

const Profile = ({
  username,
  img,
  id,
}: {
  username: string;
  img: string;
  id: number;
}) => {
  const SearchState = useContext(SearchContext);
  const axiosInstance = useCreateAxiosInstance()
  const requestHandler = async () => {
    const url = SearchState?.learner ? `api/friend-request/send-friend-request/${SearchState?.selectedUser}/` : `api/club/send-join-request/${id}/`
    const res = await axiosInstance({
      method: "POST",
      url: url,
    });

    if (res.data.success) {
      toast.success("Request sent");
      //instead of it, we can change of state of button, like right symbol etc
      console.log(res);
    } else {
      toast.error(res.data['message']);
      console.log(res);
    }

  };
  return (
    <div
      onClick={() => SearchState?.setSelectedUser(id)}
      className="w-full flex p-1 gap-2 border-gray-300 hover:bg-gray-50 shadow-sm"
    >
      <div className="relative w-14 h-full rounded-sm overflow-hidden border bg-gray-50">
        {img && (
          <Image
            src={img}
            fill
            objectFit="cover"
            objectPosition="center"
            alt="profile-pic"
          ></Image>
        )}
      </div>
      <div className="w-full flex flex-col justify-between">
        <p>{username}</p>
        <button
          onClick={() => requestHandler()}
          className="bg-gray-200 w-full text-black cursor-pointer rounded-sm"
        >
          {
            SearchState?.learner ? "send request" : "join club"
          }
        </button>
      </div>
    </div>
  );
};

export default Profile;
