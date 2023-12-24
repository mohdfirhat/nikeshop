import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

export const publicRequest = axios.create({
  baseURL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL,
  withCredentials: true,
});
