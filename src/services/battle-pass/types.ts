import { HeroClothPiece, HeroCurrency, HeroId } from "../heroes/types";

export type BattlePassInfo = {
  current_exp: number;
  current_level: number;
  is_paid: boolean;
  last_free_reward: number;
  last_paid_reward: number;
  need_exp: number;
};

export enum BattleBassChestType {
  START = "start",
  EPIC = "epic",
  MEGA = "mega",
}

export type BattlePassItem = {
  is_paid: boolean;
  level: number;
  type:
    | "chest"
    | "friends"
    | "stars"
    | "coins"
    | "offline"
    | "buster"
    | "game_energy"
    | "cloth"
    | "character";
  value: number | "energy" | BattleBassChestType | HeroId | HeroId[];
};

export type BattlePassConfig = {
  free: Record<number, BattlePassItem>;
  paid: Record<number, BattlePassItem>;
};

type ExistReward = {
  currency: HeroCurrency;
  value: number;
};

type CofferReward = {
  value: string;
  isExist: ExistReward | null;
};

type ClothCofferReward = {
  value: string | number;
  isExist: ExistReward | null;
  character: HeroId;
  slot: HeroClothPiece;
};

type Coffer = {
  coins: number | null;
  stars: number | null;
  buster: number | null;
  friends: number | null;
  offline: number | null;
  cloth: ClothCofferReward | null;
  character: CofferReward | null;
  game_energy: number | null;
  auto: CofferReward | null;
};

export type BattlePassReward = {
  reward: string;
  value: string | number;
  character: CofferReward | null;
  cloth: ClothCofferReward | null;
  coffer: Coffer | null;
};

export type GetRewardFromBattlePassParams = { level: number; isPaid: boolean };
