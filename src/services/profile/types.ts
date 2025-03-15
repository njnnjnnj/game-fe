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
  haveSpecial: boolean;
  haveStarterPack: boolean;
  league: League;
}

export type Referral = {
  name: string;
  photo_url: string;
  reward: number;
  reward_per_hour: number;
};

export interface IReferrals {
  count: number;
  friends: Referral[];
  link: string;
  reward: number;
}

export interface IWalletReqM {
  userfriendly: string;
  address: string;
  chain: string;
  publickey: string;
}

export interface IStarsInfo {
  sum: number;
  available: number;
}

export interface ClickerReqM {
  debouncedClickCount: number;
  unixTimeInSeconds: number;
  token: string;
}
