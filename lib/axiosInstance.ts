import axios, { AxiosInstance } from "axios";

// http://10.1.1.103:3000

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
