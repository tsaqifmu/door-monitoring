import { styles } from "@/lib/styles";
import Image from "next/image";
import React from "react";
import about from "@/public/about.png";

const About = () => {
  return (
    <section
      className={`${styles.boxWidthNavFoot} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingXMobile}  flex-row-reverse  `}
    >
      <div className="ml-10 w-full text-slate-800 lg:ml-28">
        <h1 className="text-base font-bold md:text-4xl lg:text-7xl">
          Antarmuka yang Memukau
        </h1>
        <h3 className="mt-4 text-xs font-medium md:text-lg lg:text-xl">
          Didukung oleh Shadcn/UI, koleksi komponen UI yang elegan dan
          responsif, pengalaman pengguna menjadi lebih intuitif dan
          menyenangkan. Pengguna dapat dengan mudah berinteraksi dengan sistem,
          tanpa hambatan teknis atau kebingungan.
        </h3>
      </div>
      <Image
        src={about}
        alt="foto tentang kami"
        className="w-36 md:w-60 lg:w-96"
      />
    </section>
  );
};

export default About;
