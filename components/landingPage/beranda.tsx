import { styles } from "@/lib/styles";
import Image from "next/image";
import React from "react";
import home from "@/public/home.png";

const Beranda = () => {
  return (
    <section
      className={`${styles.boxWidthNavFoot} ${styles.flexCenter} ${styles.paddingXMobile} flex-1 pt-[120px]`}
    >
      <div className="w-full pr-10 text-slate-800">
        <h1 className="text-base font-bold md:text-4xl lg:text-7xl">
          Performa Optimal
        </h1>
        {/* <h1 className="text-7xl font-bold">Untuk Sayuran</h1> */}
        <h3 className="mt-4 text-xs font-medium md:text-lg lg:text-xl">
          Dikembangkan dengan menggunakan kerangka kerja Next.js yang canggih,
          aplikasi ini menawarkan performa yang luar biasa. Pengguna akan
          merasakan respons instan dan kehandalan tak tergoyahkan.
        </h3>
      </div>
      <Image src={home} alt="foto beranda" className="w-36 md:w-60 lg:w-96" />
    </section>
  );
};

export default Beranda;
