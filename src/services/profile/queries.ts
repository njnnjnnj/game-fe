import { AxiosError } from "axios";
import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteWallet,
  getProfile,
  getReferralEarn,
  getReferralLink,
  getStarsInfo,
  setClicker,
  setWallet,
} from "./fetcher";
import { ClickerReqM, IProfile, IWalletReqM } from "./types";

export enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
  GET_REFERRALS = "GET_REFERRALS",
  GET_STARS_INFO = "GET_STARS_INFO",
}

export const useGetReferrals = () =>
  useQuery({
    queryKey: [QueryKeys.GET_REFERRALS],
    queryFn: async () => {
      validateToken();
      return getReferralLink();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: STALE_TIME,
  });

export const useEarnReferrals = () =>
  useMutation({
    mutationFn: () => getReferralEarn(),
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
  return queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_REFERRALS] });
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

export const invalidateStarsInfoQuery = (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({
    queryKey: [QueryKeys.GET_STARS_INFO],
  });
};

export const useClicker = () =>
  useMutation({
    mutationFn: (data: ClickerReqM) => setClicker(data),
  });
