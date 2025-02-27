import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { BattlePassReward, GetRewardFromBattlePassParams } from "./types";

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
}: GetRewardFromBattlePassParams): Promise<BattlePassReward> => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.POST.PLAY_BANDIT_JACKPOT,
    {
      level,
      isPaid,
    },
  );

  return data;
};
