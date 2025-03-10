import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";
import { generateHmac } from "@/utils/lib/generateHmac";

import {
  ClickerReqM,
  IProfile,
  IReferrals,
  IStarsInfo,
  IWalletReqM,
} from "./types";

export const getProfile = async (): Promise<IProfile> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_PROFILE);

  return data;
};

export const getReferralLink = async (): Promise<IReferrals> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_REFERALS);

  return data;
};

export const setWallet = async (reqM: IWalletReqM): Promise<void> => {
  const { data } = await apiClient.post(API_ENDPOINTS.POST.SET_WALLET, {
    ...reqM,
  });

  return data;
};

export const deleteWallet = async (): Promise<void> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.DELETE_WALLET);

  return data;
};

export const getStarsInfo = async (): Promise<IStarsInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_STARS_INFO);

  return data;
};

export const setClicker = async (reqM: ClickerReqM): Promise<void> => {
  const sha = generateHmac(reqM);

  const { data } = await apiClient.post(API_ENDPOINTS.POST.CLICKER, {
    data: `${reqM.debouncedClickCount}:${reqM.unixTimeInSeconds}:${sha}`,
  });

  return data;
};

export const getReferralEarn = async (): Promise<void> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_REWARDS_EARN);

  return data;
};
