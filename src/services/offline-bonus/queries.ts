import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { invalidateProfileQuery } from "../profile/queries";

import { confirmOfflineBonus, getOfflineBonus } from "./fetcher";

enum QueryKeys {
  GET_OFFLINE_REWARD = "GET_OFFLINE_REWARD",
}
export const useGetOfflineBonus = () =>
  useQuery({
    queryKey: [QueryKeys.GET_OFFLINE_REWARD],
    queryFn: getOfflineBonus,
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: STALE_TIME,
  });

export const invalidateOfflineBonusQuery = (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({
    queryKey: [QueryKeys.GET_OFFLINE_REWARD],
  });
};

export const useConfirmOfflineBonus = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: confirmOfflineBonus,
    onSuccess: () => {
      invalidateProfileQuery(queryClient);
    },
  });
