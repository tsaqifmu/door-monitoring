"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "@/lib/getUserAPI";

import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import SyncLoader from "react-spinners/SyncLoader";

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
        <SyncLoader color="#a436d6" />
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
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
