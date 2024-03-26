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
  // {
  //   label: "Laporan QC",
  //   icon: CalendarSearch,
  //   href: "/laporan-QC",
  //   requiredRole: "User",
  // },
  // {
  //   label: "Laborat",
  //   icon: Microscope,
  //   href: "/laborat",
  //   requiredRole: "User",
  // },
  // {
  //   label: "Fermentor",
  //   icon: FlaskConical,
  //   href: "/fermentor",
  //   requiredRole: "User",
  // },
  // {
  //   label: "Pergudangan",
  //   icon: Warehouse,
  //   href: "/pergudangan",
  //   requiredRole: "User",
  // },
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
