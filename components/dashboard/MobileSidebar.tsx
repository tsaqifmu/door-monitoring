"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Button variant={"ghost"} size={"icon"} className="absolute w-fit">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
