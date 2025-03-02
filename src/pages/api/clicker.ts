import type { NextApiRequest } from "next";

import axios, { AxiosError } from "axios";
import * as crypto from "crypto";

import { API_ENDPOINTS } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    try {
      const { debouncedClickCount, unixTimeInSeconds, token } = req.body;

      const sha = crypto
        .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET_KEY as string)
        .update(`${debouncedClickCount}:${unixTimeInSeconds}:${token}`)
        .digest("hex");

      console.log("🚀 ~ sha:", sha);

      const dataToSend = `${debouncedClickCount}:${unixTimeInSeconds}:${sha}`;
      const apiRoute = `${BASE_URL}${API_ENDPOINTS.POST.CLICKER}`;

      const { data } = await axios.post(
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
      Response.json({ message: "Data received", data }, { status: 200 });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ error:", error.config?.data);
        Response.json({ message: error.response?.data }, { status: 400 });
      }
    }
  }
}
