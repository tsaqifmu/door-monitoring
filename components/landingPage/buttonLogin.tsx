import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const ButtonLogin = () => {
  return (
    <Link href="/login">
      <button className="flex items-center gap-x-2 rounded-3xl bg-primaryPurple px-6 py-2 shadow-lg">
        <h3 className="text-base font-semibold text-white">Login</h3>
        <LogIn className="text-white" />
      </button>
    </Link>
  );
};

export default ButtonLogin;
