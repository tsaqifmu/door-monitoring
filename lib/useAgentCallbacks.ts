import { toast } from "@/components/ui/use-toast";
import { handleArrayError } from "@/lib/handlleAxiosError";

interface DeleteAgentResponse {
  message: string;
}

export const onSuccess = (
  data: DeleteAgentResponse,
  refetchAgents: () => void,
) => {
  toast({
    title: data.message,
    description: "Agent berhasil dihapus",
  });
  refetchAgents();
};

export const onError = (error: any) => {
  handleArrayError(error, toast);
};
