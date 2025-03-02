import type { NextApiRequest } from "next";

import crypto from "crypto-js";

import { API_ENDPOINTS } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    try {
      const { debouncedClickCount, unixTimeInSeconds, token } = req.body;

      // const sha = crypto
      //   .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET_KEY as string)
      //   .update(`${debouncedClickCount}:${unixTimeInSeconds}:${token}`)
      //   .digest("hex");
      const sha = crypto
        .HmacSHA256(
          `${debouncedClickCount}:${unixTimeInSeconds}:${token}`,
          process.env.NEXT_PUBLIC_SECRET_KEY as string,
        )
        .toString(crypto.enc.Hex);

      console.log("🚀 ~ sha:", sha);

      const dataToSend = `${debouncedClickCount}:${unixTimeInSeconds}:${sha}`;
      const apiRoute = `${BASE_URL}${API_ENDPOINTS.POST.CLICKER}`;

      const response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: dataToSend }),
      });

      const data = await response.json();

      Response.json({ message: "Data received", data }, { status: 200 });
    } catch (error) {
      Response.json({ message: error }, { status: 400 });
    }
  }
}
