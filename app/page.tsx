import About from "@/components/landingPage/about";
import NavBar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/footer";
import Beranda from "@/components/landingPage/beranda";
import Hero from "@/components/landingPage/hero";

const page = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <div className="flex flex-col items-center justify-center">
        <menu>
          <Beranda />
          <About />
        </menu>
        <Footer />
      </div>
    </div>
  );
};

export default page;
