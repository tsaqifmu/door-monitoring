import axiosInstance from "./axiosInstance";
// import { useQuery } from "@tanstack/react-query";

export const  useFetchDoorLogs = async (rowdata: any, page: any) => {
  console.log("page", page);
  try {
    const { data } = await axiosInstance.get(
      `/info/get-door-logs?doorNumber=${rowdata}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    console.log("error", error);
  }

  // console.log("rowdata", rowdata);
  // return useQuery({
  //   queryKey: ["DoorLogs"],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get(
  //       `/info/get-door-logs?doorNumber=${rowdata}&page=6`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       },
  //     );
  //     return data.data;
  //   },
  // });
};
