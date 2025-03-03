import { NextRequest, NextResponse } from "next/server";

import { API_ENDPOINTS } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const config = {
  runtime: "edge",
};

const key = (data: string) =>
  crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(data),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, "0"))
    .join("");
}

export default async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const { searchParams } = req.nextUrl;
    try {
      const clicks = Number(searchParams.get("clicks"));
      const unix = Number(searchParams.get("unixTimeInSeconds"));
      const token = searchParams.get("token");

      const dataForCrypto = new TextEncoder().encode("majestic");

      const sha = toHex(
        await crypto.subtle.sign(
          "HMAC",
          await key(`${clicks}:${unix}:${token}`),
          dataForCrypto,
        ),
      );

      const dataToSend = `${clicks}:${unix}:${sha}`;

      const apiRoute = `${BASE_URL}${API_ENDPOINTS.POST.CLICKER}`;

      const response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: dataToSend }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error["detail"]);
      }

      const data = await response.json();

      return NextResponse.json({ data: JSON.stringify(data) }, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ data: error.message }, { status: 400 });
      } else {
        return NextResponse.json(
          { data: "Internal Server Error" },
          { status: 500 },
        );
      }
    }
  }
}
