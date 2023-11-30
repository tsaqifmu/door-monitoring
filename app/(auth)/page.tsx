import FormLogin from "@/components/auth/FormLogin";
import React from "react";

const page = () => {
  return (
    <div className="h-[567px] w-[320px] bg-white p-5 shadow-xl">
      <h1 className="mt-3 text-2xl font-bold text-primaryPurple">
        Selamat Datang di <br />
        Sistem Monitoring Pintu
      </h1>
      <div className="mt-9">
        <FormLogin />
      </div>
    </div>
  );
};

export default page;
