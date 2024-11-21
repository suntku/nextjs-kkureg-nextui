"use client"
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col items-center justify-center flex-1 p-6'>
        <div className='absolute top-0 bottom-0 left-0 right-0 z-0 md:hidden'>
          <Image
            className='w-full h-full'
            src='https://nextui.org/gradients/docs-right.png'
            alt='gradient'
          />
        </div>
        {children}
      </div>
    </div>
  );
};
