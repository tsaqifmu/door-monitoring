import { styles } from "@/lib/styles";
import Image from "next/image";
import logo from "@/public/logo.png";
import { navLinks } from "@/constant";

const Footer = () => {
  return (
    <section
      className={`${styles.flexCenter} w-full bg-primaryPurple pb-5 pt-28 text-white`}
    >
      <div
        className={`${styles.boxWidthNavFoot} ${styles.flexCenter} flex-col space-y-10`}
      >
        <Image src={logo} width={200} alt="Logo Botanico" />
        <div className="flex gap-x-4 lg:gap-x-8">
          {navLinks.map((link) => (
            <h3
              key={link.id}
              className="text-xs font-bold md:text-sm lg:text-base"
            >
              {link.title}
            </h3>
          ))}
        </div>
        <div className="w-5/6 border-t-4 border-white lg:w-full" />
        <div className="flex flex-col">
          <h3 className="text-sm lg:text-base">
            {new Date().getFullYear()} doormonitoring.com All rights reserved
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Footer;
