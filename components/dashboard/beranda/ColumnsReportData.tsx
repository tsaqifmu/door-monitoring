"use client";

import AlertDeleteAgent from "./AlertDeleteAgent";
import { ColumnDef } from "@tanstack/react-table";

export type TankRecapDataType = {
  _id: string;
  name: string;
  noHp: string;
  rfid: string;
  __v: string;
};

type refetchAgents = () => void;

export const columnsReportData = (
  refetchAgents: refetchAgents,
): ColumnDef<TankRecapDataType>[] => [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }: any) => (
      <div className="font-semibold normal-case ">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "noHp",
    header: "Nomor Handphone",
  },
  {
    accessorKey: "rfid",
    header: "Nomor Rfid",
  },
  {
    id: "actionDelete",
    header: "Hapus",
    cell: ({ row }: any) => (
      <AlertDeleteAgent row={row} refetchAgents={refetchAgents} />
    ),
  },
];
