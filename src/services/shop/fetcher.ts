import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { IShop } from "./types";

export const getShop = async (): Promise<IShop> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_SHOP);

  return data;
};

export const buyShopItem = async (itemId: number) => {
  const { data } = await apiClient.post(API_ENDPOINTS.POST.SHOP_BUY, {
    item_id: itemId,
  });

  return data;
};
