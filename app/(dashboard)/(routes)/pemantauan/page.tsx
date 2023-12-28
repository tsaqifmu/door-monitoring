"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/table/DataTable";
import FormAddAgent from "@/components/dashboard/beranda/FormAddAgent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { columnsDoorsData } from "@/components/dashboard/pemantauan/ColumnsDoorsData";
import FormAddDoor from "@/components/dashboard/pemantauan/FormAddDoor";

const page = () => {
  const [doorsData, setDoorsData] = useState([]);
  const [addDoorOpen, setAddDoorOpen] = useState(false);

  useEffect(() => {
    const getDoorsInfo = async () => {
      try {
        const { data } = await axiosInstance.get(`/info/get-doors`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setDoorsData(data.data);
      } catch (error) {}
    };
    getDoorsInfo();
  }, []);

  return (
    <section className="py-10 ">
      <Dialog open={addDoorOpen} onOpenChange={setAddDoorOpen}>
        <DialogTrigger asChild className="mt-4">
          <Button
            variant="default"
            size={"sm"}
            className="gap-x-2 text-xs font-semibold"
          >
            <Plus size={16} strokeWidth={2.5} />
            Tambah Pintu
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <FormAddDoor setAddDoorOpen={setAddDoorOpen} />
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columnsDoorsData}
        data={doorsData}
        filterPlaceholder="Filter Nama..."
        filterValue="doorNumber"
      />
    </section>
  );
};

export default page;
