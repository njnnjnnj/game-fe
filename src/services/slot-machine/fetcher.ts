import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { Face, ServerFace } from "./types";

const FacesMap: Record<ServerFace, Face> = {
  banana: "bag",
  cherry: "bucket",
  lemon: "booster",
  wild: "super_booster",
  "777": "chest",
};

const mapCombinationFaces = (face: ServerFace): Face => FacesMap[face];

export const playBandit = async (bet: number) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.POST.PLAY_BANDIT,
    undefined,
    {
      params: {
        bet,
      },
    },
  );

  return {
    ...data,
    combination: data.combination.map(mapCombinationFaces),
  };
};

export const playBanditJackpot = async (bet: number) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.POST.PLAY_BANDIT_JACKPOT,
    undefined,
    {
      params: {
        bet,
      },
    },
  );

  return {
    ...data,
    combination: data.combination.map(mapCombinationFaces),
  };
};

export const getBandit = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_BANDIT);

  return data;
};
