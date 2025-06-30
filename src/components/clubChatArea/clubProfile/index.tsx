import React, { useContext, useEffect } from "react";
import { Club } from "../clubList";
import Image from "next/image";
import { ClubContext } from "@/context/club";

const Index = ({ profile }: { profile: Club }) => {
  const ClubState = useContext(ClubContext);
  useEffect(() => {}, [ClubState?.selectedClubId]);
  return (
    <div
      onClick={() => {
        ClubState?.setSelectedClubId(profile.id);
        ClubState?.setSelectedClubName(profile.name);
      }}
      className="w-full flex gap-0.5 items-center p-1 duration-150 hover:shadow-sm cursor-pointer"
    >
      <div className="h-14 w-14 rounded-md bg-gray-100 overflow-hidden relative">
        <Image
          src={profile.image}
          fill
          objectFit="cover"
          objectPosition="center"
          alt="club pic"
        ></Image>
      </div>
      <div className="bg-gray-50 w-full rounded p-1">
        <p className="text-lg">{profile.name}</p>
        <p className="text-sm">
          {profile.description.length > 0
            ? profile.description
            : "no description"}
        </p>
      </div>
    </div>
  );
};

export default Index;
