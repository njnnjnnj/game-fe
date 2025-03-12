import { AxiosError } from "axios";

import { RewardShape } from "@/types/rewards";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  getBattlePass,
  getBattlePassConfig,
  getRewardFromBattlePass,
  levelupBattlePass,
} from "./fetcher";
import {
  BattlePassConfig,
  BattlePassInfo,
  GetRewardFromBattlePassParams,
} from "./types";

export enum QueryKeys {
  GET_BATTLEPASS = "GET_BATTLEPASS",
  GET_BATTLEPASS_CONFIG = "GET_BATTLEPASS_CONFIG",
  GET_REWARD_FROM_BATTLEPASS = "GET_REWARD_FROM_BATTLEPASS",
  LEVELUP_BATTLEPASS = "LEVELUP_BATTLEPASS",
}

export const useGetBattlePass = () =>
  useQuery<BattlePassInfo>({
    queryKey: [QueryKeys.GET_BATTLEPASS],
    queryFn: () => getBattlePass(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const invalidateBattlePassQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_BATTLEPASS] });
};

export const useGetBattlePassConfig = () =>
  useQuery<BattlePassConfig>({
    queryKey: [QueryKeys.GET_BATTLEPASS_CONFIG],
    queryFn: () => getBattlePassConfig(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetBattlePassReward = () =>
  useMutation<RewardShape, AxiosError, GetRewardFromBattlePassParams>({
    mutationKey: [QueryKeys.GET_REWARD_FROM_BATTLEPASS],
    mutationFn: getRewardFromBattlePass,
  });

export const useLevelupBattlePass = () =>
  useMutation({
    mutationKey: [QueryKeys.LEVELUP_BATTLEPASS],
    mutationFn: levelupBattlePass,
  });

export const levelupBattlePassQuery = (queryClient: QueryClient) => {
  queryClient.setQueryData(
    [QueryKeys.GET_BATTLEPASS],
    (prevBattlePass: BattlePassInfo) => ({
      ...prevBattlePass,
      current_exp: 1,
      current_level: prevBattlePass.current_level + 1,
      need_exp:
        prevBattlePass.need_exp + (prevBattlePass.current_level > 70 ? 60 : 50),
    }),
  );
};
