import React, { useContext, useState } from "react";
import { ClubContext } from "@/context/club";
import cn from "@/utils/cn";
// import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import useCreateAxiosInstance from "@/utils/axiosInstance";

const Index = () => {
  const ClubState = useContext(ClubContext);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const axiosInstance = useCreateAxiosInstance()
  //img handling - club profile pic

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name === "") {
        console.log("name is null");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);

      const res = await axiosInstance({
        method: "post",
        url: `/api/club/create-club/`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data["message"]);
        ClubState?.setShowForm(false);
      } else {
        toast.error(res.data["message"]);
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  return (
    <div
      className={cn(
        "absolute z-2 left-[103%] top-8 w-[500px] grid grid-cols-1 gap-y-[50px] rounded-lg shadow-md bg-gray-50",
        ClubState?.showForm ? "visible" : "hidden"
      )}
    >
      <form
        action=""
        onSubmit={(e) => submitHandler(e)}
        className="grid grid-cols-1 gap-3 p-4 "
        method="post"
      >
        <p className="text-center text-2xl">Create Club</p>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="h-10"
          placeholder="club name..."
        />
        <input
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          className="h-10"
          placeholder="description..."
        />
        <div className="flex flex-col gap-2 bg-gray-100 p-1 rounded">
          <p>select club pic</p>
          <input type="file" className="bg-gray-100" name="" id="" />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default Index;
