"use client";

import React from "react";
import Profile from "./profile";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "@/context/search";

interface User {
  name: string;
  id: number;
  profile_pic: string;
  username: string;
}

interface Club {
  name: string;
  id: number;
  image: string;
}

const Index = () => {
  const [list, setList] = useState<User[]>([]);
  const [clubList, setClubList] = useState<Club[]>([]);
  const searchState = useContext(SearchContext);
  const curr_user_id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchState?.query === "") {
        setList([]);
        return;
      }
      const res = await axiosInstance({
        method: "get",
        url: "api/account/get-matching-user",
        params: {
          username: searchState?.query,
        },
      });

      if (res.data.users && res.data.users !== "undefined")
        setList(res.data.users);
    };

    const fetchClubs = async () => {
      if (searchState?.clubQuery === "") {
        setClubList([]);
        return;
      }
      const res = await axiosInstance({
        method: "GET",
        url: "api/club/get-matching-clubs",
        params: {
          query: searchState?.clubQuery,
        },
      });
      setClubList(res.data.clubs);
    };

    if (searchState?.learner) fetchUsers();
    else fetchClubs();
  }, [searchState?.query, searchState?.clubQuery, searchState?.learner]);

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2 border-r-2 border-gray-200">
      {(searchState?.learner && list?.length > 0) ||
      (!searchState?.learner && clubList?.length > 0) ? (
        searchState?.learner ? (
          list.map((profile, id) => {
            return (
              curr_user_id !== profile.id + "" && (
                <Profile
                  id={profile.id}
                  img={profile.profile_pic}
                  username={profile.username}
                  key={id}
                />
              )
            );
          })
        ) : (
          clubList.map((club, i) => {
            return (
              <Profile
                id={club.id}
                img={club.image}
                username={club.name}
                key={i}
              />
            );
          })
        )
      ) : (
        <div className="relative w-full h-full">
          <p>
            search something or no {searchState?.learner ? "learner" : "club"}{" "}
            found
          </p>
          <Image
            src="/assests/no-data.svg"
            alt="no-data found"
            fill
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
