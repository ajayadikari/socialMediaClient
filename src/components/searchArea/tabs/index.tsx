"use client";

import React, { useContext } from "react";
import cn from "@/utils/cn";
import { SearchContext } from "@/context/search";

const Index = () => {
  const searchState = useContext(SearchContext);
  return (
    <div className="w-full border-2">
      <div className={cn("mx-auto w-full h-fit flex gap-10 text-xl relative")}>
        <input
          type="text"
          onChange={(e) => {
            if (searchState?.learner) searchState?.setQuery(e.target.value);
            else searchState?.setClubQuery(e.target.value);
          }}
          className={cn(
            "absolute w-1/2 left-0 h-full bg-gray-100 text-black rounded-full z-2 duration-1000 delay-75 p-2 outline-none",
            !searchState?.learner && "left-1/2"
          )}
          value={
            searchState?.learner ? searchState?.query : searchState?.clubQuery
          }
          placeholder={`search ${
            !searchState?.learner ? "club" : "learner"
          }...`}
        />
        <p
          onClick={() => searchState?.setLearner(true)}
          className={cn("p-2 w-1/2 text-center h-fit z-1 cursor-pointer")}
        >
          Learners
        </p>
        <p
          onClick={() => searchState?.setLearner(false)}
          className={cn("p-2 w-1/2 text-center h-fit z-1 cursor-pointer")}
        >
          Clubs
        </p>
      </div>
    </div>
  );
};

export default Index;
