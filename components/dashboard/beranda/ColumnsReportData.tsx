"use client";

import { MinusCircle, Trash2 } from "lucide-react";
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
import { deleteAgent } from "@/lib/deleteAgent";

export type TankRecapDataType = {
  _id: string;
  name: string;
  noHp: string;
  rfid: string;
  __v: string;
};

export const columnsReportData: ColumnDef<TankRecapDataType>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
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
    cell: ({ row }) => {
      const rowData: any = row.original;
      const id = rowData._id;

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"sm"} variant="destructive">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah anda yakin ingin menghapus data ini?
              </AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteAgent(id)}>
                Hapus!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
