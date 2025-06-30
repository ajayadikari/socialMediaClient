import React from "react";
import SearchArea from "@/components/searchArea";
import { SearchProvider } from "@/context/search";

const page = () => {
  return (
    <div>
      <SearchProvider>
        <SearchArea />
      </SearchProvider>
    </div>
  );
};

export default page;
