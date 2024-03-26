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
        <div className="flex gap-x-8">
          {navLinks.map((link) => (
            <h3 key={link.id} className="text-base font-bold">
              {link.title}
            </h3>
          ))}
        </div>
        <div className="w-full border-t-4 border-white" />
        <div className="flex flex-col">
          <h3>
            {new Date().getFullYear()} doormonitoring.com All rights reserved
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Footer;
