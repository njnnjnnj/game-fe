import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { OfflineBonus } from "./types";

export const getOfflineBonus = async (): Promise<OfflineBonus> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_OFFLINE_REWARD);

  return data;
};

export const confirmOfflineBonus = async (): Promise<OfflineBonus> => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.GET.CONFIRM_GET_OFFLINE_REWARD,
  );

  return data;
};
