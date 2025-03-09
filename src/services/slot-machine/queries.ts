import { AxiosError } from "axios";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { getBandit, playBandit, playBanditJackpot } from "./fetcher";
import {
  BanditInfo,
  BanditJackpotPlayResponse,
  BanditPlayResponse,
} from "./types";

export enum QueryKeys {
  PLAY_BANDIT = "PLAY_BANDIT",
  PLAY_BANDIT_JACKPOT = "PLAY_BANDIT_JACKPOT",
  GET_BANDIT = "GET_BANDIT",
}

export const usePlayBandit = () =>
  useMutation<BanditPlayResponse, AxiosError<{ detail: string }>, number>({
    mutationKey: [QueryKeys.PLAY_BANDIT],
    mutationFn: playBandit,
  });

export const usePlayBanditJackpot = () =>
  useMutation<
    BanditJackpotPlayResponse,
    AxiosError<{ detail: string }>,
    number
  >({
    mutationKey: [QueryKeys.PLAY_BANDIT_JACKPOT],
    mutationFn: playBanditJackpot,
  });

export const useGetBandit = (enabled?: boolean) =>
  useQuery<BanditInfo>({
    queryKey: [QueryKeys.GET_BANDIT],
    queryFn: () => getBandit(),
    retry: false,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const updateGetBanditQuery = (
  queryClient: QueryClient,
  balance: number,
) => {
  queryClient.setQueryData(
    [QueryKeys.GET_BANDIT],
    (oldBanditInfo: BanditInfo) => ({
      ...oldBanditInfo,
      balance,
    }),
  );
};
