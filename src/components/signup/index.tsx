"use client";

import React from "react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("password and confirm password not matching!");
      return;
    }
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    const res = await axiosInstance.post("api/account/signup/", formdata);

    if (res.data.success !== true) toast.error("signup failed");

    toast.success("sign up successful, please login now!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>want to become a member?</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid gap-1">
            <Input
              type="text"
              name="username"
              required
              placeholder="enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              required
              placeholder="enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                name="password"
                required
                placeholder="enter your password..."
                className="relative"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-[50%] translate-y-[-50%] right-1"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <Eye /> : <EyeClosed />}
              </div>
            </div>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                name="cpassword"
                required
                placeholder="re-enter the same password..."
                className="relative"
                onChange={(e) => setCPassword(e.target.value)}
              />
              <div
                className="absolute top-[50%] translate-y-[-50%] right-1"
                onClick={() => setShowCPass(!showCPass)}
              >
                {showCPass ? <Eye /> : <EyeClosed />}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={submitHandler} className="w-full" type="submit">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
