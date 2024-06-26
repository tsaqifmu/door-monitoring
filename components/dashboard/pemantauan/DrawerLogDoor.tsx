"use client";

import { FileClock } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import axiosInstance from "@/lib/axiosInstance";
import { handleArrayError } from "@/lib/handlleAxiosError";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const rowData: any = row.original;

  const [doorLogData, setDoorLogData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doorLogDataFull, setdoorLogDataFull] = useState<any>({
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 0,
    page: 0,
    prevPage: 0,
  });

  const fetchDoorLogs = async (rowdata: any, page: any) => {
    try {
      const { data } = await axiosInstance.get(
        `/info/get-door-logs?doorNumber=${rowdata}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      const paginationData = data.data;
      setdoorLogDataFull({
        hasNextPage: paginationData.hasNextPage,
        hasPrevPage: paginationData.hasPrevPage,
        nextPage: paginationData.nextPage,
        page: paginationData.page,
        prevPage: paginationData.prevPage,
      });
      setDoorLogData(paginationData.docs);
    } catch (error) {
      handleArrayError(error, toast);
    }
  };

  useEffect(() => {
    fetchDoorLogs(rowData.doorNumber, currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (
      currentPage == doorLogDataFull.page &&
      currentPage > 1 &&
      doorLogDataFull.hasPrevPage
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage == doorLogDataFull.page && doorLogDataFull.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"sm"} className="bg-yellow-400 hover:bg-yellow-400/70">
          <FileClock size={18} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full overflow-x-auto md:mx-auto lg:max-w-3xl">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Logging Pintu {rowData.doorNumber}
            </DrawerTitle>
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
                  {doorLogData?.map((invoice: logsDoor) => (
                    <TableRow key={invoice._id}>
                      <TableCell className="font-medium">
                        {invoice.doorNumber}
                      </TableCell>
                      <TableCell>{invoice.deviceId}</TableCell>
                      <TableCell>
                        {invoice.statusBool ? "Buka" : "Tutup"}
                      </TableCell>
                      <TableCell>{invoice.agent}</TableCell>

                      <TableCell>
                        {new Date(invoice.date).toLocaleTimeString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          isActive={doorLogDataFull.prevPage}
                          onClick={() => handlePrevPage()}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        {doorLogDataFull.hasPrevPage && (
                          <PaginationLink onClick={handlePrevPage}>
                            {doorLogDataFull.prevPage}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink isActive>
                          {doorLogDataFull.page}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        {doorLogDataFull && (
                          <PaginationLink onClick={handleNextPage}>
                            {doorLogDataFull.nextPage}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                      <PaginationItem>
                        {doorLogDataFull.hasNextPage && <PaginationEllipsis />}
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          isActive={doorLogDataFull.hasNextPage}
                          onClick={() => handleNextPage()}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCaption>
              </Table>
            </DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerLogDoor;
