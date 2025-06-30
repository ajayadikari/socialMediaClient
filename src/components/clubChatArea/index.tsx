'use client'

import React from "react";
import ClubList from "./clubList";
import LearningArea from "./learningArea";
import { ClubContextProvider } from "@/context/club";
import ClubCreationForm from "./clubCreationForm";

const Index = () => {
  return (
    <ClubContextProvider>
      <div className="grid grid-cols-5 h-[calc(100vh-56px)] border-t-2">
        <div className="col-span-1 h-full border-r-2 relative">
          <ClubList />
          <ClubCreationForm />
        </div>
        <div className="col-span-4 h-full">
          <LearningArea />
        </div>
      </div>
    </ClubContextProvider>
  );
};

export default Index;
