import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { IProfile, IReferals, IStarsInfo, IWalletReqM } from "./types";

export const getProfile = async (): Promise<IProfile> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_PROFILE);

  return data;
};

export const getReferalLink = async (): Promise<IReferals> => {
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

export const setClicker = async (reqM: string): Promise<void> => {
  const { data } = await apiClient.post(API_ENDPOINTS.POST.CLICKER, {
    data: reqM,
  });

  return data;
};
