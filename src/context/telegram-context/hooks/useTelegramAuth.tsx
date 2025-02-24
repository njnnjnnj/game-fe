import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { login } from "@/services/auth/fetcher";
import { IWebApp } from "@/types/telegram";
import { useQuery } from "@tanstack/react-query";

export enum QueryKeys {
  AUTH = "AUTH",
}

export const useTelegramAuth = (webApp: IWebApp | null) => {
  return useQuery({
    queryKey: [QueryKeys.AUTH],
    queryFn: async () => {
      if (!webApp) {
        return Promise.reject(new Error("WebApp hasn't been initialized!"));
      }

      const token = Cookies.get(AUTH_COOKIE_TOKEN);
      if (token) return Promise.resolve(true);

      return login(webApp.initData, webApp.initDataUnsafe.start_param);
    },
    enabled: !!webApp,
  });
};
