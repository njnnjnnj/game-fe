import { AxiosError } from "axios";
import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteWallet,
  getProfile,
  getReferalLink,
  getStarsInfo,
  setClicker,
  setWallet,
} from "./fetcher";
import { IProfile, IWalletReqM } from "./types";

export enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
  GET_REFERALS = "GET_REFERALS",
  GET_STARS_INFO = "GET_STARS_INFO",
}

export const useGetReferals = () =>
  useQuery({
    queryKey: [QueryKeys.GET_REFERALS],
    queryFn: async () => {
      validateToken();
      return getReferalLink();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: STALE_TIME,
  });

export const useGetProfile = (enabled?: boolean) =>
  useQuery<IProfile, AxiosError>({
    queryKey: [QueryKeys.GET_PROFILE],
    queryFn: getProfile,
    staleTime: STALE_TIME,
    enabled,
    retry: false,
  });

export const invalidateProfileQuery = (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_PROFILE] });
};

export const invalidateReferralQuery = (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_REFERALS] });
};

export const updateProfileQuery = (queryClient: QueryClient, stars: number) => {
  queryClient.setQueryData([QueryKeys.GET_PROFILE], (oldProfile: IProfile) => ({
    ...oldProfile,
    stars,
  }));
};

export const useSetWallet = () =>
  useMutation({
    mutationFn: (reqM: IWalletReqM) => setWallet(reqM),
  });

export const useDeleteWallet = () =>
  useMutation({
    mutationFn: () => deleteWallet(),
  });

export const useGetStarsInfo = () =>
  useQuery({
    queryKey: [QueryKeys.GET_STARS_INFO],
    queryFn: getStarsInfo,
    staleTime: STALE_TIME,
    retry: false,
  });

export const useClicker = () =>
  useMutation({
    mutationFn: (data: string) => setClicker(data),
  });
