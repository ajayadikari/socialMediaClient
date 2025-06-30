"use client";

import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import axiosInstance from "@/utils/axiosInstance";
import { ClubContext } from "@/context/club";
import { ProfileInt } from ".";
import { toast } from "react-toastify";

const RequestList = () => {
  const clubState = useContext(ClubContext);
  const [requestList, setRequestList] = useState<ProfileInt[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance({
          method: "get",
          url: `api/club/get-joining-requests/${clubState?.selectedClubId}`,
        });
        setRequestList(res.data.requests);
        if(!res.data.success) toast.error(res.data.message)
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
      {requestList?.length === 0 ? (
        <p>no requests</p>
      ) : (
        <>
          {requestList?.map((req, i) => {
            return <Profile profile={req} requestTab={true} key={i}></Profile>;
          })}
        </>
      )}
    </div>
  );
};

export default RequestList;
