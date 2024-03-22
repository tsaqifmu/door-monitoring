"use client";

import { useFetchDoorsInfo } from "@/lib/useFetchDoorsInfo";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/table/DataTable";
import DialogAddDoor from "@/components/dashboard/pemantauan/DialogAddDoor";
import { columnsDoorsData } from "@/components/dashboard/pemantauan/ColumnsDoorsData";

const DoorMonitor = () => {
  const {
    data: doorsData,
    isLoading,
    refetch: refetchDoors,
  } = useFetchDoorsInfo();

  return (
    <section className="py-10 ">
      <DialogAddDoor refetchDoors={refetchDoors} />

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      ) : (
        <DataTable
          columns={columnsDoorsData(refetchDoors)}
          data={doorsData}
          filterPlaceholder="Filter Nomor Pintu..."
          filterValue="doorNumber"
        />
      )}
    </section>
  );
};

export default DoorMonitor;
