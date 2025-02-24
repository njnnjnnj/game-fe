import { AxiosError } from "axios";

import { DEFAULT_COUNT_TOP_PLAYERS, STALE_TIME } from "@/constants/api";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getLeaderboard } from "./fetcher";
import { ILeaderboard, LeaderboardEnum } from "./types";

const QueryKeys = {
  GET_LEADERBOARD: "GET_LEADERBOARD",
};

export const useInfiniteLeaderboard = (
  leaderboard?: LeaderboardEnum,
  page = 1,
) =>
  useInfiniteQuery<ILeaderboard, AxiosError>({
    queryKey: [QueryKeys.GET_LEADERBOARD, leaderboard],
    queryFn: ({ pageParam = page }) =>
      getLeaderboard(
        DEFAULT_COUNT_TOP_PLAYERS,
        pageParam as number,
        leaderboard,
      ),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.leaders.length >= DEFAULT_COUNT_TOP_PLAYERS
        ? pages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: STALE_TIME,
    retry: false,
  });
