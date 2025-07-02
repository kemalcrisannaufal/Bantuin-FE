import { environments } from "@/config/environments";
import { SessionExtended } from "@/type/Auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

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
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: IApiError) => {
    if (error.response?.data?.meta?.message === "jwt expired") {
      signOut();
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
