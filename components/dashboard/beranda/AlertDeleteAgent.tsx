import { Trash2 } from "lucide-react";

import { useDeleteAgent } from "@/lib/useDeleteAgent";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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
import { handleArrayError, handleError } from "@/lib/handlleAxiosError";

const AlertDeleteAgent = ({ row, refetchAgents }: any) => {
  const rowData: any = row.original;
  const id = rowData._id;

  const onSuccess = (data: any) => {
    toast({
      title: data.message,
      description: "Agent berhasil dihapus",
    });
    refetchAgents();
  };

  const onError = (error: any) => {
    handleArrayError(error, toast);
  };

  const { mutate: deleteAgent } = useDeleteAgent(id, onSuccess, onError);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant="destructive">
          <Trash2 size={18} />
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
};

export default AlertDeleteAgent;
