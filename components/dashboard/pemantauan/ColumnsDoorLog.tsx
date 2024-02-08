"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  _id: string;
  doorNumber: string;
  deviceId: "Dashboard" | "RFID";
  statusBool: boolean;
  agent: string;
  date: string;
  __v: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "doornumber",
    header: "Nomor Pintu",
  },
  {
    accessorKey: "deviceId",
    header: "Perangkat",
  },
  {
    accessorKey: "StatusBool",
    header: "Status",
  },
  {
    accessorKey: "agent",
    header: "Agen",
  },
  {
    accessorKey: "date",
    header: "Waktu",
  },
];
