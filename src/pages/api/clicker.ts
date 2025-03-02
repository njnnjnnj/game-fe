import type { NextApiRequest, NextApiResponse } from "next";

import axios, { AxiosError } from "axios";
import * as crypto from "crypto";

import { API_ENDPOINTS } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { debouncedClickCount, unixTimeInSeconds, token } = req.body;
      console.log("🚀 ~ debouncedClickCount:", debouncedClickCount);
      console.log("🚀 ~ token:", token);
      console.log("🚀 ~ unixTimeInSeconds:", unixTimeInSeconds);

      const sha = crypto
        .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET_KEY as string)
        .update(`${debouncedClickCount}:${unixTimeInSeconds}:${token}`)
        .digest("hex");

      console.log("🚀 ~ sha:", sha);

      const dataToSend = `${debouncedClickCount}:${unixTimeInSeconds}:${sha}`;
      const apiRoute = `${BASE_URL}${API_ENDPOINTS.POST.CLICKER}`;

      const { data, status } = await axios.post(
        apiRoute,
        {
          data: dataToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("🚀 ~ data:", data);
      console.log("🚀 ~ status:", status);

      res.status(200).json({ message: "Data received", data });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ error:", error.config?.data);
        res.status(400).json({ message: error.response?.data });
      }
    }
  }
}
