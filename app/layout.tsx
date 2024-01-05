import "./globals.css";
import { cn } from "@/lib/utils";
import TanstackProvider from "@/lib/providers/TanstackProvider";

import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Door Monitoring",
  description:
    "Aplikasi untuk memantau pintu yang terhubung dengan adanya teknologi IoT",
};

// axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("bg-bgPurple text-textPurple", inter.className)}>
        <TanstackProvider>{children}</TanstackProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
