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
import { deleteDoor } from "@/lib/deleteDoor";

export type TankRecapDataType = {
  _id: string;
  doorNumber: string;
  statusBool: boolean;
  latestAgent: string;
  __v: string;
};

export const columnsDoorsData: ColumnDef<TankRecapDataType>[] = [
  {
    accessorKey: "doorNumber",
    header: "Nomor Pintu",
    cell: ({ row }) => (
      <div className="font-semibold normal-case ">
        {row.getValue("doorNumber")}
      </div>
    ),
  },
  {
    accessorKey: "latestAgent",
    header: "Pengguna Terakhir",
  },
  {
    accessorKey: "statusBool",
    header: "Status Pintu",
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
              <AlertDialogAction onClick={() => deleteDoor(id)}>
                Hapus!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
