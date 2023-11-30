"use client";

import { getUser } from "@/lib/getUserAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <div>{children}</div>;
};

export default DashboardLayout;
