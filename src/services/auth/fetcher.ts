import Cookies from "js-cookie";

import apiClient from "@/api/api-client";
import { API_ENDPOINTS, AUTH_COOKIE_TOKEN } from "@/constants/api";

const login = async (initData: string, referalCode?: string) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.POST.AUTH,
    {
      initDataRaw: initData,
      referalCode,
    },
    {
      skipAuth: true,
    },
  );

  if (data.userToken) {
    Cookies.set(AUTH_COOKIE_TOKEN, data.userToken, { expires: 1 / 8 });
  }

  return true;
};

export { login };
