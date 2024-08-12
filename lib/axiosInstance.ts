import axios, { AxiosInstance } from "axios";

// http://10.1.1.103:3000
// http://baru.azizfath.com:3000

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "process.env.NEXT_PUBLIC_API_BASE_URL",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
