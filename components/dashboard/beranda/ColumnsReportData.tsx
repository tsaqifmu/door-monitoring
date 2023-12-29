"use client";

import AlertDeleteAgent from "./AlertDeleteAgent";

export type TankRecapDataType = {
  _id: string;
  name: string;
  noHp: string;
  rfid: string;
  __v: string;
};

export const columnsReportData = (refetchAgents: any) => [
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
