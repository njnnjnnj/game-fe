import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";
import { RewardShape } from "@/types/rewards";

import {
  DataStructure,
  Events,
  IBoosters,
  IDailyRewardInfo,
  IRewardsEarn,
  UpgradeBoosterType,
} from "./types";

export const getRewardsEarn = async (): Promise<IRewardsEarn> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_REWARDS_EARN);

  return data;
};

export const getDailyInfo = async (): Promise<IDailyRewardInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_DAILY_INFO);

  return data;
};

export const getDailyReward = async (): Promise<RewardShape> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_DAILY_REWARD);

  return data;
};

export const getBoosters = async (): Promise<IBoosters> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_BOOSTERS);

  return data;
};

export const getFullBooster = async (): Promise<{ status: string }> => {
  const { data } = await apiClient.post(API_ENDPOINTS.GET.USE_FULL_BOOSTER);

  return data;
};

export const getTempEnergyBooster = async (
  count: number = 1,
): Promise<{ status: string }> => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.GET.USE_TEMP_ENERGY_BOOSTER,
    {
      count,
    },
  );

  return data;
};

export const getUpgradeBooster = async (
  type: UpgradeBoosterType,
): Promise<{ status: string }> => {
  const { data } = await apiClient.post(API_ENDPOINTS.GET.UPGRADE_BOOSTER, {
    btype: type,
  });

  return data;
};

export const getAllAppsCards = async (): Promise<Events> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_ALL_APPS_CARDS);

  return data;
};

export const getCards = async (): Promise<DataStructure> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_CARDS);

  return data;
};

export const upgradeCard = async (idCard: string) => {
  const { data } = await apiClient.post(API_ENDPOINTS.POST.UPGRADE_CARD, {
    idCard,
  });

  return data;
};
