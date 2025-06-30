"use client";

import React, { useContext } from "react";
import List from "../list";
import LeanerDetailsGrid from "./learner/learnerDetailsGrid";
import { SearchContext } from "@/context/search";

const Index = () => {
  const SearchState = useContext(SearchContext);
  return (
    <div className="grid grid-cols-5 h-full">
      <div className="col-span-1 h-full overflow-y-auto">
        <List />
      </div>
      <div className="col-span-4 h-full">
        {SearchState?.learner ? (
          <>
            {SearchState?.selectedUser ? (
              <LeanerDetailsGrid userId={SearchState?.selectedUser} />
            ) : (
              <p>select user to see details</p>
            )}
          </>
        ) : (
          <>club</>
        )}
      </div>
    </div>
  );
};

export default Index;
