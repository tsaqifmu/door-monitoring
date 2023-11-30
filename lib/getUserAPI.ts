import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export async function getUser(): Promise<UserResponse> {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
