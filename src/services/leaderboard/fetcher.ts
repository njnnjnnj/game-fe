import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { ILeaderboard, LeaderboardEnum } from "./types";

export const getLeaderboard = async (
  pageParam: number,
  page: number = 1,
  board?: LeaderboardEnum,
): Promise<ILeaderboard> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.LEADERBOARD, {
    params: {
      leaderboard: board,
      limit: pageParam,
      offset: (page - 1) * pageParam,
    },
  });

  return data;
};
