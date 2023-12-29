"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import cbiMonitoringLogo from "@/public/cbiMonitoringLogo.webp";

import { routesUser } from "@/constant";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUserAPI";
// import checkUserRole from "@/lib/checkUserRole";

const Sidebar = () => {
  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     const { user } = await getUser();
  //     const { data }: any = user;
  //     setUserRole(data ? data.role : null);
  //   };
  //   fetchUserRole();
  // }, []);

  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.trim() !== "");
  const firstPathSegment = "/" + pathSegments[0];

  return (
    <div className="flex h-full flex-col space-y-4 py-4 text-gray-900">
      <div className="flex-1 px-4">
        <Link href="/beranda" className="mb-14 flex items-center pl-3">
          {/* <div className="relative mr-4">
            <Image alt="logo" width={155} height={46} src={cbiMonitoringLogo} />
          </div> */}
        </Link>
        <div className="space-y-1">
          {routesUser.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-base font-normal text-gray-900 transition hover:bg-primaryPurple hover:font-semibold hover:text-white",
                firstPathSegment === route.href &&
                  "bg-primaryPurple font-semibold text-white",
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon strokeWidth={2.25} className="mr-9 h-5 w-5" />
                {route.label}
              </div>
            </Link>
          ))}
          <div className="pt-10">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
