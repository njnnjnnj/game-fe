import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getBattlePass,
  getBattlePassConfig,
  getRewardFromBattlePass,
} from "./fetcher";
import {
  BattlePassConfig,
  BattlePassInfo,
  BattlePassReward,
  GetRewardFromBattlePassParams,
} from "./types";

export enum QueryKeys {
  GET_BATTLEPASS = "GET_BATTLEPASS",
  GET_BATTLEPASS_CONFIG = "GET_BATTLEPASS_CONFIG",
  GET_REWARD_FROM_BATTLEPASS = "GET_REWARD_FROM_BATTLEPASS",
}

export const useGetBattlePass = () =>
  useQuery<BattlePassInfo>({
    queryKey: [QueryKeys.GET_BATTLEPASS],
    queryFn: () => getBattlePass(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetBattlePassConfig = () =>
  useQuery<BattlePassConfig>({
    queryKey: [QueryKeys.GET_BATTLEPASS_CONFIG],
    queryFn: () => getBattlePassConfig(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const usePlayBandit = () =>
  useMutation<BattlePassReward, AxiosError, GetRewardFromBattlePassParams>({
    mutationKey: [QueryKeys.GET_REWARD_FROM_BATTLEPASS],
    mutationFn: getRewardFromBattlePass,
  });
