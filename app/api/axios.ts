import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://172.180.13.104:8080",
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {

  if (config.url?.startsWith("/auth")) {
    return config;
  }

  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "➡️ REQUEST:",
    config.method?.toUpperCase(),
    config.baseURL + config.url
  );

  return config;
});

export default api;
