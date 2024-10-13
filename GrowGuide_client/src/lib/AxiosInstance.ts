import axios from "axios";
import { cookies } from "next/headers";

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
    return Promise.reject(error);
  }
);

export default AxiosInstance;
