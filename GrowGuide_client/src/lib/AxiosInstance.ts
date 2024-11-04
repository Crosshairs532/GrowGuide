/* eslint-disable prettier/prettier */
import { logout } from "@/services/authService/auth.service";
import axios from "axios";
import { cookies } from "next/headers";

// baseURL: "https://grow-guide-server.vercel.app/api/growGuide",
// baseURL: "https://grow-guide-server.vercel.app/api/growGuide",
// baseURL: "https://grow-guide-server.vercel.app/api/growGuide",
const AxiosInstance = axios.create({
  baseURL: "http://localhost:2000/api/growGuide",
});
AxiosInstance.interceptors.request.use(
  function (config) {
    // !forget password
    if (cookies().get("accessToken")?.value) {
      console.log(cookies().get("accessToken")?.value);
      config.headers.Authorization = `${cookies().get("accessToken")?.value}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const config = error.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      logout();
    } else {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
