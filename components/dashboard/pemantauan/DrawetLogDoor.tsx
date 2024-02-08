import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useFetchDoorLogs } from "@/lib/useFetchDoorLogs";
import { DoorOpen, FileClock } from "lucide-react";
import { columns } from "./ColumnsDoorLog";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type logsDoor = {
  _id: string;
  doorNumber: string;
  deviceId: "Dashboard" | "RFID";
  statusBool: boolean;
  agent: string;
  date: string;
  __v: number;
};

const DrawerLogDoor = ({ row }: any) => {
  const rowData: any = row.original;
  const [doorLogData, setDoorLogData] = useState<any>([]);
  const [doorLogFullData, setDoorLogFullData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
  console.log("doorLogFullData", doorLogFullData);
  // const {
  //   data: doorLogData,
  //   isLoading,
  //   refetch: refetchDoors,
  // } = useFetchDoorLogs(rowData.doornumber);

  useEffect(() => {
    async () => {
      console.log("currentPage", currentPage);
      const data = await useFetchDoorLogs(rowData.doorNumber, currentPage);
      console.log("data", data);
      setDoorLogData(data.docs);
      setDoorLogFullData(data);
    };
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < doorLogFullData.totalPages)
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size={"sm"}
          variant="destructive"
          onClick={async () => {
            const data = await useFetchDoorLogs(
              rowData.doorNumber,
              currentPage,
            );
            console.log("data", data);
            setDoorLogData(data.docs);
            setDoorLogFullData(data);
          }}
        >
          <FileClock />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Logging</DrawerTitle>
            <DrawerDescription>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nomor Pintu</TableHead>
                    <TableHead>Perangkat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doorLogData.map((invoice: logsDoor) => (
                    <TableRow key={invoice._id}>
                      <TableCell className="font-medium">
                        {invoice.doorNumber}
                      </TableCell>
                      <TableCell>{invoice.deviceId}</TableCell>
                      <TableCell>{invoice.statusBool}</TableCell>
                      <TableCell>{invoice.agent}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePrevPage()} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext onClick={() => handleNextPage()} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCaption>
              </Table>

              {/* <DataTable
                columns={columns}
                data={doorLogData}
                filterPlaceholder="Filter Nama..."
                filterValue="doorNumber"
              /> */}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerLogDoor;
