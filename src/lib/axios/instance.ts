import { environments } from "@/config/environments";
import axios from "axios";

const headers = {
  "Content-type": "application/json",
};

const instance = axios.create({
  baseURL: environments.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default instance;
