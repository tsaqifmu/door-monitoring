import { toast } from "@/components/ui/use-toast";
import axiosInstance from "./axiosInstance";
// import { handleError } from "./handleAxiosError";
// import microbeStore from "../dataStore";

export const deleteAgent = async (id: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.delete(
      `/admin/delete-agent?agentid=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    toast({
      title: data.message,
      description: "Agent berhasil dihapus",
    });
  } catch (error: any) {
    console.log(error);
    // handleError(error, toast);
  } finally {
    // microbeStore.setState({ deleteHistoryTriger: id });
  }
};
