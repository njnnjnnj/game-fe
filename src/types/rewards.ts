import { HeroClothPiece, HeroCurrency, HeroId } from "@/services/heroes/types";

export enum Reward {
  COINS = "coins",
  STARS = "stars",
  FRIENDS = "friends",
  BUSTER = "buster",
  OFFLINE = "offline",
  CLOTH = "cloth",
  CHARACTER = "character",
  GAME_ENERGY = "game_energy",
  AUTO = "AUTO",
  CHEST = "chest",
}

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

export type RewardShape = {
  reward: Reward;
  value: string | number;
  character: CofferReward | null;
  cloth: ClothCofferReward | null;
  coffer: Coffer | null;
};
