import { toast } from "@/components/ui/use-toast";
import axiosInstance from "./axiosInstance";
// import { handleError } from "./handleAxiosError";
// import microbeStore from "../dataStore";

export const deleteDoor = async (id: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.delete(
      `/command/delete-door?doorid=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    toast({
      title: data.message,
      description: "Nomor Pintu berhasil dihapus",
    });
  } catch (error: any) {
    console.log(error);
    // handleError(error, toast);
  } finally {
    // microbeStore.setState({ deleteHistoryTriger: id });
  }
};
