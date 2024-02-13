import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useDeleteDoor = (id: any, onSuccess: any, onError: any) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `/command/delete-door?doorid=${id}`,
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
