"use client";

import React, { useEffect, useState } from "react";
import LearnerDetails from "./LearnerDetails";
import LearnerEducation from "./LearnerEducation";
import LearnerExperience from "./LearnerExperience";
// import axiosInstance from "@/utils/axiosInstance";
import useCreateAxiosInstance from "@/utils/axiosInstance";

export interface PersonalDetailsInterface {
  id: number, 
  username: string | null, 
  first_name: string | null, 
  last_name: string | null, 
  email: string | null, 
  profile_pic: string | null,
}

export interface EducationalDetailsInterface {
  institution_name: string, 
  major: string | null, 
  degree: string | null, 
  start_date: string | null, 
  end_date: string | null,
}

export interface ExperienceDetailsInterface {
  company_name: string, 
  job_title: string, 
  description: string, 
  start_date: string, 
  end_data: string

}

export interface UserDataInterface {
  personal_details: PersonalDetailsInterface, 
  educational_details: EducationalDetailsInterface[], 
  experience_details: ExperienceDetailsInterface[],
}

const LearnerDetailsGrid = ({ userId }: { userId: string | number }) => {
  const axiosInstance = useCreateAxiosInstance()
  const [userData, setUserData] = useState<UserDataInterface | null>(null)
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance({
        method: "GET",
        url: `api/account/get-all-user-details/${userId}`,
      });
      console.log(res)
      setUserData(res.data.user_details)
    };
    fetch();
  }, [userId]);

  return (
    <div className="grid grid-cols-3 h-full">
      <LearnerDetails data={userData?.personal_details} />
      <LearnerEducation data={userData?.educational_details} />
      <LearnerExperience data={userData?.experience_details} />
    </div>
  );
};

export default LearnerDetailsGrid;
