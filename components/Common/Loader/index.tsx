import { Spinner } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[10000] flex h-screen w-full h-full  items-center justify-center bg-white dark:bg-black">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
