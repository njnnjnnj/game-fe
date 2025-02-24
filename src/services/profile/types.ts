import { HeroId } from "../heroes/types";

export enum League {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  BRILLIANT = "diamond",
  PLATINUM = "platinum",
  BILLIARD = "billiard",
}

export interface IProfile {
  coins: number;
  stars: number;
  reward_per_hour: number;
  reward_per_tap: number;
  character: {
    current: HeroId;
    hat: number;
    glass: number;
    chain: number;
    watch: number;
    kit: number;
  };
  energy: number;
  max_energy: number;
  exp: number;
  need_exp: number;
  friends: number;
  level: number;
  background: number;
  auto: number;
  haveBattlePass: boolean;
  league: League;
}

export type Referal = {
  name: string;
  photo_url: string;
  reward: number;
  reward_per_hour: number;
};

export interface IReferals {
  count: number;
  friends: Referal[];
  link: string;
  reward: number;
}
