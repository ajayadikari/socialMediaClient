"use client";

import React from "react";
import Tabs from "./tabs";
import Body from './body'


const Index = () => {
  
  return (
    <div>
      <div className="h-[calc(100vh-105px)]">
        <Tabs/>
        <Body/>
      </div>
    </div>
  );
};

export default Index;
