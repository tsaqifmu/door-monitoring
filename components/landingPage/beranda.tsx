import { styles } from "@/lib/styles";
import Image from "next/image";
import React from "react";
import home from "@/public/home.png";

const Beranda = () => {
  return (
    <section
      className={`${styles.boxWidthNavFoot} ${styles.flexCenter} pt-[120px]`}
    >
      <div className="w-full text-slate-800">
        <h1 className="text-7xl font-bold">Nutrisi Organik</h1>
        <h1 className="text-7xl font-bold">Untuk Sayuran</h1>
        <h3 className="mt-4 w-1/2 text-xl font-medium">
          Mengandung Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptas perspiciatis blanditiis suscipit, ex earum recusandae officia
          fugiat natus ut veritatis? Amet placeat totam quaerat inventore
          repudiandae sit quidem reiciendis modi!
        </h3>
      </div>
      <Image src={home} width={400} alt="foto beranda" />
    </section>
  );
};

export default Beranda;
