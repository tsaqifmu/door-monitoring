import {
  CalendarSearch,
  FileBarChart2,
  FlaskConical,
  LayoutDashboard,
  Microscope,
  Warehouse,
} from "lucide-react";

export const routesUser = [
  {
    label: "Beranda",
    icon: LayoutDashboard,
    href: "/beranda",
    requiredRole: "User",
  },
  {
    label: "Pemantauan",
    icon: FileBarChart2,
    href: "/pemantauan",
    requiredRole: "User",
  },
];

export const navLinks = [
  {
    id: "beranda",
    title: "Beranda",
  },
  {
    id: "tentang",
    title: "Tentang Kami",
  },
  {
    id: "paket",
    title: "Produk Kami",
  },
  {
    id: "testimoni",
    title: "Testimoni",
  },
];
