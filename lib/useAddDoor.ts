import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useAddDoor = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const { data } = await axiosInstance.post(
        "/command/register-door",
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return data;
    },
    onSuccess,
  });
};
