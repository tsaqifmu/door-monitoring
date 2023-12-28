"use client";

import { getUser } from "@/lib/getUserAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { error } = await getUser();

      console.log(error);
      if (error) {
        router.push("/");
        return;
      }
      setIsSuccess(true);
    })();
  }, [router.push]);

  if (!isSuccess) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <HashLoader color="#36d7b7" size={100} /> */}
        LOADING....
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="z-40 hidden h-full bg-white lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>
      <main className="px-5 lg:pl-[304px] lg:pr-4">
        {/* <Navbar /> */}
        <MobileSidebar />
        {children}
      </main>
      {/* <Toaster /> */}
    </div>
  );
};

export default DashboardLayout;
