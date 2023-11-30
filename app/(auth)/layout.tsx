import Image from "next/image";
import ImageLogoLogin from "@/public/imageLogoLogin.png";

import { Toaster } from "@/components/ui/toaster";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <Image
          className="hidden shadow-xl lg:flex"
          height={567}
          src={ImageLogoLogin}
          alt="image login"
          priority
        />
        <div>{children}</div>
      </div>
      <Toaster />
    </>
  );
};

export default layout;
