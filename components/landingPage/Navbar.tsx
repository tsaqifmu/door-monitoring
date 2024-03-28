"use client";

import { useState } from "react";
// import { navbarLogo } from "../assets";
import { navLinks } from "@/constant";
import { styles } from "@/lib/styles";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import ButtonLogin from "./buttonLogin";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header
      className={`fixed z-50 flex w-full items-center justify-center bg-white shadow-xl`}
    >
      <div
        className={`${styles.boxWidthNavFoot} ${styles.paddingXMobile} flex w-full items-center justify-between py-3 `}
      >
        <Link href={`/`}>
          <Image src={logo} height={47} alt="Logo Botanico" />
        </Link>

        {/* FOR MOBILE */}
        <div className="flex flex-1 items-center justify-end lg:hidden">
          <button
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? <X /> : <Menu />}
          </button>

          <nav
            className={`${
              toggle ? `flex` : `hidden`
            } min-w[140px] sidebar absolute right-0 top-20 z-50 mx-4 my-2 flex-col rounded-xl bg-white p-6 shadow-2xl`}
          >
            <ul className="flex flex-1 list-none flex-col items-center justify-end">
              {navLinks.map((nav: any, index: any) => (
                <li
                  key={nav.id}
                  className={` cursor-pointer text-[16px] font-normal text-slate-800  ${
                    index === navLinks.length - 1 ? `mr-0` : `mb-4`
                  }`}
                >
                  <a href={`/#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
            <div className="mt-4 hover:translate-y-2">
              <ButtonLogin />
            </div>
          </nav>
        </div>

        {/* FOR DESKTOP */}
        <nav className="hidden  items-center justify-between lg:flex">
          <ul className=" flex flex-1 list-none items-center justify-end ">
            {navLinks.map((nav: any, index: any) => (
              <li
                key={nav.id}
                className={`hover:text-greenWA cursor-pointer text-base font-normal text-slate-800 transition-all xl:text-lg  ${
                  index === navLinks.length - 1 ? `mr-0` : `mr-[30px]`
                }`}
              >
                <a href={`/#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden transition-all hover:-translate-y-1 lg:flex">
          <ButtonLogin />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
