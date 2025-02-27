import * as CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;

export const generateHmac = (
  debouncedClickCount: number,
  unixTimeInSeconds: number,
  token: string,
) => {
  const dataToHash = `${debouncedClickCount}:${unixTimeInSeconds}:${token}`;
  const sha = CryptoJS.HmacSHA256(dataToHash, secretKey).toString(
    CryptoJS.enc.Hex,
  );
  return sha;
};
