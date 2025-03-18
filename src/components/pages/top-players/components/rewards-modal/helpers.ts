import { LeaderboardEnum } from "@/services/leaderboard/types";
import { League } from "@/services/profile/types";

import { LEAGUES, TOP_FRIENDS, WORLD_TOP } from "./constants";

export const getModalTitle = (board: LeaderboardEnum, league: League) => {
  switch (board) {
    case LeaderboardEnum.FRIEND:
      return TOP_FRIENDS.TITLE_TID
    case LeaderboardEnum.WORLD:
      return WORLD_TOP.TITLE_TID

    default:
      return LEAGUES[league].TITLE_TID
  }
}

export const getModalDescription = (board: LeaderboardEnum, league: League) => {
  switch (board) {
    case LeaderboardEnum.FRIEND:
      return TOP_FRIENDS.DESCRIPTION_TID
    case LeaderboardEnum.WORLD:
      return WORLD_TOP.DESCRIPTION_TID

    default:
      return LEAGUES[league].DESCRIPTION_TID
  }
}

export const getModalRewards = (board: LeaderboardEnum, league: League) => {
  switch (board) {
    case LeaderboardEnum.FRIEND:
      return TOP_FRIENDS.REWARDS
    case LeaderboardEnum.WORLD:
      return WORLD_TOP.REWARDS

    default:
      return LEAGUES[league].REWARDS
  }
}