import axios from "axios";
import { cookies } from "next/headers";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:2000/api/growGuide",
});

axios.interceptors.request.use(
  function (config) {
    // !forget password
    if (cookies().get("accessToken")?.value) {
      config.headers.Authorization = `${cookies().get("accessToken")?.value}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
