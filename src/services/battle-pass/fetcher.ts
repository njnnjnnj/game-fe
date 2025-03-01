import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";
import { RewardShape } from "@/types/rewards";

import { GetRewardFromBattlePassParams } from "./types";

export const getBattlePass = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_BATTLEPASS);

  return data;
};

export const getBattlePassConfig = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_BATTLEPASS_CONFIG);

  return data;
};

export const getRewardFromBattlePass = async ({
  level,
  isPaid,
}: GetRewardFromBattlePassParams): Promise<RewardShape> => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.POST.GET_REWARD_FROM_BATTLEPASS,
    {
      level,
      isPaid,
    },
  );

  return data;
};

export const levelupBattlePass = async (): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.POST.LEVELUP_BATTLEPASS);
};
