import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchDoorToggle = () => {
  return useQuery({
    queryKey: ["DoorToggle"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/info/get-doors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data.data;
    },
  });
};
