import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const ButtonLogin = () => {
  return (
    <Link href="/login">
      <button className="flex items-center gap-x-2 rounded-3xl bg-primaryPurple px-3 py-1 shadow-lg lg:px-6 lg:py-2">
        <h3 className="text-sm font-semibold text-white lg:text-base">Login</h3>
        <LogIn className="text-white" />
      </button>
    </Link>
  );
};

export default ButtonLogin;
