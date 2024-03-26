import { styles } from "@/lib/styles";
import Image from "next/image";
import React from "react";
import about from "@/public/about.png";

const About = () => {
  return (
    <section
      className={`${styles.boxWidthNavFoot} ${styles.flexCenter} ${styles.paddingY} flex-row-reverse`}
    >
      <div className="ml-28 w-full text-slate-800">
        <h1 className="text-7xl font-bold">Antarmuka yang Memukau</h1>
        <h3 className="mt-4 text-xl font-medium">
          Didukung oleh Shadcn/UI, koleksi komponen UI yang elegan dan
          responsif, pengalaman pengguna menjadi lebih intuitif dan
          menyenangkan. Pengguna dapat dengan mudah berinteraksi dengan sistem,
          tanpa hambatan teknis atau kebingungan.
        </h3>
      </div>
      <Image src={about} width={400} alt="foto tentang kami" />
    </section>
  );
};

export default About;
