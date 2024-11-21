"use client";
import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { REFRESH_TOKEN } from "@/lib/constants";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const verifyProtected = async () => {
      try {
        try {
          const response = await axiosAuth.post("/api/protected");
          if (response.status !== 200) {
            router.push("/logout");
          }
        } catch {
          router.push("/logout");
        }


      } catch (error: any) {
        router.push("/logout");
      }
    };

    verifyProtected();
  }, [session, router]);

  
  return <Layout>{children}</Layout>;
}
