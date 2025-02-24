import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";

import { buyShopItem, getShop } from "./fetcher";

enum QueryKeys {
  GET_SHOP = "GET_SHOP",
}

export const useGetShop = () =>
  useQuery({
    queryKey: [QueryKeys.GET_SHOP],
    queryFn: async () => getShop(),
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    staleTime: STALE_TIME,
  });

export const useBuyShopItem = () =>
  useMutation({
    mutationFn: (itemId: number) => buyShopItem(itemId),
  });
