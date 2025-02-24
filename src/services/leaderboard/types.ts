export enum LeaderboardEnum {
  FRIEND = "friend",
  LEAGUE = "league",
  WORLD = "world",
}

export type Leader = {
  name: string;
  photo_url: string;
  value: number;
  rank: number;
};

export type ILeaderboard = {
  player_rank: number;
  leaders: Leader[];
  hasNextPage: boolean;
};
