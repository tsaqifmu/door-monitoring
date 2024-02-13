import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useAddAgent = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const { data } = await axiosInstance.post("/admin/create-agent", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
