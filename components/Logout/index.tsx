"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

import { deleteCookie } from 'cookies-next';
import Loader from "../Common/Loader";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";

const Logout = () => {
  const [loading, setLoading] = useState<boolean>(true);
 
  const router = useRouter();

  useEffect(() => {
    deleteCookie(ACCESS_TOKEN)
    deleteCookie(REFRESH_TOKEN)
    signOut({
      redirect: false,
    });
    router.push("/login")
  },[router]);

  return <>{loading ? <Loader /> : <></>}</>;
};

export default Logout;
