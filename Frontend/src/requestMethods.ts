import axios from "axios";

const baseURL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

console.log(baseURL);

export const publicRequest = axios.create({
  baseURL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL,
  withCredentials: true,
});
