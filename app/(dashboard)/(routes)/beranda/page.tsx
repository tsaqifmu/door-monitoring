"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/table/DataTable";
import FormAddAgent from "@/components/dashboard/beranda/FormAddAgent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { columnsReportData } from "@/components/dashboard/beranda/ColumnsReportData";
import { useQuery } from "@tanstack/react-query";

const ReportAgent = () => {
  const [addAgentOpen, setAddAgentOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["Agent"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/info/get-agents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data.data; // mengembalikan data secara langsung
    },
  });

  console.log(data);

  return (
    <section className="py-10 ">
      <Dialog open={addAgentOpen} onOpenChange={setAddAgentOpen}>
        <DialogTrigger asChild className="mt-4">
          <Button
            variant="default"
            size={"sm"}
            className="gap-x-2 text-xs font-semibold"
          >
            <Plus size={16} strokeWidth={2.5} />
            Tambah Agent
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <FormAddAgent setAddAgentOpen={setAddAgentOpen} />
        </DialogContent>
      </Dialog>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          columns={columnsReportData}
          data={data}
          filterPlaceholder="Filter Nama..."
          filterValue="name"
        />
      )}
    </section>
  );
};

export default ReportAgent;
