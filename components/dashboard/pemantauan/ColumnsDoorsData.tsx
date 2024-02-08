"use client";

import { FileClock, MinusCircle, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteDoor } from "@/lib/deleteDoor";
import AlertDeleteDoor from "./AlertDeleteDoor";
import DrawerLogDoor from "./DrawetLogDoor";
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
    id: "actionLog",
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
    // cell: ({ row }: any) => {
    //   const now = new Date();
    //   row?.setHours(
    //     now.getHours(),
    //     now.getMinutes(),
    //     now.getSeconds(),
    //     now.getMilliseconds(),
    //   );
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
