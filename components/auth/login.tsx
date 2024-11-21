"use client";


import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Common/Loader";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { ACCESS_TOKEN_SSO } from "@/lib/constants";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';

export const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  const ssologin = async () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_SSO_PUBLIC_KKU_URL}/authorize?response_type=post&client_id=${process.env.NEXT_PUBLIC_SSO_PUBLIC_CLIENT_ID}&redirect_path=api/auth/sso-call-back`;
  };


  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user
      console.log(values)

      // router.replace("/");
    },
    [router]
  );

  useEffect(() => {
    const authSSO = async (token: string) => {

      const userAgent = window.navigator.userAgent;

      const response = await signIn("credentials", {
        username: token,
        password: "login",
        userAgent: userAgent,
        redirect: false,
      });

      if (response?.ok) {
        const callbackUrl = getCookie("callbackUrl");
        if (callbackUrl) {
          deleteCookie("callbackUrl")
          deleteCookie(ACCESS_TOKEN_SSO)
          setTimeout(() => router.push(callbackUrl), 500);
        } else {
          deleteCookie(ACCESS_TOKEN_SSO)
          setTimeout(() => router.push("/"), 500);
        }
      } else {
        deleteCookie(ACCESS_TOKEN_SSO)
        setLoading(false);
        const err = response?.error as string;
        toast.error(err, {
          position: "top-right"
        });

      }
    };
    const { searchParams } = new URL(window.location.href);
    const error = searchParams.get("error");

    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      setCookie("callbackUrl", callbackUrl);
    }

    if (error) {
      toast.error(error, {
        position: "top-right"
      });
    }

    const access_token_sso = getCookie(ACCESS_TOKEN_SSO);
    if (access_token_sso) {
      authSSO(access_token_sso.toString());
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='text-center text-[25px] font-bold mb-6'>Login</div>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <>
                <div className='flex flex-col gap-4 mb-4 w-96'>
                  <Input
                    variant='bordered'
                    label='Email'
                    type='email'
                    value={values.email}
                    isInvalid={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                    onChange={handleChange("email")}
                  />
                  <Input
                    variant='bordered'
                    label='Password'
                    type='password'
                    value={values.password}
                    isInvalid={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                    onChange={handleChange("password")}
                  />
                </div>

                <Button
                  onPress={() => handleSubmit()}
                  variant='flat'
                  color='primary'>
                  Login
                </Button>
              </>
            )}
          </Formik>

          <div className='mt-4 mb-3 text-sm font-light text-slate-400'>
            Don&apos;t have an account ?{" "}
            <Link href='/register' className='font-bold'>
              Register here
            </Link>
          </div>

          <Button onClick={ssologin} color="primary">
            เข้าสู่ระบบด้วย KKU account
          </Button>
        </>
      )}
    </>
  );
};
