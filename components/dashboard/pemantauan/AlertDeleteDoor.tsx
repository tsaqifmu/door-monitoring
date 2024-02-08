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
import { toast } from "@/components/ui/use-toast";
import { useDeleteDoor } from "@/lib/useDeleteDoor";
import { Trash2 } from "lucide-react";

const AlertDeleteDoor = ({ row, refetchDoors }: any) => {
  const rowData: any = row.original;
  const id = rowData._id;

  const onSuccess = (data: any) => {
    toast({
      title: data.message,
      description: "Pintu berhasil dihapus",
    });
    refetchDoors();
  };

  const { mutate: deleteDoor } = useDeleteDoor(id, onSuccess);
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
};

export default AlertDeleteDoor;
