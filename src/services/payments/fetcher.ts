import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { StarsPaymentResponse } from "./types";

export const payStars = async (starsAmount: number): Promise<StarsPaymentResponse> => {
  const { data } = await apiClient.post(API_ENDPOINTS.POST.STARS_PAYMENT, null, {
    params: { amount: starsAmount },
  });

  return data;
}
