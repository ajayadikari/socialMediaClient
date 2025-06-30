"use client";

import React from "react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import decodeAndStoreJwtDecode from "@/utils/hooks/decodeJwt";
import axios from 'axios';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import baseUrl from "@/utils/constants";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) toast.error("fill required fields!");
    else {
      const data = {
        email,
        password,
      };
      try {
        const res = await axios({
          method: "post",
          url: `${baseUrl}api/token/`,
          data,
        });
        if (res.status !== 200) {
          toast.error("failed to login");
          console.log(res)
        }
        else {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          decodeAndStoreJwtDecode()
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        toast.error("error occurred");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>please login if already signed up</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onClick={submitHandler}>
          <div className="grid grid-rows-2 gap-[2px]">
            <Label>Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
              placeholder="enter your email..."
            />
          </div>
          <div className="grid grid-rows-2 gap-[2px]">
            <Label>Password</Label>
            <div className="relative">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                required
                placeholder="enter your password"
                className="relative"
              />
              <div
                className="absolute top-[50%] translate-y-[-50%] right-1"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <Eye /> : <EyeClosed />}
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

export default Login;
