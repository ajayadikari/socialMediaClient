"use client";

import React, { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClubProfile from "../clubProfile";
import { ClubContext } from "@/context/club";
// import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import useCreateAxiosInstance from "@/utils/axiosInstance";

export interface Club {
  name: string;
  image: string;
  description: string;
  creator: number;
  id: number;
  members: number[];
  admins: number[];
}

const Index = () => {
  const ClubState = useContext(ClubContext);
  const [clubs, setClubs] = useState<Club[]>();
  const axiosInstance = useCreateAxiosInstance()
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance({
          method: "get",
          url: "/api/club/get-user-clubs/",
        });
        if (!res.data["success"]) toast.error("unable to fetch clubs");
        setClubs(res.data.clubs);
      } catch (err) {
        toast.error("something went wrong");
        console.log(err);
      }
    };

    fetch();
  }, []);
  return (
    <>
      <div className="flex gap-2 items-center p-1 border-r-2 overflow-y-auto relative">
        <input
          type="text"
          className="w-full outline-0 bg-gray-100 h-10 p-3 border-2 border-gray-200 rounded"
          placeholder="search club..."
        />
        <Plus
          onClick={() => ClubState?.setShowForm(!ClubState?.showForm)}
          className="text-5xl border rounded-full cursor-pointer"
        />
      </div>
      <p className="text-xl">Your Clubs</p>
      <div className="w-full py-3">
        {clubs && clubs?.length > 0 ? (
          clubs.map((club, i) => {
            return <ClubProfile profile={club} key={i} />;
          })
        ) : (
          <p>join any club</p>
        )}
      </div>
    </>
  );
};

export default Index;
