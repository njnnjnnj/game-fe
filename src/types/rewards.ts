import {
  HeroClothPiece,
  HeroCurrency,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

export enum Reward {
  COINS = "coins",
  STARS = "stars",
  FRIENDS = "friends",
  BUSTER = "buster",
  OFFLINE = "offline",
  GAME_ENERGY = "game_energy",
  CLOTH = "cloth",
  CHARACTER = "character",
  AUTO = "AUTO",
  CHEST = "chest",
}

export type RewardValue =
  | number
  | "energy"
  | ChestType
  | HeroId
  | HeroId[]
  | HeroRarity;

export enum ChestType {
  START = "start",
  EPIC = "epic",
  MEGA = "mega",
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
  char_slot: HeroClothPiece;
};

export type Coffer = {
  coins: number | null;
  stars: number | null;
  buster: number | null;
  friends: number | null;
  offline: number | null;
  game_energy: number | null;
  cloth: ClothCofferReward | null;
  character: CofferReward | null;
  auto: CofferReward | null;
};

export type CofferKey = keyof Coffer;
export type CofferValue = Coffer[CofferKey];

export type RewardShape = {
  reward: Reward;
  value: RewardValue;
  character: CofferReward | null;
  cloth: ClothCofferReward | null;
  coffer: Coffer | null;
};
