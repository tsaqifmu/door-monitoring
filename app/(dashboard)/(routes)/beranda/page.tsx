"use client";

import { useFetchProduct } from "@/lib/useFetchProduct";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/DataTable";
import DialogAddAgent from "@/components/dashboard/beranda/DialogAddAgent";
import { columnsReportData } from "@/components/dashboard/beranda/ColumnsReportData";

const ReportAgent = () => {
  const {
    data: agentData,
    isLoading,
    refetch: refetchAgents,
  } = useFetchProduct();

  return (
    <section className="py-10 ">
      <DialogAddAgent refetchAgents={refetchAgents} />

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ) : (
        <DataTable
          columns={columnsReportData(refetchAgents)}
          data={agentData}
          filterPlaceholder="Filter Nama..."
          filterValue="name"
        />
      )}
    </section>
  );
};

export default ReportAgent;
