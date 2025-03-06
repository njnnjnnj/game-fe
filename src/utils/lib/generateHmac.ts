import CryptoJS from "crypto-js";

import { ClickerReqM } from "@/services/profile/types";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";

export const generateHmac = (data: ClickerReqM) => {
  const { debouncedClickCount, unixTimeInSeconds, token } = data;
  const dataForCrypto = `${debouncedClickCount}:${unixTimeInSeconds}:${token}`;
  const hmac = CryptoJS.HmacSHA256(SECRET_KEY, dataForCrypto);

  return hmac.toString(CryptoJS.enc.Hex);
};
