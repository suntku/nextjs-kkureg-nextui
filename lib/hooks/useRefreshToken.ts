"use client";

import axiosAuth from "@/lib/axios";
import { signIn, useSession } from "next-auth/react";
import { REFRESH_TOKEN } from "../constants";
import { getCookie, setCookie } from "cookies-next";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await (await axiosAuth.post("/api/auth/refresh",{}, {
        headers: {
            Authorization: `Bearer ${getCookie(REFRESH_TOKEN)}`
        }
    })).data;
    
   
    if (session) {
      setCookie(REFRESH_TOKEN,res.data.accessToken)
      session.user.accessToken = res.data.accessToken;
    }
    else { signIn(); }
  };
  return refreshToken;
};