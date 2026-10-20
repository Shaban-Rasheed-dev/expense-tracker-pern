import axios from "axios";
import { getToken } from "../utils/auth";
// Backend  URL comes from .env
export const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });
// Attach the token to every request automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
