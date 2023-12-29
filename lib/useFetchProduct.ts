import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = () => {
  return useQuery({
    queryKey: ["Agent"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/info/get-agents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data.data; // mengembalikan data secara langsung
    },
  });
};
