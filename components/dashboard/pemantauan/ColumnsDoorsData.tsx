"use client";

import AlertDeleteDoor from "./AlertDeleteDoor";
import DrawerLogDoor from "./DrawerLogDoor";
import SwitchDoor from "./SwitchDoor";

export type TankRecapDataType = {
  _id: string;
  doorNumber: string;
  statusBool: boolean;
  latestAgent: string;
  lastAccessed: string;
  __v: string;
};

export const columnsDoorsData = (refetchDoors: any) => [
  {
    accessorKey: "doorNumber",
    header: "Nomor Pintu",
    cell: ({ row }: any) => (
      <div className="font-semibold normal-case ">
        {row.getValue("doorNumber")}
      </div>
    ),
  },
  {
    id: "switchDoor",
    header: "Status Pintu",
    cell: ({ row }: any) => <SwitchDoor row={row} />,
  },
  {
    accessorKey: "latestAgent",
    header: "Pengguna Terakhir",
  },
  {
    accessorKey: "lastAccessed",
    header: "Terakhir Diakses",
    cell: ({ row }: any) => (
      <div className="font-semibold normal-case ">
        {new Date(row.getValue("lastAccessed")).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
      </div>
    ),
  },

  {
    id: "actionDelete",
    header: "Hapus",
    cell: ({ row }: any) => (
      <AlertDeleteDoor row={row} refetchDoors={refetchDoors} />
    ),
  },
  {
    id: "actionLog",
    header: "Logging",
    cell: ({ row }: any) => <DrawerLogDoor row={row} />,
  },
];
