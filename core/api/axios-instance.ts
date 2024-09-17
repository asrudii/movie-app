import axios from "axios";
import { API_URL, THEME_MOVIE_API_KEY } from "../constants/env";

/**
 * Create Axios instance.
 */
const AxiosInstance = axios.create();

/**
 * Default request interceptor axios.
 */
AxiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = API_URL;
    config.headers.Authorization = `Bearer ${THEME_MOVIE_API_KEY}`;
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

export { AxiosInstance };
