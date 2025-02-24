import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";

export const validateToken = (): string => {
  const token = Cookies.get(AUTH_COOKIE_TOKEN);
  if (!token) {
    throw new Error("Token is missing");
  }
  return token;
};
