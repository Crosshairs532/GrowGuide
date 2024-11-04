import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
import { cookies } from "next/headers";

// Default configuration for Nexios
// baseURL: "https://grow-guide-server.vercel.app/api/growGuide",
const defaultConfig: NexiosOptions = {
  baseURL: "http://localhost:2000/api/growGuide",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor
nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `${accessToken}`,
    };
  }

  return config;
});

// Add response interceptor
nexiosInstance.interceptors.response.use((response) => {
  // Transform response data if needed
  return response;
});

export default nexiosInstance;
