import { styles } from "@/lib/styles";
import Image from "next/image";
import ButtonLogin from "./buttonLogin";
import hero from "@/public/hero.webp";

const Hero = () => {
  return (
    <section className={`${styles.flexCenter} relative pt-[73px]`}>
      <div
        className={`${styles.boxWidth} ${styles.paddingXMobile} absolute top-1/2 z-10 flex  -translate-y-1/4 flex-col gap-1 text-white lg:gap-4`}
      >
        <h3 className="text-base font-normal md:text-lg lg:text-2xl">
          Door Monitoring Application
        </h3>
        <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">
          Mengawal Laboratorium ke Era Digital dengan IoT Door Monitoring
        </h1>
        <p className={`${styles.paragraph} block w-64 md:w-2/3 xl:w-3/5`}>
          Dalam perjalanan menuju era digital yang semakin maju, Internet of
          Things (IoT) telah memainkan peran sentral dalam transformasi berbagai
          aspek kehidupan, termasuk pengelolaan ruang laboratorium. Di sini,
          setiap detail memiliki nilai krusial, dan pengamanan menjadi prioritas
          utama. Untuk mengakomodasi kebutuhan ini, hadirlah solusi inovatif:
          Sistem Monitoring Pintu Berbasis IoT
        </p>
        <div className=" transition-all hover:-translate-y-1 lg:flex">
          <ButtonLogin />
        </div>
      </div>
      <Image
        src={hero}
        alt="Hero Image"
        width={1920}
        height={1080}
        className="object h-[600px] object-cover brightness-50 sm:object-center lg:h-[700px] lg:w-full"
      />
    </section>
  );
};

export default Hero;
