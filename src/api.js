import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-task-backend-production-ff57.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
