import { toast } from "@/components/ui/use-toast";
import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";
// import { handleError } from "./handleAxiosError";

export const useDeleteAgent = (id: any, onSuccess: any, onError: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `/admin/delete-agent?agentid=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
