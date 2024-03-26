import { styles } from "@/lib/styles";
import Image from "next/image";
import React from "react";
import home from "@/public/home.png";

const About = () => {
  return (
    <section
      className={`${styles.boxWidthNavFoot} ${styles.flexCenter} ${styles.paddingY} flex-row-reverse`}
    >
      <div className="ml-28 w-full text-slate-800">
        <h1 className="text-7xl font-bold">Tentang Kami</h1>
        <h3 className="mt-4 text-xl font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          asperiores libero sed praesentium vitae dolorem debitis, commodi unde
          nisi delectus saepe quos eos, similique architecto voluptas. Omnis
          dolores cupiditate nisi!
        </h3>
      </div>
      <Image src={home} width={400} alt="foto tentang kami" />
    </section>
  );
};

export default About;
