import type { NextApiRequest, NextApiResponse } from "next";

import axios, { AxiosError } from "axios";
import crypto from "crypto-js";

import { API_ENDPOINTS } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { debouncedClickCount, unixTimeInSeconds, token } = req.body;

      const sha = crypto
        .HmacSHA256(
          `${debouncedClickCount}:${unixTimeInSeconds}:${token}`,
          process.env.NEXT_PUBLIC_SECRET_KEY as string,
        )
        .toString(crypto.enc.Hex);

      const dataToSend = `${debouncedClickCount}:${unixTimeInSeconds}:${sha}`;

      const apiRoute = `${BASE_URL}${API_ENDPOINTS.POST.CLICKER}`;

      const { data } = await axios.post(
        apiRoute,
        {
          data: dataToSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      res.status(200).json({ message: "Data received", data });
    } catch (error) {
      if (error instanceof AxiosError)
        res
          .status(error.response?.status || 500)
          .json({ message: error.response?.data });
    }
  }
}
